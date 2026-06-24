import Link from 'next/link';
import { cn } from '@/lib/utils';

export type PageHeaderProps = {
  title: string;
  description?: string;
  eyebrow?: string;
  tone?: 'dark' | 'light';
  layout?: 'narrow' | 'wide';
  back?: { href: string; label: string };
  leading?: React.ReactNode;
  children?: React.ReactNode;
};

export function PageHeader({
  title,
  description,
  eyebrow,
  tone = 'light',
  layout = 'narrow',
  back,
  leading,
  children,
}: PageHeaderProps) {
  const isDark = tone === 'dark';

  return (
    <section
      className={cn(
        'page-header',
        isDark ? 'banner-surface' : 'banner-surface-light',
      )}
    >
      <div className={cn('section-inner', layout === 'narrow' && 'max-w-3xl')}>
        {back ? (
          <Link
            href={back.href}
            className={cn(
              'mb-4 inline-block text-base transition-colors hover:text-foreground',
              isDark ? 'text-sidebar-foreground/70' : 'text-muted-foreground',
            )}
          >
            ← {back.label}
          </Link>
        ) : null}
        {eyebrow ? <p className="eyebrow mb-3">{eyebrow}</p> : null}
        <div className="flex items-start gap-4 md:gap-5">
          {leading}
          <div className="min-w-0 flex-1">
            <h1 className="font-headline text-4xl font-bold tracking-tight md:text-5xl lg:text-6xl">
              {title}
            </h1>
            {description ? (
              <p
                className={cn(
                  'mt-4 text-lg md:text-xl',
                  isDark ? 'text-sidebar-foreground/80' : 'text-muted-foreground',
                )}
              >
                {description}
              </p>
            ) : null}
          </div>
        </div>
        {children ? <div className="mt-6">{children}</div> : null}
      </div>
    </section>
  );
}

/** @deprecated Use PageHeader — default tone is light */
export function PageBanner(props: Omit<PageHeaderProps, 'tone'> & { description: string }) {
  return <PageHeader {...props} />;
}
