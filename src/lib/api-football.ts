import { existsSync, readFileSync } from 'node:fs';
import https from 'node:https';
import path from 'node:path';
import {
  cachedApiGet,
  cachePathKey,
  fixturesByDatePath,
  isAutoFetchAllowed,
  leagueFixturesPath,
  leagueStandingsPath,
  scheduleApiRequest,
} from './api-football-queue';
import { readPersistentCacheAsync } from './api-football-store';
import type { CompetitionDataResult } from './competition-fallback';
import type { Fixture, Standing } from './api-football-shared';

export type { Fixture, Standing, LeagueConfig } from './api-football-shared';
export {
  FREE_PLAN_SEASONS,
  LEAGUES,
  resolveSeason,
  formatSeasonLabel,
  LIVE_API_SLOT,
  PRIMARY_DATASET,
  isLiveApiSlot,
  isPrimaryDataset,
  liveApiSlotLabel,
  primaryDatasetLabel,
  FINISHED_STATUSES,
  LIVE_STATUSES,
  UPCOMING_STATUSES,
} from './api-football-shared';

export class ApiFootballError extends Error {
  constructor(
    readonly status: number,
    message: string,
  ) {
    super(message);
  }
}

/** Load .env.local explicitly — Turbopack sometimes uses wrong workspace root. */
function loadEnvLocal(): void {
  if (process.env._ZENO_ENV_LOADED) return;
  const envPath = path.join(process.cwd(), '.env.local');
  if (!existsSync(envPath)) return;
  for (const line of readFileSync(envPath, 'utf8').split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const eq = trimmed.indexOf('=');
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const val = trimmed.slice(eq + 1).trim();
    // Always refresh APISPORTS_KEY from file so key updates apply without full restart
    if (key === 'APISPORTS_KEY' || process.env[key] === undefined) process.env[key] = val;
  }
  process.env._ZENO_ENV_LOADED = '1';
}

function env(key: string): string | undefined {
  loadEnvLocal();
  return process.env[key]?.trim();
}

type Provider = 'dashboard' | 'rapidapi';

function isRapidApiKey(key: string): boolean {
  return key.includes('msh') && key.includes('jsn');
}

function getApiKey(): string {
  const key = env('APISPORTS_KEY');
  if (key && !isRapidApiKey(key)) return key;

  const rapid = env('RAPIDAPI_KEY');
  const rapidKey = rapid || (key && isRapidApiKey(key) ? key : '');
  if (rapidKey) return rapidKey;

  throw new ApiFootballError(
    401,
    'APISPORTS_KEY missing in .env.local — restart npm run dev after saving the key.',
  );
}

function resolveConfig(): { provider: Provider; baseUrl: string; headers: Record<string, string> } {
  const apisports = env('APISPORTS_KEY');
  const rapid = env('RAPIDAPI_KEY');

  if (apisports && !isRapidApiKey(apisports)) {
    return {
      provider: 'dashboard',
      baseUrl: 'https://v3.football.api-sports.io',
      headers: { 'x-apisports-key': apisports },
    };
  }

  const rapidKey = rapid || (apisports && isRapidApiKey(apisports) ? apisports : '');
  if (rapidKey) {
    return {
      provider: 'rapidapi',
      baseUrl: 'https://api-football-v1.p.rapidapi.com/v3',
      headers: {
        'X-RapidAPI-Key': rapidKey,
        'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
      },
    };
  }

  throw new ApiFootballError(
    401,
    'APISPORTS_KEY missing in .env.local — restart npm run dev after saving the key.',
  );
}

export function isApiKeyConfigured(): boolean {
  try {
    getApiKey();
    return true;
  } catch {
    return false;
  }
}

export function getApiFootballConfig() {
  const { provider, baseUrl } = resolveConfig();
  return { provider, baseUrl };
}

/** Native HTTPS — avoids Next.js fetch dropping custom auth headers. */
async function fetchApiRaw<T>(path: string): Promise<T> {
  const { baseUrl, headers } = resolveConfig();
  const url = new URL(`${baseUrl}${path}`);

  const { status, json } = await new Promise<{
    status: number;
    json: { response?: T; message?: string; errors?: Record<string, string> };
  }>((resolve, reject) => {
    const req = https.request(
      {
        hostname: url.hostname,
        path: `${url.pathname}${url.search}`,
        method: 'GET',
        headers: { Accept: 'application/json', ...headers },
      },
      (res) => {
        let body = '';
        res.on('data', (chunk) => { body += chunk; });
        res.on('end', () => {
          try {
            resolve({ status: res.statusCode ?? 500, json: JSON.parse(body) });
          } catch {
            reject(new ApiFootballError(res.statusCode ?? 500, 'Invalid JSON from API-Football'));
          }
        });
      },
    );
    req.on('error', reject);
    req.setTimeout(15000, () => req.destroy(new Error('API-Football timeout')));
    req.end();
  });

  if (json.errors && Object.keys(json.errors).length > 0) {
    throw new ApiFootballError(status, Object.values(json.errors).join('; '));
  }
  if (status === 403) {
    const { provider } = resolveConfig();
    if (provider === 'rapidapi') {
      throw new ApiFootballError(
        403,
        'RapidAPI rejected this key (403). Subscribe to API-Football on rapidapi.com with the same account that owns the key.',
      );
    }
    throw new ApiFootballError(403, json.message ?? 'Forbidden — check your dashboard API key.');
  }
  if (status === 429) {
    throw new ApiFootballError(429, 'Rate limit — wait a minute and retry.');
  }
  if (status < 200 || status >= 300) {
    throw new ApiFootballError(status, json.message ?? `HTTP ${status}`);
  }

  return json.response as T;
}

export async function getApiFootballStatus(): Promise<{
  ok: boolean;
  provider: Provider | 'none';
  baseUrl: string;
  keyConfigured: boolean;
  account?: Record<string, unknown>;
  error?: string;
}> {
  const keyConfigured = isApiKeyConfigured();
  const statusKey = cachePathKey('/status');
  const cachedAccount = await readPersistentCacheAsync<Record<string, unknown>>(statusKey);

  try {
    const { provider, baseUrl } = resolveConfig();
    if (cachedAccount) {
      return { ok: true, provider, baseUrl, keyConfigured, account: cachedAccount };
    }
    const account = await cachedApiGet(
      statusKey,
      () => fetchApiRaw<Record<string, unknown>>('/status'),
      '/status',
    );
    return { ok: true, provider, baseUrl, keyConfigured, account };
  } catch (e) {
    let provider: Provider | 'none' = 'none';
    let baseUrl = '';
    try {
      const cfg = resolveConfig();
      provider = cfg.provider;
      baseUrl = cfg.baseUrl;
    } catch {
      // no key configured
    }
    return {
      ok: false,
      provider,
      baseUrl,
      keyConfigured,
      error: e instanceof ApiFootballError ? e.message : String(e),
    };
  }
}

function isStandingRow(value: unknown): value is Standing {
  return (
    typeof value === 'object' &&
    value !== null &&
    'team' in value &&
    'rank' in value
  );
}

/** Accepts cached raw API envelope or normalized Standing[][]. */
function parseStandingsResponse(raw: unknown): Standing[][] {
  if (!Array.isArray(raw) || raw.length === 0) return [];

  if (Array.isArray(raw[0])) {
    return raw.filter((g): g is Standing[] => Array.isArray(g) && g.every(isStandingRow));
  }

  const envelope = raw[0] as { league?: { standings?: unknown } } | undefined;
  const groups = envelope?.league?.standings;
  if (!Array.isArray(groups)) return [];

  return groups.filter((g): g is Standing[] => Array.isArray(g) && g.every(isStandingRow));
}

async function fetchLeagueFixtures(leagueId: number, season: number): Promise<Fixture[]> {
  const apiPath = leagueFixturesPath(leagueId, season);
  const key = cachePathKey(apiPath);
  const fixtures = await cachedApiGet(
    key,
    () => fetchApiRaw<Fixture[]>(apiPath),
    apiPath,
  );
  return fixtures.sort((a, b) => new Date(b.fixture.date).getTime() - new Date(a.fixture.date).getTime());
}

async function fetchStandings(leagueId: number, season: number): Promise<Standing[][]> {
  const apiPath = leagueStandingsPath(leagueId, season);
  const key = cachePathKey(apiPath);
  const stored = await cachedApiGet(
    key,
    async () => {
      const raw = await fetchApiRaw<{ league: { standings: Standing[][] } }[]>(apiPath);
      return parseStandingsResponse(raw);
    },
    apiPath,
  );
  return parseStandingsResponse(stored);
}

async function readCachedCompetition(leagueId: number, season: number): Promise<{
  fixtures: Fixture[];
  standings: Standing[][];
}> {
  return {
    fixtures:
      (await readPersistentCacheAsync<Fixture[]>(
        cachePathKey(leagueFixturesPath(leagueId, season)),
      )) ?? [],
    standings: parseStandingsResponse(
      await readPersistentCacheAsync(cachePathKey(leagueStandingsPath(leagueId, season))),
    ),
  };
}

export function getLeagueFixtures(leagueId: number, season: number): Promise<Fixture[]> {
  return fetchLeagueFixtures(leagueId, season);
}

export function getStandings(leagueId: number, season: number): Promise<Standing[][]> {
  return fetchStandings(leagueId, season);
}

export function getFixturesByDate(date: string): Promise<Fixture[]> {
  const apiPath = fixturesByDatePath(date);
  const key = cachePathKey(apiPath);
  return cachedApiGet(key, () => fetchApiRaw<Fixture[]>(apiPath), apiPath);
}

export type { CompetitionDataResult } from './competition-fallback';

function useSeedData(): boolean {
  return process.env.USE_SEED_DATA?.trim().toLowerCase() === 'true';
}

export async function getCompetitionData(
  competitionId: string,
  leagueName: string,
  leagueId: number,
  season: number,
): Promise<CompetitionDataResult> {
  if (useSeedData()) {
    const { seedCompetitionData } = await import('./competition-fallback');
    return seedCompetitionData(competitionId, leagueName);
  }

  const cached = await readCachedCompetition(leagueId, season);
  const fixturesPath = leagueFixturesPath(leagueId, season);
  const standingsPath = leagueStandingsPath(leagueId, season);
  const canFetch =
    isAutoFetchAllowed(fixturesPath) || isAutoFetchAllowed(standingsPath);

  if (!canFetch && cached.fixtures.length === 0 && cached.standings.length === 0) {
    const { seedCompetitionData } = await import('./competition-fallback');
    const seeded = seedCompetitionData(competitionId, leagueName);
    if (seeded.fixtures.length > 0 || seeded.standings.length > 0) return seeded;
    return {
      fixtures: [],
      standings: [],
      source: 'api',
      error: `Matches for ${leagueName} aren't available yet.`,
    };
  }

  try {
    let fixtures = cached.fixtures;
    let standings = cached.standings;
    let fixtureError: string | undefined;

    if (fixtures.length === 0 && isAutoFetchAllowed(fixturesPath)) {
      try {
        fixtures = await getLeagueFixtures(leagueId, season);
      } catch {
        fixtureError = 'Unable to load matches right now.';
      }
    }

    if (standings.length === 0 && isAutoFetchAllowed(standingsPath)) {
      try {
        standings = await getStandings(leagueId, season);
      } catch {
        // standings optional
      }
    }

    if (fixtures.length > 0 || standings.length > 0) {
      return { fixtures, standings, source: 'api' };
    }

    if (cached.fixtures.length > 0 || cached.standings.length > 0) {
      return { ...cached, source: 'api' };
    }

    const { seedCompetitionData } = await import('./competition-fallback');
    const seeded = seedCompetitionData(competitionId, leagueName);
    if (seeded.fixtures.length > 0) return seeded;

    return {
      fixtures: [],
      standings: [],
      source: 'api',
      error: fixtureError ?? `No matches found for this season.`,
    };
  } catch {
    return {
      fixtures: [],
      standings: [],
      source: 'api',
      error: 'Unable to load matches right now.',
    };
  }
}

export async function getFixturesByLeague(leagueId: number, season: number): Promise<Fixture[]> {
  return getLeagueFixtures(leagueId, season);
}

export async function getLiveFixtures(): Promise<Fixture[]> {
  return (await readPersistentCacheAsync<Fixture[]>(cachePathKey('/fixtures?live=all'))) ?? [];
}
