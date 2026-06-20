"use client";

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { StatCard } from '@/components/soccer/stat-card';
import { 
  Users, Shield, Dumbbell, Trophy, Activity, LineChart, 
  AlertCircle, ChevronRight, Clock, MapPin
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  LineChart as ReLineChart, Line, AreaChart, Area
} from 'recharts';
import { 
  PLAYERS, TEAMS, MATCHES, SESSIONS, 
  ANALYTICS_ATTENDANCE, ANALYTICS_PERFORMANCE 
} from '@/lib/mock-data';

export default function DashboardPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Club Overview</h1>
            <p className="text-muted-foreground">Technical and administrative command center for Everton Academy.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Download Report</Button>
            <Button>Season Management</Button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
          <StatCard label="Total Players" value={486} icon={Users} trend={{ value: 12, isPositive: true }} />
          <StatCard label="Active Teams" value={22} icon={Shield} />
          <StatCard label="Coaches" value={38} icon={Users} />
          <StatCard label="Sessions / Wk" value={64} icon={Dumbbell} trend={{ value: 4, isPositive: true }} />
          <StatCard label="Win Rate" value="68%" icon={Trophy} trend={{ value: 2, isPositive: true }} />
          <StatCard label="Progress Index" value="82%" icon={Activity} trend={{ value: 5, isPositive: true }} />
        </div>

        {/* Main Dashboard Layout */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Left Column - Charts */}
          <div className="xl:col-span-2 space-y-6">
            <Card className="border-none shadow-sm">
              <CardHeader className="flex flex-row items-center justify-between">
                <div>
                  <CardTitle>Match Performance Trend</CardTitle>
                  <CardDescription>Club-wide performance metrics across all age groups.</CardDescription>
                </div>
                <Badge variant="secondary">Season 23/24</Badge>
              </CardHeader>
              <CardContent>
                <div className="h-[300px] w-full">
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ANALYTICS_PERFORMANCE}>
                      <defs>
                        <linearGradient id="colorRating" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#1EA048" stopOpacity={0.1}/>
                          <stop offset="95%" stopColor="#1EA048" stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                      <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} />
                      <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#888' }} domain={[0, 10]} />
                      <Tooltip 
                        contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                      />
                      <Area type="monotone" dataKey="rating" stroke="#1EA048" strokeWidth={3} fillOpacity={1} fill="url(#colorRating)" />
                    </AreaChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="border-none shadow-sm">
                <CardHeader>
                  <CardTitle>Attendance by Age Group</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={ANALYTICS_ATTENDANCE}>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} />
                        <YAxis axisLine={false} tickLine={false} hide />
                        <Tooltip cursor={{ fill: '#f6f7fa' }} />
                        <Bar dataKey="attendance" fill="#1EA048" radius={[4, 4, 0, 0]} />
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-none shadow-sm">
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-base font-bold">Upcoming Matches</CardTitle>
                  <Button variant="ghost" size="sm">View All</Button>
                </CardHeader>
                <CardContent className="space-y-4">
                  {MATCHES.slice(0, 3).map((match) => (
                    <div key={match.id} className="flex items-center gap-4 p-3 rounded-lg bg-muted/30 border border-transparent hover:border-border transition-all">
                      <div className="w-12 h-12 rounded bg-white flex flex-col items-center justify-center border shadow-sm shrink-0">
                        <span className="text-[10px] uppercase font-bold text-muted-foreground">{new Date(match.date).toLocaleString('default', { month: 'short' })}</span>
                        <span className="text-lg font-bold leading-none">{new Date(match.date).getDate()}</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-bold truncate">vs {match.opponent}</p>
                        <p className="text-xs text-muted-foreground truncate">{match.competition}</p>
                      </div>
                      <Badge variant={match.venue === 'Home' ? 'default' : 'outline'}>{match.venue}</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Right Column - Alerts & Activity */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-primary text-white">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Activity className="w-5 h-5" /> Academy Health
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-3 bg-white/10 rounded-lg">
                  <div className="flex justify-between items-center mb-1">
                    <span className="text-sm font-medium">Training Load</span>
                    <span className="text-xs">Optimal</span>
                  </div>
                  <div className="w-full bg-white/20 h-1.5 rounded-full overflow-hidden">
                    <div className="bg-white h-full w-[75%]" />
                  </div>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Injured Players</span>
                  <Badge variant="outline" className="text-white border-white/30">12 Active</Badge>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-sm">Waitlist</span>
                  <Badge variant="outline" className="text-white border-white/30">42 Players</Badge>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <AlertCircle className="w-5 h-5 text-destructive" /> Attention Required
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex items-start gap-3 p-3 rounded-lg bg-destructive/5 border-l-4 border-destructive">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-destructive">Injury Alert</p>
                    <p className="text-xs text-muted-foreground">Kevin De Bruyne (U18) confirmed Grade 2 Ankle Sprain.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-orange-50 border-l-4 border-orange-400">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-orange-700">Contract Expiry</p>
                    <p className="text-xs text-muted-foreground">3 coaches have certifications expiring in 30 days.</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-50 border-l-4 border-blue-400">
                  <div className="flex-1">
                    <p className="text-sm font-bold text-blue-700">Pathway Review</p>
                    <p className="text-xs text-muted-foreground">Daniel Kim is eligible for U16 promotion review.</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle>Latest Sessions</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                {SESSIONS.slice(0, 3).map((session) => (
                  <div key={session.id} className="group cursor-pointer">
                    <div className="flex items-center gap-3">
                      <div className="p-2 bg-muted rounded group-hover:bg-primary/10 transition-colors">
                        <Clock className="w-4 h-4 text-muted-foreground group-hover:text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-bold truncate">{session.title}</p>
                        <p className="text-xs text-muted-foreground">{session.time} • {session.team}</p>
                      </div>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </AppShell>
  );
}
