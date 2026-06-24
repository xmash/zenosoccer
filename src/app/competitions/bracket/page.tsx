import { redirect } from 'next/navigation';

/** Knockout rounds live on the tournament page (FIFA tabs). */
export default function GlobalBracketPage() {
  redirect('/competitions/wc2026?season=2022&tab=standings');
}
