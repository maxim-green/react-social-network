import React from 'react';

export class ErrorBoundary extends React.Component<{}, {
    hasError: boolean
    error: string
}> {
  constructor(props: {children: React.ReactElement}) {
    super(props);
    this.state = {
      hasError: false,
      error: 'Error :(',
    };
  }

  static getDerivedStateFromError(error: Error) {
    return { hasError: true, error: error.message };
  }

  componentDidCatch(error: Error): void {
    console.log(error);
  }

  render() {
    const { children } = this.props;
    const { hasError, error } = this.state;
    if (hasError) {
      return (
        <div style={{
          padding: 10,
          color: 'red',
          border: '1px solid red',
          borderRadius: 5,
          backgroundColor: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
        >
          {error}
        </div>
      );
    }
    return children;
  }
}
