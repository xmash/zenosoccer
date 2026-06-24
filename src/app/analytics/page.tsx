"use client";

import React from 'react';
import { AppPageHeader } from '@/components/sections/app-page-header';
import { AppShell } from '@/components/layout/app-shell';
import { 
  BarChart3, TrendingUp, Target, Activity, 
  Calendar, Filter, Download, Info, ChevronDown
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { 
  ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend,
  LineChart, Line, PieChart, Pie, Cell, AreaChart, Area
} from 'recharts';

const POSSESSION_DATA = [
  { name: 'U14', value: 58 },
  { name: 'U16', value: 62 },
  { name: 'U18', value: 55 },
  { name: 'First', value: 52 },
];

const COLORS = ['#1EA048', '#474E64', '#1C202B', '#E5E7EB'];

export default function AnalyticsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <AppPageHeader
          title="Analytics Hub"
          description="Deep performance insights and data visualization across the club."
          actions={
            <>
              <Button variant="outline" className="gap-2"><Download className="w-4 h-4" /> Export Data</Button>
              <Button className="gap-2"><Calendar className="w-4 h-4" /> Date Range <ChevronDown className="w-4 h-4" /></Button>
            </>
          }
        />

        {/* Global Filters */}
        <div className="flex flex-wrap items-center gap-2 p-4 bg-white rounded-xl shadow-sm border">
           <span className="text-sm font-bold text-muted-foreground px-2">FILTERS:</span>
           <Badge variant="secondary" className="px-3 py-1 cursor-pointer">All Teams</Badge>
           <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted">MLS Next League</Badge>
           <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted">Male Academy</Badge>
           <Badge variant="outline" className="px-3 py-1 cursor-pointer hover:bg-muted">Season 23/24</Badge>
           <Button variant="ghost" size="sm" className="ml-auto text-primary font-bold"><Filter className="w-4 h-4 mr-2" /> Advanced</Button>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          <Card className="border-none shadow-sm xl:col-span-2">
            <CardHeader>
              <CardTitle>Goal Production (xG vs Actual)</CardTitle>
              <CardDescription>Comparison of expected goals against actual performance.</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="h-[300px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[
                    { name: 'Jan', xG: 1.2, Actual: 1.4 },
                    { name: 'Feb', xG: 1.5, Actual: 1.2 },
                    { name: 'Mar', xG: 1.8, Actual: 2.1 },
                    { name: 'Apr', xG: 2.1, Actual: 2.4 },
                    { name: 'May', xG: 2.4, Actual: 2.8 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" axisLine={false} tickLine={false} />
                    <YAxis axisLine={false} tickLine={false} />
                    <Tooltip cursor={{ fill: '#f6f7fa' }} contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }} />
                    <Legend iconType="circle" />
                    <Bar dataKey="xG" fill="#474E64" radius={[4, 4, 0, 0]} />
                    <Bar dataKey="Actual" fill="#1EA048" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Average Possession</CardTitle>
              <CardDescription>By age group across league matches.</CardDescription>
            </CardHeader>
            <CardContent className="flex flex-col items-center">
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={POSSESSION_DATA}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {POSSESSION_DATA.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 text-center">
                 <p className="text-3xl font-headline font-bold text-primary">56.8%</p>
                 <p className="text-xs text-muted-foreground uppercase font-bold tracking-widest">Club-Wide Average</p>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm">
            <CardHeader>
              <CardTitle>Pressing Success Rate</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[250px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={[
                    { name: 'Match 1', rate: 45 },
                    { name: 'Match 2', rate: 52 },
                    { name: 'Match 3', rate: 48 },
                    { name: 'Match 4', rate: 61 },
                    { name: 'Match 5', rate: 58 },
                  ]}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                    <XAxis dataKey="name" hide />
                    <YAxis hide domain={[0, 100]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="rate" stroke="#1EA048" fill="#1EA048" fillOpacity={0.1} />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
              <div className="mt-4 space-y-2">
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">High Press Regains</span>
                    <span className="font-bold">14.2 / 90m</span>
                 </div>
                 <div className="flex justify-between items-center text-sm">
                    <span className="text-muted-foreground">Counter-Press Efficiency</span>
                    <span className="font-bold text-primary">74%</span>
                 </div>
              </div>
            </CardContent>
          </Card>

          <Card className="border-none shadow-sm xl:col-span-2">
             <CardHeader>
                <CardTitle>Player Development Heatmap</CardTitle>
                <CardDescription>Aggregate skill progression over the current season.</CardDescription>
             </CardHeader>
             <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                   {[
                     { label: 'Technical', value: 84, color: 'bg-primary' },
                     { label: 'Tactical', value: 72, color: 'bg-primary' },
                     { label: 'Physical', value: 91, color: 'bg-primary' },
                     { label: 'Psychological', value: 68, color: 'bg-yellow-400' },
                   ].map((metric) => (
                     <div key={metric.label} className="text-center space-y-3">
                        <div className="relative w-24 h-24 mx-auto">
                           <svg className="w-full h-full" viewBox="0 0 100 100">
                              <circle className="text-muted stroke-current" strokeWidth="8" fill="transparent" r="40" cx="50" cy="50" />
                              <circle className={`${metric.color.replace('bg-', 'text-')} stroke-current`} strokeWidth="8" strokeDasharray={251.2} strokeDashoffset={251.2 * (1 - metric.value/100)} strokeLinecap="round" fill="transparent" r="40" cx="50" cy="50" />
                           </svg>
                           <div className="absolute inset-0 flex items-center justify-center font-headline font-bold text-xl">{metric.value}%</div>
                        </div>
                        <p className="text-xs font-bold uppercase tracking-widest text-muted-foreground">{metric.label}</p>
                     </div>
                   ))}
                </div>
             </CardContent>
          </Card>
        </div>
      </div>
    </AppShell>
  );
}
