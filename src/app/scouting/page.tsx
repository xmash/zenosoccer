"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { 
  Search, Filter, Plus, FileText, Star, 
  MapPin, Calendar, ExternalLink, UserPlus,
  TrendingUp, Download, Eye, MoreHorizontal
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Progress } from '@/components/ui/progress';

const PROSPECTS = [
  { id: 'sc1', name: 'Julian Alvarez', age: 17, club: 'River Plate Academy', position: 'ST', rating: 91, status: 'High Interest', location: 'Buenos Aires, AR', image: 'https://picsum.photos/seed/sc1/100/100' },
  { id: 'sc2', name: 'Enzo Fernandez', age: 16, club: 'Benfica Youth', position: 'CM', rating: 88, status: 'Monitoring', location: 'Lisbon, PT', image: 'https://picsum.photos/seed/sc2/100/100' },
  { id: 'sc3', name: 'Gavi Paez', age: 15, club: 'La Masia', position: 'CAM', rating: 94, status: 'Top Priority', location: 'Barcelona, ES', image: 'https://picsum.photos/seed/sc3/100/100' },
  { id: 'sc4', name: 'Florian Wirtz', age: 17, club: 'Leverkusen U19', position: 'RW', rating: 89, status: 'Under Review', location: 'Cologne, DE', image: 'https://picsum.photos/seed/sc4/100/100' },
];

export default function ScoutingPage() {
  const [search, setSearch] = useState('');

  return (
    <AppShell>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Scouting Network</h1>
            <p className="text-muted-foreground">Global prospect tracking and external talent identification.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export Watchlist</Button>
            <Button className="gap-2"><Plus className="w-4 h-4" /> New Scouting Report</Button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                <Input 
                  placeholder="Search prospects by name, club, or region..." 
                  className="pl-9 bg-white border-none shadow-sm"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                />
              </div>
              <Button variant="outline" className="bg-white gap-2"><Filter className="w-4 h-4" /> Region</Button>
              <Button variant="outline" className="bg-white gap-2"><TrendingUp className="w-4 h-4" /> Position</Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {PROSPECTS.filter(p => p.name.toLowerCase().includes(search.toLowerCase())).map((prospect) => (
                <Card key={prospect.id} className="border-none shadow-sm group hover:border-primary/50 border transition-all">
                  <CardContent className="p-6">
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center gap-4">
                        <Avatar className="w-14 h-14 border-2 border-muted shadow-sm group-hover:scale-105 transition-transform">
                          <AvatarImage src={prospect.image} />
                          <AvatarFallback>{prospect.name.substring(0, 2)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <h3 className="font-bold text-lg leading-tight">{prospect.name}</h3>
                          <p className="text-sm text-muted-foreground">{prospect.club}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline" className="text-[10px] h-5">{prospect.position}</Badge>
                            <span className="text-[10px] text-muted-foreground">• Age {prospect.age}</span>
                          </div>
                        </div>
                      </div>
                      <Badge className={
                        prospect.status === 'Top Priority' ? 'bg-red-100 text-red-700 border-none' : 
                        prospect.status === 'High Interest' ? 'bg-primary/10 text-primary border-none' : 
                        'bg-muted text-muted-foreground border-none'
                      }>
                        {prospect.status}
                      </Badge>
                    </div>

                    <div className="space-y-3 mb-4">
                      <div className="flex justify-between items-center text-xs">
                        <span className="text-muted-foreground font-medium flex items-center gap-1"><Star className="w-3 h-3 fill-yellow-400 text-yellow-400" /> Potential Rating</span>
                        <span className="font-bold">{prospect.rating}%</span>
                      </div>
                      <Progress value={prospect.rating} className="h-1.5" />
                      <div className="flex items-center gap-1 text-[10px] text-muted-foreground">
                        <MapPin className="w-3 h-3" /> {prospect.location}
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button variant="outline" size="sm" className="flex-1 text-xs">Full Report</Button>
                      <Button size="sm" className="flex-1 text-xs">Add to Watchlist</Button>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          <div className="space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold">Recent Reports</CardTitle>
                <CardDescription>Latest updates from field scouts.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {[
                  { scout: 'Erik ten Hag', player: 'Julian Alvarez', date: '2h ago', rating: 9.0 },
                  { scout: 'Xavi Simon', player: 'Gavi Paez', date: '5h ago', rating: 9.5 },
                  { scout: 'Jurgen Klopp', player: 'Enzo Fernandez', date: 'Yesterday', rating: 8.5 },
                ].map((report, i) => (
                  <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-muted/20 border border-transparent hover:border-border cursor-pointer transition-all">
                    <div className="w-8 h-8 rounded bg-primary/10 flex items-center justify-center shrink-0">
                      <FileText className="w-4 h-4 text-primary" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className="text-xs font-bold truncate">{report.player}</p>
                      <p className="text-[10px] text-muted-foreground truncate">Scouted by {report.scout}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs font-bold text-primary">{report.rating}</p>
                      <p className="text-[10px] text-muted-foreground">{report.date}</p>
                    </div>
                  </div>
                ))}
                <Button variant="ghost" className="w-full text-xs text-primary font-bold">View Archive</Button>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm bg-secondary text-white">
              <CardHeader>
                <CardTitle className="text-white text-base">Scout Assignments</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <p className="text-xs font-bold mb-1">South America</p>
                  <p className="text-[10px] text-white/60">3 scouts active • 12 pending reviews</p>
                </div>
                <div className="p-3 bg-white/10 rounded-lg">
                  <p className="text-xs font-bold mb-1">Central Europe</p>
                  <p className="text-[10px] text-white/60">5 scouts active • 28 pending reviews</p>
                </div>
                <Button variant="outline" className="w-full bg-white/10 border-white/20 hover:bg-white/20 text-xs">Manage Grid</Button>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}