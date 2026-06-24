/** Minimum gap between upstream API calls (free plan: 10/min). */
const MIN_REQUEST_GAP_MS = 7_000;

let lastRequestAt = 0;
let queue: Promise<void> = Promise.resolve();

function sleep(ms: number): Promise<void> {
  return new Promise((r) => setTimeout(r, ms));
}

/** Serialize API calls with a gap so we stay under per-minute limits. */
export function scheduleApiRequest<T>(fn: () => Promise<T>): Promise<T> {
  const run = async () => {
    const wait = MIN_REQUEST_GAP_MS - (Date.now() - lastRequestAt);
    if (wait > 0) await sleep(wait);
    lastRequestAt = Date.now();
    return fn();
  };
  const result = queue.then(run, run);
  queue = result.then(() => undefined, () => undefined);
  return result;
}

export {
  cachePathKey,
  leagueFixturesPath,
  leagueStandingsPath,
  fixturesByDatePath,
  isAutoFetchAllowed,
  readPersistentCache,
  readPersistentCacheByPath,
  getPersistentOrFetch,
  cacheMeta,
} from './api-football-store';

import {
  cachePathKey,
  getPersistentOrFetch,
  isAutoFetchAllowed,
  readPersistentCache,
} from './api-football-store';

export function cacheKey(kind: 'fixtures' | 'standings', leagueId: number, season: number): string {
  const apiPath =
    kind === 'fixtures'
      ? `/fixtures?league=${leagueId}&season=${season}`
      : `/standings?league=${leagueId}&season=${season}`;
  return cachePathKey(apiPath);
}

export function getCachedOnly<T>(key: string): T | null {
  return readPersistentCache<T>(key);
}

/** Fetch upstream at most once per key, then serve from disk for all users. */
export async function cachedApiGet<T>(
  key: string,
  fetcher: () => Promise<T>,
  apiPath?: string,
): Promise<T> {
  const allowFetch = apiPath ? isAutoFetchAllowed(apiPath) : false;
  const { data } = await getPersistentOrFetch(key, () => scheduleApiRequest(fetcher), { allowFetch });
  return data;
}
