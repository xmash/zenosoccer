import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { 
  Shield, 
  TrendingUp, 
  Target, 
  Video, 
  Zap, 
  Users, 
  ArrowRight,
  ChevronRight
} from 'lucide-react';
import Image from 'next/image';

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen bg-background">
      {/* Navigation */}
      <header className="px-6 lg:px-12 h-20 flex items-center border-b bg-white/50 backdrop-blur-md sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-primary rounded flex items-center justify-center">
            <Shield className="text-white w-5 h-5" />
          </div>
          <span className="font-headline font-bold text-2xl tracking-tight uppercase">SoccerOS</span>
        </div>
        <nav className="ml-auto flex gap-4 sm:gap-8">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
            Solutions
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#">
            Pricing
          </Link>
          <Link href="/dashboard">
            <Button variant="default" size="sm" className="hidden sm:flex">
              Sign In
            </Button>
          </Link>
        </nav>
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-12 md:py-24 lg:py-32 xl:py-48 overflow-hidden bg-sidebar text-white">
          <div className="absolute inset-0 z-0 opacity-20">
             <Image 
                src="https://picsum.photos/seed/soc1/1200/600" 
                alt="Soccer Field" 
                fill 
                className="object-cover"
                priority
             />
          </div>
          <div className="container px-4 md:px-6 relative z-10 mx-auto">
            <div className="flex flex-col items-center space-y-4 text-center">
              <div className="space-y-2">
                <h1 className="text-4xl font-headline font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                  The Operating System for <span className="text-primary italic">Elite Clubs</span>
                </h1>
                <p className="mx-auto max-w-[700px] text-sidebar-foreground/80 md:text-xl font-body">
                  SoccerOS integrates recruitment, performance analytics, and academy management into a single, high-performance platform.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row gap-4 mt-8">
                <Link href="/dashboard">
                  <Button size="lg" className="h-14 px-8 text-lg font-bold gap-2 group">
                    Enter Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="h-14 px-8 text-lg font-bold bg-white/10 border-white/20 text-white hover:bg-white/20">
                  Request Demo
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Grid */}
        <section className="w-full py-12 md:py-24 lg:py-32 bg-white">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="grid gap-12 lg:grid-cols-3">
              <div className="flex flex-col items-start space-y-4 p-6 rounded-2xl bg-muted/30">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Zap className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">AI Scouting & Analysis</h3>
                <p className="text-muted-foreground">
                  Leverage GenAI to identify top prospects and generate detailed performance recommendations based on match data.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 rounded-2xl bg-muted/30">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Video className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Video Intelligence</h3>
                <p className="text-muted-foreground">
                  Automated event tagging and tactical visualization tools that transform raw footage into actionable insights.
                </p>
              </div>
              <div className="flex flex-col items-start space-y-4 p-6 rounded-2xl bg-muted/30">
                <div className="p-3 bg-primary/10 rounded-xl">
                  <Target className="w-8 h-8 text-primary" />
                </div>
                <h3 className="text-2xl font-bold">Tactical Designer</h3>
                <p className="text-muted-foreground">
                  Design complex set-pieces and team principles with our interactive tactical board, ready for academy-wide deployment.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Section */}
        <section className="w-full py-12 md:py-24 bg-muted/20 border-y">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="flex flex-col items-center justify-center space-y-8">
              <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-muted-foreground">Trusted by Champions</h2>
              <div className="flex flex-wrap justify-center gap-12 md:gap-24 grayscale opacity-50">
                <div className="text-2xl font-black italic tracking-tighter">PREMIER LEAGUE</div>
                <div className="text-2xl font-black italic tracking-tighter">MLS NEXT PRO</div>
                <div className="text-2xl font-black italic tracking-tighter">LA LIGA ELITE</div>
                <div className="text-2xl font-black italic tracking-tighter">SERIE A YOUTH</div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-12 px-6 lg:px-12 bg-sidebar text-sidebar-foreground border-t border-sidebar-border">
        <div className="container mx-auto grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="w-6 h-6 bg-primary rounded flex items-center justify-center">
                <Shield className="text-white w-4 h-4" />
              </div>
              <span className="font-headline font-bold text-lg tracking-tight uppercase">SoccerOS</span>
            </div>
            <p className="text-sm text-sidebar-foreground/60 leading-relaxed">
              Advancing the beautiful game through technology, data, and human expertise.
            </p>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Platform</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/60">
              <li><Link href="/dashboard" className="hover:text-primary">Academy Dashboard</Link></li>
              <li><Link href="/selection" className="hover:text-primary">Player Selection</Link></li>
              <li><Link href="/scouting" className="hover:text-primary">Scouting Network</Link></li>
              <li><Link href="/analytics" className="hover:text-primary">Performance Analytics</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Company</h4>
            <ul className="space-y-2 text-sm text-sidebar-foreground/60">
              <li><Link href="#" className="hover:text-primary">About Us</Link></li>
              <li><Link href="#" className="hover:text-primary">Contact</Link></li>
              <li><Link href="#" className="hover:text-primary">Support</Link></li>
              <li><Link href="#" className="hover:text-primary">Privacy Policy</Link></li>
            </ul>
          </div>
          <div className="space-y-4">
            <h4 className="font-bold text-sm uppercase tracking-widest mb-4">Stay Updated</h4>
            <div className="flex gap-2">
              <input 
                placeholder="Email address" 
                className="bg-white/10 border-white/20 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary w-full"
              />
              <Button size="sm" className="bg-primary hover:bg-primary/90">Join</Button>
            </div>
          </div>
        </div>
        <div className="container mx-auto mt-12 pt-8 border-t border-white/5 text-center text-[10px] font-bold uppercase tracking-widest text-sidebar-foreground/40">
          © 2024 SoccerOS Operations. All Rights Reserved.
        </div>
      </footer>
    </div>
  );
}
