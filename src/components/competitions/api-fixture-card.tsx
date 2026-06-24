import {
  FINISHED_STATUSES,
  LIVE_STATUSES,
  type Fixture,
} from '@/lib/api-football-shared';

type ApiFixtureCardProps = {
  fixture: Fixture;
  /** Hide league / round line — use on tournament pages where context is obvious. */
  compact?: boolean;
};

export function ApiFixtureCard({ fixture: f, compact = false }: ApiFixtureCardProps) {
  const isLive = LIVE_STATUSES.has(f.fixture.status.short);
  const isFinished = FINISHED_STATUSES.has(f.fixture.status.short);
  const d = new Date(f.fixture.date);
  const dateStr = d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  const timeStr = d.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' });

  const statusLabel = isLive
    ? `${f.fixture.status.elapsed}'`
    : isFinished
      ? 'FT'
      : `${dateStr} · ${timeStr}`;

  return (
    <div className="rounded-[14px] border border-border bg-card p-4">
      <div
        className={`mb-3 flex items-center text-muted-foreground ${
          compact ? 'justify-end' : 'justify-between'
        }`}
      >
        {!compact ? (
          <span>
            {f.league.name} · {f.league.round}
          </span>
        ) : null}
        <span className={isLive ? 'font-semibold text-red-500' : ''}>{statusLabel}</span>
      </div>
      <div className="grid grid-cols-3 items-center gap-2">
        <div className="flex min-w-0 items-center gap-2">
          {f.teams.home.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={f.teams.home.logo} alt="" className="h-5 w-5 shrink-0 object-contain" />
          ) : null}
          <span className="truncate font-medium">{f.teams.home.name}</span>
        </div>
        <div className="text-center">
          {f.goals.home !== null ? (
            <span className="text-lg font-bold">
              {f.goals.home} – {f.goals.away}
            </span>
          ) : (
            <span className="text-muted-foreground">vs</span>
          )}
        </div>
        <div className="flex min-w-0 items-center justify-end gap-2">
          <span className="truncate font-medium">{f.teams.away.name}</span>
          {f.teams.away.logo ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={f.teams.away.logo} alt="" className="h-5 w-5 shrink-0 object-contain" />
          ) : null}
        </div>
      </div>
    </div>
  );
}
