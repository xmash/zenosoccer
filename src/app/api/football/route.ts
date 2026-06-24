import { NextRequest, NextResponse } from 'next/server';
import { getApiFootballConfig } from '@/lib/api-football';
import {
  cachePathKey,
  getPersistentOrFetch,
  isAutoFetchAllowed,
  readPersistentCacheByPath,
} from '@/lib/api-football-store';
import { scheduleApiRequest } from '@/lib/api-football-queue';

function proxyHeaders(): Record<string, string> | null {
  const apisports = process.env.APISPORTS_KEY?.trim();
  const rapid = process.env.RAPIDAPI_KEY?.trim();
  const isRapid = (k: string) => k.includes('msh') && k.includes('jsn');

  if (apisports && !isRapid(apisports)) {
    return { 'x-apisports-key': apisports };
  }
  const rapidKey = rapid || (apisports && isRapid(apisports) ? apisports : '');
  if (rapidKey) {
    return {
      'X-RapidAPI-Key': rapidKey,
      'X-RapidAPI-Host': 'api-football-v1.p.rapidapi.com',
    };
  }
  return null;
}

const cors = { 'Access-Control-Allow-Origin': '*' };

export async function GET(req: NextRequest) {
  const headers = proxyHeaders();
  if (!headers) {
    return NextResponse.json({ message: 'No API key configured.' }, { status: 401, headers: cors });
  }

  const apiPath = req.nextUrl.searchParams.get('path') ?? '';
  if (!apiPath.startsWith('/')) {
    return NextResponse.json({ message: 'Invalid path.' }, { status: 400, headers: cors });
  }

  const key = cachePathKey(apiPath);
  const cached = await readPersistentCacheByPath<unknown[]>(apiPath);
  if (cached !== null) {
    return NextResponse.json({ response: cached, cached: true }, { headers: cors });
  }

  if (!isAutoFetchAllowed(apiPath)) {
    return NextResponse.json(
      { response: [], message: 'Not cached yet and auto-fetch disabled for this endpoint.' },
      { status: 404, headers: cors },
    );
  }

  const { baseUrl } = getApiFootballConfig();

  try {
    const { data } = await getPersistentOrFetch(
      key,
      async () => {
        const res = await scheduleApiRequest(async () => {
          const upstream = await fetch(`${baseUrl}${apiPath}`, { headers, cache: 'no-store' });
          const json = await upstream.json();
          if (!upstream.ok) {
            throw new Error(json.message ?? `Upstream HTTP ${upstream.status}`);
          }
          return json.response as unknown[];
        });
        return res;
      },
      { allowFetch: true },
    );

    return NextResponse.json({ response: data, cached: false }, { headers: cors });
  } catch (e) {
    const message = e instanceof Error ? e.message : 'Proxy fetch failed';
    return NextResponse.json({ response: [], message }, { status: 502, headers: cors });
  }
}
