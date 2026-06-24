"use client";

import React from 'react';
import { AppPageHeader } from '@/components/sections/app-page-header';
import { AppShell } from '@/components/layout/app-shell';
import { 
  Target, Info, Plus, Play, 
  Settings, Save, Share2, CornerDownRight, 
  ChevronRight, ArrowRight, Shield
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const ROUTINES = [
  { id: 'r1', title: 'Near Post Overload', type: 'Attacking Corner', team: 'First Team', players: 6, success: '65%', image: 'https://picsum.photos/seed/set1/400/300' },
  { id: 'r2', title: 'Zonal Defensive Block', type: 'Defensive Corner', team: 'U16 MLS Next', players: 10, success: '82%', image: 'https://picsum.photos/seed/set2/400/300' },
  { id: 'r3', title: 'Edge of Box Strike', type: 'Free Kick', team: 'U18 Showcase', players: 4, success: '45%', image: 'https://picsum.photos/seed/set3/400/300' },
  { id: 'r4', title: 'Short Rotation', type: 'Attacking Corner', team: 'U14 Academy', players: 3, success: '58%', image: 'https://picsum.photos/seed/set4/400/300' },
];

export default function SetPiecesPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <AppPageHeader
          title="Set Pieces"
          description="Design dead-ball routines, assign roles, and review success rates."
          actions={
            <>
              <Button variant="outline" size="sm" className="gap-2"><Save className="w-4 h-4" /> Library</Button>
              <Button size="sm" className="gap-2"><Plus className="w-4 h-4" /> New Routine</Button>
            </>
          }
        />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
           {/* Visual Board Focus */}
           <div className="xl:col-span-3 space-y-6">
              <Card className="border-none shadow-sm overflow-hidden bg-[#1C202B]">
                 <div className="flex items-center justify-between p-4 bg-black/20 border-b border-white/5">
                    <div className="flex items-center gap-4">
                       <div className="p-2 bg-primary/20 rounded-lg">
                          <Target className="w-5 h-5 text-primary" />
                       </div>
                       <div>
                          <h3 className="text-lg font-bold text-white leading-tight">Routine: Near Post Overload</h3>
                          <p className="text-xs text-white/40 uppercase font-bold tracking-widest">Attacking Corner • U16 MLS Next</p>
                       </div>
                    </div>
                    <div className="flex gap-2">
                       <Button variant="ghost" size="icon" className="text-white/40 hover:text-white"><Settings className="w-4 h-4" /></Button>
                       <Button variant="ghost" size="icon" className="text-white/40 hover:text-white"><Share2 className="w-4 h-4" /></Button>
                    </div>
                 </div>
                 <div className="aspect-video w-full bg-[url('https://picsum.photos/seed/setboard/1200/800')] bg-center bg-cover relative">
                    <div className="absolute inset-0 bg-black/20" />
                    {/* Simplified Overlay Visuals */}
                    <div className="absolute top-[20%] right-[10%] w-12 h-12 border-4 border-dashed border-white/40 rounded-full flex items-center justify-center text-white/40 font-bold text-xs">ZONE 1</div>
                    <div className="absolute top-[35%] right-[25%] w-10 h-10 bg-primary rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-xl">ST</div>
                    <div className="absolute top-[40%] right-[22%] w-10 h-10 bg-primary rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold shadow-xl">CB</div>
                    <div className="absolute top-[20%] right-[35%] w-10 h-10 bg-primary/40 rounded-full border-2 border-white flex items-center justify-center text-white text-[10px] font-bold">CM</div>
                    
                    <div className="absolute bottom-6 left-6 p-4 bg-black/60 backdrop-blur-md rounded-xl border border-white/10 max-w-xs">
                       <p className="text-xs font-bold text-white mb-2">Instructions</p>
                       <ol className="text-[10px] text-white/80 space-y-1">
                          <li className="flex gap-2"><ArrowRight className="w-3 h-3 text-primary" /> ST makes run to front post at kickoff.</li>
                          <li className="flex gap-2"><ArrowRight className="w-3 h-3 text-primary" /> CB screens the goalkeeper.</li>
                          <li className="flex gap-2"><ArrowRight className="w-3 h-3 text-primary" /> LB delivers flat, driven cross.</li>
                       </ol>
                    </div>
                 </div>
              </Card>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Card className="border-none shadow-sm">
                    <CardHeader>
                       <CardTitle className="text-base font-bold">Player Assignments</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                       {[
                         { role: 'Kicker', name: 'Alphonso Davies', note: 'Left-Footed Outswinger' },
                         { role: 'Target', name: 'Virgil van Dijk', note: 'Back post run' },
                         { role: 'Blocker', name: 'Marcus Rashford', note: 'Screen GK' },
                       ].map((asg, i) => (
                         <div key={i} className="flex justify-between items-center p-3 rounded-lg bg-muted/20 border">
                            <div>
                               <p className="text-xs font-bold uppercase text-muted-foreground tracking-tighter">{asg.role}</p>
                               <p className="text-sm font-bold">{asg.name}</p>
                            </div>
                            <p className="text-[10px] text-muted-foreground italic">{asg.note}</p>
                         </div>
                       ))}
                    </CardContent>
                 </Card>

                 <Card className="border-none shadow-sm">
                    <CardHeader>
                       <CardTitle className="text-base font-bold">Execution Metrics</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                       <div className="flex items-center gap-4">
                          <div className="text-center">
                             <p className="text-2xl font-headline font-bold text-primary">65%</p>
                             <p className="text-[10px] text-muted-foreground uppercase font-bold">Success</p>
                          </div>
                          <div className="flex-1 space-y-2">
                             <div className="flex justify-between text-[10px] font-bold">
                                <span>Goal Conversion</span>
                                <span>12%</span>
                             </div>
                             <div className="w-full h-1.5 bg-muted rounded-full">
                                <div className="bg-primary h-full w-[12%]" />
                             </div>
                          </div>
                       </div>
                       <p className="text-xs text-muted-foreground bg-muted/30 p-3 rounded-lg border border-dashed">
                          This routine is most effective against zonal defense systems. Last goal scored on Match Day 12 vs City United.
                       </p>
                    </CardContent>
                 </Card>
              </div>
           </div>

           {/* Routine Library Column */}
           <div className="space-y-6">
              <Card className="border-none shadow-sm">
                 <CardHeader className="flex flex-row items-center justify-between">
                    <CardTitle className="text-base font-bold">Routine Library</CardTitle>
                    <Button variant="ghost" size="icon"><Plus className="w-4 h-4" /></Button>
                 </CardHeader>
                 <CardContent className="space-y-3">
                    {ROUTINES.map((routine) => (
                      <div key={routine.id} className="group relative rounded-lg overflow-hidden border shadow-sm cursor-pointer hover:border-primary transition-all">
                        <img src={routine.image} className="w-full h-24 object-cover" alt="Routine" />
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                           <Play className="text-white w-6 h-6 fill-white" />
                        </div>
                        <div className="p-3 bg-white">
                           <p className="text-xs font-bold uppercase text-primary tracking-tighter mb-0.5">{routine.type}</p>
                           <p className="text-sm font-bold truncate leading-tight">{routine.title}</p>
                           <p className="text-[10px] text-muted-foreground mt-1">{routine.team}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full text-xs text-primary font-bold">Browse All (24)</Button>
                 </CardContent>
              </Card>

              <Card className="border-none shadow-sm bg-[#1C202B] text-white">
                 <CardHeader>
                    <CardTitle className="text-white text-base">Quick Templates</CardTitle>
                 </CardHeader>
                 <CardContent className="space-y-2">
                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 justify-start text-xs font-bold"><CornerDownRight className="w-4 h-4 mr-2" /> Standard Corner</Button>
                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 justify-start text-xs font-bold"><CornerDownRight className="w-4 h-4 mr-2" /> 2-Man Free Kick</Button>
                    <Button variant="outline" className="w-full bg-white/5 border-white/10 text-white hover:bg-white/10 justify-start text-xs font-bold"><CornerDownRight className="w-4 h-4 mr-2" /> Long Throw Plan</Button>
                 </CardContent>
              </Card>
           </div>
        </div>
      </div>
    </AppShell>
  );
}
