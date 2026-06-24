export interface Competition {
  id: string;
  name: string;
  logo: string;
  avatarColor: string;
  region: string;
  seasonLabel: string;
  defaultApiSeason?: number;
  status: 'active' | 'upcoming' | 'completed';
  /** Demo-only stage label; hidden when live API fixtures are shown. */
  currentRound?: string;
  /** Drives tab layout: knockout phases vs league table. */
  format: 'tournament' | 'league';
}

export interface TeamStanding {
  position: number;
  team: string;
  code: string;
  played: number;
  won: number;
  drawn: number;
  lost: number;
  gf: number;
  ga: number;
  gd: number;
  points: number;
}

export interface ScoreMatch {
  id: string;
  competitionId: string;
  competitionName: string;
  homeTeam: string;
  awayTeam: string;
  homeCode: string;
  awayCode: string;
  homeColor?: string;
  awayColor?: string;
  homeScore: number | null;
  awayScore: number | null;
  status: 'live' | 'finished' | 'upcoming';
  minute?: number;
  /** Relative label (today/yesterday/tomorrow) or ISO date */
  date: string;
  time: string;
  venue: string;
  round: string;
}

export interface BracketTeam {
  code: string;
  name: string;
  score?: number | null;
  winner?: boolean;
}

export interface BracketMatch {
  id: string;
  round: string;
  home: BracketTeam;
  away: BracketTeam;
  status: 'finished' | 'upcoming' | 'live';
  date: string;
}

/** API league mapping aligned with free-plan seasons (2022–2024). */
export const LEAGUE_IDS: Record<string, { id: number; season: number }> = {
  wc2026: { id: 1, season: 2022 },
  ucl: { id: 2, season: 2024 },
  pl: { id: 39, season: 2024 },
  laliga: { id: 140, season: 2024 },
  mls: { id: 253, season: 2024 },
  copa: { id: 9, season: 2024 },
};

export const COMPETITIONS: Competition[] = [
  {
    id: 'wc2026',
    name: 'FIFA World Cup',
    logo: '🏆',
    avatarColor: '#16A34A',
    region: 'International',
    seasonLabel: '2022',
    defaultApiSeason: 2022,
    status: 'completed',
    format: 'tournament',
  },
  {
    id: 'ucl',
    name: 'UEFA Champions League',
    logo: '⭐',
    avatarColor: '#3B82F6',
    region: 'Europe',
    seasonLabel: '2024/25',
    defaultApiSeason: 2024,
    status: 'active',
    currentRound: 'Knockout stage',
    format: 'league',
  },
  {
    id: 'pl',
    name: 'Premier League',
    logo: '🦁',
    avatarColor: '#8B5CF6',
    region: 'England',
    seasonLabel: '2024/25',
    defaultApiSeason: 2024,
    status: 'active',
    format: 'league',
  },
  {
    id: 'mls',
    name: 'MLS',
    logo: '🇺🇸',
    avatarColor: '#6B7280',
    region: 'USA & Canada',
    seasonLabel: '2024',
    defaultApiSeason: 2024,
    status: 'active',
    format: 'league',
  },
  {
    id: 'copa',
    name: 'Copa America',
    logo: '🌎',
    avatarColor: '#F97316',
    region: 'South America',
    seasonLabel: '2024',
    defaultApiSeason: 2024,
    status: 'completed',
    format: 'tournament',
  },
  {
    id: 'euro2028',
    name: 'Euro Championship',
    logo: '🇪🇺',
    avatarColor: '#3B82F6',
    region: 'Europe',
    seasonLabel: '2028',
    status: 'upcoming',
    currentRound: 'Qualifiers',
    format: 'tournament',
  },
];

export const SCORES: ScoreMatch[] = [
  {
    id: 'm1',
    competitionId: 'ucl',
    competitionName: 'UEFA Champions League',
    homeTeam: 'Real Madrid',
    awayTeam: 'Manchester City',
    homeCode: 'ES',
    awayCode: 'EN',
    homeColor: '#F59E0B',
    awayColor: '#1D4ED8',
    homeScore: 2,
    awayScore: 1,
    status: 'live',
    minute: 67,
    date: 'today',
    time: '20:00',
    venue: 'Santiago Bernabéu',
    round: 'Quarter Final',
  },
  {
    id: 'm2',
    competitionId: 'pl',
    competitionName: 'Premier League',
    homeTeam: 'Arsenal',
    awayTeam: 'Liverpool',
    homeCode: 'AR',
    awayCode: 'LI',
    homeColor: '#EF4444',
    awayColor: '#EF4444',
    homeScore: 1,
    awayScore: 1,
    status: 'live',
    minute: 81,
    date: 'today',
    time: '17:30',
    venue: 'Emirates Stadium',
    round: 'Matchday 34',
  },
  {
    id: 'm3',
    competitionId: 'pl',
    competitionName: 'Premier League',
    homeTeam: 'Chelsea',
    awayTeam: 'Tottenham',
    homeCode: 'CH',
    awayCode: 'TO',
    homeColor: '#1D4ED8',
    awayColor: '#FFFFFF',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'today',
    time: '15:00',
    venue: 'Stamford Bridge',
    round: 'Matchday 34',
  },
  {
    id: 'm4',
    competitionId: 'mls',
    competitionName: 'MLS',
    homeTeam: 'Inter Miami',
    awayTeam: 'LA Galaxy',
    homeCode: 'IM',
    awayCode: 'LA',
    homeColor: '#EC4899',
    awayColor: '#FBBF24',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'today',
    time: '17:30',
    venue: 'Chase Stadium',
    round: 'Week 12',
  },
  {
    id: 'm5',
    competitionId: 'pl',
    competitionName: 'Premier League',
    homeTeam: 'Man United',
    awayTeam: 'Everton',
    homeCode: 'MU',
    awayCode: 'EV',
    homeColor: '#EF4444',
    awayColor: '#1D4ED8',
    homeScore: 2,
    awayScore: 0,
    status: 'finished',
    date: 'yesterday',
    time: '15:00',
    venue: 'Old Trafford',
    round: 'Matchday 33',
  },
  {
    id: 'm6',
    competitionId: 'ucl',
    competitionName: 'UEFA Champions League',
    homeTeam: 'Bayern Munich',
    awayTeam: 'PSG',
    homeCode: 'BY',
    awayCode: 'PS',
    homeColor: '#EF4444',
    awayColor: '#1D4ED8',
    homeScore: 3,
    awayScore: 2,
    status: 'finished',
    date: 'yesterday',
    time: '20:00',
    venue: 'Allianz Arena',
    round: 'Quarter Final',
  },
  {
    id: 'm7',
    competitionId: 'pl',
    competitionName: 'Premier League',
    homeTeam: 'Newcastle',
    awayTeam: 'Aston Villa',
    homeCode: 'NE',
    awayCode: 'AV',
    homeColor: '#1F2937',
    awayColor: '#7C3AED',
    homeScore: null,
    awayScore: null,
    status: 'upcoming',
    date: 'tomorrow',
    time: '15:00',
    venue: "St. James' Park",
    round: 'Matchday 34',
  },
];

export const BRACKET_MATCHES: BracketMatch[] = [
  {
    id: 'b1',
    round: 'Round of 16',
    status: 'finished',
    date: 'Jun 29',
    home: { code: 'BR', name: 'Brazil', score: 3, winner: true },
    away: { code: 'MX', name: 'Mexico', score: 1 },
  },
  {
    id: 'b2',
    round: 'Round of 16',
    status: 'finished',
    date: 'Jun 29',
    home: { code: 'FR', name: 'France', score: 2, winner: true },
    away: { code: 'SN', name: 'Senegal', score: 0 },
  },
  {
    id: 'b3',
    round: 'Round of 16',
    status: 'finished',
    date: 'Jun 30',
    home: { code: 'AR', name: 'Argentina', score: 2, winner: true },
    away: { code: 'JP', name: 'Japan', score: 1 },
  },
  {
    id: 'b4',
    round: 'Round of 16',
    status: 'finished',
    date: 'Jun 30',
    home: { code: 'ES', name: 'Spain', score: 4, winner: true },
    away: { code: 'HR', name: 'Croatia', score: 2 },
  },
  {
    id: 'b5',
    round: 'Round of 16',
    status: 'finished',
    date: 'Jul 1',
    home: { code: 'EN', name: 'England', score: 1, winner: true },
    away: { code: 'NL', name: 'Netherlands', score: 0 },
  },
  {
    id: 'b6',
    round: 'Round of 16',
    status: 'live',
    date: 'Jul 1',
    home: { code: 'PT', name: 'Portugal', score: 2, winner: true },
    away: { code: 'US', name: 'USA', score: 1 },
  },
  {
    id: 'b7',
    round: 'Round of 16',
    status: 'finished',
    date: 'Jul 2',
    home: { code: 'DE', name: 'Germany', score: 3, winner: true },
    away: { code: 'BE', name: 'Belgium', score: 2 },
  },
  {
    id: 'b8',
    round: 'Round of 16',
    status: 'finished',
    date: 'Jul 2',
    home: { code: 'IT', name: 'Italy', score: 1 },
    away: { code: 'MA', name: 'Morocco', score: 2, winner: true },
  },
  {
    id: 'q1',
    round: 'Quarterfinals',
    status: 'upcoming',
    date: 'Jul 5',
    home: { code: 'BR', name: 'Brazil' },
    away: { code: 'FR', name: 'France' },
  },
  {
    id: 'q2',
    round: 'Quarterfinals',
    status: 'upcoming',
    date: 'Jul 5',
    home: { code: 'AR', name: 'Argentina' },
    away: { code: 'ES', name: 'Spain' },
  },
  {
    id: 'q3',
    round: 'Quarterfinals',
    status: 'live',
    date: 'Jul 6',
    home: { code: 'EN', name: 'England', score: 1 },
    away: { code: 'PT', name: 'Portugal', score: 0 },
  },
  {
    id: 'q4',
    round: 'Quarterfinals',
    status: 'upcoming',
    date: 'Jul 6',
    home: { code: 'DE', name: 'Germany' },
    away: { code: 'MA', name: 'Morocco' },
  },
  {
    id: 's1',
    round: 'Semifinals',
    status: 'upcoming',
    date: 'Jul 10',
    home: { code: 'TBD', name: 'TBD' },
    away: { code: 'TBD', name: 'TBD' },
  },
  {
    id: 's2',
    round: 'Semifinals',
    status: 'upcoming',
    date: 'Jul 11',
    home: { code: 'TBD', name: 'TBD' },
    away: { code: 'TBD', name: 'TBD' },
  },
  {
    id: 'f1',
    round: 'Final',
    status: 'upcoming',
    date: 'Jul 19',
    home: { code: 'TBD', name: 'TBD' },
    away: { code: 'TBD', name: 'TBD' },
  },
];

export const GROUP_STANDINGS: Record<string, TeamStanding[]> = {
  'Group A': [
    { position: 1, team: 'Japan', code: 'JP', played: 2, won: 2, drawn: 0, lost: 0, gf: 4, ga: 1, gd: 3, points: 6 },
    { position: 2, team: 'South Korea', code: 'KR', played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 2, gd: 0, points: 3 },
    { position: 3, team: 'Canada', code: 'CA', played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 2, gd: -1, points: 1 },
    { position: 4, team: 'Cameroon', code: 'CM', played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 3, gd: -2, points: 1 },
  ],
  'Group C': [
    { position: 1, team: 'USA', code: 'US', played: 2, won: 1, drawn: 1, lost: 0, gf: 3, ga: 1, gd: 2, points: 4 },
    { position: 2, team: 'Mexico', code: 'MX', played: 2, won: 1, drawn: 0, lost: 1, gf: 2, ga: 3, gd: -1, points: 3 },
    { position: 3, team: 'Uruguay', code: 'UY', played: 2, won: 0, drawn: 1, lost: 1, gf: 1, ga: 2, gd: -1, points: 1 },
    { position: 4, team: 'Bolivia', code: 'BO', played: 2, won: 0, drawn: 1, lost: 1, gf: 0, ga: 1, gd: -1, points: 1 },
  ],
};

export const BRACKET_ROUND_ORDER = ['Round of 16', 'Quarterfinals', 'Semifinals', 'Final'] as const;

export function filterScoresByDate(filter: 'today' | 'yesterday' | 'tomorrow' | 'all'): ScoreMatch[] {
  if (filter === 'all') return SCORES;
  return SCORES.filter((s) => s.date === filter);
}
