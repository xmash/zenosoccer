"use client";

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { TEAMS } from '@/lib/mock-data';
import { 
  Shield, Users, UserPlus, Trophy, 
  ChevronRight, Calendar, Settings, Layout
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

export default function TeamsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Club Teams</h1>
            <p className="text-muted-foreground">Overview of all age groups, rosters, and coach assignments.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Layout className="w-4 h-4" /> Formation Presets</Button>
            <Button className="gap-2"><Shield className="w-4 h-4" /> Create New Team</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {TEAMS.map((team) => (
            <Card key={team.id} className="border-none shadow-sm hover:shadow-md transition-all group overflow-hidden">
               <div className="h-2 bg-primary w-full" />
               <CardHeader className="pb-2">
                  <div className="flex justify-between items-start">
                     <Badge variant="secondary" className="text-[10px] uppercase font-bold tracking-widest">{team.ageGroup}</Badge>
                     <p className="text-xs font-bold text-primary">{team.record}</p>
                  </div>
                  <CardTitle className="text-xl mt-2 group-hover:text-primary transition-colors">{team.name}</CardTitle>
                  <CardDescription>{team.league}</CardDescription>
               </CardHeader>
               <CardContent className="space-y-4">
                  <div className="grid grid-cols-2 gap-2">
                     <div className="p-2 bg-muted/30 rounded-lg">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Roster</p>
                        <p className="text-sm font-bold flex items-center gap-1"><Users className="w-3 h-3" /> {team.rosterSize}</p>
                     </div>
                     <div className="p-2 bg-muted/30 rounded-lg">
                        <p className="text-[10px] uppercase font-bold text-muted-foreground">Formation</p>
                        <p className="text-sm font-bold">{team.formation}</p>
                     </div>
                  </div>
                  <div>
                     <p className="text-[10px] uppercase font-bold text-muted-foreground mb-2">Lead Coaches</p>
                     <div className="flex -space-x-2">
                        {team.coaches.map((coach, i) => (
                          <div key={i} className="w-8 h-8 rounded-full border-2 border-white bg-primary/20 flex items-center justify-center text-[10px] font-bold shadow-sm" title={coach}>
                             {coach.split(' ').map(n => n[0]).join('')}
                          </div>
                        ))}
                     </div>
                  </div>
               </CardContent>
               <CardFooter className="border-t bg-muted/5 p-3 flex gap-2">
                  <Button variant="ghost" size="sm" className="flex-1 text-xs">Manage Roster</Button>
                  <Button variant="ghost" size="sm" className="flex-1 text-xs">Schedule</Button>
               </CardFooter>
            </Card>
          ))}
          <Button variant="ghost" className="border-2 border-dashed h-[320px] rounded-xl flex flex-col items-center justify-center gap-4 text-muted-foreground hover:text-primary hover:border-primary transition-all">
             <div className="w-12 h-12 rounded-full bg-muted/50 flex items-center justify-center">
                <Shield className="w-6 h-6" />
             </div>
             <div className="text-center">
                <p className="font-bold">Add Team</p>
                <p className="text-xs">Setup new age group</p>
             </div>
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
