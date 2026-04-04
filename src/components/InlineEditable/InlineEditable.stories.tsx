import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import { Controller, useForm } from "react-hook-form";
import { InlineEditable } from "./index";

const meta: Meta<typeof InlineEditable> = {
  title: "Components/InlineEditable",
  component: InlineEditable,
  argTypes: {
    size: { control: "select", options: ["sm", "md", "lg"] },
    disabled: { control: "boolean" },
    multiline: { control: "boolean" },
  },
};

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: () => {
    const [value, setValue] = React.useState("Click me to edit this text");
    return (
      <div style={{ padding: "40px", maxWidth: "400px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "hsl(var(--muted-foreground))",
            marginBottom: "8px",
          }}
        >
          Click the text below to edit it. Press Enter or click away to save,
          Escape to cancel.
        </p>
        <InlineEditable value={value} onChange={setValue} />
        <p
          style={{
            marginTop: "12px",
            fontSize: "12px",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          Current value: <strong>{value}</strong>
        </p>
      </div>
    );
  },
};

export const Multiline: Story = {
  render: () => {
    const [value, setValue] = React.useState(
      "This is a multiline editable field.\nPress Escape to cancel or click away to save.",
    );
    return (
      <div style={{ padding: "40px", maxWidth: "400px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "hsl(var(--muted-foreground))",
            marginBottom: "8px",
          }}
        >
          Multiline mode — click to open a textarea.
        </p>
        <InlineEditable value={value} onChange={setValue} multiline />
      </div>
    );
  },
};

export const WithPlaceholder: Story = {
  render: () => {
    const [value, setValue] = React.useState("");
    return (
      <div style={{ padding: "40px", maxWidth: "400px" }}>
        <InlineEditable
          value={value}
          onChange={setValue}
          placeholder="Add a description…"
        />
      </div>
    );
  },
};

export const Disabled: Story = {
  render: () => (
    <div style={{ padding: "40px", maxWidth: "400px" }}>
      <InlineEditable
        value="This field is read-only"
        onChange={() => {}}
        disabled
      />
    </div>
  ),
};

export const Sizes: Story = {
  render: () => {
    const [sm, setSm] = React.useState("Small text");
    const [md, setMd] = React.useState("Medium text");
    const [lg, setLg] = React.useState("Large text");
    return (
      <div
        style={{
          padding: "40px",
          maxWidth: "400px",
          display: "flex",
          flexDirection: "column",
          gap: "12px",
        }}
      >
        <InlineEditable value={sm} onChange={setSm} size="sm" />
        <InlineEditable value={md} onChange={setMd} size="md" />
        <InlineEditable value={lg} onChange={setLg} size="lg" />
      </div>
    );
  },
};

export const WithReactHookForm: Story = {
  render: () => {
    const { control, watch } = useForm({
      defaultValues: { title: "My Document Title" },
    });
    const title = watch("title");
    return (
      <div style={{ padding: "40px", maxWidth: "400px" }}>
        <p
          style={{
            fontSize: "12px",
            color: "hsl(var(--muted-foreground))",
            marginBottom: "8px",
          }}
        >
          Controlled via react-hook-form:
        </p>
        <Controller
          control={control}
          name="title"
          render={({ field }) => (
            <InlineEditable
              value={field.value}
              onChange={field.onChange}
              size="lg"
              aria-label="Document title"
            />
          )}
        />
        <p
          style={{
            marginTop: "12px",
            fontSize: "12px",
            color: "hsl(var(--muted-foreground))",
          }}
        >
          Form value: <strong>{title}</strong>
        </p>
      </div>
    );
  },
};
