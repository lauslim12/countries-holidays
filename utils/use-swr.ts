import swr from 'swr';

async function fetcher<T>(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<T>;
}

export function useSWR<T>(url: string) {
  return swr<T>(url, fetcher, { suspense: true });
}
