/** Dashboard key from api-football.com — not a RapidAPI key (msh/jsn format). */
export function getDashboardApiKey(): string | null {
  const key = process.env.APISPORTS_KEY?.trim();
  if (!key) return null;
  if (key.includes('msh') && key.includes('jsn')) return null;
  return key;
}
