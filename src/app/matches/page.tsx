"use client";

import React from 'react';
import { AppPageHeader } from '@/components/sections/app-page-header';
import { AppShell } from '@/components/layout/app-shell';
import { MATCHES } from '@/lib/mock-data';
import { 
  Trophy, MapPin, Clock, Calendar, 
  ChevronRight, Info, Filter, ArrowRightLeft,
  ChevronLeft, LayoutGrid, List
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function MatchesPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <AppPageHeader
          title="Match Center"
          description="Manage upcoming fixtures, review results, and plan lineups."
          actions={
            <>
              <Button variant="outline" size="sm" className="gap-2"><Calendar className="w-4 h-4" /> Season Sync</Button>
              <Button size="sm" className="gap-2"><Trophy className="w-4 h-4" /> New Fixture</Button>
            </>
          }
        />

        <Tabs defaultValue="upcoming" className="w-full">
          <TabsList className="bg-white border w-full justify-start h-12 p-1 gap-1 mb-6">
            <TabsTrigger value="upcoming" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Upcoming Fixtures</TabsTrigger>
            <TabsTrigger value="results" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Past Results</TabsTrigger>
            <TabsTrigger value="tournaments" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Tournaments</TabsTrigger>
          </TabsList>

          <TabsContent value="upcoming" className="space-y-6">
            <div className="flex items-center justify-between">
               <div className="flex gap-2">
                 <Button variant="outline" size="sm" className="bg-white"><ChevronLeft className="w-4 h-4" /></Button>
                 <Button variant="outline" size="sm" className="bg-white px-4 font-bold">This Week</Button>
                 <Button variant="outline" size="sm" className="bg-white"><ChevronRight className="w-4 h-4" /></Button>
               </div>
               <div className="flex gap-2">
                  <Button variant="outline" size="sm" className="bg-white gap-2"><Filter className="w-4 h-4" /> Team</Button>
                  <Button variant="outline" size="sm" className="bg-white gap-2"><LayoutGrid className="w-4 h-4" /> Grid View</Button>
               </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
               {MATCHES.filter(m => m.status === 'Upcoming').map((match) => (
                 <Card key={match.id} className="border-none shadow-sm overflow-hidden group hover:border-primary/40 border border-transparent transition-all">
                    <CardContent className="p-0">
                       <div className="flex flex-col md:flex-row">
                          <div className="w-full md:w-40 bg-muted/20 p-6 flex flex-col items-center justify-center border-r shrink-0">
                             <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">{new Date(match.date).toLocaleString('default', { month: 'short' })}</p>
                             <p className="text-3xl font-bold my-1">{new Date(match.date).getDate()}</p>
                             <Badge variant={match.venue === 'Home' ? 'default' : 'outline'} className="mt-2">{match.venue}</Badge>
                          </div>
                          <div className="flex-1 p-6">
                             <div className="flex justify-between items-start mb-4">
                                <div>
                                   <p className="text-xs font-bold text-primary uppercase tracking-tighter mb-1">{match.competition}</p>
                                   <h3 className="text-xl font-bold tracking-tight">vs {match.opponent}</h3>
                                </div>
                                <Button size="icon" variant="ghost" className="group-hover:text-primary"><ArrowRightLeft className="w-4 h-4" /></Button>
                             </div>
                             <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                                <div className="flex items-center gap-2">
                                   <Clock className="w-4 h-4" /> <span>14:30 Kickoff</span>
                                </div>
                                <div className="flex items-center gap-2">
                                   <MapPin className="w-4 h-4" /> <span>National Performance Center</span>
                                </div>
                             </div>
                          </div>
                          <div className="p-6 bg-muted/5 flex flex-row md:flex-col justify-center gap-2 border-l shrink-0">
                             <Button size="sm" className="w-full">Match Plan</Button>
                             <Button size="sm" variant="ghost" className="w-full">Lineup</Button>
                          </div>
                       </div>
                    </CardContent>
                 </Card>
               ))}
            </div>
          </TabsContent>

          <TabsContent value="results" className="space-y-6">
             <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {MATCHES.filter(m => m.status === 'Completed').map((match) => (
                 <Card key={match.id} className="border-none shadow-sm flex items-center p-6 group cursor-pointer hover:bg-muted/10 transition-colors">
                    <div className="flex-1">
                       <p className="text-[10px] font-bold text-muted-foreground uppercase mb-1">{match.date}</p>
                       <h3 className="text-lg font-bold">vs {match.opponent}</h3>
                       <p className="text-xs text-muted-foreground">{match.competition}</p>
                    </div>
                    <div className="flex flex-col items-center px-8">
                       <p className="text-2xl font-headline font-bold">{match.score}</p>
                       <Badge className={match.result === 'Win' ? 'bg-primary/10 text-primary border-none' : 'bg-orange-100 text-orange-700 border-none'}>
                          {match.result}
                       </Badge>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground group-hover:text-primary group-hover:translate-x-1 transition-all" />
                 </Card>
               ))}
             </div>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
