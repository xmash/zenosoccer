import React from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, Users, UserPlus, Shield, Workflow, 
  Dumbbell, DraftingCompass, Target, Trophy, Video, 
  BarChart3, GitMerge, Search, Calendar, MessageSquare, 
  Settings, Bell, LogOut, Menu
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Input } from '@/components/ui/input';

const NAV_ITEMS = [
  { label: 'Dashboard', icon: LayoutDashboard, href: '/dashboard' },
  { label: 'Players', icon: Users, href: '/players' },
  { label: 'Registration', icon: UserPlus, href: '/registration' },
  { label: 'Teams', icon: Shield, href: '/teams' },
  { label: 'Selection', icon: Workflow, href: '/selection' },
  { label: 'Training', icon: Dumbbell, href: '/training' },
  { label: 'Tactics', icon: DraftingCompass, href: '/tactics' },
  { label: 'Set Pieces', icon: Target, href: '/set-pieces' },
  { label: 'Matches', icon: Trophy, href: '/matches' },
  { label: 'Video Room', icon: Video, href: '/video-room' },
  { label: 'Analytics', icon: BarChart3, href: '/analytics' },
  { label: 'Academy Pathway', icon: GitMerge, href: '/academy-pathway' },
  { label: 'Scouting', icon: Search, href: '/scouting' },
  { label: 'Calendar', icon: Calendar, href: '/calendar' },
  { label: 'Messages', icon: MessageSquare, href: '/messages' },
  { label: 'Settings', icon: Settings, href: '/settings' },
];

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen w-full overflow-hidden bg-background">
      {/* Sidebar */}
      <aside className="hidden md:flex w-64 flex-col bg-sidebar text-sidebar-foreground border-r border-sidebar-border">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-xl tracking-tight uppercase">Zenosoccer</span>
        </div>
        
        <ScrollArea className="flex-1 px-4">
          <nav className="space-y-1 py-4">
            {NAV_ITEMS.map((item) => (
              <Link 
                key={item.label} 
                href={item.href}
                className="flex items-center gap-3 px-3 py-2.5 rounded-md hover:bg-sidebar-accent hover:text-sidebar-accent-foreground transition-colors group"
              >
                <item.icon className="w-4 h-4 text-sidebar-foreground/60 group-hover:text-primary transition-colors" />
                <span className="text-sm font-medium">{item.label}</span>
              </Link>
            ))}
          </nav>
        </ScrollArea>

        <div className="p-4 mt-auto border-t border-sidebar-border">
          <div className="flex items-center gap-3 px-3 py-3">
            <Avatar className="w-8 h-8">
              <AvatarImage src="https://picsum.photos/seed/coach/100/100" />
              <AvatarFallback>TD</AvatarFallback>
            </Avatar>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-bold truncate">Julian Nagelsmann</p>
              <p className="text-[10px] text-sidebar-foreground/50 uppercase tracking-widest">Tech Director</p>
            </div>
            <Button variant="ghost" size="icon" className="text-sidebar-foreground/40 hover:text-sidebar-foreground">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="h-16 border-b bg-white/80 backdrop-blur-sm flex items-center justify-between px-6 shrink-0 sticky top-0 z-30">
          <div className="flex items-center md:hidden gap-3">
            <Button variant="ghost" size="icon">
              <Menu className="w-5 h-5" />
            </Button>
            <span className="font-headline font-bold uppercase tracking-tight">Zenosoccer</span>
          </div>

          <div className="hidden md:flex items-center bg-muted/50 rounded-full px-3 py-1.5 w-96 max-w-full">
            <Search className="w-4 h-4 text-muted-foreground mr-2" />
            <input 
              placeholder="Search players, sessions, tactics..." 
              className="bg-transparent border-none outline-none text-sm w-full placeholder:text-muted-foreground"
            />
            <span className="text-[10px] bg-white border rounded px-1.5 py-0.5 text-muted-foreground">⌘K</span>
          </div>

          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="w-5 h-5 text-muted-foreground" />
              <span className="absolute top-2 right-2 w-2 h-2 bg-destructive rounded-full border-2 border-white"></span>
            </Button>
            <div className="h-6 w-px bg-border mx-1"></div>
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block">
                <p className="text-xs font-bold leading-none">Everton Academy</p>
                <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-tighter">Season 23/24</p>
              </div>
              <Shield className="w-6 h-6 text-primary" />
            </div>
          </div>
        </header>

        {/* Page Area */}
        <ScrollArea className="flex-1">
          <div className="p-6 md:p-8 max-w-7xl mx-auto w-full">
            {children}
          </div>
        </ScrollArea>
      </main>
    </div>
  );
}
