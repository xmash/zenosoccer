import { redirect } from 'next/navigation';

/** Bracket is a global view — one knockout tree, not per league. */
export default function CompetitionBracketRedirect() {
  redirect('/competitions/bracket');
}
