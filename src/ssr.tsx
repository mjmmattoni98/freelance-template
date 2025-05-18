import * as Sentry from "@sentry/tanstackstart-react";
import { getRouterManifest } from '@tanstack/react-start/router-manifest';
import { createStartHandler, defaultStreamHandler } from '@tanstack/react-start/server';
import { createRouter } from './router';

Sentry.init({
  dsn: "https://0bcb08b5a765c62349ced26c91a2f3c6@o4509346012266496.ingest.de.sentry.io/4509346015412304",

  // Set tracesSampleRate to 1.0 to capture 100%
  // of transactions for tracing.
  // We recommend adjusting this value in production
  // Learn more at
  // https://docs.sentry.io/platforms/javascript/configuration/options/#traces-sample-rate
  tracesSampleRate: 1.0,

  // Setting this option to true will send default PII data to Sentry.
  // For example, automatic IP address collection on events
  sendDefaultPii: true,
});

export default createStartHandler({
  createRouter,
  getRouterManifest,
})(Sentry.wrapStreamHandlerWithSentry(defaultStreamHandler));
