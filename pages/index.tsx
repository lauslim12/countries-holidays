import { GitHub, SearchOutlined as Search } from '@mui/icons-material';
import {
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from '@mui/material';
import { memo, Suspense, useState } from 'react';

import Layout from '../common/Layout';
import Skeleton from '../common/Skeleton';
import { Countries } from '../features/countries';

function Home() {
  const [search, setSearch] = useState('');

  return (
    <Layout>
      <Stack spacing={2} alignItems="stretch" width="100%" textAlign="center">
        <Typography
          variant="h2"
          component="h1"
          textAlign="center"
          fontWeight="bold"
        >
          Countries Holidays
        </Typography>

        <Typography variant="h4" component="h2">
          Find out{' '}
          <Typography
            variant="h4"
            component="span"
            sx={{ color: 'rgba(155, 89, 182, 1)' }}
            fontWeight="bold"
          >
            holidays
          </Typography>{' '}
          and{' '}
          <Typography
            variant="h4"
            component="span"
            sx={{ color: 'rgba(107, 217, 104, 1)' }}
            fontWeight="bold"
          >
            special days
          </Typography>{' '}
          from{' '}
          <Typography
            variant="h4"
            component="span"
            sx={{ color: 'rgba(254, 204, 27, 1)' }}
            fontWeight="bold"
          >
            over 90 countries!
          </Typography>
        </Typography>

        <Typography variant="h5" component="h3">
          For the year{' '}
          <Typography
            variant="h5"
            component="span"
            sx={{ color: 'rgba(255, 73, 73, 1)' }}
            fontWeight="bold"
          >
            {new Date().getFullYear()}
          </Typography>
        </Typography>

        <TextField
          fullWidth
          label="Search Country"
          id="country-search"
          placeholder="Write the country code here to find the country automatically. This search is powered by React 18's `useDeferredValue` API!"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <Search />
              </InputAdornment>
            ),
          }}
          value={search}
          onChange={({ currentTarget: { value } }) => setSearch(value)}
        />
      </Stack>

      <Stack alignItems="stretch" width="100%" sx={{ marginTop: 4 }}>
        <Countries.ErrorBoundary>
          <Suspense fallback={<Skeleton />}>
            <Countries.List search={search} />
          </Suspense>
        </Countries.ErrorBoundary>
      </Stack>

      <Stack component="footer" sx={{ paddingTop: 4 }}>
        <Tooltip title="GitHub Repository" arrow>
          <IconButton
            aria-label="GitHub Repository"
            size="large"
            href="https://github.com/lauslim12/countries-holidays"
            rel="noopener noreferrer"
            target="_blank"
          >
            <GitHub />
          </IconButton>
        </Tooltip>
      </Stack>
    </Layout>
  );
}

export default memo(Home);
