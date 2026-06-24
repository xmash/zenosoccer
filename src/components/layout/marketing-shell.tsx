import { MarketingFooter } from './marketing-footer';
import { MarketingHeader } from './marketing-header';

export function MarketingShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <MarketingHeader />
      <main className="page-main flex flex-1 flex-col">{children}</main>
      <MarketingFooter />
    </div>
  );
}
