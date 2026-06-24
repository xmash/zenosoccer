import { Suspense } from 'react';
import { COMPETITIONS, GROUP_STANDINGS, SCORES } from '@/lib/tournament-data';
import {
  getCompetitionData,
  LEAGUES,
  resolveSeason,
  type Fixture,
  type Standing,
} from '@/lib/api-football';
import { SeasonPicker } from '@/components/competitions/season-picker';
import { MockScoreCard } from '@/components/competitions/mock-score-card';
import { MockStandingsTable } from '@/components/competitions/standings-table';
import { TournamentDetailView } from '@/components/competitions/tournament-detail-view';
import { LeagueDetailView } from '@/components/competitions/league-detail-view';
import { PageHeader } from '@/components/sections/page-header';
import { competitionSeasonLabel } from '@/lib/competition-display';
import { buildTournamentTabs } from '@/lib/tournament-tabs';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

function CompetitionLogo({ logo, color }: { logo: string; color: string }) {
  return (
    <div
      className="flex h-16 w-16 shrink-0 items-center justify-center rounded-xl text-4xl md:h-20 md:w-20 md:text-5xl"
      style={{ backgroundColor: `${color}22` }}
    >
      {logo}
    </div>
  );
}

export default async function CompetitionDetailPage({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string }>;
}) {
  const { id } = await params;
  const { season: seasonParam } = await searchParams;
  const comp = COMPETITIONS.find((c) => c.id === id);
  if (!comp) notFound();

  const league = LEAGUES[id];
  const season = league ? resolveSeason(league, seasonParam) : comp.defaultApiSeason ?? 2024;

  const mockMatches = SCORES.filter((m) => m.competitionId === id);
  const hasApiLeague = Boolean(league);

  let fixtures: Fixture[] = [];
  let standings: Standing[][] = [];
  let error: string | undefined;
  let source: 'api' | 'seed' = 'api';

  if (league) {
    const data = await getCompetitionData(id, comp.name, league.apiLeagueId, season);
    fixtures = data.fixtures;
    standings = data.standings;
    error = data.error;
    source = data.source;
  }

  const useMock = !hasApiLeague || (fixtures.length === 0 && !error && source !== 'seed');
  const seasonLabel = competitionSeasonLabel(comp, league, season);
  const showDemoRound = useMock && comp.currentRound;
  const tournamentTabs = buildTournamentTabs(fixtures, standings);

  const subtitle = [seasonLabel, showDemoRound ? comp.currentRound : null].filter(Boolean).join(' · ');

  return (
    <>
      <PageHeader
        layout="wide"
        back={{ href: '/competitions', label: 'Tournaments' }}
        eyebrow={comp.region}
        title={comp.name}
        description={subtitle}
        leading={<CompetitionLogo logo={comp.logo} color={comp.avatarColor} />}
      />

      <section className="page-body">
        <div className="section-inner">
          {league ? (
            <SeasonPicker competitionId={id} league={league} currentSeason={season} />
          ) : null}

          {error ? (
            <div className="mb-6 rounded-xl border border-red-200 bg-red-50 px-4 py-4 text-sm text-red-900 dark:border-red-900 dark:bg-red-950 dark:text-red-100">
              <p className="font-semibold">Could not load matches</p>
              <p className="mt-1">{error}</p>
            </div>
          ) : null}

          {!useMock && comp.format === 'tournament' && tournamentTabs.length > 0 ? (
            <Suspense fallback={<div className="py-12 text-center text-muted-foreground">Loading…</div>}>
              <TournamentDetailView tabs={tournamentTabs} fixtures={fixtures} standings={standings} />
            </Suspense>
          ) : null}

          {!useMock && comp.format === 'league' && (fixtures.length > 0 || standings.length > 0) ? (
            <Suspense fallback={<div className="py-12 text-center text-muted-foreground">Loading…</div>}>
              <LeagueDetailView fixtures={fixtures} standings={standings} />
            </Suspense>
          ) : null}

          {useMock && mockMatches.length > 0 ? (
            <section className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
              {mockMatches.map((m) => (
                <MockScoreCard key={m.id} match={m} />
              ))}
            </section>
          ) : null}

          {useMock
            ? Object.entries(GROUP_STANDINGS).map(([group, teams]) => (
                <section key={group} className="mt-8">
                  <MockStandingsTable teams={teams} groupLabel={group} />
                </section>
              ))
            : null}
        </div>
      </section>
    </>
  );
}
