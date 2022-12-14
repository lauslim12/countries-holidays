import {
  Button,
  Card as MuiCard,
  CardActions,
  CardContent,
  Typography,
} from '@mui/material';
import { type Dispatch, type SetStateAction, memo } from 'react';

import { getFlagEmoji } from '../../../utils/get-flag-emoji';
import { prefetchCountry, prefetchHolidays } from '../core/hooks';
import type { Country } from '../core/schema';

type Props = {
  country: Country;
  setCountryCode: Dispatch<SetStateAction<string>>;
  setHasOpen: Dispatch<SetStateAction<boolean>>;
};

function Card({ country, setCountryCode, setHasOpen }: Props) {
  const prefetchDrawerData = async () => {
    await Promise.all([
      prefetchCountry(country.countryCode),
      prefetchHolidays(country.countryCode, new Date().getFullYear()),
    ]);
  };

  return (
    <MuiCard
      variant="outlined"
      sx={{
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          Country
        </Typography>

        <Typography variant="h5" component="div">
          {country.countryCode}
        </Typography>

        <Typography sx={{ mb: 1.5 }} color="text.secondary">
          {getFlagEmoji(country.countryCode)}
        </Typography>

        <Typography variant="body2">{country.name}</Typography>
      </CardContent>

      <CardActions>
        <Button
          size="small"
          aria-label={`${country.countryCode}-details`}
          onMouseEnter={prefetchDrawerData}
          onFocus={prefetchDrawerData}
          onClick={() => {
            setCountryCode(country.countryCode);
            setHasOpen(true);
          }}
        >
          Detail
        </Button>
      </CardActions>
    </MuiCard>
  );
}

export default memo(Card);
