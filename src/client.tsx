import { StartClient } from '@tanstack/react-start';
import { hydrateRoot } from 'react-dom/client';
import { createRouter } from './router';
import * as Sentry from "@sentry/tanstackstart-react";

const router = createRouter();

Sentry.init({
  dsn: "https://0bcb08b5a765c62349ced26c91a2f3c6@o4509346012266496.ingest.de.sentry.io/4509346015412304",
  integrations: [
    Sentry.tanstackRouterBrowserTracingIntegration(router),
    Sentry.replayIntegration(),
  ],

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  tracesSampleRate: 1.0,

  // Capture Replay for 10% of all sessions,
  // plus for 100% of sessions with an error.
  replaysSessionSampleRate: 0.1,
  replaysOnErrorSampleRate: 1.0,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

hydrateRoot(document, <StartClient router={router} />);
