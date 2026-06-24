import Link from 'next/link';
import { COMPETITIONS, type Competition } from '@/lib/tournament-data';
import { LEAGUES } from '@/lib/api-football-shared';
import { competitionSeasonLabel } from '@/lib/competition-display';
import { PageHeader } from '@/components/sections/page-header';

function StatusBadge({ status }: { status: Competition['status'] }) {
  if (status === 'active') {
    return (
      <span className="rounded-lg bg-green-100 px-2.5 py-1 font-bold text-green-700 dark:bg-green-950 dark:text-green-400">
        ACTIVE
      </span>
    );
  }
  if (status === 'upcoming') {
    return (
      <span className="rounded-lg bg-blue-100 px-2.5 py-1 font-bold text-blue-700 dark:bg-blue-950 dark:text-blue-400">
        UPCOMING
      </span>
    );
  }
  return (
    <span className="rounded-lg bg-muted px-2.5 py-1 font-bold text-muted-foreground">
      COMPLETED
    </span>
  );
}

function CompetitionAvatar({ comp }: { comp: Competition }) {
  return (
    <div
      className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl text-2xl"
      style={{ backgroundColor: `${comp.avatarColor}22` }}
    >
      {comp.logo}
    </div>
  );
}

export default function CompetitionsPage() {
  return (
    <>
      <PageHeader
        eyebrow="Competitions"
        title="Tournaments & leagues"
        description="Follow standings, fixtures, and knockout rounds."
      />
      <section className="page-body">
        <div className="section-inner">
          <p className="text-muted-foreground">{COMPETITIONS.length} tournaments</p>
          <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {COMPETITIONS.map((comp) => (
              <Link
                key={comp.id}
                href={`/competitions/${comp.id}?season=${comp.defaultApiSeason ?? 2024}`}
              >
                <div className="marketing-card flex h-full items-center gap-4 p-5">
                  <CompetitionAvatar comp={comp} />
                  <div className="min-w-0 flex-1">
                    <div className="truncate font-semibold">{comp.name}</div>
                    <div className="mt-0.5 text-muted-foreground">
                      {comp.region} ·{' '}
                      {competitionSeasonLabel(
                        comp,
                        LEAGUES[comp.id],
                        comp.defaultApiSeason ?? 2024,
                      )}
                    </div>
                  </div>
                  <StatusBadge status={comp.status} />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
