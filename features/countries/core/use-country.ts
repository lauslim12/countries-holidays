import { prefetch, useSWR } from '../../../utils/use-swr';
import { BASE_URL } from './const';
import { type CountryInfo, countryInfoSchema } from './schema';

export function useCountry(countryCode: string) {
  const { data } = useSWR(`${BASE_URL}/CountryInfo/${countryCode}`);
  return countryInfoSchema.parse(data);
}

export async function prefetchCountry(countryCode: string) {
  return prefetch<CountryInfo>(`${BASE_URL}/CountryInfo/${countryCode}`);
}
