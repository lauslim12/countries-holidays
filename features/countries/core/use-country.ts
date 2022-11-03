import { fetcher, prefetch, useSWR } from '../../../utils/use-swr';
import { BASE_URL } from './const';
import { type CountryInfo, countryInfoSchema } from './schema';

export function useCountry(countryCode: string) {
  const { data } = useSWR(`${BASE_URL}/CountryInfo/${countryCode}`);
  return countryInfoSchema.parse(data);
}

export function prefetchCountry(countryCode: string) {
  const url = `${BASE_URL}/CountryInfo/${countryCode}`;

  return prefetch(
    url,
    fetcher<CountryInfo>(url).then((res) => res)
  );
}
