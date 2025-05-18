import { json } from "@tanstack/react-start";
import { createAPIFileRoute } from "@tanstack/react-start/api";

// A faulty API route to test Sentry's error monitoring
export const APIRoute = createAPIFileRoute("/api/sentry-example-api")({
  GET: ({ request, params }) => {
    throw new Error("Sentry Example API Route Error");
    return json({ message: "Testing Sentry Error..." });
  },
});