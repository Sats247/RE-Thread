import React from 'react';
import { useDemoStore } from '@/stores/demo.store';
import { Button } from './Button';
import { AlertCircle, Copy, Check, RefreshCw } from 'lucide-react';

interface ErrorBoundaryProps {
  children: React.ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
  errorInfo: React.ErrorInfo | null;
  copied: boolean;
}

export class RootErrorBoundary extends React.Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false, error: null, errorInfo: null, copied: false };
  }

  static getDerivedStateFromError(error: Error): Partial<ErrorBoundaryState> {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo): void {
    this.setState({ errorInfo });
    console.error('RootErrorBoundary caught error:', error, errorInfo);
  }

  copyErrorReport = (): void => {
    const persona = useDemoStore.getState().persona;
    const report = {
      timestamp: new Date().toISOString(),
      url: window.location.href,
      persona,
      errorMessage: this.state.error?.message,
      errorStack: this.state.error?.stack,
      componentStack: this.state.errorInfo?.componentStack,
    };
    navigator.clipboard.writeText(JSON.stringify(report, null, 2)).then(() => {
      this.setState({ copied: true });
      setTimeout(() => this.setState({ copied: false }), 2500);
    });
  };

  handleReload = (): void => {
    window.location.reload();
  };

  render(): React.ReactNode {
    if (this.state.hasError) {
      return (
        <div
          role="alert"
          data-testid="root-error-boundary-view"
          className="min-h-screen bg-paper text-ink flex items-center justify-center p-6 text-left"
        >
          <div className="max-w-lg w-full border border-line p-8 bg-mist">
            <div className="flex items-center gap-3 text-danger mb-4">
              <AlertCircle className="h-6 w-6 stroke-[1.5]" />
              <h1 className="text-lg font-medium uppercase tracking-wider text-ink">
                Application Error Encountered
              </h1>
            </div>

            <p className="text-xs text-muted mb-4 leading-relaxed">
              We encountered an unhandled issue. You can reload the page or generate an error report for debugging.
            </p>

            {this.state.error && (
              <div className="p-3 bg-paper border border-line text-xs font-mono text-danger mb-6 overflow-x-auto max-h-36">
                {this.state.error.message}
              </div>
            )}

            <div className="flex flex-wrap items-center gap-3">
              <Button variant="primary" size="sm" onClick={this.handleReload}>
                <RefreshCw className="mr-2 h-3.5 w-3.5" />
                Reload Page
              </Button>
              <Button variant="secondary" size="sm" onClick={this.copyErrorReport}>
                {this.state.copied ? (
                  <>
                    <Check className="mr-2 h-3.5 w-3.5 text-ok" />
                    Copied Report!
                  </>
                ) : (
                  <>
                    <Copy className="mr-2 h-3.5 w-3.5" />
                    Copy Error Report
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

