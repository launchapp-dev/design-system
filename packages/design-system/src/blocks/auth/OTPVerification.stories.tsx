import type { Meta, StoryObj } from "@storybook/react";
import { OTPVerification } from "./OTPVerification";

const meta: Meta<typeof OTPVerification> = {
  title: "Blocks/Auth/OTPVerification",
  component: OTPVerification,
  parameters: {
    layout: "centered",
    docs: {
      source: {
        code: `import { OTPVerification } from "@launchapp/design-system/blocks";

export default function Page() {
  return (
    <OTPVerification
      onVerify={async (otp) => {
        console.log(otp);
      }}
      onResend={() => console.log("resend")}
    />
  );
}`,
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof OTPVerification>;

export const Default: Story = {
  args: {
    email: "jane@example.com",
    onResend: () => alert("Code resent"),
  },
};

export const Loading: Story = {
  args: {
    email: "jane@example.com",
    isLoading: true,
  },
};

export const WithError: Story = {
  args: {
    email: "jane@example.com",
    error: "Invalid code. Please try again.",
    onResend: () => {},
  },
};

export const ResendReady: Story = {
  args: {
    email: "jane@example.com",
    resendDelay: 0,
    onResend: () => alert("Code resent"),
  },
};

export const Mobile: Story = {
  parameters: {
    viewport: { defaultViewport: "mobile1" },
  },
  args: {
    email: "jane@example.com",
    onResend: () => {},
  },
};

export const Tablet: Story = {
  parameters: {
    viewport: { defaultViewport: "tablet" },
  },
  args: {
    email: "jane@example.com",
    onResend: () => {},
  },
};

export const CompositionExample: Story = {
  name: "Composition (Built From)",
  parameters: {
    docs: {
      description: {
        story:
          "OTPVerification is composed from these design system primitives. Use the **Show code** toggle to see the full implementation.",
      },
      source: {
        code: `import {
  Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter,
  Button, Input,
} from "@launchapp/design-system";
import { useForm } from "react-hook-form";

// OTPVerification uses a custom 6-digit OTP input built from Input primitives,
// a countdown timer for the resend link, and react-hook-form + zod for validation.
export function OTPVerification({ onVerify, onResend, isLoading, error, email, resendDelay = 60 }) {
  const [countdown, setCountdown] = React.useState(resendDelay);
  const form = useForm();

  React.useEffect(() => {
    if (countdown <= 0) return;
    const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
    return () => clearTimeout(id);
  }, [countdown]);

  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle>Verify your email</CardTitle>
        <CardDescription>
          Enter the 6-digit code sent to {email}.
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {error && (
          <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive">{error}</div>
        )}
        {/* Six individual Input boxes auto-advancing on input */}
        <div className="flex gap-2 justify-center">
          {Array.from({ length: 6 }).map((_, i) => (
            <Input key={i} maxLength={1} className="w-10 text-center text-lg" />
          ))}
        </div>
        <Button className="w-full" disabled={isLoading}>
          {isLoading ? "Verifying…" : "Verify code"}
        </Button>
      </CardContent>
      <CardFooter className="justify-center">
        {countdown > 0 ? (
          <p className="text-sm text-muted-foreground">Resend in {countdown}s</p>
        ) : (
          <Button variant="link" className="px-0 h-auto" onClick={onResend}>Resend code</Button>
        )}
      </CardFooter>
    </Card>
  );
}`,
      },
    },
  },
};
