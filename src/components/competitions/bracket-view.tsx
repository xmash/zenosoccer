import { BRACKET_MATCHES, BRACKET_ROUND_ORDER, type BracketMatch } from '@/lib/tournament-data';

function BracketTeamRow({ team }: { team: BracketMatch['home'] }) {
  const isTbd = team.code === 'TBD';
  const label = team.code.length > 2 ? team.code.slice(0, 2) : team.code;

  return (
    <div className="flex items-center gap-2 px-3 py-2.5">
      <span
        className={`inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full text-[9px] font-bold ${
          isTbd ? 'bg-muted text-muted-foreground' : 'bg-gray-800 text-white'
        }`}
      >
        {label}
      </span>
      <span
        className={`min-w-0 flex-1 truncate text-[13px] ${
          team.winner ? 'font-bold' : 'font-normal'
        } ${isTbd ? 'text-muted-foreground' : ''}`}
      >
        {team.name}
      </span>
      {team.score != null && (
        <span
          className={`text-[15px] font-bold ${team.winner ? 'text-primary' : ''}`}
        >
          {team.score}
        </span>
      )}
    </div>
  );
}

function BracketCard({ match }: { match: BracketMatch }) {
  const isLive = match.status === 'live';

  return (
    <div
      className={`w-[200px] overflow-hidden rounded-xl border bg-card ${
        isLive ? 'border-primary border-[1.5px]' : 'border-border'
      }`}
    >
      <BracketTeamRow team={match.home} />
      <div className="border-t border-border" />
      <BracketTeamRow team={match.away} />
      {isLive && (
        <div className="flex items-center justify-center gap-1.5 bg-primary py-1 text-[10px] font-bold text-primary-foreground">
          <span className="h-1.5 w-1.5 rounded-full bg-white" />
          LIVE
        </div>
      )}
    </div>
  );
}

export function BracketView({
  title,
  subtitle,
  matches = BRACKET_MATCHES,
}: {
  title?: string;
  subtitle?: string;
  matches?: BracketMatch[];
}) {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8">
      {(title || subtitle) && (
        <div className="mb-6">
          {title && <h1 className="text-2xl font-bold font-heading">{title}</h1>}
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
      )}

      <p className="mb-4 text-xs text-muted-foreground">
        Swipe across to follow the road to the final →
      </p>

      <div className="overflow-x-auto pb-4">
        <div className="flex min-w-max gap-4">
          {BRACKET_ROUND_ORDER.map((round) => {
            const roundMatches = matches.filter((m) => m.round === round);
            if (roundMatches.length === 0) return null;
            return (
              <div key={round} className="shrink-0">
                <div className="mb-2.5 inline-block rounded-lg bg-green-100 px-3 py-1.5 text-[13px] font-bold text-green-700 dark:bg-green-950 dark:text-green-400">
                  {round}
                </div>
                <div className="space-y-3">
                  {roundMatches.map((m) => (
                    <BracketCard key={m.id} match={m} />
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
