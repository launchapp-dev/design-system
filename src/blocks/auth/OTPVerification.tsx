import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { cn } from "../../lib/utils";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "../../components/Form";
import { Input } from "../../components/Input";
import { Button } from "../../components/Button";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from "../../components/Card";

const OTP_LENGTH = 6;

const otpSchema = z.object({
  otp: z
    .string()
    .length(OTP_LENGTH, `Please enter all ${OTP_LENGTH} digits`)
    .regex(/^\d+$/, "OTP must contain only digits"),
});

type OTPValues = z.infer<typeof otpSchema>;

interface OTPInputProps {
  value: string;
  onChange: (value: string) => void;
  disabled?: boolean;
  hasError?: boolean;
}

function OTPInput({ value, onChange, disabled, hasError }: OTPInputProps) {
  const digits = value.split("").concat(Array(OTP_LENGTH).fill("")).slice(0, OTP_LENGTH);
  const inputRefs = React.useRef<(HTMLInputElement | null)[]>([]);

  function handleChange(index: number, char: string) {
    const digit = char.replace(/\D/g, "").slice(-1);
    const next = [...digits];
    next[index] = digit;
    onChange(next.join(""));
    if (digit && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handleKeyDown(index: number, e: React.KeyboardEvent<HTMLInputElement>) {
    if (e.key === "Backspace") {
      if (digits[index]) {
        const next = [...digits];
        next[index] = "";
        onChange(next.join(""));
      } else if (index > 0) {
        inputRefs.current[index - 1]?.focus();
      }
    } else if (e.key === "ArrowLeft" && index > 0) {
      inputRefs.current[index - 1]?.focus();
    } else if (e.key === "ArrowRight" && index < OTP_LENGTH - 1) {
      inputRefs.current[index + 1]?.focus();
    }
  }

  function handlePaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault();
    const pasted = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, OTP_LENGTH);
    if (!pasted) return;
    const next = pasted.split("").concat(Array(OTP_LENGTH).fill("")).slice(0, OTP_LENGTH);
    onChange(next.join(""));
    const focusIndex = Math.min(pasted.length, OTP_LENGTH - 1);
    inputRefs.current[focusIndex]?.focus();
  }

  return (
    <div
      className="flex gap-2 justify-center"
      role="group"
      aria-label="One-time password input"
    >
      {digits.map((digit, i) => (
        <Input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          type="text"
          inputMode="numeric"
          maxLength={1}
          value={digit}
          onChange={(e) => handleChange(i, e.target.value)}
          onKeyDown={(e) => handleKeyDown(i, e)}
          onPaste={handlePaste}
          onFocus={(e) => e.target.select()}
          disabled={disabled}
          error={hasError}
          aria-label={`Digit ${i + 1} of ${OTP_LENGTH}`}
          className="w-10 text-center px-0 font-mono text-base"
          autoComplete={i === 0 ? "one-time-code" : "off"}
        />
      ))}
    </div>
  );
}

export interface OTPVerificationProps {
  onSubmit?: (otp: string) => void | Promise<void>;
  onResend?: () => void | Promise<void>;
  isLoading?: boolean;
  error?: string;
  resendDelay?: number;
  email?: string;
  className?: string;
}

const OTPVerification = React.forwardRef<HTMLDivElement, OTPVerificationProps>(
  (
    {
      onSubmit,
      onResend,
      isLoading,
      error,
      resendDelay = 60,
      email,
      className,
    },
    ref
  ) => {
    const [countdown, setCountdown] = React.useState(resendDelay);
    const [resending, setResending] = React.useState(false);

    React.useEffect(() => {
      if (countdown <= 0) return;
      const id = setTimeout(() => setCountdown((c) => c - 1), 1000);
      return () => clearTimeout(id);
    }, [countdown]);

    const form = useForm<OTPValues>({
      resolver: zodResolver(otpSchema),
      defaultValues: { otp: "" },
    });

    async function handleSubmit(values: OTPValues) {
      await onSubmit?.(values.otp);
    }

    async function handleResend() {
      setResending(true);
      await onResend?.();
      setCountdown(resendDelay);
      form.reset();
      setResending(false);
    }

    return (
      <div ref={ref} className={cn("w-full max-w-sm", className)}>
        <Card>
          <CardHeader className="space-y-1 text-center">
            <CardTitle className="text-2xl">Verify your email</CardTitle>
            <CardDescription>
              {email
                ? `We sent a 6-digit code to ${email}.`
                : "Enter the 6-digit code we sent to your email."}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleSubmit)}
                className="space-y-6"
              >
                {error && (
                  <div className="rounded-md bg-destructive/10 p-3 text-sm text-destructive text-center">
                    {error}
                  </div>
                )}
                <FormField
                  control={form.control}
                  name="otp"
                  render={({ field, fieldState }) => (
                    <FormItem className="flex flex-col items-center space-y-3">
                      <FormLabel className="sr-only">One-time password</FormLabel>
                      <FormControl>
                        <OTPInput
                          value={field.value}
                          onChange={field.onChange}
                          disabled={isLoading}
                          hasError={!!fieldState.error}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? "Verifying…" : "Verify"}
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="justify-center flex-col space-y-1">
            <p className="text-sm text-muted-foreground">
              Didn&apos;t receive a code?
            </p>
            <Button
              variant="link"
              className="px-0 h-auto text-sm"
              type="button"
              disabled={countdown > 0 || resending || isLoading}
              onClick={handleResend}
            >
              {countdown > 0
                ? `Resend in ${countdown}s`
                : resending
                ? "Sending…"
                : "Resend code"}
            </Button>
          </CardFooter>
        </Card>
      </div>
    );
  }
);

OTPVerification.displayName = "OTPVerification";

export { OTPVerification };
