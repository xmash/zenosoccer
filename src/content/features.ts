import type { LucideIcon } from 'lucide-react';
import {
  LayoutDashboard,
  Users,
  UserPlus,
  Shield,
  Workflow,
  Dumbbell,
  Target,
  DraftingCompass,
  Trophy,
  ClipboardList,
  Video,
  BarChart3,
  GitMerge,
  Search,
  Calendar,
  MessageSquare,
} from 'lucide-react';

export type Feature = {
  id: string;
  title: string;
  shortDescription: string;
  description: string;
  href: string;
  icon: LucideIcon;
  /** Shown in the homepage 6-pack when true */
  highlight: boolean;
  bullets: string[];
};

export const features: Feature[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    shortDescription:
      'Your club command center — KPIs, alerts, and what needs attention today.',
    description:
      'A centralized dashboard for club health: key metrics, upcoming events, player alerts, and chart-driven insights in one calm view.',
    href: '/dashboard',
    icon: LayoutDashboard,
    highlight: true,
    bullets: [
      'Live club KPIs and performance snapshots',
      'Upcoming fixtures, sessions, and deadlines',
      'Player alerts and development flags',
      'Chart-driven insights from your data',
    ],
  },
  {
    id: 'players',
    title: 'Players',
    shortDescription:
      'Search, filter, and explore full profiles with stats and development history.',
    description:
      'Comprehensive player management — search and filter your roster, view detailed profiles, statistics, development scores, and historical data.',
    href: '/players',
    icon: Users,
    highlight: true,
    bullets: [
      'Advanced search and smart filters',
      'Development scores and trend history',
      'Season stats and profile depth',
      'Centralized player database',
    ],
  },
  {
    id: 'registration',
    title: 'Registration',
    shortDescription:
      'Onboard new players with structured intake, documents, and status tracking.',
    description:
      'Manage academy registration workflows — capture player intake, track approval status, and keep enrollment organized across age groups.',
    href: '/registration',
    icon: UserPlus,
    highlight: false,
    bullets: [
      'Registration forms and intake pipeline',
      'Document and eligibility tracking',
      'Approval status by age group',
      'Seamless handoff into player profiles',
    ],
  },
  {
    id: 'teams',
    title: 'Batches / Teams',
    shortDescription:
      'Organize squads and batches with rosters, formations, and availability.',
    description:
      'Build and manage batches and teams with drag-and-drop roster assembly, formation previews, and player availability checks.',
    href: '/teams',
    icon: Shield,
    highlight: true,
    bullets: [
      'Batch and team organization',
      'Drag-and-drop roster assembly',
      'Formation previews on the pitch',
      'Availability and eligibility checks',
    ],
  },
  {
    id: 'selection',
    title: 'Squad Selection',
    shortDescription:
      'AI-assisted promotion, progression, and match-day squad recommendations.',
    description:
      'Generate recommendations for squad selection, player movements between teams, academy progression, and roster fit based on performance data.',
    href: '/selection',
    icon: Workflow,
    highlight: true,
    bullets: [
      'Match-day squad suggestions',
      'Promotion and demotion signals',
      'Academy pathway progression',
      'Development-aware recommendations',
    ],
  },
  {
    id: 'training',
    title: 'Training',
    shortDescription:
      'Plan sessions, assign drills, set objectives, and track attendance.',
    description:
      'Create and schedule training sessions, select drills from a library, assign objectives, and track attendance across age groups.',
    href: '/training',
    icon: Dumbbell,
    highlight: false,
    bullets: [
      'Session builder with drill library',
      'Objectives and focus areas per block',
      'Age-group scheduling',
      'Attendance tracking built in',
    ],
  },
  {
    id: 'nets',
    title: 'Nets',
    shortDescription:
      'Design and store set-piece routines, dead-ball plays, and finishing drills.',
    description:
      'Visual tools for nets and set-piece work — design routines, store dead-ball plays, and review finishing scenarios with your coaching staff.',
    href: '/set-pieces',
    icon: Target,
    highlight: false,
    bullets: [
      'Set-piece and dead-ball routine library',
      'Visual play design on the pitch',
      'Scenario tagging for match prep',
      'Share routines across staff',
    ],
  },
  {
    id: 'strategy',
    title: 'Strategy',
    shortDescription:
      'Tactical boards for formations, match models, and team principles.',
    description:
      'Interactive tactical boards to design formations, define match models, and align team principles across your academy.',
    href: '/tactics',
    icon: DraftingCompass,
    highlight: true,
    bullets: [
      'Interactive formation boards',
      'Match model templates and playbooks',
      'Team principles and phase play',
      'Review and share with staff',
    ],
  },
  {
    id: 'match-center',
    title: 'Match Center',
    shortDescription:
      'Fixtures, results, lineups, and everything around game day.',
    description:
      'Manage the full match lifecycle — upcoming fixtures, past results, tournaments, and lineup planning in one place.',
    href: '/matches',
    icon: Trophy,
    highlight: true,
    bullets: [
      'Upcoming fixtures and scheduling',
      'Results and tournament tracking',
      'Lineup and squad planning',
      'Season sync across teams',
    ],
  },
  {
    id: 'scorecards',
    title: 'Scorecards',
    shortDescription:
      'Player and match scorecards with ratings, notes, and performance marks.',
    description:
      'Capture structured scorecards for matches and individual players — ratings, coach notes, and performance marks tied to each fixture.',
    href: '/scorecards',
    icon: ClipboardList,
    highlight: false,
    bullets: [
      'Match and player rating templates',
      'Coach notes per performance',
      'Historical scorecard archive',
      'Export and share with staff',
    ],
  },
  {
    id: 'video-room',
    title: 'Video Room',
    shortDescription:
      'Review footage with AI event tagging, annotations, and clip sharing.',
    description:
      'Upload and review match video with AI-powered event tagging, manual coach annotations, and player-specific clip sharing.',
    href: '/video-room',
    icon: Video,
    highlight: false,
    bullets: [
      'Automatic goal, shot, and transition tags',
      'Coach annotations and notes',
      'Player-specific clip sharing',
      'Match footage review workflow',
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    shortDescription:
      'Deep performance insights and data visualization across the club.',
    description:
      'Analytics hub with charts, trends, and exportable reports — possession, progression, and team performance at every level.',
    href: '/analytics',
    icon: BarChart3,
    highlight: false,
    bullets: [
      'Team and player performance charts',
      'Cross-squad comparison views',
      'Date-range filtering and exports',
      'Trend tracking over the season',
    ],
  },
  {
    id: 'academy-pathway',
    title: 'Academy Pathway',
    shortDescription:
      'Map player progression from youth batches through to first team.',
    description:
      'Visualize and manage academy pathways — track player progression, stage gates, and movement between development levels.',
    href: '/academy-pathway',
    icon: GitMerge,
    highlight: false,
    bullets: [
      'Pathway stages and progression gates',
      'Player movement history',
      'Batch-to-senior pipeline view',
      'Development milestone tracking',
    ],
  },
  {
    id: 'scouting',
    title: 'Scouting',
    shortDescription:
      'Scouting network, prospect tracking, and recruitment intelligence.',
    description:
      'Run your scouting network — track prospects, log observations, and build recruitment intelligence across regions and age groups.',
    href: '/scouting',
    icon: Search,
    highlight: false,
    bullets: [
      'Prospect database and watchlists',
      'Scout reports and observations',
      'Recruitment pipeline stages',
      'Filter and compare targets',
    ],
  },
  {
    id: 'calendar',
    title: 'Calendar',
    shortDescription:
      'Unified schedule for training, matches, meetings, and club events.',
    description:
      'A shared club calendar for training sessions, fixtures, staff meetings, and academy events — visible across every team.',
    href: '/calendar',
    icon: Calendar,
    highlight: false,
    bullets: [
      'Training and match scheduling',
      'Staff meetings and club events',
      'Team and age-group views',
      'Sync-friendly season planning',
    ],
  },
  {
    id: 'messages',
    title: 'Messages',
    shortDescription:
      'Staff communication hub for updates, threads, and quick coordination.',
    description:
      'Internal messaging for coaches and staff — coordinate updates, share notes, and keep communication in one place.',
    href: '/messages',
    icon: MessageSquare,
    highlight: false,
    bullets: [
      'Staff threads and direct messages',
      'Team and batch group channels',
      'Quick updates on fixtures and sessions',
      'Centralized club communication',
    ],
  },
];

export const highlightedFeatures = features.filter((f) => f.highlight);
