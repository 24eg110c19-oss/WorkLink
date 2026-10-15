// API Configuration with dynamic endpoint and intelligent fallbacks
export const API_BASE_URL =
  import.meta.env.VITE_API_URL || "http://localhost:8080/api";

export async function fetchWithFallback(url, options = {}, fallbackData = null) {
  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 4000);
    const response = await fetch(url, { ...options, signal: controller.signal });
    clearTimeout(timeoutId);

    if (!response.ok) {
      if (fallbackData !== null) return fallbackData;
      throw new Error(`Request failed with status ${response.status}`);
    }
    return await response.json();
  } catch (err) {
    if (fallbackData !== null) {
      return fallbackData;
    }
    throw err;
  }
}
