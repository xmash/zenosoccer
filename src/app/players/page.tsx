"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { PLAYERS } from '@/lib/mock-data';
import { 
  Search, Filter, MoreVertical, UserPlus, 
  Grid2X2, List as ListIcon, Shield, Activity, 
  CheckCircle2, AlertCircle, Clock
} from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/table';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { Progress } from '@/components/ui/progress';

export default function PlayersPage() {
  const [view, setView] = useState<'grid' | 'table'>('table');
  const [search, setSearch] = useState('');

  const filteredPlayers = PLAYERS.filter(p => p.name.toLowerCase().includes(search.toLowerCase()));

  return (
    <AppShell>
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Player Management</h1>
            <p className="text-muted-foreground">Manage and track 486 registered players across all age groups.</p>
          </div>
          <div className="flex items-center gap-2">
            <div className="flex border rounded-md p-1 bg-white">
              <Button 
                variant={view === 'grid' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setView('grid')}
                className="px-2 h-8"
              >
                <Grid2X2 className="w-4 h-4" />
              </Button>
              <Button 
                variant={view === 'table' ? 'secondary' : 'ghost'} 
                size="sm" 
                onClick={() => setView('table')}
                className="px-2 h-8"
              >
                <ListIcon className="w-4 h-4" />
              </Button>
            </div>
            <Button className="gap-2">
              <UserPlus className="w-4 h-4" /> Add Player
            </Button>
          </div>
        </div>

        {/* Filters */}
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input 
              placeholder="Search by name, position, or team..." 
              className="pl-9 bg-white border-none shadow-sm" 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex gap-2">
            <Button variant="outline" className="gap-2 bg-white">
              <Filter className="w-4 h-4" /> Age Group
            </Button>
            <Button variant="outline" className="gap-2 bg-white">
              <Shield className="w-4 h-4" /> Team
            </Button>
            <Button variant="outline" className="gap-2 bg-white">
              <Activity className="w-4 h-4" /> Status
            </Button>
          </div>
        </div>

        {/* Content */}
        {view === 'table' ? (
          <div className="bg-white rounded-xl shadow-sm border overflow-hidden">
            <Table>
              <TableHeader className="bg-muted/30">
                <TableRow>
                  <TableHead className="w-[300px]">Player</TableHead>
                  <TableHead>Team</TableHead>
                  <TableHead>Position</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Dev. Score</TableHead>
                  <TableHead>Attendance</TableHead>
                  <TableHead>Last Rating</TableHead>
                  <TableHead className="text-right"></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredPlayers.map((player) => (
                  <TableRow key={player.id} className="hover:bg-muted/10">
                    <TableCell>
                      <div className="flex items-center gap-3">
                        <Avatar className="w-10 h-10 border shadow-sm">
                          <AvatarImage src={player.imageUrl} />
                          <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-bold text-sm leading-none">{player.name}</p>
                          <p className="text-xs text-muted-foreground mt-1">Age {player.age} • {player.preferredFoot} Foot</p>
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge variant="outline" className="font-medium">{player.teamName}</Badge>
                    </TableCell>
                    <TableCell>
                      <span className="text-sm font-bold">{player.position}</span>
                    </TableCell>
                    <TableCell>
                      {player.status === 'Available' ? (
                        <div className="flex items-center gap-1.5 text-primary">
                          <CheckCircle2 className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase">Available</span>
                        </div>
                      ) : (
                        <div className="flex items-center gap-1.5 text-destructive">
                          <AlertCircle className="w-4 h-4" />
                          <span className="text-xs font-bold uppercase">{player.status}</span>
                        </div>
                      )}
                    </TableCell>
                    <TableCell>
                      <div className="w-[100px] flex items-center gap-2">
                        <Progress value={player.developmentScore} className="h-1.5" />
                        <span className="text-xs font-bold">{player.developmentScore}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center gap-1.5">
                        <Clock className="w-3.5 h-3.5 text-muted-foreground" />
                        <span className="text-sm font-medium">{player.attendancePct}%</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <Badge className="bg-primary/10 text-primary border-none">{player.lastRating.toFixed(1)}</Badge>
                    </TableCell>
                    <TableCell className="text-right">
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="icon">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem>View Profile</DropdownMenuItem>
                          <DropdownMenuItem>Edit Details</DropdownMenuItem>
                          <DropdownMenuItem>Manage Stats</DropdownMenuItem>
                          <DropdownMenuItem className="text-destructive">Archive</DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {filteredPlayers.map((player) => (
              <div key={player.id} className="bg-white rounded-xl shadow-sm border p-4 hover:border-primary/50 transition-all group">
                <div className="flex justify-between items-start mb-4">
                  <Avatar className="w-16 h-16 border-2 border-muted shadow-md group-hover:scale-105 transition-transform">
                    <AvatarImage src={player.imageUrl} />
                    <AvatarFallback>{player.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                  <Badge className={player.status === 'Available' ? 'bg-primary/10 text-primary border-none' : 'bg-destructive/10 text-destructive border-none'}>
                    {player.status}
                  </Badge>
                </div>
                <div className="mb-4">
                  <h3 className="font-bold text-lg leading-tight">{player.name}</h3>
                  <p className="text-sm text-muted-foreground">{player.position} • {player.teamName}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 mb-4">
                  <div className="bg-muted/30 p-2 rounded-lg">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Dev Score</p>
                    <p className="text-sm font-bold">{player.developmentScore}</p>
                  </div>
                  <div className="bg-muted/30 p-2 rounded-lg">
                    <p className="text-[10px] uppercase text-muted-foreground font-bold">Rating</p>
                    <p className="text-sm font-bold">{player.lastRating.toFixed(1)}</p>
                  </div>
                </div>
                <Button className="w-full" variant="outline" size="sm">View Profile</Button>
              </div>
            ))}
          </div>
        )}
      </div>
    </AppShell>
  );
}
