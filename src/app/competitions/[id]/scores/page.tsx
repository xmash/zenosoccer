import { redirect } from 'next/navigation';

/** Full fixture list lives on the competition overview page. */
export default async function CompetitionScoresRedirect({
  params,
  searchParams,
}: {
  params: Promise<{ id: string }>;
  searchParams: Promise<{ season?: string }>;
}) {
  const { id } = await params;
  const { season } = await searchParams;
  const query = season ? `?season=${season}` : '';
  redirect(`/competitions/${id}${query}`);
}
