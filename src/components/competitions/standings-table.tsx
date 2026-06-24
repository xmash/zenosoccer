import type { Standing } from '@/lib/api-football-shared';
import type { TeamStanding } from '@/lib/tournament-data';

function CodeBadge({ code }: { code: string }) {
  const label = code.length > 2 ? code.slice(0, 2) : code;
  return (
    <span className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-gray-800 text-xs font-bold text-white">
      {label}
    </span>
  );
}

export function ApiStandingsTable({ groups }: { groups: Standing[][] }) {
  const tables = groups.filter((g): g is Standing[] => Array.isArray(g));

  return (
    <>
      {tables.map((group, gi) => (
        <div key={gi} className="mb-4 overflow-hidden rounded-xl border border-border">
          {group[0] && (
            <div className="bg-muted px-4 py-2 font-semibold">
              {(group[0] as Standing & { group?: string }).group ?? `Group ${gi + 1}`}
            </div>
          )}
          <table className="w-full">
            <thead>
              <tr className="border-b border-border text-muted-foreground">
                <th className="px-4 py-2 text-left font-medium">Team</th>
                <th className="px-2 py-2 font-medium">P</th>
                <th className="px-2 py-2 font-medium">W</th>
                <th className="px-2 py-2 font-medium">D</th>
                <th className="px-2 py-2 font-medium">L</th>
                <th className="px-2 py-2 font-medium">GD</th>
                <th className="px-2 py-2 font-medium text-primary">Pts</th>
              </tr>
            </thead>
            <tbody>
              {group.map((t) => (
                <tr key={t.team.id} className="border-b border-border last:border-0">
                  <td className="flex items-center gap-2 px-4 py-2">
                    <span className="w-4 text-muted-foreground">{t.rank}</span>
                    {t.team.logo && (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={t.team.logo} alt="" className="h-4 w-4 object-contain" />
                    )}
                    <span>{t.team.name}</span>
                  </td>
                  <td className="px-2 py-2 text-center">{t.all.played}</td>
                  <td className="px-2 py-2 text-center">{t.all.win}</td>
                  <td className="px-2 py-2 text-center">{t.all.draw}</td>
                  <td className="px-2 py-2 text-center">{t.all.lose}</td>
                  <td className="px-2 py-2 text-center">
                    {t.goalsDiff > 0 ? `+${t.goalsDiff}` : t.goalsDiff}
                  </td>
                  <td className="px-2 py-2 text-center font-bold text-primary">{t.points}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </>
  );
}

export function MockStandingsTable({ teams, groupLabel }: { teams: TeamStanding[]; groupLabel: string }) {
  return (
    <div className="overflow-hidden rounded-[14px] border border-border bg-card">
      <div className="border-b border-border px-3.5 py-2 font-bold">{groupLabel}</div>
      <div className="px-3.5 py-2">
        <div className="flex font-bold text-muted-foreground">
          <span className="flex-1">Team</span>
          {['P', 'W', 'D', 'L', 'GD', 'Pts'].map((h) => (
            <span key={h} className="w-7 text-center">
              {h}
            </span>
          ))}
        </div>
      </div>
      {teams.map((t, i) => (
        <div
          key={t.team}
          className={`flex items-center px-3.5 py-2 ${i < teams.length - 1 ? 'border-b border-border' : ''}`}
        >
          <span className="mr-1 w-5 text-muted-foreground">{t.position}</span>
          <CodeBadge code={t.code} />
          <span className="ml-1.5 flex-1">{t.team}</span>
          {[t.played, t.won, t.drawn, t.lost, t.gd, t.points].map((v, idx) => (
            <span
              key={idx}
              className={`w-7 text-center ${idx === 5 ? 'font-bold' : ''}`}
            >
              {idx === 4 && v > 0 ? `+${v}` : v}
            </span>
          ))}
        </div>
      ))}
    </div>
  );
}
