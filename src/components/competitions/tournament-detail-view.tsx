'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { Fixture, Standing } from '@/lib/api-football-shared';
import { LIVE_STATUSES } from '@/lib/api-football-shared';
import {
  type TournamentTab,
  type TournamentTabId,
  bucketGroupStageByGroup,
  bucketTournamentFixtures,
  parseTabParam,
} from '@/lib/tournament-tabs';
import { ApiFixtureCard } from '@/components/competitions/api-fixture-card';
import { ApiStandingsTable } from '@/components/competitions/standings-table';

type Props = {
  tabs: TournamentTab[];
  fixtures: Fixture[];
  standings: Standing[][];
};

export function TournamentDetailView({ tabs, fixtures, standings }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const activeId = parseTabParam(searchParams.get('tab') ?? undefined, tabs);
  const buckets = bucketTournamentFixtures(fixtures);
  const liveCount = fixtures.filter((f) => LIVE_STATUSES.has(f.fixture.status.short)).length;

  function selectTab(id: TournamentTabId) {
    const params = new URLSearchParams(searchParams.toString());
    params.set('tab', id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const activeFixtures = buckets.get(activeId) ?? [];
  const groupStageBuckets =
    activeId === 'group-stage' ? bucketGroupStageByGroup(activeFixtures, standings) : [];

  return (
    <div className="space-y-6">
      {liveCount > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          {liveCount} match{liveCount === 1 ? '' : 'es'} live
        </div>
      )}

      <nav className="mb-8 flex gap-6 overflow-x-auto border-b border-border" aria-label="Tournament phases">
          {tabs.map((tab) => {
            const active = tab.id === activeId;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => selectTab(tab.id)}
                className={`shrink-0 border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  active
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:border-border hover:text-foreground'
                }`}
              >
                {tab.label}
                {tab.count != null && tab.id !== 'standings' && (
                  <span className="ml-1.5 text-xs text-muted-foreground">({tab.count})</span>
                )}
              </button>
            );
          })}
      </nav>

      {activeId === 'standings' && standings.length > 0 && (
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {standings.map((group, gi) => (
            <div key={gi} className="min-w-0">
              <ApiStandingsTable groups={[group]} />
            </div>
          ))}
        </div>
      )}

      {activeId === 'group-stage' && groupStageBuckets.length > 0 && (
        <div className="grid gap-8 sm:grid-cols-2 xl:grid-cols-4">
          {groupStageBuckets.map(({ group, fixtures: groupFixtures }) => (
            <section key={group} className="min-w-0">
              <h3 className="mb-3 font-bold">{group}</h3>
              <div className="space-y-3">
                {groupFixtures.map((f) => (
                  <ApiFixtureCard key={f.fixture.id} fixture={f} compact />
                ))}
              </div>
            </section>
          ))}
        </div>
      )}

      {activeId !== 'standings' && activeId !== 'group-stage' && (
        <div
          className={
            activeId === 'round-of-16'
              ? 'grid gap-3 sm:grid-cols-2 lg:grid-cols-4'
              : 'grid gap-3 sm:grid-cols-2'
          }
        >
          {activeFixtures.length === 0 ? (
            <p className="col-span-full py-8 text-center text-muted-foreground">
              No matches in this phase.
            </p>
          ) : (
            activeFixtures.map((f) => <ApiFixtureCard key={f.fixture.id} fixture={f} compact />)
          )}
        </div>
      )}

      {activeId === 'group-stage' && groupStageBuckets.length === 0 && (
        <p className="py-8 text-center text-muted-foreground">No matches in this phase.</p>
      )}
    </div>
  );
}
