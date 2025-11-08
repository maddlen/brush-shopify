const defaultHeaders: Record<string, string> = {
  "Content-Type": "application/json",
  "X-App-Country": Shopify.country,
  "X-App-Locale": Shopify.locale,
  "X-App-Currency": Shopify.currency.active,
  "X-App-Theme": String(Shopify.theme.id),
};

export async function ggtFetch<T = any>(input: RequestInfo, init?: RequestInit): Promise<T | Blob> {
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

  const contentType = response.headers.get("Content-Type") || "";

  if (contentType.includes("application/json")) {
    return response.json();
  } else if (contentType.includes("application/pdf")) {
    return response.blob(); // returns a Blob for PDF
  } else {
    // fallback to text for other types
    return response.text() as unknown as T;
  }
}

window.ggtFetch = ggtFetch;
