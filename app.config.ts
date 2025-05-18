import { defineConfig } from "@tanstack/react-start/config";
import tsConfigPaths from "vite-tsconfig-paths";
import { wrapVinxiConfigWithSentry } from "@sentry/tanstackstart-react";

export const config = defineConfig({
  tsr: {
    appDirectory: "src",
  },
  server: {
    preset: "node-server",
  },
  vite: {
    plugins: [
      tsConfigPaths({
        projects: ["./tsconfig.json"],
      }),
    ],
  },
});

export default wrapVinxiConfigWithSentry(config, {
  org: "antsolutions",
  project: "javascript-tanstackstart-react",
  authToken: process.env.SENTRY_AUTH_TOKEN,

  // Only print logs for uploading source maps in CI
  // Set to `true` to suppress logs
  silent: !process.env.CI,
});