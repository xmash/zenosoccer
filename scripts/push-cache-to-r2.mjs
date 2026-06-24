/**
 * Upload local .data/api-football/*.json to Cloudflare R2 (one-time / when cache changes).
 *
 * Usage:
 *   node scripts/push-cache-to-r2.mjs
 *
 * Requires in .env.local or environment:
 *   R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, R2_BUCKET_NAME
 *   optional: R2_PREFIX (default api-football/)
 */

import { readFileSync, readdirSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { PutObjectCommand, S3Client } from '@aws-sdk/client-s3';
import dotenv from 'dotenv';

const root = path.join(path.dirname(fileURLToPath(import.meta.url)), '..');
dotenv.config({ path: path.join(root, '.env.local') });

const accountId = process.env.R2_ACCOUNT_ID?.trim();
const accessKeyId = process.env.R2_ACCESS_KEY_ID?.trim();
const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY?.trim();
const bucket = process.env.R2_BUCKET_NAME?.trim();
const prefixRaw = process.env.R2_PREFIX?.trim() || 'api-football/';
const prefix = prefixRaw.endsWith('/') ? prefixRaw : `${prefixRaw}/`;

if (!accountId || !accessKeyId || !secretAccessKey || !bucket) {
  console.error('Missing R2_ACCOUNT_ID, R2_ACCESS_KEY_ID, R2_SECRET_ACCESS_KEY, or R2_BUCKET_NAME');
  process.exit(1);
}

const client = new S3Client({
  region: 'auto',
  endpoint: process.env.R2_ENDPOINT?.trim() || `https://${accountId}.r2.cloudflarestorage.com`,
  credentials: { accessKeyId, secretAccessKey },
});

const cacheDir = path.join(root, '.data', 'api-football');
const files = readdirSync(cacheDir).filter((f) => f.endsWith('.json'));

if (files.length === 0) {
  console.error('No cache files in .data/api-football/ — fetch data locally first.');
  process.exit(1);
}

console.log(`Uploading ${files.length} file(s) to R2 bucket "${bucket}" …`);

for (const file of files) {
  const body = readFileSync(path.join(cacheDir, file), 'utf8');
  const key = `${prefix}${file}`;
  await client.send(
    new PutObjectCommand({
      Bucket: bucket,
      Key: key,
      Body: body,
      ContentType: 'application/json',
    }),
  );
  console.log(`  ✓ ${key}`);
}

console.log('Done. Production with R2 env vars will read from R2 — no API calls unless API_FOOTBALL_ALLOW_FETCH=1.');
