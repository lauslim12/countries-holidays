import {
  Button,
  Divider,
  List,
  ListItem,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { memo } from 'react';

import getFlagEmoji from '../../../utils/get-flag-emoji';
import { useCountry } from '../core/useCountry';
import { useHolidays } from '../core/useHolidays';

type Props = {
  countryCode: string;
  closeModal: () => void;
};

function Detail({ countryCode, closeModal }: Props) {
  const country = useCountry(countryCode);
  const holidays = useHolidays(countryCode, new Date().getFullYear());

  return (
    <>
      <Typography variant="h4" component="h1">
        {countryCode} &mdash; {getFlagEmoji(countryCode)}
      </Typography>

      <Typography paragraph>
        {country.commonName} ({country.officialName}), is a country located in
        the region of {country.region}. It&apos;s country code is written with
        the characters {country.countryCode}.
      </Typography>

      <Divider />

      <Typography variant="h6" paragraph>
        Borders
      </Typography>

      {country.borders.length ? (
        <>
          <Typography paragraph>
            {country.officialName} has neighboring countries, namely:
          </Typography>
          <List disablePadding>
            {country.borders.map((border) => (
              <ListItem key={border.countryCode}>
                &bull; {border.commonName} ({border.countryCode})
              </ListItem>
            ))}
          </List>
        </>
      ) : (
        <Typography paragraph>
          It appears that {country.officialName} does not have any neighboring
          countries!
        </Typography>
      )}

      <Divider />

      <Typography variant="h6" paragraph>
        Holidays
      </Typography>

      <Typography paragraph>
        Moreover, {country.officialName} also has several holidays, which are
        described in the following table (table is scrollable on mobile!):
      </Typography>

      <TableContainer component={Paper}>
        <Table size="small" aria-label="Holidays table of the country">
          <caption>Table of holidays of the {country.officialName}.</caption>
          <TableHead>
            <TableRow>
              <TableCell>Date</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Local Name</TableCell>
              <TableCell>Fixed</TableCell>
              <TableCell>Global</TableCell>
              <TableCell>Types</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {holidays.map((holiday) => (
              <TableRow key={`${holiday.localName}-${holiday.date}`}>
                <TableCell>{holiday.date}</TableCell>
                <TableCell>{holiday.name}</TableCell>
                <TableCell>{holiday.localName}</TableCell>
                <TableCell>{holiday.fixed ? 'Yes' : 'No'}</TableCell>
                <TableCell>{holiday.global ? 'Yes' : 'No'}</TableCell>
                <TableCell>{holiday.types.toString()}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Divider />

      <Typography variant="h6" paragraph>
        Thanks!
      </Typography>

      <Typography paragraph>
        Thanks for visiting this page! Let us look for another country&apos;s
        holidays!
      </Typography>

      <Button
        aria-label={`${country.countryCode}-details-close`}
        variant="outlined"
        onClick={closeModal}
      >
        Close and return to homepage
      </Button>
    </>
  );
}

export default memo(Detail);
