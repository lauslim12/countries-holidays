import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import type { ReactElement, ReactNode } from 'react';
import { SWRConfig } from 'swr';

function Wrapper({ children }: { children: ReactNode }) {
  return (
    <SWRConfig value={{ dedupingInterval: 0, provider: () => new Map() }}>
      {children}
    </SWRConfig>
  );
}

export function renderWithProviders(ui: ReactElement) {
  const user = userEvent.setup();

  return {
    user,
    ...render(ui, { wrapper: Wrapper }),
  };
}
