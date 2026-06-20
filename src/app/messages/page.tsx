"use client";

import React, { useState } from 'react';
import { AppShell } from '@/components/layout/app-shell';
import { 
  Search, Plus, Send, MoreVertical, 
  Phone, Video, Info, Paperclip, 
  CheckCheck, Clock, User
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Badge } from '@/components/ui/badge';

const CHATS = [
  { id: 1, name: 'Robert Moreno', role: 'Head of Academy', lastMsg: 'The tactical review is ready for U16s.', time: '10:42 AM', unread: 2, image: 'https://picsum.photos/seed/c1/100/100', online: true },
  { id: 2, name: 'U14 Coaching Staff', role: 'Group', lastMsg: 'Sarah: Training moved to Pitch 3 today.', time: '9:15 AM', unread: 0, image: 'https://picsum.photos/seed/c2/100/100', online: false },
  { id: 3, name: 'Sarah Jenkins', role: 'U18 Head Coach', lastMsg: 'Can we discuss the promotion list?', time: 'Yesterday', unread: 0, image: 'https://picsum.photos/seed/c3/100/100', online: true },
  { id: 4, name: 'Medical Team', role: 'Group', lastMsg: 'Injury report update for Rashford.', time: 'Yesterday', unread: 5, image: 'https://picsum.photos/seed/c4/100/100', online: false },
];

export default function MessagesPage() {
  const [activeChat, setActiveChat] = useState(CHATS[0]);

  return (
    <AppShell>
      <div className="h-[calc(100vh-160px)] flex bg-white rounded-2xl shadow-sm border overflow-hidden">
        {/* Sidebar */}
        <div className="w-80 flex flex-col border-r bg-muted/5">
          <div className="p-4 space-y-4">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold">Messages</h2>
              <Button size="icon" variant="ghost" className="h-8 w-8 bg-primary/10 text-primary">
                <Plus className="w-4 h-4" />
              </Button>
            </div>
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input placeholder="Search messages..." className="pl-9 h-9 border-none bg-muted/50" />
            </div>
          </div>
          <ScrollArea className="flex-1">
            <div className="px-2 space-y-1">
              {CHATS.map((chat) => (
                <div 
                  key={chat.id} 
                  onClick={() => setActiveChat(chat)}
                  className={`flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all ${activeChat.id === chat.id ? 'bg-primary/10' : 'hover:bg-muted/50'}`}
                >
                  <div className="relative">
                    <Avatar className="w-12 h-12 border shadow-sm">
                      <AvatarImage src={chat.image} />
                      <AvatarFallback>{chat.name[0]}</AvatarFallback>
                    </Avatar>
                    {chat.online && <div className="absolute bottom-0 right-0 w-3 h-3 bg-primary border-2 border-white rounded-full" />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex justify-between items-start mb-0.5">
                      <p className={`text-sm font-bold truncate ${activeChat.id === chat.id ? 'text-primary' : ''}`}>{chat.name}</p>
                      <span className="text-[10px] text-muted-foreground">{chat.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground truncate">{chat.lastMsg}</p>
                  </div>
                  {chat.unread > 0 && (
                    <Badge className="h-5 w-5 rounded-full p-0 flex items-center justify-center bg-primary text-white text-[10px]">{chat.unread}</Badge>
                  )}
                </div>
              ))}
            </div>
          </ScrollArea>
        </div>

        {/* Chat Area */}
        <div className="flex-1 flex flex-col bg-white">
          <div className="h-16 border-b flex items-center justify-between px-6 shrink-0">
            <div className="flex items-center gap-4">
              <Avatar className="w-10 h-10 border shadow-sm">
                <AvatarImage src={activeChat.image} />
                <AvatarFallback>{activeChat.name[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="text-sm font-bold leading-tight">{activeChat.name}</p>
                <p className="text-[10px] text-primary font-bold uppercase tracking-widest">{activeChat.role}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <Button size="icon" variant="ghost"><Phone className="w-4 h-4 text-muted-foreground" /></Button>
              <Button size="icon" variant="ghost"><Video className="w-4 h-4 text-muted-foreground" /></Button>
              <Button size="icon" variant="ghost"><Info className="w-4 h-4 text-muted-foreground" /></Button>
              <Button size="icon" variant="ghost"><MoreVertical className="w-4 h-4 text-muted-foreground" /></Button>
            </div>
          </div>

          <ScrollArea className="flex-1 p-6">
            <div className="space-y-6">
              <div className="flex justify-center">
                <Badge variant="outline" className="text-[10px] font-bold uppercase tracking-widest text-muted-foreground">Today</Badge>
              </div>
              
              <div className="flex gap-4 max-w-[70%]">
                <Avatar className="w-8 h-8 mt-1 border">
                  <AvatarImage src={activeChat.image} />
                </Avatar>
                <div className="space-y-1">
                  <div className="p-4 bg-muted/30 rounded-2xl rounded-tl-none">
                    <p className="text-sm leading-relaxed">Hi Julian, I've just updated the performance reports for the U16 squad. We have three players eligible for promotion reviews.</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground ml-1">10:40 AM</p>
                </div>
              </div>

              <div className="flex gap-4 max-w-[70%] ml-auto flex-row-reverse">
                <Avatar className="w-8 h-8 mt-1 border">
                  <AvatarImage src="https://picsum.photos/seed/coach/100/100" />
                </Avatar>
                <div className="space-y-1">
                  <div className="p-4 bg-primary text-white rounded-2xl rounded-tr-none">
                    <p className="text-sm leading-relaxed">Excellent. I saw Daniel Kim's numbers look particularly strong. Let's schedule a meeting for Friday morning to discuss.</p>
                  </div>
                  <div className="flex items-center justify-end gap-1 mr-1">
                    <p className="text-[10px] text-muted-foreground">10:42 AM</p>
                    <CheckCheck className="w-3 h-3 text-primary" />
                  </div>
                </div>
              </div>

              <div className="flex gap-4 max-w-[70%]">
                <Avatar className="w-8 h-8 mt-1 border">
                  <AvatarImage src={activeChat.image} />
                </Avatar>
                <div className="space-y-1">
                  <div className="p-4 bg-muted/30 rounded-2xl rounded-tl-none">
                    <p className="text-sm leading-relaxed">Perfect. I'll invite Sarah Jenkins as well since she has been monitoring him for the U18s.</p>
                  </div>
                  <p className="text-[10px] text-muted-foreground ml-1">10:45 AM</p>
                </div>
              </div>
            </div>
          </ScrollArea>

          <div className="p-4 border-t bg-muted/5">
            <div className="bg-white border rounded-xl p-2 flex items-center gap-2 shadow-sm">
              <Button size="icon" variant="ghost"><Paperclip className="w-4 h-4 text-muted-foreground" /></Button>
              <Input 
                placeholder="Write a message..." 
                className="flex-1 border-none bg-transparent shadow-none focus-visible:ring-0" 
              />
              <Button size="icon" className="bg-primary hover:bg-primary/90 rounded-lg">
                <Send className="w-4 h-4 text-white" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </AppShell>
  );
}