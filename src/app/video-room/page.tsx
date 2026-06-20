"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { 
  Upload, Play, Tag, MessageSquare, 
  Share2, ChevronRight, Clock, Trash2, 
  Sparkles, Shield, Trophy, Activity, Filter
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { tagVideoEvents } from '@/ai/flows/video-event-tagging-flow';

const MOCK_VIDEOS = [
  { id: 'v1', title: 'U16 MLS Next vs City United - Full Match', date: '2024-05-10', length: '94:12', team: 'U16 MLS Next', events: 42, thumbnail: 'https://picsum.photos/seed/vid1/600/400' },
  { id: 'v2', title: 'Tactical Build-up Analysis - Set 1', date: '2024-05-12', length: '12:45', team: 'U18 Showcase', events: 12, thumbnail: 'https://picsum.photos/seed/vid2/600/400' },
  { id: 'v3', title: 'Pressing Triggers Compilation', date: '2024-05-14', length: '08:20', team: 'U14 Academy', events: 8, thumbnail: 'https://picsum.photos/seed/vid3/600/400' },
];

export default function VideoRoomPage() {
  const [analyzing, setAnalyzing] = useState(false);
  const [detectedEvents, setDetectedEvents] = useState<any[]>([]);

  const runAiAnalysis = async () => {
    setAnalyzing(true);
    // Simulate API delay since we don't have a real video base64 for the prompt to work perfectly in mock mode
    setTimeout(() => {
      setDetectedEvents([
        { eventType: 'goal', timestampSeconds: 142, description: 'Marcus Rashford strike from edge of box after turnover.' },
        { eventType: 'pressing_action', timestampSeconds: 215, description: 'Successful high press leading to chance creation.' },
        { eventType: 'turnover', timestampSeconds: 345, description: 'Misplaced pass in defensive third under high pressure.' },
      ]);
      setAnalyzing(false);
    }, 2000);
  };

  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Video Intelligence</h1>
            <p className="text-muted-foreground">Upload match footage and leverage AI for automated event tagging.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Filter className="w-4 h-4" /> Filter Library</Button>
            <Button className="gap-2"><Upload className="w-4 h-4" /> Upload Video</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-8">
          {/* Main Video View / Library */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="border-none shadow-sm overflow-hidden bg-black aspect-video relative group">
               <img src="https://picsum.photos/seed/vmain/1200/800" className="w-full h-full object-cover opacity-60" alt="Video" />
               <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary rounded-full flex items-center justify-center shadow-2xl cursor-pointer hover:scale-110 transition-transform">
                     <Play className="text-white w-8 h-8 fill-white ml-1" />
                  </div>
               </div>
               <div className="absolute bottom-0 inset-x-0 p-6 bg-gradient-to-t from-black/80 to-transparent flex items-end justify-between">
                  <div>
                    <Badge className="bg-primary/80 mb-2">LIVE ANALYSIS</Badge>
                    <h3 className="text-xl font-bold text-white">U16 MLS Next vs City United - 1st Half</h3>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-white/10 text-white border-white/20 hover:bg-white/20" onClick={runAiAnalysis}>
                       <Sparkles className="w-4 h-4 mr-2" /> {analyzing ? 'Analyzing...' : 'AI Auto-Tag'}
                    </Button>
                  </div>
               </div>
            </Card>

            <div className="space-y-4">
               <h3 className="text-xl font-bold">Video Library</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 {MOCK_VIDEOS.map((vid) => (
                   <div key={vid.id} className="bg-white rounded-xl shadow-sm border p-4 flex gap-4 group cursor-pointer hover:border-primary/50 transition-all">
                      <div className="w-32 h-20 rounded-lg overflow-hidden shrink-0 relative bg-muted">
                        <img src={vid.thumbnail} alt="Thumbnail" className="w-full h-full object-cover group-hover:scale-110 transition-transform" />
                        <div className="absolute bottom-1 right-1 bg-black/60 text-white text-[10px] px-1 rounded font-bold">{vid.length}</div>
                      </div>
                      <div className="flex-1 min-w-0 flex flex-col justify-between">
                         <div>
                            <p className="text-xs font-bold text-muted-foreground uppercase">{vid.team}</p>
                            <h4 className="text-sm font-bold truncate leading-tight mt-0.5">{vid.title}</h4>
                         </div>
                         <div className="flex items-center gap-3 mt-2">
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Tag className="w-3 h-3" /> {vid.events} tags</span>
                            <span className="text-[10px] text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {vid.date}</span>
                         </div>
                      </div>
                   </div>
                 ))}
               </div>
            </div>
          </div>

          {/* Right Panel - Event Timeline & Annotations */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base font-bold">Event Timeline</CardTitle>
                <Button variant="ghost" size="icon"><Plus className="w-4 h-4" /></Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {detectedEvents.length > 0 ? (
                    detectedEvents.map((ev, i) => (
                      <div key={i} className="flex gap-4 group cursor-pointer">
                        <div className="flex flex-col items-center shrink-0">
                           <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center font-headline font-bold text-xs group-hover:bg-primary/20 group-hover:text-primary transition-colors">
                             {Math.floor(ev.timestampSeconds / 60)}:{(ev.timestampSeconds % 60).toString().padStart(2, '0')}
                           </div>
                           <div className="w-0.5 h-full bg-muted my-1" />
                        </div>
                        <div className="pb-4">
                           <Badge variant="outline" className="mb-1 text-[10px] uppercase">{ev.eventType}</Badge>
                           <p className="text-sm font-medium leading-tight">{ev.description}</p>
                           <div className="flex gap-3 mt-2">
                              <button className="text-[10px] font-bold text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"><MessageSquare className="w-3 h-3" /> 2 Comments</button>
                              <button className="text-[10px] font-bold text-muted-foreground flex items-center gap-1 hover:text-primary transition-colors"><Share2 className="w-3 h-3" /> Send to Player</button>
                           </div>
                        </div>
                      </div>
                    ))
                  ) : (
                    <div className="py-12 text-center text-muted-foreground">
                       <Play className="w-12 h-12 mx-auto mb-4 opacity-20" />
                       <p className="text-sm">Select a match or use "AI Auto-Tag" to generate a timeline of key events.</p>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-[#1C202B] text-white">
               <CardHeader>
                  <CardTitle className="text-white text-base">Tagged Player Clips</CardTitle>
               </CardHeader>
               <CardContent className="space-y-3">
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center gap-3">
                     <div className="w-10 h-10 rounded bg-white/10 shrink-0 overflow-hidden">
                        <img src="https://picsum.photos/seed/p1/40/40" alt="Player" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold">Marcus Rashford</p>
                        <p className="text-[10px] text-white/40">12 Clips Prepared</p>
                     </div>
                     <Button size="icon" variant="ghost" className="text-white/40 hover:text-white"><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                  <div className="p-3 bg-white/5 rounded-lg border border-white/10 flex items-center gap-3">
                     <div className="w-10 h-10 rounded bg-white/10 shrink-0 overflow-hidden">
                        <img src="https://picsum.photos/seed/p2/40/40" alt="Player" />
                     </div>
                     <div className="flex-1 min-w-0">
                        <p className="text-xs font-bold">Phil Foden</p>
                        <p className="text-[10px] text-white/40">5 Clips Prepared</p>
                     </div>
                     <Button size="icon" variant="ghost" className="text-white/40 hover:text-white"><ChevronRight className="w-4 h-4" /></Button>
                  </div>
               </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}

function Plus({ className }: { className?: string }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      className={className}
    >
      <path d="M5 12h14" />
      <path d="M12 5v14" />
    </svg>
  );
}
