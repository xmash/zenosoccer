export interface Player {
  id: string;
  name: string;
  age: number;
  position: string;
  teamId: string;
  teamName: string;
  preferredFoot: 'Right' | 'Left' | 'Both';
  status: 'Available' | 'Injured' | 'Suspended' | 'International Duty';
  developmentScore: number;
  attendancePct: number;
  lastRating: number;
  imageUrl: string;
  potential: 'High' | 'Medium' | 'Low';
  notes?: string;
}

export interface Team {
  id: string;
  name: string;
  ageGroup: string;
  league: string;
  formation: string;
  coaches: string[];
  record: string;
  rosterSize: number;
}

export interface Match {
  id: string;
  date: string;
  opponent: string;
  venue: 'Home' | 'Away';
  result?: string;
  score?: string;
  competition: string;
  status: 'Upcoming' | 'Completed';
}

export const TEAMS: Team[] = [
  { id: 't1', name: 'First Team', ageGroup: 'Senior', league: 'National Premier', formation: '4-3-3', coaches: ['Robert Moreno'], record: '12-4-2', rosterSize: 22 },
  { id: 't2', name: 'U18 Showcase', ageGroup: 'U18', league: 'Showcase Division', formation: '4-2-3-1', coaches: ['Sarah Jenkins'], record: '10-2-1', rosterSize: 18 },
  { id: 't3', name: 'U16 MLS Next', ageGroup: 'U16', league: 'MLS Next', formation: '4-3-3', coaches: ['David Villa'], record: '15-1-0', rosterSize: 20 },
  { id: 't4', name: 'U14 Academy', ageGroup: 'U14', league: 'Regional Academy', formation: '3-5-2', coaches: ['Mick Lynch'], record: '8-5-3', rosterSize: 18 },
  { id: 't5', name: 'U12 Elite', ageGroup: 'U12', league: 'Junior Premier', formation: '4-4-2 Diamond', coaches: ['Ana Silva'], record: '14-0-2', rosterSize: 16 },
  { id: 't6', name: 'U10 Blue', ageGroup: 'U10', league: 'Local League', formation: '7v7', coaches: ['Tom Hart'], record: '9-3-2', rosterSize: 12 },
  { id: 't7', name: 'U8 Development', ageGroup: 'U8', league: 'Foundations', formation: '5v5', coaches: ['Kelly Row'], record: '5-5-5', rosterSize: 10 },
];

export const PLAYERS: Player[] = [
  { id: 'p1', name: 'Marcus Rashford', age: 16, position: 'LW', teamId: 't3', teamName: 'U16 MLS Next', preferredFoot: 'Right', status: 'Available', developmentScore: 92, attendancePct: 98, lastRating: 8.5, imageUrl: 'https://picsum.photos/seed/p1/200/200', potential: 'High' },
  { id: 'p2', name: 'Phil Foden', age: 15, position: 'CAM', teamId: 't3', teamName: 'U16 MLS Next', preferredFoot: 'Left', status: 'Available', developmentScore: 95, attendancePct: 100, lastRating: 9.2, imageUrl: 'https://picsum.photos/seed/p2/200/200', potential: 'High' },
  { id: 'p3', name: 'Daniel Kim', age: 14, position: 'ST', teamId: 't4', teamName: 'U14 Academy', preferredFoot: 'Right', status: 'Available', developmentScore: 88, attendancePct: 95, lastRating: 7.8, imageUrl: 'https://picsum.photos/seed/p3/200/200', potential: 'High' },
  { id: 'p4', name: 'Maya Rodriguez', age: 12, position: 'CM', teamId: 't5', teamName: 'U12 Elite', preferredFoot: 'Both', status: 'Available', developmentScore: 84, attendancePct: 92, lastRating: 8.1, imageUrl: 'https://picsum.photos/seed/p4/200/200', potential: 'High' },
  { id: 'p5', name: 'Kevin De Bruyne', age: 18, position: 'CM', teamId: 't2', teamName: 'U18 Showcase', preferredFoot: 'Right', status: 'Injured', developmentScore: 97, attendancePct: 85, lastRating: 9.5, imageUrl: 'https://picsum.photos/seed/p5/200/200', potential: 'High' },
  { id: 'p6', name: 'Virgil van Dijk', age: 18, position: 'CB', teamId: 't1', teamName: 'First Team', preferredFoot: 'Right', status: 'Available', developmentScore: 94, attendancePct: 97, lastRating: 8.8, imageUrl: 'https://picsum.photos/seed/p6/200/200', potential: 'High' },
  { id: 'p7', name: 'Alphonso Davies', age: 16, position: 'LB', teamId: 't3', teamName: 'U16 MLS Next', preferredFoot: 'Left', status: 'Available', developmentScore: 89, attendancePct: 94, lastRating: 7.5, imageUrl: 'https://picsum.photos/seed/p7/200/200', potential: 'High' },
  { id: 'p8', name: 'Bukayo Saka', age: 14, position: 'RW', teamId: 't4', teamName: 'U14 Academy', preferredFoot: 'Left', status: 'Available', developmentScore: 91, attendancePct: 99, lastRating: 8.3, imageUrl: 'https://picsum.photos/seed/p8/200/200', potential: 'High' },
];

export const MATCHES: Match[] = [
  { id: 'm1', date: '2024-05-20', opponent: 'Riverside FC', venue: 'Home', competition: 'MLS Next League', status: 'Upcoming' },
  { id: 'm2', date: '2024-05-24', opponent: 'City United', venue: 'Away', competition: 'MLS Next League', status: 'Upcoming' },
  { id: 'm3', date: '2024-05-15', opponent: 'Coastal Academy', venue: 'Home', result: 'Win', score: '3-1', competition: 'Showcase Cup', status: 'Completed' },
  { id: 'm4', date: '2024-05-10', opponent: 'Metro Stars', venue: 'Away', result: 'Draw', score: '1-1', competition: 'League Play', status: 'Completed' },
];

export const SESSIONS = [
  { id: 's1', title: 'U14 Academy — Pressing Triggers', date: '2024-05-18', time: '16:00', duration: '90 min', intensity: 'High', team: 'U14 Academy' },
  { id: 's2', title: 'U16 MLS Next — Build Out Under Pressure', date: '2024-05-18', time: '18:00', duration: '120 min', intensity: 'Medium', team: 'U16 MLS Next' },
  { id: 's3', title: 'Technical Foundations - Finishing', date: '2024-05-19', time: '15:30', duration: '75 min', intensity: 'Medium', team: 'U12 Elite' },
];

export const ANALYTICS_ATTENDANCE = [
  { name: 'U8', attendance: 85 },
  { name: 'U10', attendance: 88 },
  { name: 'U12', attendance: 92 },
  { name: 'U14', attendance: 95 },
  { name: 'U16', attendance: 97 },
  { name: 'U18', attendance: 94 },
];

export const ANALYTICS_PERFORMANCE = [
  { month: 'Jan', rating: 6.8 },
  { month: 'Feb', rating: 7.2 },
  { month: 'Mar', rating: 7.5 },
  { month: 'Apr', rating: 7.9 },
  { month: 'May', rating: 8.2 },
];
