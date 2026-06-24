import { existsSync, mkdirSync, readFileSync, unlinkSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import {
  deleteR2Cache,
  isR2Configured,
  isUpstreamFetchEnabled,
  readR2Cache,
  writeR2Cache,
  type StoredEntry,
} from './api-football-r2';

export { isR2Configured, isUpstreamFetchEnabled } from './api-football-r2';

const CACHE_DIR = path.join(process.cwd(), '.data', 'api-football');

const inFlight = new Map<string, Promise<unknown>>();

export function normalizeApiPath(apiPath: string): string {
  const p = apiPath.startsWith('/') ? apiPath : `/${apiPath}`;
  return p;
}

/** Stable cache key for an API path (shared by web pages, mobile proxy, and R2). */
export function cachePathKey(apiPath: string): string {
  return `path:${normalizeApiPath(apiPath)}`;
}

export function leagueFixturesPath(leagueId: number, season: number): string {
  return `/fixtures?league=${leagueId}&season=${season}`;
}

export function leagueStandingsPath(leagueId: number, season: number): string {
  return `/standings?league=${leagueId}&season=${season}`;
}

export function fixturesByDatePath(date: string): string {
  return `/fixtures?date=${date}`;
}

/** Paths that may trigger a single upstream fetch when not cached (dev / explicit allow). */
export function isAutoFetchAllowed(apiPath: string): boolean {
  if (!isUpstreamFetchEnabled()) return false;
  const p = normalizeApiPath(apiPath);
  if (p.startsWith('/fixtures?live')) return false;
  if (p === '/status') return true;
  if (/^\/fixtures\?league=\d+&season=\d+$/.test(p)) return true;
  if (/^\/standings\?league=\d+&season=\d+$/.test(p)) return true;
  if (/^\/fixtures\?date=\d{4}-\d{2}-\d{2}$/.test(p)) return true;
  return false;
}

function fileForKey(key: string): string {
  const safe = key.replace(/[^a-zA-Z0-9._-]/g, '_');
  return path.join(CACHE_DIR, `${safe}.json`);
}

function readLocalCache<T>(key: string): T | null {
  const file = fileForKey(key);
  if (!existsSync(file)) return null;
  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8')) as StoredEntry<T>;
    return parsed.data;
  } catch {
    return null;
  }
}

function writeLocalCache<T>(key: string, data: T): void {
  mkdirSync(CACHE_DIR, { recursive: true });
  const entry: StoredEntry<T> = { fetchedAt: new Date().toISOString(), data };
  writeFileSync(fileForKey(key), JSON.stringify(entry), 'utf8');
}

function deleteLocalCache(key: string): void {
  const file = fileForKey(key);
  if (existsSync(file)) unlinkSync(file);
}

/** Sync read — local disk only (legacy callers). */
export function readPersistentCache<T>(key: string): T | null {
  return readLocalCache<T>(key);
}

/** R2 first, then local disk. */
export async function readPersistentCacheAsync<T>(key: string): Promise<T | null> {
  if (isR2Configured()) {
    const fromR2 = await readR2Cache<T>(key);
    if (fromR2 !== null) return fromR2;
  }
  return readLocalCache<T>(key);
}

export async function writePersistentCacheAsync<T>(key: string, data: T): Promise<void> {
  writeLocalCache(key, data);
  await writeR2Cache(key, data);
}

export function writePersistentCache<T>(key: string, data: T): void {
  writeLocalCache(key, data);
  void writeR2Cache(key, data);
}

export async function deletePersistentCacheAsync(key: string): Promise<void> {
  deleteLocalCache(key);
  await deleteR2Cache(key);
}

export function deletePersistentCache(key: string): void {
  deleteLocalCache(key);
  void deleteR2Cache(key);
}

export function cacheMeta(key: string): { fetchedAt: string } | null {
  const file = fileForKey(key);
  if (!existsSync(file)) return null;
  try {
    const parsed = JSON.parse(readFileSync(file, 'utf8')) as StoredEntry<unknown>;
    return { fetchedAt: parsed.fetchedAt };
  } catch {
    return null;
  }
}

/** Read cache (R2 → disk); fetch upstream only when allowed and missing. */
export async function getPersistentOrFetch<T>(
  key: string,
  fetcher: () => Promise<T>,
  options?: { allowFetch?: boolean },
): Promise<{ data: T; fromCache: boolean }> {
  if (process.env.API_FOOTBALL_FORCE_REFRESH?.trim() === '1') {
    await deletePersistentCacheAsync(key);
  }

  const hit = await readPersistentCacheAsync<T>(key);
  if (hit !== null) return { data: hit, fromCache: true };

  const mayFetch = options?.allowFetch !== false && isUpstreamFetchEnabled();
  if (!mayFetch) {
    throw new Error(`No cached data for ${key}`);
  }

  const pending = inFlight.get(key);
  if (pending) {
    const data = (await pending) as T;
    return { data, fromCache: false };
  }

  const promise = fetcher()
    .then(async (data) => {
      await writePersistentCacheAsync(key, data);
      inFlight.delete(key);
      return data;
    })
    .catch((err) => {
      inFlight.delete(key);
      throw err;
    });

  inFlight.set(key, promise);
  const data = (await promise) as T;
  return { data, fromCache: false };
}

export async function readPersistentCacheByPath<T>(apiPath: string): Promise<T | null> {
  return readPersistentCacheAsync<T>(cachePathKey(apiPath));
}

/** @deprecated Use readPersistentCacheByPath — sync disk-only */
export function readPersistentCacheByPathSync<T>(apiPath: string): T | null {
  return readPersistentCache<T>(cachePathKey(apiPath));
}
