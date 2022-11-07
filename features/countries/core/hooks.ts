import { prefetch, useSWR } from '../../../utils/use-swr';
import { BASE_URL } from './const';
import { countriesSchema } from './schema';
import { CountryHoliday, countryHolidaysSchema } from './schema';
import { type CountryInfo, countryInfoSchema } from './schema';

export function useCountries() {
  const { data } = useSWR(`${BASE_URL}/AvailableCountries`);
  return countriesSchema.parse(data);
}

export function useCountry(countryCode: string) {
  const { data } = useSWR(`${BASE_URL}/CountryInfo/${countryCode}`);
  return countryInfoSchema.parse(data);
}

export function useHolidays(countryCode: string, year: number) {
  const { data } = useSWR(`${BASE_URL}/PublicHolidays/${year}/${countryCode}`);
  return countryHolidaysSchema.parse(data);
}

export async function prefetchCountry(countryCode: string) {
  return prefetch<CountryInfo>(`${BASE_URL}/CountryInfo/${countryCode}`);
}

export async function prefetchHolidays(countryCode: string, year: number) {
  return prefetch<CountryHoliday[]>(
    `${BASE_URL}/PublicHolidays/${year}/${countryCode}`
  );
}
