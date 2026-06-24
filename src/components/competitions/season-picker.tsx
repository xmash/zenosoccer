import Link from 'next/link';
import type { LeagueConfig } from '@/lib/api-football-shared';
import { formatSeasonLabel } from '@/lib/api-football-shared';

type Props = {
  competitionId: string;
  league: LeagueConfig;
  currentSeason: number;
  /** e.g. "scores" — keeps ?season= on sub-routes */
  subPath?: string;
};

export function SeasonPicker({ competitionId, league, currentSeason, subPath }: Props) {
  const base = subPath
    ? `/competitions/${competitionId}/${subPath}`
    : `/competitions/${competitionId}`;

  return (
    <div className="mb-8">
      <p className="font-medium text-muted-foreground uppercase tracking-wider mb-2">Season</p>
      <div className="flex flex-wrap gap-2">
        {league.availableSeasons.map((year) => {
          const active = year === currentSeason;
          return (
            <Link
              key={year}
              href={`${base}?season=${year}`}
              className={`px-4 py-2 font-medium rounded-full border transition-colors ${
                active
                  ? 'border-primary bg-primary text-primary-foreground'
                  : 'border-border hover:bg-accent'
              }`}
            >
              {formatSeasonLabel(league, year)}
            </Link>
          );
        })}
      </div>
    </div>
  );
}
