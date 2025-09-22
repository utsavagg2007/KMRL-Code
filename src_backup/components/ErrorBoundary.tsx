import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, RefreshCw, Home, FileText, Phone } from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from './ui/card';
import { Alert, AlertDescription, AlertTitle } from './ui/alert';
import { Badge } from './ui/badge';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorInfo?: ErrorInfo;
}

export class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error('Uncaught error:', error, errorInfo);
    this.setState({
      error,
      errorInfo
    });

    // Log error to monitoring service in production
    this.logErrorToService(error, errorInfo);
  }

  private logErrorToService = (error: Error, errorInfo: ErrorInfo) => {
    // In a real application, you would send this to your monitoring service
    console.log('Logging error to monitoring service:', {
      message: error.message,
      stack: error.stack,
      componentStack: errorInfo.componentStack,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      url: window.location.href
    });
  };

  private handleRefresh = () => {
    window.location.reload();
  };

  private handleGoHome = () => {
    window.location.href = '/';
  };

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorInfo: undefined });
  };

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5 flex items-center justify-center p-4">
          <div className="w-full max-w-2xl">
            <Card className="shadow-2xl border-0">
              <CardHeader className="text-center space-y-4">
                <div className="w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mx-auto">
                  <AlertTriangle className="w-8 h-8 text-destructive" />
                </div>
                <div>
                  <CardTitle className="text-2xl">System Error Detected</CardTitle>
                  <CardDescription className="text-lg">
                    The KMRL Document Intelligence System has encountered an unexpected error
                  </CardDescription>
                </div>
              </CardHeader>

              <CardContent className="space-y-6">
                <Alert variant="destructive">
                  <AlertTriangle className="w-4 h-4" />
                  <AlertTitle>Error Details</AlertTitle>
                  <AlertDescription>
                    {this.state.error?.message || 'An unknown error occurred'}
                  </AlertDescription>
                </Alert>

                <div className="space-y-4">
                  <h3 className="font-semibold">What happened?</h3>
                  <p className="text-muted-foreground">
                    A technical issue prevented the application from functioning properly. 
                    This incident has been automatically logged and our technical team has been notified.
                  </p>

                  <div className="flex items-center gap-2">
                    <Badge variant="outline">Error ID: {Date.now().toString(36)}</Badge>
                    <Badge variant="secondary">Timestamp: {new Date().toLocaleString()}</Badge>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="font-semibold">Recommended Actions</h3>
                  <div className="grid gap-3">
                    <Button onClick={this.handleRetry} className="w-full justify-start">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Try Again
                    </Button>
                    <Button onClick={this.handleRefresh} variant="outline" className="w-full justify-start">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Refresh Page
                    </Button>
                    <Button onClick={this.handleGoHome} variant="outline" className="w-full justify-start">
                      <Home className="w-4 h-4 mr-2" />
                      Go to Dashboard
                    </Button>
                  </div>
                </div>

                <div className="border-t pt-4">
                  <h3 className="font-semibold mb-3">Need Help?</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <Button variant="ghost" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="flex items-center gap-2 font-medium">
                          <FileText className="w-4 h-4" />
                          Documentation
                        </div>
                        <div className="text-sm text-muted-foreground">
                          View system documentation
                        </div>
                      </div>
                    </Button>
                    <Button variant="ghost" className="justify-start h-auto p-4">
                      <div className="text-left">
                        <div className="flex items-center gap-2 font-medium">
                          <Phone className="w-4 h-4" />
                          Support
                        </div>
                        <div className="text-sm text-muted-foreground">
                          Contact technical support
                        </div>
                      </div>
                    </Button>
                  </div>
                </div>

                {/* Development mode error details */}
                {process.env.NODE_ENV === 'development' && this.state.error && (
                  <details className="border rounded-lg p-4 bg-muted/50">
                    <summary className="cursor-pointer font-medium mb-2">
                      Developer Information
                    </summary>
                    <div className="space-y-2 text-sm">
                      <div>
                        <strong>Error:</strong>
                        <pre className="mt-1 whitespace-pre-wrap text-xs bg-background p-2 rounded border">
                          {this.state.error.message}
                        </pre>
                      </div>
                      {this.state.error.stack && (
                        <div>
                          <strong>Stack Trace:</strong>
                          <pre className="mt-1 whitespace-pre-wrap text-xs bg-background p-2 rounded border max-h-40 overflow-auto">
                            {this.state.error.stack}
                          </pre>
                        </div>
                      )}
                      {this.state.errorInfo?.componentStack && (
                        <div>
                          <strong>Component Stack:</strong>
                          <pre className="mt-1 whitespace-pre-wrap text-xs bg-background p-2 rounded border max-h-40 overflow-auto">
                            {this.state.errorInfo.componentStack}
                          </pre>
                        </div>
                      )}
                    </div>
                  </details>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export const withErrorBoundary = <P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode
) => {
  const WrappedComponent: React.FC<P> = (props) => (
    <ErrorBoundary fallback={fallback}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
};