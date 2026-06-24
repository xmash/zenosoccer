"use client";

import React from 'react';
import { AppPageHeader } from '@/components/sections/app-page-header';
import { AppShell } from '@/components/layout/app-shell';
import { ClipboardList, Filter, Download, Plus } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

const RECENT_SCORECARDS = [
  { match: 'U16 vs City Academy', date: 'Mar 12', avgRating: 7.2, players: 16 },
  { match: 'U14 vs Regional Select', date: 'Mar 8', avgRating: 6.8, players: 14 },
  { match: 'First Team vs United', date: 'Mar 5', avgRating: 7.5, players: 18 },
];

export default function ScorecardsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <AppPageHeader
          title="Scorecards"
          description="Player and match scorecards with ratings, notes, and performance marks."
          actions={
            <>
              <Button variant="outline" size="sm" className="gap-2">
                <Filter className="w-4 h-4" /> Filter
              </Button>
              <Button variant="outline" size="sm" className="gap-2">
                <Download className="w-4 h-4" /> Export
              </Button>
              <Button size="sm" className="gap-2">
                <Plus className="w-4 h-4" /> New Scorecard
              </Button>
            </>
          }
        />

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {RECENT_SCORECARDS.map((card) => (
            <Card key={card.match} className="hover:shadow-md transition-shadow cursor-pointer">
              <CardHeader>
                <div className="flex items-start justify-between gap-2">
                  <ClipboardList className="w-5 h-5 text-primary shrink-0 mt-0.5" />
                  <Badge variant="secondary">{card.date}</Badge>
                </div>
                <CardTitle className="text-lg">{card.match}</CardTitle>
                <CardDescription>{card.players} player ratings recorded</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{card.avgRating}</p>
                <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">
                  Avg. match rating
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </AppShell>
  );
}
