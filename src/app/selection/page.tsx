"use client";

import React, { useState } from 'react';
import { AppPageHeader } from '@/components/sections/app-page-header';
import { AppShell } from '@/components/layout/app-shell';
import { PLAYERS, TEAMS } from '@/lib/mock-data';
import { 
  Users, UserPlus, Info, CheckCircle2, 
  Sparkles, ChevronRight, AlertTriangle, ArrowRightLeft
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { playerSelectionRecommendations } from '@/ai/flows/player-selection-recommendations-flow';

export default function SelectionPage() {
  const [loading, setLoading] = useState(false);
  const [recommendations, setRecommendations] = useState<any[]>([]);

  const getRecommendations = async () => {
    setLoading(true);
    try {
      const result = await playerSelectionRecommendations({
        players: PLAYERS as any,
        teams: TEAMS as any,
        context: "Identify promotion candidates for the U16 MLS Next and U18 Showcase teams based on current performance and developmental potential."
      });
      setRecommendations(result.recommendations);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  return (
    <AppShell>
      <div className="space-y-8">
        <AppPageHeader
          title="Team Selection"
          description="Strategic roster planning and AI-driven promotion analysis."
          actions={
            <>
              <Button variant="outline">Compare Rosters</Button>
              <Button className="bg-primary hover:bg-primary/90 gap-2" onClick={getRecommendations} disabled={loading}>
                <Sparkles className="w-4 h-4" /> {loading ? 'Analyzing...' : 'AI Selection Assistant'}
              </Button>
            </>
          }
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Board */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-xl shadow-sm border p-6 min-h-[600px]">
              <div className="flex items-center justify-between mb-8 border-b pb-4">
                <div className="flex items-center gap-4">
                  <div className="p-3 bg-primary/10 rounded-xl">
                    <Shield className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">U16 MLS Next</h3>
                    <p className="text-sm text-muted-foreground">Current Roster: 20 Players • formation: 4-3-3</p>
                  </div>
                </div>
                <Button variant="ghost" size="sm" className="gap-2">
                  <ArrowRightLeft className="w-4 h-4" /> Move Players
                </Button>
              </div>

              {/* Roster Sections */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Starting Lineup</h4>
                  <div className="space-y-2">
                    {PLAYERS.slice(0, 11).map((player) => (
                      <div key={player.id} className="flex items-center gap-3 p-2 rounded-lg border bg-muted/20 group hover:bg-white hover:shadow-md transition-all cursor-move">
                        <Avatar className="w-8 h-8 border">
                          <AvatarImage src={player.imageUrl} />
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate">{player.name}</p>
                          <p className="text-[10px] text-muted-foreground">{player.position}</p>
                        </div>
                        <Badge variant="outline" className="text-[10px] h-5">{player.developmentScore}</Badge>
                      </div>
                    ))}
                  </div>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">Bench / Reserves</h4>
                  <div className="space-y-2">
                    {PLAYERS.slice(11, 15).map((player) => (
                      <div key={player.id} className="flex items-center gap-3 p-2 rounded-lg border bg-muted/5 group hover:bg-white hover:shadow-md transition-all cursor-move opacity-75 grayscale-[0.5] hover:opacity-100 hover:grayscale-0">
                        <Avatar className="w-8 h-8 border">
                          <AvatarImage src={player.imageUrl} />
                        </Avatar>
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold truncate">{player.name}</p>
                          <p className="text-[10px] text-muted-foreground">{player.position}</p>
                        </div>
                      </div>
                    ))}
                    <Button variant="ghost" className="w-full border-2 border-dashed h-12 gap-2 text-muted-foreground hover:text-primary hover:border-primary">
                      <UserPlus className="w-4 h-4" /> Add to Roster
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - AI Recommendations & Alerts */}
          <div className="space-y-6">
            <Card className="border-none shadow-sm bg-[#1C202B] text-white">
              <CardHeader>
                <CardTitle className="flex items-center gap-2 text-white">
                  <Sparkles className="w-5 h-5 text-primary" /> AI Recommendations
                </CardTitle>
                <CardDescription className="text-white/60">
                  Data-driven insights for squad optimization.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ScrollArea className={recommendations.length > 0 ? "h-[450px]" : ""}>
                  <div className="space-y-4">
                    {recommendations.length > 0 ? (
                      recommendations.map((rec, i) => (
                        <div key={i} className="p-4 rounded-xl bg-white/10 border border-white/5 space-y-3">
                          <div className="flex justify-between items-start">
                            <Badge className="bg-primary/20 text-primary border-none">{rec.type}</Badge>
                            <span className="text-[10px] text-white/40 font-bold uppercase tracking-tighter">Match Index: 94%</span>
                          </div>
                          <div>
                            <p className="text-sm font-bold">{rec.suggestedAction}</p>
                            <p className="text-xs text-white/60 mt-1">{rec.reasoning}</p>
                          </div>
                          <Button variant="link" className="text-primary p-0 h-auto text-xs font-bold">Review Details <ChevronRight className="w-3 h-3 ml-1" /></Button>
                        </div>
                      ))
                    ) : (
                      <div className="py-12 text-center space-y-4">
                        <div className="w-12 h-12 bg-white/5 rounded-full flex items-center justify-center mx-auto">
                          <Sparkles className="w-6 h-6 text-white/20" />
                        </div>
                        <p className="text-sm text-white/40 px-4">Click "AI Selection Assistant" to generate roster recommendations based on player data.</p>
                      </div>
                    )}
                  </div>
                </ScrollArea>
              </CardContent>
            </Card>

            <Card className="border-none shadow-sm">
              <CardHeader>
                <CardTitle className="text-base font-bold">Eligibility Warnings</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div className="flex gap-3 p-3 rounded-lg bg-orange-50 border border-orange-100">
                  <AlertTriangle className="w-5 h-5 text-orange-500 shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-orange-800">Age Restriction</p>
                    <p className="text-[10px] text-orange-700/80">3 players on U16 Roster are over 16 years old as of Jan 1st.</p>
                  </div>
                </div>
                <div className="flex gap-3 p-3 rounded-lg bg-destructive/5 border border-destructive/10">
                  <Info className="w-5 h-5 text-destructive shrink-0" />
                  <div>
                    <p className="text-xs font-bold text-destructive">International Duty</p>
                    <p className="text-[10px] text-destructive/80">Phil Foden is unavailable for upcoming 2 matches.</p>
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

function Shield({ className }: { className?: string }) {
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
      <path d="M20 13c0 5-3.5 7.5-7.66 8.95a1 1 0 0 1-.67-.01C7.5 20.5 4 18 4 13V6a1 1 0 0 1 1-1c2 0 4.5-1.2 6.24-2.72a1.17 1.17 0 0 1 1.52 0C14.51 3.81 17 5 19 5a1 1 0 0 1 1 1z" />
    </svg>
  );
}
