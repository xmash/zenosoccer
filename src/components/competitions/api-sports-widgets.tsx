'use client';

import Script from 'next/script';

type Props = {
  apiKey: string;
  leagueId: number;
  season: number;
  theme?: 'white' | 'grey' | 'dark' | 'blue';
};

/**
 * Embeds API-Football v3 widgets (games, schedule, standings).
 * @see https://www.api-football.com/news/post/fifa-world-cup-2026-using-api-sports-widgets
 * @see https://api-sports.io/documentation/widgets/v3
 */
export function ApiSportsWidgets({ apiKey, leagueId, season, theme = 'grey' }: Props) {
  return (
    <>
      <Script
        src="https://widgets.api-sports.io/3.1.0/widgets.js"
        type="module"
        strategy="afterInteractive"
      />
      <div className="api-sports-widgets space-y-6 min-h-[320px]">
        {/* eslint-disable-next-line @typescript-eslint/ban-ts-comment */}
        {/* @ts-expect-error custom element */}
        <api-sports-widget
          data-type="config"
          data-sport="football"
          data-key={apiKey}
          data-lang="en"
          data-theme={theme}
          data-show-logos="true"
          data-show-error="true"
          data-refresh="30"
          data-standings="true"
        />
        {/* @ts-expect-error custom element */}
        <api-sports-widget
          data-type="league"
          data-league={String(leagueId)}
          data-season={String(season)}
          data-standings="true"
          data-tab="games"
        />
        {/* @ts-expect-error custom element */}
        <api-sports-widget
          data-type="standings"
          data-league={String(leagueId)}
          data-season={String(season)}
        />
      </div>
    </>
  );
}
