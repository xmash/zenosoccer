import type { Competition } from '@/lib/tournament-data';
import { type LeagueConfig, formatSeasonLabel } from '@/lib/api-football-shared';

/** One season string for subtitles — never duplicate marketing + API year. */
export function competitionSeasonLabel(
  comp: Competition,
  league: LeagueConfig | undefined,
  season: number,
): string {
  if (league) return formatSeasonLabel(league, season);
  return comp.seasonLabel;
}
