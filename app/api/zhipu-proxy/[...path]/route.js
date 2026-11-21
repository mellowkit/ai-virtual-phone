
export async function POST(request) {
  const url = new URL(request.url);
  const path = url.pathname.replace('/api/zhipu-proxy', '');
  const targetUrl = 'https://open.bigmodel.cn/api/paas/v4' + path;

  const auth = request.headers.get('authorization') || request.headers.get('Authorization') || '';

  const body = await request.text();

  const response = await fetch(targetUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': auth,
    },
    body: body,
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
    status: 204,
    headers: {
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Methods': 'POST, GET, OPTIONS',
      'Access-Control-Allow-Headers': 'Content-Type, Authorization',
    },
  });
}
