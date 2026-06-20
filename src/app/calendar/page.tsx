"use client";

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { 
  ChevronLeft, ChevronRight, Calendar as CalendarIcon, 
  Plus, Filter, Clock, MapPin, Search, Users, Trophy
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Calendar } from '@/components/ui/calendar';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const EVENTS = [
  { id: 1, title: 'U16 MLS Next Training', type: 'Training', time: '10:00 - 12:00', team: 'U16 MLS Next', location: 'Pitch 4', color: 'bg-primary' },
  { id: 2, title: 'Tactical Briefing', type: 'Meeting', time: '13:00 - 14:00', team: 'All Staff', location: 'Meeting Room A', color: 'bg-blue-500' },
  { id: 3, title: 'vs Riverside FC', type: 'Match', time: '15:00 - 17:00', team: 'First Team', location: 'Everton Stadium', color: 'bg-orange-500' },
  { id: 4, title: 'Medical Assessments', type: 'Health', time: '09:00 - 16:00', team: 'U14 Academy', location: 'Clinic', color: 'bg-red-500' },
];

export default function CalendarPage() {
  const [date, setDate] = React.useState<Date | undefined>(new Date());

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Club Calendar</h1>
            <p className="text-muted-foreground">Unified schedule for all matches, training sessions, and events.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><CalendarIcon className="w-4 h-4" /> Sync Calendar</Button>
            <Button className="gap-2"><Plus className="w-4 h-4" /> Create Event</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-4 gap-8">
          <div className="space-y-6">
            <Card className="border-none shadow-sm p-4 bg-white">
              <Calendar
                mode="single"
                selected={date}
                onSelect={setDate}
                className="rounded-md border-none"
              />
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold">Categories</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2">
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-primary" />
                  <span className="text-sm font-medium">Training Sessions</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-orange-500" />
                  <span className="text-sm font-medium">Match Fixtures</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-blue-500" />
                  <span className="text-sm font-medium">Club Meetings</span>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <span className="text-sm font-medium">Medical / Physio</span>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="xl:col-span-3 space-y-6">
            <Tabs defaultValue="list" className="w-full">
              <div className="flex items-center justify-between mb-6">
                <TabsList className="bg-white border">
                  <TabsTrigger value="list">List View</TabsTrigger>
                  <TabsTrigger value="day">Day View</TabsTrigger>
                  <TabsTrigger value="week">Week View</TabsTrigger>
                </TabsList>
                <div className="flex items-center gap-4">
                  <div className="flex border rounded-md p-1 bg-white">
                    <Button variant="ghost" size="sm" className="px-2 h-8"><ChevronLeft className="w-4 h-4" /></Button>
                    <div className="px-4 flex items-center text-xs font-bold uppercase tracking-widest">May 2024</div>
                    <Button variant="ghost" size="sm" className="px-2 h-8"><ChevronRight className="w-4 h-4" /></Button>
                  </div>
                  <Button variant="outline" size="sm" className="bg-white gap-2"><Filter className="w-4 h-4" /> Filters</Button>
                </div>
              </div>

              <TabsContent value="list" className="space-y-4">
                {EVENTS.map((event) => (
                  <Card key={event.id} className="border-none shadow-sm overflow-hidden group hover:border-primary/40 border border-transparent transition-all">
                    <CardContent className="p-0 flex">
                      <div className={`w-2 shrink-0 ${event.color}`} />
                      <div className="flex-1 p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-tighter">{event.type}</Badge>
                            <span className="text-xs text-muted-foreground flex items-center gap-1"><Clock className="w-3 h-3" /> {event.time}</span>
                          </div>
                          <h3 className="text-lg font-bold">{event.title}</h3>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <span className="flex items-center gap-1"><Users className="w-3 h-3" /> {event.team}</span>
                            <span className="flex items-center gap-1"><MapPin className="w-3 h-3" /> {event.location}</span>
                          </div>
                        </div>
                        <div className="flex gap-2">
                          <Button size="sm" variant="outline" className="text-xs">Details</Button>
                          <Button size="sm" className="text-xs">Manage</Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </AppShell>
  );
}