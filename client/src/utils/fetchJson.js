const API_BASE_URL = import.meta.env.VITE_API_URL || "";

export async function fetchJson(url, options = {}) {
  const fullUrl = `${API_BASE_URL}${url}`;
  const res = await fetch(fullUrl, options);

  // Try to fail fast on non-2xx but still parse any JSON body if present.
  if (!res.ok) {
    const text = await res.text();
    if (!text) {
      throw new Error(`Request failed with status ${res.status}`);
    }
    try {
      const data = JSON.parse(text);
      throw new Error(data?.message || `Request failed with status ${res.status}`);
    } catch {
      throw new Error(`Request failed with status ${res.status}`);
    }
  }

  // Success response: body may be empty -> prevent "Unexpected end of JSON input".
  const text = await res.text();
  if (!text) return null;
  return JSON.parse(text);
}

