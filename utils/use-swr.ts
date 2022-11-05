import swr, { type Key, mutate } from 'swr';

async function fetcher<T>(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<T>;
}

export function useSWR<T>(url: Key) {
  return swr<T>(url, fetcher, { suspense: true });
}

export async function prefetch<T>(url: string) {
  return mutate(
    url,
    fetcher<T>(url).then((res) => res)
  );
}
