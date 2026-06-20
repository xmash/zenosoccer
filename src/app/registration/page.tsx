"use client";

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { 
  FileText, User, Users, Shield, 
  CreditCard, CheckCircle2, Clock, 
  AlertCircle, ChevronRight, Search
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

const REGISTRATIONS = [
  { id: 'r1', name: 'Alfie Harrison', age: 12, parent: 'Mark Harrison', status: 'Under Review', date: '2024-05-15', payment: 'Paid' },
  { id: 'r2', name: 'Sophia Chen', age: 10, parent: 'Li Chen', status: 'Invited to Tryout', date: '2024-05-14', payment: 'Pending' },
  { id: 'r3', name: 'Tyler Brooks', age: 14, parent: 'Sarah Brooks', status: 'Draft', date: '2024-05-12', payment: 'Unpaid' },
  { id: 'r4', name: 'Emma Wilson', age: 8, parent: 'Peter Wilson', status: 'Accepted', date: '2024-05-10', payment: 'Paid' },
];

export default function RegistrationPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Registration Hub</h1>
            <p className="text-muted-foreground">Manage intake forms, tryout invitations, and onboarding documents.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Registration Link</Button>
            <Button className="gap-2">New Intake Form</Button>
          </div>
        </div>

        <Tabs defaultValue="all" className="w-full">
           <TabsList className="bg-white border w-full justify-start h-12 p-1 gap-1 mb-6">
              <TabsTrigger value="all" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white">All Registrations</TabsTrigger>
              <TabsTrigger value="tryouts" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Tryouts</TabsTrigger>
              <TabsTrigger value="documents" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Documents</TabsTrigger>
              <TabsTrigger value="payments" className="px-6 data-[state=active]:bg-primary data-[state=active]:text-white">Payments</TabsTrigger>
           </TabsList>

           <TabsContent value="all" className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <Input placeholder="Search registrations..." className="pl-9 bg-white border-none shadow-sm" />
                </div>
                <Button variant="outline" className="bg-white">Filter Status</Button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="border-none shadow-sm bg-primary/5 border-l-4 border-primary">
                  <CardContent className="p-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Submitted</p>
                    <p className="text-2xl font-headline font-bold">142</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-orange-50 border-l-4 border-orange-400">
                  <CardContent className="p-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Under Review</p>
                    <p className="text-2xl font-headline font-bold">28</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-blue-50 border-l-4 border-blue-400">
                  <CardContent className="p-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Invited</p>
                    <p className="text-2xl font-headline font-bold">45</p>
                  </CardContent>
                </Card>
                <Card className="border-none shadow-sm bg-green-50 border-l-4 border-green-500">
                  <CardContent className="p-4">
                    <p className="text-xs font-bold text-muted-foreground uppercase">Accepted</p>
                    <p className="text-2xl font-headline font-bold">312</p>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-white rounded-xl border shadow-sm overflow-hidden">
                <table className="w-full text-sm">
                  <thead className="bg-muted/30 border-b">
                    <tr>
                      <th className="text-left p-4 font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Player / Parent</th>
                      <th className="text-left p-4 font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Age Group</th>
                      <th className="text-left p-4 font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Status</th>
                      <th className="text-left p-4 font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Payment</th>
                      <th className="text-left p-4 font-bold uppercase text-[10px] tracking-widest text-muted-foreground">Submission</th>
                      <th className="text-right p-4"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {REGISTRATIONS.map((reg) => (
                      <tr key={reg.id} className="hover:bg-muted/10 transition-colors group">
                        <td className="p-4">
                           <div>
                              <p className="font-bold">{reg.name}</p>
                              <p className="text-xs text-muted-foreground">Parent: {reg.parent}</p>
                           </div>
                        </td>
                        <td className="p-4">
                           <Badge variant="secondary">U{reg.age} Academy</Badge>
                        </td>
                        <td className="p-4">
                           <div className="flex items-center gap-2">
                             {reg.status === 'Accepted' ? <CheckCircle2 className="w-4 h-4 text-primary" /> : <Clock className="w-4 h-4 text-orange-400" />}
                             <span className="font-medium">{reg.status}</span>
                           </div>
                        </td>
                        <td className="p-4">
                           <Badge variant={reg.payment === 'Paid' ? 'default' : 'outline'} className={reg.payment === 'Paid' ? 'bg-primary/10 text-primary border-none' : ''}>
                              {reg.payment}
                           </Badge>
                        </td>
                        <td className="p-4 text-muted-foreground font-mono text-[10px] uppercase">
                           {reg.date}
                        </td>
                        <td className="p-4 text-right">
                           <Button variant="ghost" size="sm" className="group-hover:text-primary transition-colors">Review <ChevronRight className="w-4 h-4 ml-1" /></Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
           </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  );
}
