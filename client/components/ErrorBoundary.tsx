import { Component, ErrorInfo, ReactNode } from 'react';

/**
 * An error boundary that catches rendering errors in its child tree and
 * displays a fallback UI. Error boundaries prevent entire route crashes
 * from bringing down the whole application. Each route should be wrapped
 * in its own boundary to provide contextual error messages. See
 * https://react.dev/reference/react/Component#catching-render-errors-with-an-error-boundary
 */
interface Props {
  children: ReactNode;
  /** Optional fallback to render instead of the default message. */
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // eslint-disable-next-line no-console
    console.error('ErrorBoundary caught an error', error, info);
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? (
        <div className="min-h-screen flex items-center justify-center bg-red-50 dark:bg-red-950">
          <div className="text-center p-6 max-w-md">
            <h1 className="text-2xl font-semibold text-red-800 dark:text-red-200 mb-4">
              Something went wrong
            </h1>
            <p className="text-red-700 dark:text-red-300 mb-4">
              An unexpected error occurred while rendering this section. Please try
              refreshing the page or contact support if the problem persists.
            </p>
            <button
              className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              onClick={() => window.location.reload()}
            >
              Reload
            </button>
          </div>
        </div>
      );
    }
    return this.props.children;
  }
}