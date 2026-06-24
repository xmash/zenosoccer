"use client";

import React from 'react';
import { AppPageHeader } from '@/components/sections/app-page-header';
import { AppShell } from '@/components/layout/app-shell';
import { 
  Shield, Layers, MousePointer2, Settings, 
  Save, Share2, Copy, Trash2, ChevronRight, Play
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

export default function TacticsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <AppPageHeader
          title="Tactical Designer"
          description="Model match play, define team principles, and visualize formations."
          actions={
            <>
              <Button variant="outline" size="sm" className="gap-2"><Save className="w-4 h-4" /> Save</Button>
              <Button variant="outline" size="sm" className="gap-2"><Share2 className="w-4 h-4" /> Share</Button>
              <Button size="sm" className="gap-2"><Copy className="w-4 h-4" /> New Model</Button>
            </>
          }
        />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Tactical Board Area */}
          <div className="xl:col-span-3 space-y-6">
            <Card className="border-none shadow-sm overflow-hidden bg-[#1C202B]">
              <div className="flex items-center justify-between p-4 bg-black/20 border-b border-white/5">
                <div className="flex items-center gap-4">
                  <Badge variant="outline" className="text-primary border-primary">ACTIVE MODEL</Badge>
                  <h3 className="text-lg font-bold text-white">4-3-3 High Press System</h3>
                </div>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-white"><MousePointer2 className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-white"><Layers className="w-4 h-4" /></Button>
                  <Button variant="ghost" size="icon" className="text-white/60 hover:text-white"><Settings className="w-4 h-4" /></Button>
                </div>
              </div>
              
              <div className="relative aspect-[16/10] w-full bg-[#1EA048]/20 bg-[url('https://picsum.photos/seed/pitch/1200/800')] bg-center bg-cover flex items-center justify-center">
                {/* SVG Pitch Overlay - Simplified */}
                <div className="absolute inset-0 opacity-20 pointer-events-none">
                  <div className="absolute inset-4 border-2 border-white rounded-sm"></div>
                  <div className="absolute left-1/2 top-0 bottom-0 border-r-2 border-white"></div>
                  <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 border-2 border-white rounded-full"></div>
                </div>

                {/* Player Dots - Example 4-3-3 */}
                <div className="relative w-full h-full p-12">
                   {/* Goalkeeper */}
                   <div className="absolute bottom-[5%] left-1/2 -translate-x-1/2 w-10 h-10 bg-yellow-400 rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs">GK</div>
                   
                   {/* Defenders */}
                   <div className="absolute bottom-[20%] left-[15%] w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs text-white">LB</div>
                   <div className="absolute bottom-[18%] left-[35%] w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs text-white">LCB</div>
                   <div className="absolute bottom-[18%] right-[35%] w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs text-white">RCB</div>
                   <div className="absolute bottom-[20%] right-[15%] w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs text-white">RB</div>

                   {/* Midfielders */}
                   <div className="absolute top-[50%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs text-white">CDM</div>
                   <div className="absolute top-[40%] left-[30%] w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs text-white">LCM</div>
                   <div className="absolute top-[40%] right-[30%] w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs text-white">RCM</div>

                   {/* Forwards */}
                   <div className="absolute top-[15%] left-[20%] w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs text-white">LW</div>
                   <div className="absolute top-[10%] left-1/2 -translate-x-1/2 w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs text-white">ST</div>
                   <div className="absolute top-[15%] right-[20%] w-10 h-10 bg-primary rounded-full border-4 border-white shadow-xl flex items-center justify-center font-bold text-xs text-white">RW</div>
                </div>
              </div>
            </Card>

            <Tabs defaultValue="principles" className="w-full">
              <TabsList className="bg-white border w-full justify-start h-12 p-1 gap-1">
                <TabsTrigger value="principles" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Principles</TabsTrigger>
                <TabsTrigger value="offensive" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Offensive Phases</TabsTrigger>
                <TabsTrigger value="defensive" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Defensive Phases</TabsTrigger>
                <TabsTrigger value="transition" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Transitions</TabsTrigger>
              </TabsList>
              <div className="mt-4 bg-white rounded-xl shadow-sm border p-6">
                <TabsContent value="principles" className="mt-0">
                   <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">General Principles</h4>
                        <ul className="space-y-3">
                          <li className="flex gap-3 items-start">
                            <div className="p-1 bg-primary/10 rounded-full mt-0.5"><ChevronRight className="w-3 h-3 text-primary" /></div>
                            <div>
                              <p className="text-sm font-bold">Proactive Positional Play</p>
                              <p className="text-xs text-muted-foreground">Players must always occupy spaces that offer maximum passing lanes.</p>
                            </div>
                          </li>
                          <li className="flex gap-3 items-start">
                            <div className="p-1 bg-primary/10 rounded-full mt-0.5"><ChevronRight className="w-3 h-3 text-primary" /></div>
                            <div>
                              <p className="text-sm font-bold">5-Second Press Rule</p>
                              <p className="text-xs text-muted-foreground">Immediate counter-press for 5 seconds upon losing possession.</p>
                            </div>
                          </li>
                        </ul>
                      </div>
                      <div className="space-y-4">
                        <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Match Tempo</h4>
                        <div className="p-4 bg-muted/20 rounded-xl border border-dashed border-border flex items-center gap-4">
                           <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center shadow-sm shrink-0 font-headline font-bold">FAST</div>
                           <p className="text-xs text-muted-foreground">Focus on verticality and quick transitions in the middle third.</p>
                        </div>
                      </div>
                   </div>
                </TabsContent>
                <TabsContent value="offensive">
                  <p className="text-muted-foreground text-sm">Offensive phase strategies and build-out patterns go here.</p>
                </TabsContent>
              </div>
            </Tabs>
          </div>

          {/* Right Panel - Saved Tactics & Roster Context */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold">Tactical Library</CardTitle>
                <CardDescription>Saved models for this team.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="p-3 rounded-lg border bg-muted/20 hover:border-primary cursor-pointer transition-all border-primary">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold">4-3-3 High Press</p>
                    <Badge className="bg-primary/10 text-primary">Active</Badge>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Last Modified: 2 days ago</p>
                </div>
                <div className="p-3 rounded-lg border bg-white hover:border-primary cursor-pointer transition-all group">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold">3-5-2 Counter</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Last Modified: 1 week ago</p>
                </div>
                <div className="p-3 rounded-lg border bg-white hover:border-primary cursor-pointer transition-all">
                  <div className="flex justify-between items-center mb-1">
                    <p className="text-sm font-bold">4-4-2 Low Block</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground font-bold uppercase tracking-tighter">Last Modified: 2 weeks ago</p>
                </div>
                <Button variant="ghost" className="w-full text-xs text-primary font-bold">View All Models</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold">Phase Analysis</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                    <Play className="w-4 h-4 text-primary" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">Build-up Efficiency</p>
                    <div className="flex items-center gap-2 mt-1">
                       <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="bg-primary h-full w-[82%]" />
                       </div>
                       <span className="text-[10px] font-bold">82%</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded bg-destructive/10 flex items-center justify-center shrink-0">
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </div>
                  <div className="flex-1">
                    <p className="text-xs font-bold">Turnovers (Def. Third)</p>
                    <div className="flex items-center gap-2 mt-1">
                       <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                          <div className="bg-destructive h-full w-[15%]" />
                       </div>
                       <span className="text-[10px] font-bold">15%</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
