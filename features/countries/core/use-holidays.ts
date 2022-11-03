import { fetcher, prefetch, useSWR } from '../../../utils/use-swr';
import { BASE_URL } from './const';
import { countryHolidaysSchema } from './schema';

export function useHolidays(countryCode: string, year: number) {
  const { data } = useSWR(`${BASE_URL}/PublicHolidays/${year}/${countryCode}`);
  return countryHolidaysSchema.parse(data);
}

export function prefetchHolidays(countryCode: string, year: number) {
  const url = `${BASE_URL}/PublicHolidays/${year}/${countryCode}`;

  return prefetch(
    url,
    fetcher(url).then((res) => res)
  );
}
