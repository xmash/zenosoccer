import { trustPartners } from '@/config/footer';

export function LogoCloud() {
  return (
    <section className="section border-y bg-muted/20">
      <div className="section-inner">
        <div className="flex flex-col items-center justify-center space-y-8">
          <h2 className="text-xl font-bold uppercase tracking-[0.2em] text-muted-foreground">
            Chosen by Elite Academies
          </h2>
          <div className="flex flex-wrap justify-center gap-12 opacity-50 grayscale md:gap-24">
            {trustPartners.map((partner) => (
              <div
                key={partner}
                className="text-2xl font-black italic tracking-tighter"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
