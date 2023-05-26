import React from 'react';
import { FormattedMessage } from 'react-intl';

interface IErrorBoundary {
  children: React.ReactNode;
}

class ErrorBoundary extends React.Component<IErrorBoundary> {
  state = { hasError: false, error: '' };
  constructor(props: IErrorBoundary) {
    super(props);
  }
  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }
  render() {
    if (this.state.hasError) {
      return (
        <div>
          <h2>
            <FormattedMessage id="ERROR_HEADER" />
          </h2>
          <p>{this.state.error}</p>
        </div>
      );
    }
    return this.props.children;
  }
}

export default ErrorBoundary;
