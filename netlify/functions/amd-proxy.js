const AMD_BASE = 'https://developer.amd.com.cn/radeon/api/v1';

export default async function handler(request) {
  if (request.method === 'OPTIONS') {
    return new Response(null, {
      status: 204,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
        'Access-Control-Allow-Headers': 'Content-Type, Authorization',
      },
    });
  }

  const url = new URL(request.url);
  const targetPath = url.pathname.replace('/.netlify/functions/amd-proxy', '') || '';
  const targetUrl = AMD_BASE + targetPath + url.search;

  const headers = {};
  request.headers.forEach((v, k) => {
    if (k !== 'host') headers[k] = v;
  });

  const body = request.method !== 'GET' ? await request.text() : undefined;

  const res = await fetch(targetUrl, {
    method: request.method,
    headers,
    body,
  });

  const data = await res.text();

  return new Response(data, {
    status: res.status,
    headers: {
      'Content-Type': res.headers.get('Content-Type') || 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}
