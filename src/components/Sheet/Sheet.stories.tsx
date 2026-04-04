import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Button } from "../Button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./index";

const meta: Meta = {
  title: "Components/Sheet",
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Sheet</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Sheet Title</SheetTitle>
          <SheetDescription>
            This sheet slides in from the right side by default.
          </SheetDescription>
        </SheetHeader>
        <div style={{ flex: 1, padding: "16px 0" }}>
          <p style={{ fontSize: 14, color: "hsl(var(--muted-foreground))" }}>
            Sheet body content goes here. You can add forms, lists, or any other
            content.
          </p>
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Cancel</Button>
          </SheetClose>
          <Button>Save changes</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};

export const AllSides: Story = {
  render: () => (
    <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
      {(["top", "right", "bottom", "left"] as const).map((side) => (
        <Sheet key={side}>
          <SheetTrigger asChild>
            <Button variant="outline" style={{ textTransform: "capitalize" }}>
              Open {side}
            </Button>
          </SheetTrigger>
          <SheetContent side={side}>
            <SheetHeader>
              <SheetTitle style={{ textTransform: "capitalize" }}>
                {side} Sheet
              </SheetTitle>
              <SheetDescription>
                This sheet slides in from the {side}.
              </SheetDescription>
            </SheetHeader>
            <SheetFooter>
              <SheetClose asChild>
                <Button variant="outline">Close</Button>
              </SheetClose>
            </SheetFooter>
          </SheetContent>
        </Sheet>
      ))}
    </div>
  ),
};

export const WithForm: Story = {
  render: () => {
    const [name, setName] = React.useState("");
    const [email, setEmail] = React.useState("");

    return (
      <Sheet>
        <SheetTrigger asChild>
          <Button>Edit Profile</Button>
        </SheetTrigger>
        <SheetContent>
          <SheetHeader>
            <SheetTitle>Edit Profile</SheetTitle>
            <SheetDescription>
              Make changes to your profile here. Click save when you are done.
            </SheetDescription>
          </SheetHeader>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 16,
              padding: "16px 0",
              flex: 1,
            }}
          >
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{ fontSize: 14, fontWeight: 500 }}
                htmlFor="sheet-name"
              >
                Name
              </label>
              <input
                id="sheet-name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                style={{
                  height: 36,
                  borderRadius: 6,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  padding: "0 12px",
                  fontSize: 14,
                }}
              />
            </div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              <label
                style={{ fontSize: 14, fontWeight: 500 }}
                htmlFor="sheet-email"
              >
                Email
              </label>
              <input
                id="sheet-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                style={{
                  height: 36,
                  borderRadius: 6,
                  border: "1px solid hsl(var(--border))",
                  background: "hsl(var(--background))",
                  color: "hsl(var(--foreground))",
                  padding: "0 12px",
                  fontSize: 14,
                }}
              />
            </div>
          </div>
          <SheetFooter>
            <SheetClose asChild>
              <Button variant="outline">Cancel</Button>
            </SheetClose>
            <SheetClose asChild>
              <Button>Save changes</Button>
            </SheetClose>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    );
  },
};

export const LongContent: Story = {
  render: () => (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="outline">Open Long Content</Button>
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>Terms and Conditions</SheetTitle>
          <SheetDescription>
            Please read through all the terms before accepting.
          </SheetDescription>
        </SheetHeader>
        <div style={{ flex: 1, overflowY: "auto", padding: "16px 0" }}>
          {Array.from({ length: 20 }, (_, i) => (
            <p
              key={i}
              style={{
                fontSize: 14,
                color: "hsl(var(--muted-foreground))",
                marginBottom: 12,
              }}
            >
              Section {i + 1}: Lorem ipsum dolor sit amet, consectetur
              adipiscing elit. Sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua.
            </p>
          ))}
        </div>
        <SheetFooter>
          <SheetClose asChild>
            <Button variant="outline">Decline</Button>
          </SheetClose>
          <Button>Accept</Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  ),
};
