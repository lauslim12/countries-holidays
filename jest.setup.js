// Optional: configure or set up a testing framework before each test.
// If you delete this file, remove `setupFilesAfterEnv` from `jest.config.js`

// Several configurations for our tests:
// - `@testing-library/jest-dom/extend-expect` is used for CRA-style expectations (https://github.com/testing-library/jest-dom)
// - `whatwg-fetch` is for polyfilling the `window.fetch` command in Jest
import '@testing-library/jest-dom/extend-expect';
import 'whatwg-fetch';
