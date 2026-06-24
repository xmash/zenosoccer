'use client';

import { useSearchParams, useRouter, usePathname } from 'next/navigation';
import type { Fixture, Standing } from '@/lib/api-football-shared';
import { LIVE_STATUSES, FINISHED_STATUSES, UPCOMING_STATUSES } from '@/lib/api-football-shared';
import { ApiFixtureCard } from '@/components/competitions/api-fixture-card';
import { ApiStandingsTable } from '@/components/competitions/standings-table';

type Props = {
  fixtures: Fixture[];
  standings: Standing[][];
};

type LeagueTab = 'standings' | 'results';

export function LeagueDetailView({ fixtures, standings }: Props) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const tab = (searchParams.get('tab') === 'results' ? 'results' : 'standings') as LeagueTab;

  const live = fixtures.filter((f) => LIVE_STATUSES.has(f.fixture.status.short));
  const upcoming = fixtures.filter((f) => UPCOMING_STATUSES.has(f.fixture.status.short));
  const finished = fixtures.filter((f) => FINISHED_STATUSES.has(f.fixture.status.short));

  function selectTab(id: LeagueTab) {
    const params = new URLSearchParams(searchParams.toString());
    if (id === 'standings') params.delete('tab');
    else params.set('tab', id);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  }

  const tabs: { id: LeagueTab; label: string; count?: number }[] = [];
  if (standings.length > 0) tabs.push({ id: 'standings', label: 'Standings' });
  if (fixtures.length > 0) tabs.push({ id: 'results', label: 'Results', count: fixtures.length });

  return (
    <div className="space-y-6">
      {live.length > 0 && (
        <div className="flex items-center gap-2 rounded-lg border border-red-200 bg-red-50 px-4 py-2.5 text-sm text-red-800 dark:border-red-900 dark:bg-red-950 dark:text-red-200">
          <span className="h-2 w-2 animate-pulse rounded-full bg-red-500" />
          {live.length} live now
        </div>
      )}

      {tabs.length > 1 && (
        <nav className="mb-8 flex gap-6 border-b border-border" aria-label="League views">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => selectTab(t.id)}
                className={`border-b-2 px-4 py-3 text-sm font-medium transition-colors ${
                  tab === t.id
                    ? 'border-primary text-foreground'
                    : 'border-transparent text-muted-foreground hover:text-foreground'
                }`}
              >
                {t.label}
                {t.count != null && (
                  <span className="ml-1.5 text-xs text-muted-foreground">({t.count})</span>
                )}
              </button>
            ))}
        </nav>
      )}

      {tab === 'standings' && standings.length > 0 && (
        <ApiStandingsTable groups={standings} />
      )}

      {tab === 'results' && (
        <div className="space-y-6">
          {live.length > 0 && <FixtureSection label="Live" fixtures={live} live />}
          {upcoming.length > 0 && <FixtureSection label="Upcoming" fixtures={upcoming} />}
          {finished.length > 0 && (
            <FixtureSection label={`Results (${finished.length})`} fixtures={finished} />
          )}
        </div>
      )}
    </div>
  );
}

function FixtureSection({
  label,
  fixtures,
  live,
}: {
  label: string;
  fixtures: Fixture[];
  live?: boolean;
}) {
  return (
    <section>
      <h2
        className={`mb-3 flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider ${
          live ? 'text-red-500' : 'text-muted-foreground'
        }`}
      >
        {live && <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500" />}
        {label}
      </h2>
      <div className="grid gap-3 md:grid-cols-2">
        {fixtures.map((f) => (
          <ApiFixtureCard key={f.fixture.id} fixture={f} />
        ))}
      </div>
    </section>
  );
}
