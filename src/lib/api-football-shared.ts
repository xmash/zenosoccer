export interface Fixture {
  fixture: { id: number; date: string; status: { short: string; elapsed: number | null } };
  league: { id: number; name: string; round: string };
  teams: {
    home: { id: number; name: string; logo: string; winner: boolean | null };
    away: { id: number; name: string; logo: string; winner: boolean | null };
  };
  goals: { home: number | null; away: number | null };
}

export interface Standing {
  rank: number;
  team: { id: number; name: string; logo: string };
  points: number;
  goalsDiff: number;
  group?: string;
  all: { played: number; win: number; draw: number; lose: number; goals: { for: number; against: number } };
}

/** Free dashboard plan only allows seasons 2022–2024. */
export const FREE_PLAN_SEASONS = [2022, 2023, 2024] as const;

export type LeagueConfig = {
  apiLeagueId: number;
  name: string;
  availableSeasons: readonly number[];
  defaultSeason: number;
};

export const LEAGUES: Record<string, LeagueConfig> = {
  wc2026: {
    apiLeagueId: 1,
    name: 'FIFA World Cup',
    availableSeasons: [2022],
    defaultSeason: 2022,
  },
  ucl: {
    apiLeagueId: 2,
    name: 'UEFA Champions League',
    availableSeasons: [2022, 2023, 2024],
    defaultSeason: 2024,
  },
  pl: {
    apiLeagueId: 39,
    name: 'Premier League',
    availableSeasons: [2022, 2023, 2024],
    defaultSeason: 2024,
  },
  laliga: {
    apiLeagueId: 140,
    name: 'La Liga',
    availableSeasons: [2022, 2023, 2024],
    defaultSeason: 2024,
  },
  mls: {
    apiLeagueId: 253,
    name: 'MLS',
    availableSeasons: [2022, 2023, 2024],
    defaultSeason: 2024,
  },
  copa: {
    apiLeagueId: 9,
    name: 'Copa America',
    availableSeasons: [2022, 2024],
    defaultSeason: 2024,
  },
};

export function resolveSeason(league: LeagueConfig, seasonParam?: string | null): number {
  const n = seasonParam ? parseInt(seasonParam, 10) : NaN;
  if (!Number.isNaN(n) && league.availableSeasons.includes(n)) return n;
  return league.defaultSeason;
}

export function formatSeasonLabel(league: LeagueConfig, season: number): string {
  if (league.apiLeagueId === 1) return `${season}`;
  return `${season}/${String(season + 1).slice(-2)}`;
}

/** Primary dataset — first visit fetches once, then all users read from server disk cache. */
export const PRIMARY_DATASET = { competitionId: 'pl', season: 2024 } as const;

/** @deprecated use PRIMARY_DATASET */
export const LIVE_API_SLOT = PRIMARY_DATASET;

export function isPrimaryDataset(competitionId: string, season: number): boolean {
  return competitionId === PRIMARY_DATASET.competitionId && season === PRIMARY_DATASET.season;
}

/** @deprecated use isPrimaryDataset */
export function isLiveApiSlot(competitionId: string, season: number): boolean {
  return isPrimaryDataset(competitionId, season);
}

export function primaryDatasetLabel(): string {
  const league = LEAGUES[PRIMARY_DATASET.competitionId];
  return league
    ? `${league.name} ${formatSeasonLabel(league, PRIMARY_DATASET.season)}`
    : 'Premier League 2024/25';
}

/** @deprecated */
export function liveApiSlotLabel(): string {
  return primaryDatasetLabel();
}

export const FINISHED_STATUSES = new Set(['FT', 'AET', 'PEN', 'AWD', 'WO']);
export const LIVE_STATUSES = new Set(['1H', '2H', 'HT', 'LIVE', 'ET', 'P', 'BT']);
export const UPCOMING_STATUSES = new Set(['NS', 'TBD', 'PST']);
