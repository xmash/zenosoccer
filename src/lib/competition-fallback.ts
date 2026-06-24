import type { Fixture, Standing } from './api-football-shared';
import { GROUP_STANDINGS, SCORES, type ScoreMatch } from './tournament-data';

const STATUS_MAP: Record<ScoreMatch['status'], string> = {
  live: '1H',
  finished: 'FT',
  upcoming: 'NS',
};

function resolveRelativeDate(date: string): string {
  const now = new Date();
  if (date === 'today') return now.toISOString().slice(0, 10);
  if (date === 'yesterday') {
    now.setDate(now.getDate() - 1);
    return now.toISOString().slice(0, 10);
  }
  if (date === 'tomorrow') {
    now.setDate(now.getDate() + 1);
    return now.toISOString().slice(0, 10);
  }
  return date;
}

function parseSeedDate(date: string, time: string): string {
  const isoDate = resolveRelativeDate(date);
  const normalized = time.includes('M')
    ? new Date(`${isoDate} ${time}`).toISOString()
    : new Date(`${isoDate}T${time.length === 5 ? time : '12:00'}:00`).toISOString();
  return Number.isNaN(Date.parse(normalized))
    ? new Date(`${isoDate}T12:00:00`).toISOString()
    : normalized;
}

function scoreMatchToFixture(match: ScoreMatch, leagueName: string): Fixture {
  let id = 0;
  for (const ch of match.id) id = (id * 31 + ch.charCodeAt(0)) >>> 0;

  return {
    fixture: {
      id,
      date: parseSeedDate(match.date, match.time),
      status: {
        short: STATUS_MAP[match.status],
        elapsed: match.minute ?? null,
      },
    },
    league: { id: 0, name: leagueName, round: match.round },
    teams: {
      home: { id: id + 1, name: match.homeTeam, logo: '', winner: null },
      away: { id: id + 2, name: match.awayTeam, logo: '', winner: null },
    },
    goals: { home: match.homeScore, away: match.awayScore },
  };
}

export function seedFixturesForCompetition(competitionId: string, leagueName: string): Fixture[] {
  return SCORES.filter((m) => m.competitionId === competitionId).map((m) =>
    scoreMatchToFixture(m, leagueName),
  );
}

export function seedStandingsForCompetition(competitionId: string): Standing[][] {
  if (competitionId !== 'wc2026') return [];

  return Object.entries(GROUP_STANDINGS).map(([group, teams]) =>
    teams.map((t) => ({
      rank: t.position,
      team: { id: t.position, name: t.team, logo: '' },
      points: t.points,
      goalsDiff: t.gd,
      group,
      all: {
        played: t.played,
        win: t.won,
        draw: t.drawn,
        lose: t.lost,
        goals: { for: t.gf, against: t.ga },
      },
    })),
  );
}

export type CompetitionDataResult = {
  fixtures: Fixture[];
  standings: Standing[][];
  source: 'api' | 'seed';
  notice?: string;
  error?: string;
};

export function seedCompetitionData(
  competitionId: string,
  leagueName: string,
): CompetitionDataResult {
  return {
    fixtures: seedFixturesForCompetition(competitionId, leagueName),
    standings: seedStandingsForCompetition(competitionId),
    source: 'seed',
  };
}
