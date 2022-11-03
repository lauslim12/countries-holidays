import swr, { type Key, type MutatorOptions, mutate } from 'swr';

export async function fetcher<T>(url: string) {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return response.json() as Promise<T>;
}

export function useSWR<T>(url: Key) {
  return swr<T>(url, fetcher, { suspense: true });
}

export function prefetch(
  url: Key,
  data?: any,
  opts?: boolean | MutatorOptions<any> | undefined
) {
  return mutate(url, data, opts);
}
