import React, { useState } from 'react';

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  
  render() {
    const handleRefresh = () => {
      window.location.reload();
    }
    if (this.state.hasError) {
      return (  
        <div className="d-flex flex-column align-items-center justify-content-center vh-100">
          <h1>Something went wrong.</h1>
          <p>Please try again later.</p>
          <button className="button-default active" onClick={handleRefresh}>
            Refresh
          </button>
        </div>
      )
    }

    return this.props.children; 
  }
}

export default ErrorBoundary;
