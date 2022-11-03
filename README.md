# Country Holidays

Find out holidays and special days from over 90 countries! Developed to showcase React 18 features: concurrency, transitions, deferred values, caching, suspense, suspense data fetching, prefetch, and error boundary. Tested with React Testing Library.

The application is intentionally kept simple and straightforward to focus on the core concepts. The design is made with MaterialUI to quickly bootstrap a new beautiful page. The project structure is inspired from React Redux's project structure, which is to separate everything by domain and place our required components inside the relevant folder. Files are in `kebab-case`, unless for React components, they are in `PascalCase`.

## Features

- You can see a list of available countries.
- You may click on the `Detail` text button to open a drawer describing the country's holidays and information.

## Requirements

- [Node.js LTS](https://nodejs.org/en/)
- [Yarn Classic](https://yarnpkg.com/)

## Usage

To use this application, you have to:

- Clone this repository and switch to it.

```bash
git clone git@github.com:lauslim12/countries-holidays.git
cd countries-holidays
```

- Install all dependencies.

```bash
yarn --frozen-lockfile
```

- Run application with the development mode.

```bash
yarn start
```

- If you need the production build, you can build by using a single command. Don't forget to run it to unleash the power of React 18!

```bash
yarn build
yarn start
```

- Don't forget to look at tests! Use the below command to unleash the full tests.

```bash
yarn test-ci
```

## Credits

- [date.nager.at](https://date.nager.at/) for the API.
- [icons8.com](https://icons8.com/) for the favorite icon.

## License

MIT License.
