"use client";

import React from 'react';
import { AppPageHeader } from '@/components/sections/app-page-header';
import { AppShell } from '@/components/layout/app-shell';
import { 
  Plus, Calendar as CalendarIcon, Clock, Users, 
  ChevronRight, Dumbbell, MapPin, Search, Filter, Play
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { SESSIONS } from '@/lib/mock-data';

export default function TrainingPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <AppPageHeader
          title="Training Planner"
          description="Schedule sessions, manage drills, and track player attendance."
          actions={
            <>
              <Button variant="outline" className="gap-2">
                <CalendarIcon className="w-4 h-4" /> Weekly Calendar
              </Button>
              <Button className="gap-2">
                <Plus className="w-4 h-4" /> Create Session
              </Button>
            </>
          }
        />

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          {/* Left Panel - Session List */}
          <div className="xl:col-span-3 space-y-6">
            <div className="flex items-center gap-4 mb-2">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input placeholder="Search sessions..." className="pl-9 bg-white border-none shadow-sm" />
              </div>
              <Button variant="outline" className="bg-white gap-2">
                <Filter className="w-4 h-4" /> All Teams
              </Button>
            </div>

            <div className="space-y-4">
              {SESSIONS.map((session) => (
                <Card key={session.id} className="border-none shadow-sm hover:border-primary/40 transition-all border border-transparent">
                  <CardContent className="p-0">
                    <div className="flex flex-col md:flex-row">
                      <div className="w-full md:w-48 bg-muted/30 p-6 flex flex-col items-center justify-center border-r shrink-0">
                        <span className="text-xs font-bold text-muted-foreground uppercase tracking-widest">{new Date(session.date).toLocaleString('default', { month: 'short' })}</span>
                        <span className="text-3xl font-bold leading-none my-1">{new Date(session.date).getDate()}</span>
                        <Badge variant="secondary" className="mt-2">{session.time}</Badge>
                      </div>
                      <div className="flex-1 p-6 flex flex-col justify-between">
                        <div className="flex justify-between items-start mb-4">
                          <div>
                            <Badge variant="outline" className="mb-2 text-primary border-primary/20 bg-primary/5">{session.team}</Badge>
                            <h3 className="text-xl font-bold tracking-tight">{session.title}</h3>
                          </div>
                          <Badge className={session.intensity === 'High' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}>
                            {session.intensity} Intensity
                          </Badge>
                        </div>
                        <div className="flex flex-wrap items-center gap-6 text-sm text-muted-foreground">
                          <div className="flex items-center gap-2">
                            <Clock className="w-4 h-4" /> <span>{session.duration}</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <Users className="w-4 h-4" /> <span>18 Players Invited</span>
                          </div>
                          <div className="flex items-center gap-2">
                            <MapPin className="w-4 h-4" /> <span>Pitch 3A (North)</span>
                          </div>
                        </div>
                      </div>
                      <div className="p-6 flex flex-row md:flex-col items-center justify-center gap-2 border-l bg-muted/10 shrink-0">
                        <Button size="sm" className="w-full gap-2">Edit <ChevronRight className="w-3 h-3" /></Button>
                        <Button size="sm" variant="ghost" className="w-full">Duplicate</Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Right Panel - Drill Library */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-lg">Drill Library</CardTitle>
                <CardDescription>Drag drills into your session planner.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="group relative rounded-xl overflow-hidden border shadow-sm cursor-pointer">
                  <img src="https://picsum.photos/seed/drill1/400/250" alt="Drill" className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="text-white w-8 h-8 fill-white" />
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-sm font-bold truncate">3v3 + 2 Neutral Transition</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Tactical • 15 mins</p>
                  </div>
                </div>

                <div className="group relative rounded-xl overflow-hidden border shadow-sm cursor-pointer">
                  <img src="https://picsum.photos/seed/drill2/400/250" alt="Drill" className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="text-white w-8 h-8 fill-white" />
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-sm font-bold truncate">Build-up Phase Diamond</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Technical • 10 mins</p>
                  </div>
                </div>

                <div className="group relative rounded-xl overflow-hidden border shadow-sm cursor-pointer">
                  <img src="https://picsum.photos/seed/drill3/400/250" alt="Drill" className="w-full h-32 object-cover" />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <Play className="text-white w-8 h-8 fill-white" />
                  </div>
                  <div className="p-3 bg-white">
                    <p className="text-sm font-bold truncate">Reactive Pressing Boxes</p>
                    <p className="text-[10px] text-muted-foreground uppercase">Physical • 12 mins</p>
                  </div>
                </div>

                <Button variant="ghost" className="w-full text-primary font-bold hover:bg-primary/10">Browse Library (142)</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-secondary text-white">
              <CardHeader>
                <CardTitle className="text-white text-base">Weekly Objectives</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/60">
                    <span>Defensive Transition</span>
                    <span>80%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full">
                    <div className="bg-primary h-full w-[80%]" />
                  </div>
                </div>
                <div className="space-y-2">
                  <div className="flex justify-between text-xs font-bold uppercase tracking-widest text-white/60">
                    <span>Pressing Triggers</span>
                    <span>45%</span>
                  </div>
                  <div className="w-full bg-white/10 h-1.5 rounded-full">
                    <div className="bg-yellow-400 h-full w-[45%]" />
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
