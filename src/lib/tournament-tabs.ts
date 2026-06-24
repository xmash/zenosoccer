import type { Fixture, Standing } from '@/lib/api-football-shared';

export type TournamentTabId =
  | 'standings'
  | 'group-stage'
  | 'round-of-16'
  | 'quarter-finals'
  | 'semi-finals'
  | 'finals';

export type TournamentTab = {
  id: TournamentTabId;
  label: string;
  count?: number;
};

export const TOURNAMENT_TAB_ORDER: TournamentTabId[] = [
  'standings',
  'group-stage',
  'round-of-16',
  'quarter-finals',
  'semi-finals',
  'finals',
];

const TAB_LABELS: Record<TournamentTabId, string> = {
  standings: 'Standings',
  'group-stage': 'Group stage',
  'round-of-16': 'Round of 16',
  'quarter-finals': 'Quarter-finals',
  'semi-finals': 'Semi-finals',
  finals: 'Finals',
};

/** Map API-Football `league.round` strings into tab buckets. */
export function fixtureTabId(round: string): TournamentTabId | null {
  const r = round.toLowerCase();
  if (r.startsWith('group stage')) return 'group-stage';
  if (r.includes('round of 16')) return 'round-of-16';
  if (r.includes('quarter-final')) return 'quarter-finals';
  if (r.includes('semi-final')) return 'semi-finals';
  if (r === 'final' || r.includes('3rd place')) return 'finals';
  return null;
}

export function bucketTournamentFixtures(fixtures: Fixture[]): Map<TournamentTabId, Fixture[]> {
  const buckets = new Map<TournamentTabId, Fixture[]>();
  for (const tab of TOURNAMENT_TAB_ORDER) {
    if (tab !== 'standings') buckets.set(tab, []);
  }
  for (const f of fixtures) {
    const tab = fixtureTabId(f.league.round);
    if (!tab || tab === 'standings') continue;
    buckets.get(tab)!.push(f);
  }
  for (const [tab, list] of buckets) {
    list.sort((a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime());
    buckets.set(tab, list);
  }
  return buckets;
}

export function buildTournamentTabs(
  fixtures: Fixture[],
  standings: Standing[][],
): TournamentTab[] {
  const buckets = bucketTournamentFixtures(fixtures);
  const tabs: TournamentTab[] = [];

  if (standings.length > 0) {
    tabs.push({ id: 'standings', label: TAB_LABELS.standings, count: standings.length });
  }

  for (const id of TOURNAMENT_TAB_ORDER) {
    if (id === 'standings') continue;
    const list = buckets.get(id) ?? [];
    if (list.length > 0) {
      tabs.push({ id, label: TAB_LABELS[id], count: list.length });
    }
  }

  return tabs;
}

export function parseTabParam(value: string | undefined, tabs: TournamentTab[]): TournamentTabId {
  if (value && tabs.some((t) => t.id === value)) return value as TournamentTabId;
  return tabs[0]?.id ?? 'standings';
}

/** team id → "Group A" from standings rows. */
export function buildTeamGroupMap(standings: Standing[][]): Map<number, string> {
  const map = new Map<number, string>();
  for (const group of standings) {
    const label = group[0]?.group;
    if (!label) continue;
    for (const row of group) {
      map.set(row.team.id, label);
    }
  }
  return map;
}

export type GroupFixtureBucket = {
  group: string;
  fixtures: Fixture[];
};

/** Group-stage fixtures bucketed by standings group (Group A–H), preserving standings order. */
export function bucketGroupStageByGroup(
  fixtures: Fixture[],
  standings: Standing[][],
): GroupFixtureBucket[] {
  const teamGroup = buildTeamGroupMap(standings);
  const buckets = new Map<string, Fixture[]>();

  for (const fixture of fixtures) {
    const group =
      teamGroup.get(fixture.teams.home.id) ??
      teamGroup.get(fixture.teams.away.id) ??
      'Other';
    const list = buckets.get(group) ?? [];
    list.push(fixture);
    buckets.set(group, list);
  }

  const ordered: GroupFixtureBucket[] = [];
  const seen = new Set<string>();

  for (const groupRows of standings) {
    const label = groupRows[0]?.group;
    if (!label || seen.has(label)) continue;
    seen.add(label);
    const list = buckets.get(label);
    if (list?.length) {
      ordered.push({
        group: label,
        fixtures: [...list].sort(
          (a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime(),
        ),
      });
    }
  }

  for (const [group, list] of buckets) {
    if (!seen.has(group) && list.length > 0) {
      ordered.push({
        group,
        fixtures: [...list].sort(
          (a, b) => new Date(a.fixture.date).getTime() - new Date(b.fixture.date).getTime(),
        ),
      });
    }
  }

  return ordered;
}
