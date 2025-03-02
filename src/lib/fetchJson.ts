export async function fetchJson<T>(url: string): Promise<T> {
  const res: Response = await fetch(url);
  if (!res.ok) throw new Error(`Failed to fetch [${url}] : ${res.status}`);
  return res.json();
}
