"use client";

import React from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { 
  User, Shield, Bell, Lock, 
  Globe, Database, CreditCard, HelpCircle,
  Camera, CheckCircle2, Save, Trash2
} from 'lucide-react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

export default function SettingsPage() {
  return (
    <AppShell>
      <div className="space-y-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">System Settings</h1>
            <p className="text-muted-foreground">Manage your club profile, security, and notification preferences.</p>
          </div>
          <div className="flex gap-2">
            <Button variant="outline">Reset Changes</Button>
            <Button className="gap-2"><Save className="w-4 h-4" /> Save Preferences</Button>
          </div>
        </div>

        <Tabs defaultValue="profile" className="w-full">
          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
            <aside className="lg:col-span-1">
              <TabsList className="flex flex-col bg-white border h-auto p-2 gap-1 w-full text-left justify-start">
                <TabsTrigger value="profile" className="w-full justify-start gap-3 py-3 px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                  <User className="w-4 h-4" /> User Profile
                </TabsTrigger>
                <TabsTrigger value="club" className="w-full justify-start gap-3 py-3 px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                  <Shield className="w-4 h-4" /> Club Identity
                </TabsTrigger>
                <TabsTrigger value="notifications" className="w-full justify-start gap-3 py-3 px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                  <Bell className="w-4 h-4" /> Notifications
                </TabsTrigger>
                <TabsTrigger value="security" className="w-full justify-start gap-3 py-3 px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                  <Lock className="w-4 h-4" /> Security
                </TabsTrigger>
                <TabsTrigger value="billing" className="w-full justify-start gap-3 py-3 px-4 data-[state=active]:bg-primary/10 data-[state=active]:text-primary">
                  <CreditCard className="w-4 h-4" /> Subscription
                </TabsTrigger>
              </TabsList>
            </aside>

            <div className="lg:col-span-3">
              <TabsContent value="profile" className="mt-0 space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Public Profile</CardTitle>
                    <CardDescription>How other staff members see you in the network.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6">
                      <div className="relative group">
                        <Avatar className="w-24 h-24 border-4 border-white shadow-xl">
                          <AvatarImage src="https://picsum.photos/seed/coach/200/200" />
                          <AvatarFallback>JN</AvatarFallback>
                        </Avatar>
                        <Button size="icon" variant="secondary" className="absolute bottom-0 right-0 rounded-full w-8 h-8 shadow-md hover:bg-primary hover:text-white transition-colors">
                          <Camera className="w-4 h-4" />
                        </Button>
                      </div>
                      <div className="space-y-1">
                        <p className="font-bold text-xl">Julian Nagelsmann</p>
                        <p className="text-sm text-muted-foreground uppercase font-bold tracking-widest">Technical Director</p>
                        <Badge className="bg-primary/10 text-primary border-none">Verified Staff</Badge>
                      </div>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Full Name</Label>
                        <Input defaultValue="Julian Nagelsmann" className="bg-muted/30 border-none" />
                      </div>
                      <div className="space-y-2">
                        <Label>Email Address</Label>
                        <Input defaultValue="j.nagelsmann@evertonacademy.com" className="bg-muted/30 border-none" />
                      </div>
                      <div className="space-y-2">
                        <Label>Professional Title</Label>
                        <Input defaultValue="Technical Director" className="bg-muted/30 border-none" />
                      </div>
                      <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Input defaultValue="GMT (London)" className="bg-muted/30 border-none" />
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Professional Biography</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <textarea 
                      className="w-full h-32 p-4 bg-muted/30 border-none rounded-xl text-sm focus:ring-2 focus:ring-primary outline-none"
                      placeholder="Share your coaching philosophy and experience..."
                    />
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="club" className="mt-0 space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Club Profile</CardTitle>
                    <CardDescription>Global branding and organizational details.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="flex items-center gap-6 p-6 rounded-2xl bg-muted/20 border-2 border-dashed">
                      <div className="w-20 h-20 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                        <Shield className="w-10 h-10 text-white" />
                      </div>
                      <div className="flex-1">
                        <p className="font-bold text-lg">Everton Academy</p>
                        <p className="text-sm text-muted-foreground">Liverpool, United Kingdom</p>
                        <Button variant="link" className="p-0 h-auto text-primary text-xs font-bold">Change Club Logo</Button>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Legal Club Name</Label>
                        <Input defaultValue="Everton Youth Academy Ltd." className="bg-muted/30 border-none" />
                      </div>
                      <div className="space-y-2">
                        <Label>Foundation Year</Label>
                        <Input defaultValue="1878" className="bg-muted/30 border-none" />
                      </div>
                      <div className="space-y-2">
                        <Label>Headquarters</Label>
                        <Input defaultValue="Finch Farm Training Complex" className="bg-muted/30 border-none" />
                      </div>
                      <div className="space-y-2">
                        <Label>Federation ID</Label>
                        <Input defaultValue="FA-EVE-29384" className="bg-muted/30 border-none" />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="notifications" className="mt-0 space-y-6">
                <Card className="border-none shadow-sm">
                  <CardHeader>
                    <CardTitle>Notification Hub</CardTitle>
                    <CardDescription>Configure how and when you want to be alerted.</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <div className="space-y-4">
                      <h4 className="text-sm font-bold uppercase tracking-widest text-muted-foreground">Alert Channels</h4>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20">
                        <div className="flex gap-4 items-center">
                          <div className="p-2 bg-white rounded-lg shadow-sm"><Globe className="w-5 h-5 text-primary" /></div>
                          <div>
                            <p className="text-sm font-bold">Email Notifications</p>
                            <p className="text-xs text-muted-foreground">Match reports, registration alerts, and billing.</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                      <div className="flex items-center justify-between p-4 rounded-xl bg-muted/20">
                        <div className="flex gap-4 items-center">
                          <div className="p-2 bg-white rounded-lg shadow-sm"><Bell className="w-5 h-5 text-primary" /></div>
                          <div>
                            <p className="text-sm font-bold">Browser Push Alerts</p>
                            <p className="text-xs text-muted-foreground">Real-time chat messages and system updates.</p>
                          </div>
                        </div>
                        <Switch defaultChecked />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </div>
          </div>
        </Tabs>
      </div>
    </AppShell>
  );
}