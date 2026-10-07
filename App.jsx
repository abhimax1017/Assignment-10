import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import * as Sentry from "@sentry/react";

function AnalyticsWidget({ shouldCrash }) {
  if (shouldCrash) {
    throw new Error(
      "Analytics widget crashed intentionally for the demo."
    );
  }

  return (
    <div className="widget">
      <div className="widget-header">
        <h3>Analytics</h3>
        <span className="status success">Running</span>
      </div>
      <div className="metric">98.4%</div>
      <p>System performance</p>
    </div>
  );
}

function OrdersWidget() {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3>Orders</h3>
        <span className="status success">Healthy</span>
      </div>
      <div className="metric">1,284</div>
      <p>Total orders processed</p>
    </div>
  );
}

function HealthWidget() {
  return (
    <div className="widget">
      <div className="widget-header">
        <h3>System Health</h3>
        <span className="status success">Healthy</span>
      </div>
      <div className="metric">99.9%</div>
      <p>Service availability</p>
    </div>
  );
}

function WidgetErrorFallback({ error, resetErrorBoundary }) {
  return (
    <div className="widget error-widget">
      <div className="widget-header">
        <h3>Analytics</h3>
        <span className="status danger">Error</span>
      </div>
      <div className="error-icon">⚠</div>
      <p>Widget unavailable</p>
      <small>{error.message}</small>
      <button className="retry-button" onClick={resetErrorBoundary}>
        Retry Widget
      </button>
    </div>
  );
}

function reportWidgetError(error, info) {
  console.error("Analytics widget error:", error);

  Sentry.withScope((scope) => {
    scope.setExtras({
      componentStack: info.componentStack,
      component: "AnalyticsWidget"
    });
    Sentry.captureException(error);
  });
}

export default function App() {
  const [shouldCrash, setShouldCrash] = useState(false);

  return (
    <div className="app">
      <header className="header">
        <div>
          <h1>Resilient Dashboard</h1>
          <p>Error Boundary Demonstration</p>
        </div>
        <span className="live-status">● System Online</span>
      </header>

      <main className="content">
        <section className="intro-section">
          <h2>Dashboard Overview</h2>
          <p>
            Each dashboard widget is isolated using an error boundary.
            If one widget fails, the remaining interface continues working.
          </p>
        </section>

        <section className="dashboard-grid">
          <OrdersWidget />

          <ErrorBoundary
            FallbackComponent={WidgetErrorFallback}
            onError={reportWidgetError}
            onReset={() => setShouldCrash(false)}
          >
            <AnalyticsWidget shouldCrash={shouldCrash} />
          </ErrorBoundary>

          <HealthWidget />
        </section>

        <section className="controls">
          <h2>Failure Simulation</h2>
          <p>
            Click the button below to intentionally crash the Analytics widget.
          </p>
          <button
            className="crash-button"
            onClick={() => setShouldCrash(true)}
          >
            Simulate Analytics Crash
          </button>
        </section>

        <section className="result-section">
          <h2>Expected Behavior</h2>
          <div className="behavior-list">
            <div>
              <strong>✓ Analytics crashes</strong>
              <p>Only the Analytics widget displays its fallback UI.</p>
            </div>
            <div>
              <strong>✓ Orders remains available</strong>
              <p>The Orders widget continues working normally.</p>
            </div>
            <div>
              <strong>✓ System Health remains available</strong>
              <p>Other page sections are unaffected.</p>
            </div>
            <div>
              <strong>✓ Error is reported</strong>
              <p>The error is captured by Sentry.</p>
            </div>
          </div>
        </section>
      </main>

      <footer>Assignment 10 — Error Boundaries and Resilient UI</footer>
    </div>
  );
}