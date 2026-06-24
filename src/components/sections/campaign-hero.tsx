import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { heroCta } from '@/config/navigation';
import { site } from '@/config/site';

export function CampaignHero() {
  return (
    <section className="banner-surface relative w-full overflow-hidden py-12 md:py-24 lg:py-32 xl:py-48">
      <div className="absolute inset-0 z-0 opacity-20">
        <Image
          src="https://picsum.photos/seed/soc1/1200/600"
          alt=""
          fill
          className="object-cover"
          priority
        />
      </div>
      <div className="section-inner relative z-10">
        <div className="flex flex-col items-center space-y-4 text-center">
          <div className="space-y-2">
            <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
              The <span className="text-primary italic">Zen of Soccer</span> Operations
            </h1>
            <p className="mx-auto max-w-[700px] font-body text-sidebar-foreground/80 md:text-xl">
              {site.description}
            </p>
          </div>
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <Link href={heroCta.primary.href}>
              <Button size="lg" className="group h-14 gap-2 px-8 text-lg font-bold">
                {heroCta.primary.label}
                <ArrowRight className="h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/competitions">
              <Button
                variant="outline"
                size="lg"
                className="h-14 border-white/20 bg-white/10 px-8 text-lg font-bold text-white hover:bg-white/20"
              >
                🏆 FIFA World Cup
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
