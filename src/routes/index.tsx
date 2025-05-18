import { Group, Button as MButton, Stepper } from "@mantine/core";
import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { Link, createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { getSignInUrl } from "../authkit/serverFunctions";
import SignInButton from "../components/sign-in-button";

export const Route = createFileRoute("/")({
  component: Home,
  loader: async ({ context }) => {
    const { user } = context;
    const url = await getSignInUrl();
    return { user, url };
  },
});

function Home() {
  const { user, url } = Route.useLoaderData();
  const [active, setActive] = useState(1);
  const nextStep = () =>
    setActive((current) => (current < 3 ? current + 1 : current));
  const prevStep = () =>
    setActive((current) => (current > 0 ? current - 1 : current));

  return (
    <Flex direction="column" align="center" gap="2">
      {user ? (
        <>
          <Heading size="8">
            Welcome back{user?.firstName && `, ${user?.firstName}`}
          </Heading>
          <Text size="5" color="gray">
            You are now authenticated into the application
          </Text>
          <Flex align="center" gap="3" mt="4">
            <Button asChild size="3" variant="soft">
              <Link to="/account">View account</Link>
            </Button>
            <SignInButton url={url} user={user} large />
          </Flex>
        </>
      ) : (
        <>
          <Heading size="8">AuthKit authentication example</Heading>
          <Heading size="7">TanStack Start</Heading>
          <Text size="5" color="gray" mb="4">
            Sign in to view your account details
          </Text>
          <h1 className="text-4xl font-bold underline">
            Welcome to the AuthKit Example
          </h1>
          <SignInButton user={user} url={url} large />
          <Stepper active={active} onStepClick={setActive}>
            <Stepper.Step label="First step" description="Create an account">
              Step 1 content: Create an account
            </Stepper.Step>
            <Stepper.Step label="Second step" description="Verify email">
              Step 2 content: Verify email
            </Stepper.Step>
            <Stepper.Step label="Final step" description="Get full access">
              Step 3 content: Get full access
            </Stepper.Step>
            <Stepper.Completed>
              Completed, click back button to get to previous step
            </Stepper.Completed>
          </Stepper>

          <Group justify="center" mt="xl">
            <MButton variant="default" onClick={prevStep}>
              Back
            </MButton>
            <MButton onClick={nextStep}>Next step</MButton>
          </Group>
        </>
      )}
    </Flex>
  );
}
