import { DeleteObjectCommand, GetObjectCommand, PutObjectCommand, S3Client } from '@aws-sdk/client-s3';

export type StoredEntry<T> = { fetchedAt: string; data: T };

let client: S3Client | null = null;

export function isR2Configured(): boolean {
  return Boolean(
    process.env.R2_ACCOUNT_ID?.trim() &&
      process.env.R2_ACCESS_KEY_ID?.trim() &&
      process.env.R2_SECRET_ACCESS_KEY?.trim() &&
      process.env.R2_BUCKET_NAME?.trim(),
  );
}

/** When R2 is the cache source, skip upstream API unless explicitly allowed. */
export function isUpstreamFetchEnabled(): boolean {
  if (process.env.API_FOOTBALL_ALLOW_FETCH?.trim() === '1') return true;
  if (isR2Configured()) return false;
  return true;
}

function r2Prefix(): string {
  const raw = process.env.R2_PREFIX?.trim();
  if (!raw) return 'api-football/';
  return raw.endsWith('/') ? raw : `${raw}/`;
}

function getR2Client(): S3Client {
  if (client) return client;
  const accountId = process.env.R2_ACCOUNT_ID!.trim();
  client = new S3Client({
    region: 'auto',
    endpoint: process.env.R2_ENDPOINT?.trim() || `https://${accountId}.r2.cloudflarestorage.com`,
    credentials: {
      accessKeyId: process.env.R2_ACCESS_KEY_ID!.trim(),
      secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!.trim(),
    },
  });
  return client;
}

export function r2ObjectKey(cacheKey: string): string {
  const safe = cacheKey.replace(/[^a-zA-Z0-9._-]/g, '_');
  return `${r2Prefix()}${safe}.json`;
}

async function streamToString(body: unknown): Promise<string> {
  if (!body) return '';
  if (typeof body === 'string') return body;
  if (body instanceof Uint8Array) return new TextDecoder().decode(body);
  if (typeof (body as NodeJS.ReadableStream).pipe === 'function') {
    const chunks: Buffer[] = [];
    for await (const chunk of body as AsyncIterable<Buffer>) {
      chunks.push(Buffer.from(chunk));
    }
    return Buffer.concat(chunks).toString('utf8');
  }
  if (typeof (body as { transformToString?: () => Promise<string> }).transformToString === 'function') {
    return (body as { transformToString: () => Promise<string> }).transformToString();
  }
  return '';
}

export async function readR2Cache<T>(cacheKey: string): Promise<T | null> {
  if (!isR2Configured()) return null;
  try {
    const res = await getR2Client().send(
      new GetObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!.trim(),
        Key: r2ObjectKey(cacheKey),
      }),
    );
    const text = await streamToString(res.Body);
    if (!text) return null;
    const parsed = JSON.parse(text) as StoredEntry<T>;
    return parsed.data ?? null;
  } catch (err) {
    const code = (err as { name?: string; $metadata?: { httpStatusCode?: number } }).name;
    const status = (err as { $metadata?: { httpStatusCode?: number } }).$metadata?.httpStatusCode;
    if (code === 'NoSuchKey' || status === 404) return null;
    console.error('[r2-cache] read failed', cacheKey, err);
    return null;
  }
}

export async function writeR2Cache<T>(cacheKey: string, data: T): Promise<void> {
  if (!isR2Configured()) return;
  const entry: StoredEntry<T> = { fetchedAt: new Date().toISOString(), data };
  await getR2Client().send(
    new PutObjectCommand({
      Bucket: process.env.R2_BUCKET_NAME!.trim(),
      Key: r2ObjectKey(cacheKey),
      Body: JSON.stringify(entry),
      ContentType: 'application/json',
    }),
  );
}

export async function deleteR2Cache(cacheKey: string): Promise<void> {
  if (!isR2Configured()) return;
  try {
    await getR2Client().send(
      new DeleteObjectCommand({
        Bucket: process.env.R2_BUCKET_NAME!.trim(),
        Key: r2ObjectKey(cacheKey),
      }),
    );
  } catch {
    // ignore missing keys
  }
}
