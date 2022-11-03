import { prefetch, useSWR } from '../../../utils/use-swr';
import { BASE_URL } from './const';
import { CountryHoliday, countryHolidaysSchema } from './schema';

export function useHolidays(countryCode: string, year: number) {
  const { data } = useSWR(`${BASE_URL}/PublicHolidays/${year}/${countryCode}`);
  return countryHolidaysSchema.parse(data);
}

export function prefetchHolidays(countryCode: string, year: number) {
  return prefetch<CountryHoliday[]>(
    `${BASE_URL}/PublicHolidays/${year}/${countryCode}`
  );
}
