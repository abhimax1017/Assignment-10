import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import * as Sentry from "@sentry/react";
import App from "./App";
import "./styles.css";

Sentry.init({
  dsn: "YOUR_SENTRY_DSN_HERE",
  sendDefaultPii: false,
  tracesSampleRate: 1.0
});

function RootFallback({ error, resetErrorBoundary }) {
  return (
    <div className="root-error">
      <h1>Something went wrong</h1>
      <p>The application encountered an unexpected error.</p>
      <p className="error-message">{error.message}</p>
      <button onClick={resetErrorBoundary}>Try Again</button>
    </div>
  );
}

function handleError(error, info) {
  console.error("Error Boundary caught:", error);

  Sentry.withScope((scope) => {
    scope.setExtras({ componentStack: info.componentStack });
    Sentry.captureException(error);
  });
}

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ErrorBoundary
      FallbackComponent={RootFallback}
      onError={handleError}
    >
      <App />
    </ErrorBoundary>
  </React.StrictMode>
);