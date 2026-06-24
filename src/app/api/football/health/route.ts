import { NextResponse } from 'next/server';
import { getApiFootballStatus } from '@/lib/api-football';

export const dynamic = 'force-dynamic';

export async function GET() {  const status = await getApiFootballStatus();
  return NextResponse.json(status, { status: status.ok ? 200 : 503 });
}
