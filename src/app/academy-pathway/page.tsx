"use client";

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { 
  GitMerge, ChevronRight, UserPlus, Info, 
  TrendingUp, Award, Target, Star, Users
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

const STAGES = [
  { name: 'U8 Foundation', players: 42, active: true },
  { name: 'U10 Development', players: 38, active: true },
  { name: 'U12 Competitive', players: 35, active: true },
  { name: 'U14 Academy', players: 28, active: true },
  { name: 'U16 Elite', players: 24, active: true },
  { name: 'U18 Showcase', players: 22, active: true },
  { name: 'First Team', players: 12, active: false, label: 'Pro Pathway' },
];

export default function AcademyPathwayPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Academy Pathway</h1>
            <p className="text-muted-foreground">Strategic visualization of the club's player development pipeline.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Pipeline Report</Button>
            <Button className="gap-2"><UserPlus className="w-4 h-4" /> Management View</Button>
          </div>
        </div>

        {/* Pipeline Visualization */}
        <div className="bg-white rounded-2xl shadow-sm border p-8">
           <div className="flex flex-col md:flex-row items-center justify-between gap-2">
              {STAGES.map((stage, i) => (
                <React.Fragment key={stage.name}>
                  <div className="flex flex-col items-center group cursor-pointer">
                    <div className={`w-14 h-14 rounded-full flex items-center justify-center border-4 shadow-sm transition-all group-hover:scale-110 ${stage.active ? 'bg-primary/10 border-primary' : 'bg-muted border-muted-foreground/20'}`}>
                      <Users className={`w-6 h-6 ${stage.active ? 'text-primary' : 'text-muted-foreground'}`} />
                    </div>
                    <div className="mt-4 text-center">
                      <p className="text-xs font-bold leading-tight">{stage.name}</p>
                      <p className="text-[10px] text-muted-foreground mt-1 uppercase tracking-widest">{stage.players} Players</p>
                      {stage.label && <Badge className="mt-2 bg-yellow-400/20 text-yellow-700 border-none text-[10px]">{stage.label}</Badge>}
                    </div>
                  </div>
                  {i < STAGES.length - 1 && (
                    <div className="hidden md:block flex-1 h-0.5 bg-muted mx-2 mt-[-60px]" />
                  )}
                </React.Fragment>
              ))}
           </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Promotion Candidates */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                 <div>
                    <CardTitle>Promotion Candidates</CardTitle>
                    <CardDescription>Players exceeding benchmarks for their current age group.</CardDescription>
                 </div>
                 <Badge variant="secondary" className="gap-1"><TrendingUp className="w-3 h-3" /> Season Trend</Badge>
              </CardHeader>
              <CardContent className="space-y-4">
                 {[
                   { name: 'Daniel Kim', current: 'U14 Academy', target: 'U16 Elite', score: 92, match: 96, image: 'https://picsum.photos/seed/p3/100/100' },
                   { name: 'Maya Rodriguez', current: 'U12 Elite', target: 'U14 Academy', score: 88, match: 91, image: 'https://picsum.photos/seed/p4/100/100' },
                   { name: 'Phil Foden', current: 'U16 MLS Next', target: 'U18 Showcase', score: 95, match: 98, image: 'https://picsum.photos/seed/p2/100/100' },
                 ].map((player, i) => (
                   <div key={i} className="flex flex-col md:flex-row items-center gap-6 p-4 rounded-xl border hover:border-primary/40 transition-all bg-muted/5 group">
                      <div className="flex items-center gap-4 flex-1">
                        <Avatar className="w-12 h-12 border-2 border-white shadow-sm">
                           <AvatarImage src={player.image} />
                           <AvatarFallback>{player.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-base leading-none">{player.name}</p>
                          <div className="flex items-center gap-2 mt-2">
                             <Badge variant="outline" className="text-[10px] h-5">{player.current}</Badge>
                             <ChevronRight className="w-3 h-3 text-muted-foreground" />
                             <Badge className="bg-primary/10 text-primary border-none text-[10px] h-5">{player.target}</Badge>
                          </div>
                        </div>
                      </div>
                      <div className="w-full md:w-48 space-y-1">
                         <div className="flex justify-between text-[10px] font-bold uppercase text-muted-foreground tracking-widest">
                            <span>Readiness</span>
                            <span>{player.score}%</span>
                         </div>
                         <Progress value={player.score} className="h-1.5" />
                      </div>
                      <div className="flex items-center gap-4 shrink-0">
                         <div className="text-right">
                            <p className="text-[10px] uppercase font-bold text-muted-foreground tracking-tighter leading-none">Scout Index</p>
                            <p className="text-sm font-bold text-primary">{player.match}%</p>
                         </div>
                         <Button size="icon" variant="ghost" className="group-hover:translate-x-1 transition-transform"><ChevronRight className="w-5 h-5" /></Button>
                      </div>
                   </div>
                 ))}
                 <Button variant="ghost" className="w-full font-bold text-primary">View All Candidates (14)</Button>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
               <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                       <Award className="w-5 h-5 text-yellow-500" /> Milestone Tracking
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="p-3 bg-muted/20 rounded-lg">
                        <p className="text-xs font-bold mb-1">Elite Academy Status</p>
                        <p className="text-[10px] text-muted-foreground">Club is 85% towards meeting MLS Next Pro benchmarks.</p>
                        <Progress value={85} className="h-1.5 mt-2" />
                     </div>
                     <div className="p-3 bg-muted/20 rounded-lg">
                        <p className="text-xs font-bold mb-1">Scholarship Placement</p>
                        <p className="text-[10px] text-muted-foreground">12 graduating players placed in D1 colleges this season.</p>
                        <Progress value={72} className="h-1.5 mt-2" />
                     </div>
                  </CardContent>
               </Card>

               <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle className="text-base font-bold flex items-center gap-2">
                       <Target className="w-5 h-5 text-blue-500" /> Positional Depth
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                     <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">Goalkeepers</span>
                        <Badge variant="outline">HEALTHY (4)</Badge>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">Left-Footed CBs</span>
                        <Badge variant="outline" className="text-destructive border-destructive">LOW (1)</Badge>
                     </div>
                     <div className="flex justify-between items-center text-sm">
                        <span className="font-medium">Creative Midfielders</span>
                        <Badge variant="outline" className="text-primary border-primary">STRONG (8)</Badge>
                     </div>
                  </CardContent>
               </Card>
            </div>
          </div>

          {/* Right Panel - Pathways & Evaluations */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-secondary text-white">
              <CardHeader>
                 <CardTitle className="text-white text-lg">Scout Focus</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                 <div className="p-4 bg-white/10 rounded-xl space-y-3">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded bg-white/20 flex items-center justify-center shrink-0">
                          <Star className="w-5 h-5 text-yellow-400" />
                       </div>
                       <div>
                          <p className="text-sm font-bold">Top Prospect Watch</p>
                          <p className="text-[10px] text-white/60">3 players invited to Youth National Team camp.</p>
                       </div>
                    </div>
                    <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-xs">View Scouting Reports</Button>
                 </div>
                 
                 <div className="p-4 bg-white/10 rounded-xl space-y-3">
                    <div className="flex items-center gap-3">
                       <div className="w-10 h-10 rounded bg-white/20 flex items-center justify-center shrink-0">
                          <Activity className="w-5 h-5 text-primary" />
                       </div>
                       <div>
                          <p className="text-sm font-bold">Risk Assessment</p>
                          <p className="text-[10px] text-white/60">5 players flagged for drop-off in training attendance.</p>
                       </div>
                    </div>
                    <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-xs">View Retention Panel</Button>
                 </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold">Staff Evaluations</CardTitle>
                <CardDescription>Quarterly review status for academy coaches.</CardDescription>
              </CardHeader>
              <CardContent>
                 <div className="space-y-4">
                    {[
                      { name: 'Robert Moreno', role: 'Head of Academy', status: 'Completed', date: 'May 12' },
                      { name: 'Sarah Jenkins', role: 'U18 Head Coach', status: 'Pending', date: '-' },
                      { name: 'David Villa', role: 'U16 Head Coach', status: 'Completed', date: 'May 10' },
                    ].map((staff, i) => (
                      <div key={i} className="flex justify-between items-center text-sm border-b pb-3 last:border-0 last:pb-0">
                         <div>
                            <p className="font-bold">{staff.name}</p>
                            <p className="text-[10px] text-muted-foreground uppercase">{staff.role}</p>
                         </div>
                         <div className="text-right">
                            <Badge variant={staff.status === 'Completed' ? 'default' : 'secondary'} className="text-[10px]">
                               {staff.status}
                            </Badge>
                            <p className="text-[10px] text-muted-foreground mt-1">{staff.date}</p>
                         </div>
                      </div>
                    ))}
                 </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
