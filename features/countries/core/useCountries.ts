import { useSWR } from '../../../utils/use-swr';
import { BASE_URL } from './const';
import { countriesSchema } from './schema';

export function useCountries() {
  const { data } = useSWR(`${BASE_URL}/AvailableCountries`);
  return countriesSchema.parse(data);
}
