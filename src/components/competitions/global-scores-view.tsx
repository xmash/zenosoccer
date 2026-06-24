'use client';

import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { ApiFixtureCard } from '@/components/competitions/api-fixture-card';
import { MockScoreCard } from '@/components/competitions/mock-score-card';
import { filterScoresByDate } from '@/lib/tournament-data';
import type { Fixture } from '@/lib/api-football-shared';
import { LIVE_STATUSES } from '@/lib/api-football-shared';

const FILTERS = ['today', 'yesterday', 'tomorrow', 'all'] as const;
type Filter = (typeof FILTERS)[number];

export function GlobalScoresView({
  apiFixtures,
  apiError,
}: {
  apiFixtures: Fixture[];
  apiError?: string;
}) {
  const searchParams = useSearchParams();
  const filter = (searchParams.get('filter') as Filter) || 'today';
  const mockScores = filterScoresByDate(filter);
  const liveApi = apiFixtures.filter((f) => LIVE_STATUSES.has(f.fixture.status.short));

  return (
    <div className="section-inner">
      {liveApi.length > 0 && (
        <p className="mb-4 text-sm text-green-600">{liveApi.length} live now</p>
      )}

      <div className="mb-8 flex gap-6 border-b border-border">
        {FILTERS.map((f) => {
          const active = filter === f;
          const href = f === 'today' ? '/competitions/scores' : `/competitions/scores?filter=${f}`;
          return (
            <Link
              key={f}
              href={href}
              className={`shrink-0 border-b-2 pb-3 text-sm font-medium capitalize transition-colors ${
                active
                  ? 'border-primary text-foreground'
                  : 'border-transparent text-muted-foreground hover:text-foreground'
              }`}
            >
              {f}
            </Link>
          );
        })}
      </div>

      {apiError && (
        <div className="mb-6 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-100">
          Could not load live fixtures — showing demo matches. {apiError}
        </div>
      )}

      {apiFixtures.length > 0 && filter === 'today' && (
        <section className="mb-10">
          <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
            From API · today
          </h2>
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {apiFixtures.map((f) => (
              <ApiFixtureCard key={f.fixture.id} fixture={f} />
            ))}
          </div>
        </section>
      )}

      <section>
        <h2 className="mb-4 text-xs font-bold uppercase tracking-wider text-muted-foreground">
          {filter === 'all' ? 'All matches' : filter}
        </h2>
        {mockScores.length === 0 ? (
          <p className="py-8 text-center text-sm text-muted-foreground">No matches for this day.</p>
        ) : (
          <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-3">
            {mockScores.map((m) => (
              <MockScoreCard key={m.id} match={m} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
