# Execution Steps

1. Install Node.js.
2. Extract this ZIP.
3. Open a terminal in the extracted folder.
4. Run `npm install`.
5. Run `npm run dev`.
6. Open the localhost URL shown by Vite.
7. Click **Simulate Analytics Crash**.
8. Verify that only Analytics changes to the error fallback.
9. Verify Orders and System Health remain visible.
10. Click **Retry Widget**.
11. Configure Sentry DSN in `src/main.jsx` to verify cloud error tracking.
