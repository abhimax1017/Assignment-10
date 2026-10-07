# Assignment 10 – Error Boundaries and Resilient UI

## Objective
Build a React dashboard where individual page sections are protected by error boundaries so a single crashing widget does not blank the entire page.

## Features
- React Error Boundary using `react-error-boundary`
- Widget-level fallback UI
- Retry button
- Intentional Analytics widget crash for demonstration
- Error reporting integration with Sentry
- Other dashboard widgets remain functional when Analytics fails
- Responsive UI

## Run

```bash
npm install
npm run dev
```

Open the Vite URL shown in the terminal.

## Sentry Setup
Replace:

```js
dsn: "YOUR_SENTRY_DSN_HERE"
```

in `src/main.jsx` with the DSN from your Sentry project.

## Demo
1. Open the dashboard.
2. Click **Simulate Analytics Crash**.
3. Analytics shows the fallback UI.
4. Orders and System Health continue working.
5. Click **Retry Widget** to recover Analytics.
6. With Sentry configured, the caught exception is sent to Sentry.

## Assignment Requirements Covered
- Error boundaries
- Resilient/fallback UI
- Retry behavior
- Error reporting
- Demonstration of one widget crashing while the rest of the page works
