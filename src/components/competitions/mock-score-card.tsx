import type { ScoreMatch } from '@/lib/tournament-data';

function CodeBadge({ code }: { code: string }) {
  const label = code.length > 2 ? code.slice(0, 2) : code;
  const isTbd = code === 'TBD';
  return (
    <span
      className={`inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
        isTbd ? 'bg-muted text-muted-foreground' : 'bg-gray-800 text-white'
      }`}
    >
      {label}
    </span>
  );
}

export function MockScoreCard({ match }: { match: ScoreMatch }) {
  const isLive = match.status === 'live';
  const isFinished = match.status === 'finished';

  return (
    <div className="rounded-[14px] border border-border bg-card p-3.5">
      <div className="mb-2.5 flex items-center justify-end text-muted-foreground">
        <span className={isLive ? 'font-semibold text-red-500' : ''}>
          {isLive ? `${match.minute}'` : isFinished ? 'FT' : match.time}
        </span>
      </div>
      <div className="flex items-center gap-2">
        <div className="flex flex-1 items-center gap-2">
          <CodeBadge code={match.homeCode} />
          <span className="font-semibold">{match.homeTeam}</span>
        </div>
        {match.homeScore !== null ? (
          <span className="px-2 text-base font-bold">
            {match.homeScore} – {match.awayScore}
          </span>
        ) : (
          <span className="px-2 capitalize text-muted-foreground">{match.date}</span>
        )}
        <div className="flex flex-1 items-center justify-end gap-2">
          <span className="font-semibold">{match.awayTeam}</span>
          <CodeBadge code={match.awayCode} />
        </div>
      </div>
      <p className="mt-1.5 text-muted-foreground">{match.venue}</p>
    </div>
  );
}
