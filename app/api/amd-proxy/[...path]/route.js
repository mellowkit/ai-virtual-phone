export async function POST(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/amd-proxy', '');
  const targetUrl = 'https://developer.amd.com.cn/radeon/api/v1' + path;

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: request.headers,
    body: await request.text(),
  });

  const data = await response.text();
  return new Response(data, {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function GET(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/amd-proxy', '');
  const targetUrl = 'https://developer.amd.com.cn/radeon/api/v1' + path;

  const response = await fetch(targetUrl, {
    method: 'GET',
    headers: request.headers,
  });

  const data = await response.text();
  return new Response(data, {
    status: response.status,
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
}

export async function OPTIONS() {
  return new Response(null, {
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
      'Access-Control-Allow-Headers': '*',
    },
  });
}
