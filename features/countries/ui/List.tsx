import { Drawer, Stack, useTheme } from '@mui/material';
import Grid from '@mui/material/Unstable_Grid2';
import { memo, Suspense, useDeferredValue, useMemo, useState } from 'react';

import Skeleton from '../../../common/Skeleton';
import { useCountries } from '../core/use-countries';
import CountriesCard from './Card';
import CountriesDetail from './Detail';

function List({ search }: { search: string }) {
  const theme = useTheme();

  const [countryCode, setCountryCode] = useState('ID');
  const [hasOpen, setHasOpen] = useState(false);
  const countries = useCountries();
  const filteredCountries = useMemo(
    () =>
      countries.filter(
        (country) =>
          country.countryCode.toLowerCase().includes(search.toLowerCase()) ||
          country.name.toLowerCase().includes(search.toLowerCase())
      ),
    [search, countries]
  );
  const deferredCountries = useDeferredValue(filteredCountries);

  return (
    <>
      <Drawer
        anchor="right"
        open={hasOpen}
        onClose={() => setHasOpen(false)}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: {
              lg: '100%',
              xl: 'auto',
            },
          },
        }}
      >
        <Stack component="aside" spacing={2} sx={{ padding: 2 }}>
          <Suspense fallback={<Skeleton />}>
            <CountriesDetail
              countryCode={countryCode}
              closeModal={() => setHasOpen(false)}
            />
          </Suspense>
        </Stack>
      </Drawer>

      <Grid
        container
        spacing={{ xs: 2, md: 3 }}
        columns={{ xs: 4, sm: 8, md: 12 }}
      >
        {deferredCountries.map((country) => (
          <Grid
            key={country.countryCode}
            xs={2}
            sm={4}
            md={3}
            lg={2}
            xl={2}
            component="article"
            sx={{
              alignItems: 'center',
              justifyContent: 'space-evenly',
            }}
          >
            <CountriesCard
              country={country}
              setHasOpen={setHasOpen}
              setCountryCode={setCountryCode}
            />
          </Grid>
        ))}
      </Grid>
    </>
  );
}

export default memo(List);
