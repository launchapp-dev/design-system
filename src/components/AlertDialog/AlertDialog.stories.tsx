import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  AlertDialogRoot,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "./index";
import { Button } from "../Button";

const meta: Meta = {
  title: "Components/AlertDialog",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <AlertDialogRoot>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Open Alert</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your account and remove your
            data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialogRoot>
  ),
};

export const DestructiveConfirm: Story = {
  render: () => {
    const [confirmed, setConfirmed] = React.useState(false);

    return (
      <div
        style={{ display: "flex", flexDirection: "column", gap: "12px", alignItems: "flex-start" }}
      >
        <AlertDialogRoot>
          <AlertDialogTrigger asChild>
            <Button variant="destructive">Delete Account</Button>
          </AlertDialogTrigger>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Delete Account</AlertDialogTitle>
              <AlertDialogDescription>
                This will permanently delete your account. All your data will be removed and you
                will not be able to recover it.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel onClick={() => setConfirmed(false)}>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => setConfirmed(true)}>Delete</AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogRoot>
        {confirmed && (
          <span style={{ fontSize: "14px", color: "hsl(var(--destructive))" }}>
            Account deleted.
          </span>
        )}
      </div>
    );
  },
};
