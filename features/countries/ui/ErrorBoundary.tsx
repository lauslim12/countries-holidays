import { Stack, Typography } from '@mui/material';
import { Component, ReactNode } from 'react';

import Layout from '../../../common/Layout';

interface Props {
  children?: ReactNode;
}

interface State {
  hasError: boolean;
}

export default class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(_: Error): State {
    return { hasError: true };
  }

  // For now, this is ignored because we do not want to display any errors in the console
  // to the user. You have to import `ErrorInfo` from `react` if you want to uncomment and use this.
  // componentDidCatch(error: Error, errorInfo: ErrorInfo) {
  //   console.error(`Uncaught error: ${error}, ${errorInfo}.`);
  // }

  render() {
    if (this.state.hasError) {
      return (
        <Layout>
          <Stack
            alignItems="center"
            justifyContent="center"
            sx={{ height: '100%' }}
          >
            <Typography variant="h5" component="h1">
              We are sorry! We have encountered an error! Please try refreshing
              the page! 🙏
            </Typography>
          </Stack>
        </Layout>
      );
    }

    return this.props.children;
  }
}
