const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  "X-App-Country": Shopify.country,
  "X-App-Locale": Shopify.locale,
  "X-App-Theme": String(Shopify.theme.id),
};

export async function ggtFetch<T = any>(input: RequestInfo, init?: RequestInit): Promise<T> {
  const headers = {
    ...defaultHeaders,
    ...(init?.headers || {}),
  };

  const response = await fetch(input, {
    ...init,
    headers,
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  return response.json();
}

window.ggtFetch = ggtFetch;
