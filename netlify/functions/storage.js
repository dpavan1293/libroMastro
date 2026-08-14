import { getStore } from '@netlify/blobs';

function json(obj, status = 200) {
  return new Response(JSON.stringify(obj), {
    status,
    headers: { 'content-type': 'application/json' }
  });
}

export default async (req) => {
  // Protezione: il codice d'accesso deve corrispondere alla variabile
  // d'ambiente APP_PASSCODE impostata nelle impostazioni del sito su Netlify.
  const passcode = req.headers.get('x-app-passcode') || '';
  if (!process.env.APP_PASSCODE || passcode !== process.env.APP_PASSCODE) {
    return json({ error: 'unauthorized' }, 401);
  }

  const store = getStore('libro-mastro-data');
  const url = new URL(req.url);

  try {
    if (req.method === 'GET') {
      const key = url.searchParams.get('key');
      const prefix = url.searchParams.get('prefix');

      if (key) {
        const value = await store.get(key);
        return json({ key, value: value === null ? null : value });
      }
      const { blobs } = await store.list({ prefix: prefix || '' });
      return json({ keys: blobs.map(b => b.key) });
    }

    if (req.method === 'PUT' || req.method === 'POST') {
      const body = await req.json();
      if (!body || !body.key) return json({ error: 'missing key' }, 400);
      await store.set(body.key, body.value);
      return json({ key: body.key, value: body.value });
    }

    if (req.method === 'DELETE') {
      const key = url.searchParams.get('key');
      if (!key) return json({ error: 'missing key' }, 400);
      await store.delete(key);
      return json({ key, deleted: true });
    }

    return json({ error: 'method not allowed' }, 405);
  } catch (e) {
    return json({ error: String(e && e.message ? e.message : e) }, 500);
  }
};

export const config = { path: '/api/storage' };
