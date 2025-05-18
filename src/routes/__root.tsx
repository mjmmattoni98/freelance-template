import { DefaultCatchBoundary } from "@/components/DefaultCatchBoundary";
import { NotFound } from "@/components/NotFound";
import { TRPCRouter } from "@/trpc/router";
import { ColorSchemeScript, MantineProvider } from "@mantine/core";
import { Box, Button, Card, Container, Flex, Theme } from "@radix-ui/themes";
import { QueryClient } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import {
  createRootRouteWithContext,
  HeadContent,
  Link,
  Outlet,
  Scripts,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { TRPCOptionsProxy } from "@trpc/tanstack-react-query";
import type { ReactNode } from "react";
import { Suspense } from "react";
import { getAuth, getSignInUrl } from "../authkit/serverFunctions";
import Footer from "../components/footer";
import SignInButton from "../components/sign-in-button";
//@ts-ignore
import appCss from "../styles/app.css?url";

// Styles
import "@mantine/core/styles.css";
import "@radix-ui/themes/styles.css";

export const Route = createRootRouteWithContext<{
  queryClient: QueryClient;
  trpc: TRPCOptionsProxy<TRPCRouter>;
}>()({
  head: () => ({
    meta: [
      {
        charSet: "utf-8",
      },
      {
        name: "viewport",
        content: "width=device-width, initial-scale=1",
      },
      {
        title: "AuthKit Example in TanStack Start",
      },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  beforeLoad: async () => {
    const { user } = await getAuth();

    return { user };
  },
  loader: async ({ context }) => {
    const { user } = context;
    const url = await getSignInUrl();
    return {
      user,
      url,
    };
  },
  errorComponent: (props) => {
    return (
      <RootDocument>
        <DefaultCatchBoundary {...props} />
      </RootDocument>
    );
  },
  notFoundComponent: () => <NotFound />,
  component: RootComponent,
});

function RootComponent() {
  const { user, url } = Route.useLoaderData();
  return (
    <RootDocument>
      <MantineProvider>
        <Theme
          accentColor="iris"
          panelBackground="solid"
          style={{ backgroundColor: "var(--gray-1)" }}
        >
          <Container style={{ backgroundColor: "var(--gray-1)" }}>
            <Flex direction="column" gap="5" p="5" height="100vh">
              <Box asChild flexGrow="1">
                <Card size="4">
                  <Flex direction="column" height="100%">
                    <Flex asChild justify="between">
                      <header>
                        <Flex gap="4">
                          <Button asChild variant="soft">
                            <Link
                              to="/"
                              activeProps={{
                                className: "font-bold",
                              }}
                              activeOptions={{ exact: true }}
                            >
                              Home
                            </Link>
                          </Button>
                          <Button asChild variant="soft">
                            <Link
                              to="/account"
                              activeProps={{
                                className: "font-bold",
                              }}
                            >
                              Account
                            </Link>
                          </Button>
                          <Link
                            to="/posts"
                            activeProps={{
                              className: "font-bold",
                            }}
                          >
                            Posts
                          </Link>
                        </Flex>

                        <Suspense fallback={<div>Loading...</div>}>
                          <SignInButton user={user} url={url} />
                        </Suspense>
                      </header>
                    </Flex>

                    <Flex flexGrow="1" align="center" justify="center">
                      <main>
                        <Outlet />
                      </main>
                    </Flex>
                  </Flex>
                </Card>
              </Box>
              <Footer />
            </Flex>
          </Container>
        </Theme>
        <TanStackRouterDevtools position="bottom-right" />
        <ReactQueryDevtools buttonPosition="bottom-left" position="bottom" />
      </MantineProvider>
    </RootDocument>
  );
}

function RootDocument({ children }: Readonly<{ children: ReactNode }>) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
        <ColorSchemeScript />
      </head>
      <body>
        {children}
        <Scripts />
      </body>
    </html>
  );
}
