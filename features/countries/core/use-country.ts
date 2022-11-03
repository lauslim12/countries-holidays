import { useSWR } from '../../../utils/use-swr';
import { BASE_URL } from './const';
import { countryInfoSchema } from './schema';

export function useCountry(countryCode: string) {
  const { data } = useSWR(`${BASE_URL}/CountryInfo/${countryCode}`);
  return countryInfoSchema.parse(data);
}
