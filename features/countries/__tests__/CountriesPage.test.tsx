import { screen } from '@testing-library/react';
import { rest } from 'msw';
import { setupServer } from 'msw/node';
import { SWRConfig } from 'swr';

import CountriesPage from '../../../pages/index';
import { renderWithProviders } from '../../../utils/test-utils';

/**
 * Sample mock data to be used for tests.
 */
const data = {
  allCountries: [
    {
      countryCode: 'AD',
      name: 'Andorra',
    },
    {
      countryCode: 'AL',
      name: 'Albania',
    },
    {
      countryCode: 'AR',
      name: 'Argentina',
    },
    {
      countryCode: 'ID',
      name: 'Indonesia',
    },
    {
      countryCode: 'JP',
      name: 'Japan',
    },
  ],

  indonesiaDetails: {
    commonName: 'Indonesia',
    officialName: 'Republic of Indonesia',
    countryCode: 'ID',
    region: 'Asia',
    borders: [
      {
        commonName: 'Timor-Leste',
        officialName: 'Democratic Republic of Timor-Leste',
        countryCode: 'TL',
        region: 'Asia',
        borders: null,
      },
      {
        commonName: 'Malaysia',
        officialName: 'Malaysia',
        countryCode: 'MY',
        region: 'Asia',
        borders: null,
      },
      {
        commonName: 'Papua New Guinea',
        officialName: 'Independent State of Papua New Guinea',
        countryCode: 'PG',
        region: 'Oceania',
        borders: null,
      },
    ],
  },

  indonesiaHolidays: [
    {
      date: '2022-01-01',
      localName: 'Tahun Baru Masehi',
      name: "New Year's Day",
      countryCode: 'ID',
      fixed: true,
      global: false, // I know this is supposed to be `true` in the actual API response and with common sense, but this is just for testing purposes.
      counties: null,
      launchYear: null,
      types: ['Public'],
    },
    {
      date: '2022-04-15',
      localName: 'Wafat Isa Almasih',
      name: 'Good Friday',
      countryCode: 'ID',
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ['Public'],
    },
    {
      date: '2022-04-17',
      localName: 'Paskah',
      name: 'Easter Sunday',
      countryCode: 'ID',
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ['Public'],
    },
  ],

  japanDetails: {
    commonName: 'Japan',
    officialName: 'Japan',
    countryCode: 'JP',
    region: 'Asia',
    borders: [],
  },

  japanHolidays: [
    {
      date: '2022-01-01',
      localName: '元日',
      name: "New Year's Day",
      countryCode: 'JP',
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ['Public'],
    },
    {
      date: '2022-01-10',
      localName: '成人の日',
      name: 'Coming of Age Day',
      countryCode: 'JP',
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ['Public'],
    },
    {
      date: '2022-02-11',
      localName: '建国記念の日',
      name: 'Foundation Day',
      countryCode: 'JP',
      fixed: false,
      global: true,
      counties: null,
      launchYear: null,
      types: ['Public'],
    },
  ],
};

/**
 * Provides the base URL for our API.
 */
const apiBaseUrl = 'https://date.nager.at/api/v3';

/**
 * All handler definitions for MSW (Mock Service Worker) to test APIs.
 */
const handlers = [
  rest.get(`${apiBaseUrl}/AvailableCountries`, (req, res, ctx) => {
    return res(ctx.json(data.allCountries));
  }),

  rest.get(`${apiBaseUrl}/CountryInfo/ID`, (req, res, ctx) => {
    return res(ctx.json(data.indonesiaDetails));
  }),

  rest.get(`${apiBaseUrl}/CountryInfo/JP`, (req, res, ctx) => {
    return res(ctx.json(data.japanDetails));
  }),

  rest.get(`${apiBaseUrl}/PublicHolidays/2022/ID`, (req, res, ctx) => {
    return res(ctx.json(data.indonesiaHolidays));
  }),

  rest.get(`${apiBaseUrl}/PublicHolidays/2022/JP`, (req, res, ctx) => {
    return res(ctx.json(data.japanHolidays));
  }),
];

/**
 * Creates a server for our usage.
 */
const server = setupServer(...handlers);

/**
 * - Enable API mocking before tests.
 * - Reset any runtime request handlers we may add during the tests.
 * - Disable API mocking after the tests are done.
 */
beforeAll(() => server.listen());
afterEach(() => server.resetHandlers());
afterAll(() => server.close());

/**
 * Run our tests.
 */
test('renders without crashing', async () => {
  renderWithProviders(<CountriesPage />);
  expect(screen.getByText(/countries holidays/i)).toBeInTheDocument();
});

test('renders the proper countries', async () => {
  renderWithProviders(<CountriesPage />);
  expect(await screen.findByText('Andorra')).toBeInTheDocument();
  expect(await screen.findByText('Albania')).toBeInTheDocument();
  expect(await screen.findByText('Argentina')).toBeInTheDocument();
  expect(await screen.findByText('Japan')).toBeInTheDocument();
});

test('renders buttons to be clicked', async () => {
  renderWithProviders(<CountriesPage />);
  expect(await screen.findByLabelText('AD-details')).toBeInTheDocument();
  expect(await screen.findByLabelText('AL-details')).toBeInTheDocument();
  expect(await screen.findByLabelText('AR-details')).toBeInTheDocument();
  expect(await screen.findByLabelText('JP-details')).toBeInTheDocument();
});

test('renders the side drawer and ensures it can be interactive', async () => {
  const { user } = renderWithProviders(<CountriesPage />);

  // Verifies that the button exists and click on it.
  expect(await screen.findByLabelText('ID-details')).toBeInTheDocument();
  await user.click(screen.getByLabelText('ID-details'));

  // Wait, and ensure that the side drawer has opened, revealing Indonesia's information.
  expect(
    await screen.findByText(
      "Indonesia (Republic of Indonesia), is a country located in the region of Asia. It's country code is written with the characters ID."
    )
  ).toBeInTheDocument();

  // Click on the button to close the details drawer.
  expect(await screen.findByLabelText('ID-details-close')).toBeInTheDocument();
  await user.click(screen.getByLabelText('ID-details-close'));

  // Make sure 'JP' exists, then click it again.
  expect(await screen.findByLabelText('JP-details')).toBeInTheDocument();
  await user.click(screen.getByLabelText('JP-details'));

  // Ensure that the side drawer has opened again, this time revealing Japan's information.
  expect(
    await screen.findByText(
      "Japan (Japan), is a country located in the region of Asia. It's country code is written with the characters JP."
    )
  ).toBeInTheDocument();

  // Press the `ESC` key to close the drawer.
  await user.keyboard('{Escape}');

  // 'JP' should still be mounted, albeit hidden.
  expect(
    screen.queryByText(
      "Japan (Japan), is a country located in the region of Asia. It's country code is written with the characters JP."
    )
  ).toBeInTheDocument();

  // 'ID' shoud not be mounted.
  expect(
    screen.queryByText(
      "Indonesia (Republic of Indonesia), is a country located in the region of Asia. It's country code is written with the characters ID."
    )
  ).not.toBeInTheDocument();
});

test('ensures that the search functionality works', async () => {
  const { user } = renderWithProviders(<CountriesPage />);

  // Ensures that the search bar exists.
  expect(screen.getByLabelText('Search Country')).toBeInTheDocument();

  // Type something in the bar, this time it should show the filtered countries.
  await user.type(screen.getByLabelText('Search Country'), 'ID');
  expect(screen.queryByText('Japan')).toBeNull();
  expect(await screen.findByText('Indonesia')).toBeInTheDocument();
});

test('ensures error boundary works', async () => {
  // Suppress `console.error` - we know that the page will throw an error if the `ErrorBoundary` is called.
  const consoleErrorFn = jest
    .spyOn(console, 'error')
    .mockImplementation(() => jest.fn());

  // Use our broken HTTP request.
  server.use(
    rest.get(`${apiBaseUrl}/AvailableCountries`, (req, res, ctx) => {
      res.networkError('Encountered a network error! Please try again!');
    })
  );

  // Render our page.
  renderWithProviders(
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      <CountriesPage />
    </SWRConfig>
  );

  // Ensure the our error boundary is rendered.
  expect(
    await screen.findByText(
      'We are sorry! We have encountered an error! Please try refreshing the page! 🙏'
    )
  ).toBeInTheDocument();

  // Restore our `console.error` functionality.
  consoleErrorFn.mockRestore();
});
