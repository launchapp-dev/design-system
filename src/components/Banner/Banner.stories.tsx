import type { Meta, StoryObj } from "@storybook/react";
import { useState } from "react";
import { 
  Banner, 
  BannerContent,
  BannerTitle, 
  BannerDescription, 
  BannerAction,
  BannerActions,
  BannerDismiss 
} from "./index";

const meta = {
  title: "Components/Banner",
  component: Banner,
  argTypes: {
    variant: {
      control: "select",
      options: ["info", "warning", "error", "success"],
    },
    position: {
      control: "select",
      options: ["inline", "stickyTop", "stickyBottom"],
    },
  },
} satisfies Meta<typeof Banner>;

export default meta;
type Story = StoryObj<typeof meta>;

const InfoIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <path d="M12 16v-4" />
    <path d="M12 8h.01" />
  </svg>
);

const AlertTriangleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3Z" />
    <path d="M12 9v4" />
    <path d="M12 17h.01" />
  </svg>
);

const AlertCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <circle cx="12" cy="12" r="10" />
    <line x1="12" y1="8" x2="12" y2="12" />
    <line x1="12" y1="16" x2="12.01" y2="16" />
  </svg>
);

const CheckCircleIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
    <path d="m9 11 3 3L22 4" />
  </svg>
);

function DismissibleBanner({ 
  variant = "info", 
  title, 
  description 
}: { 
  variant?: "info" | "warning" | "error" | "success";
  title: string;
  description: string;
}) {
  const [open, setOpen] = useState(true);
  
  if (!open) return null;
  
  return (
    <Banner variant={variant} open={open} onOpenChange={setOpen}>
      <BannerContent>
        {variant === "info" && <InfoIcon />}
        {variant === "warning" && <AlertTriangleIcon />}
        {variant === "error" && <AlertCircleIcon />}
        {variant === "success" && <CheckCircleIcon />}
        <div className="flex flex-col">
          <BannerTitle>{title}</BannerTitle>
          <BannerDescription>{description}</BannerDescription>
        </div>
      </BannerContent>
      <BannerDismiss onOpenChange={setOpen} />
    </Banner>
  );
}

export const Info: Story = {
  render: () => (
    <Banner variant="info">
      <BannerContent>
        <InfoIcon />
        <div className="flex flex-col">
          <BannerTitle>Update Available</BannerTitle>
          <BannerDescription>A new version of the application is ready to install.</BannerDescription>
        </div>
      </BannerContent>
      <BannerActions>
        <BannerAction>Update Now</BannerAction>
        <BannerDismiss />
      </BannerActions>
    </Banner>
  ),
};

export const Warning: Story = {
  render: () => (
    <Banner variant="warning">
      <BannerContent>
        <AlertTriangleIcon />
        <div className="flex flex-col">
          <BannerTitle>Storage Almost Full</BannerTitle>
          <BannerDescription>You&apos;ve used 90% of your storage. Upgrade your plan to continue.</BannerDescription>
        </div>
      </BannerContent>
      <BannerActions>
        <BannerAction>Upgrade Plan</BannerAction>
        <BannerAction>Learn More</BannerAction>
        <BannerDismiss />
      </BannerActions>
    </Banner>
  ),
};

export const ErrorVariant: Story = {
  render: () => (
    <Banner variant="error">
      <BannerContent>
        <AlertCircleIcon />
        <div className="flex flex-col">
          <BannerTitle>Connection Lost</BannerTitle>
          <BannerDescription>Unable to connect to the server. Check your internet connection.</BannerDescription>
        </div>
      </BannerContent>
      <BannerActions>
        <BannerAction>Retry</BannerAction>
        <BannerDismiss />
      </BannerActions>
    </Banner>
  ),
};

export const Success: Story = {
  render: () => (
    <Banner variant="success">
      <BannerContent>
        <CheckCircleIcon />
        <div className="flex flex-col">
          <BannerTitle>Changes Saved</BannerTitle>
          <BannerDescription>Your preferences have been updated successfully.</BannerDescription>
        </div>
      </BannerContent>
      <BannerActions>
        <BannerAction>Undo</BannerAction>
        <BannerDismiss />
      </BannerActions>
    </Banner>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "600px" }}>
      <DismissibleBanner variant="info" title="Information" description="A new feature is available for your account." />
      <DismissibleBanner variant="warning" title="Warning" description="Your subscription expires in 3 days." />
      <DismissibleBanner variant="error" title="Error" description="Failed to save changes. Please try again." />
      <DismissibleBanner variant="success" title="Success" description="Your file has been uploaded successfully." />
    </div>
  ),
};

export const StickyTop: Story = {
  render: () => (
    <div style={{ height: "300px", overflow: "auto", border: "1px solid #e5e7eb", borderRadius: "8px" }}>
      <Banner variant="warning" position="stickyTop">
        <BannerContent>
          <AlertTriangleIcon />
          <BannerTitle>System Maintenance</BannerTitle>
          <BannerDescription>Scheduled maintenance in 30 minutes.</BannerDescription>
        </BannerContent>
        <BannerDismiss />
      </Banner>
      <div style={{ padding: "24px" }}>
        <p style={{ marginBottom: "16px" }}>Scroll to see the sticky banner behavior.</p>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} style={{ marginBottom: "12px" }}>
            Content line {i + 1}. The banner stays at the top while scrolling.
          </p>
        ))}
      </div>
    </div>
  ),
};

export const StickyBottom: Story = {
  render: () => (
    <div style={{ height: "300px", overflow: "auto", border: "1px solid #e5e7eb", borderRadius: "8px", position: "relative" }}>
      <div style={{ padding: "24px" }}>
        {Array.from({ length: 20 }).map((_, i) => (
          <p key={i} style={{ marginBottom: "12px" }}>
            Content line {i + 1}. The banner stays at the bottom while scrolling.
          </p>
        ))}
      </div>
      <Banner variant="info" position="stickyBottom">
        <BannerContent>
          <InfoIcon />
          <BannerTitle>Cookie Consent</BannerTitle>
          <BannerDescription>We use cookies to improve your experience.</BannerDescription>
        </BannerContent>
        <BannerActions>
          <BannerAction>Accept</BannerAction>
          <BannerAction>Decline</BannerAction>
        </BannerActions>
      </Banner>
    </div>
  ),
};

export const Interactive: Story = {
  args: {
    variant: "info",
    position: "inline",
  },
  render: (args) => (
    <Banner {...args}>
      <BannerContent>
        <InfoIcon />
        <div className="flex flex-col">
          <BannerTitle>Interactive Banner</BannerTitle>
          <BannerDescription>Use the controls panel to switch variants and positions.</BannerDescription>
        </div>
      </BannerContent>
      <BannerDismiss />
    </Banner>
  ),
};

export const WithMultipleActions: Story = {
  render: () => (
    <Banner variant="info">
      <BannerContent>
        <InfoIcon />
        <div className="flex flex-col">
          <BannerTitle>Terms of Service Update</BannerTitle>
          <BannerDescription>We&apos;ve updated our terms. Please review the changes to continue.</BannerDescription>
        </div>
      </BannerContent>
      <BannerActions>
        <BannerAction>View Terms</BannerAction>
        <BannerAction>Accept</BannerAction>
        <BannerDismiss />
      </BannerActions>
    </Banner>
  ),
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "12px", maxWidth: "600px" }}>
      <Banner variant="info">
        <BannerContent>
          <InfoIcon />
          <BannerTitle>Info</BannerTitle>
          <BannerDescription>Informational message in dark mode.</BannerDescription>
        </BannerContent>
        <BannerDismiss />
      </Banner>
      <Banner variant="warning">
        <BannerContent>
          <AlertTriangleIcon />
          <BannerTitle>Warning</BannerTitle>
          <BannerDescription>Warning message in dark mode.</BannerDescription>
        </BannerContent>
        <BannerDismiss />
      </Banner>
      <Banner variant="error">
        <BannerContent>
          <AlertCircleIcon />
          <BannerTitle>Error</BannerTitle>
          <BannerDescription>Error message in dark mode.</BannerDescription>
        </BannerContent>
        <BannerDismiss />
      </Banner>
      <Banner variant="success">
        <BannerContent>
          <CheckCircleIcon />
          <BannerTitle>Success</BannerTitle>
          <BannerDescription>Success message in dark mode.</BannerDescription>
        </BannerContent>
        <BannerDismiss />
      </Banner>
    </div>
  ),
};

export const ControlledState: Story = {
  render: function ControlledBanner() {
    const [open, setOpen] = useState(true);
    
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: "16px", maxWidth: "600px" }}>
        <button 
          onClick={() => setOpen(true)}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 w-fit"
        >
          Show Banner
        </button>
        <Banner variant="success" open={open} onOpenChange={setOpen}>
          <BannerContent>
            <CheckCircleIcon />
            <div className="flex flex-col">
              <BannerTitle>File Uploaded</BannerTitle>
              <BannerDescription>Your document has been uploaded successfully.</BannerDescription>
            </div>
          </BannerContent>
          <BannerActions>
            <BannerAction>View File</BannerAction>
            <BannerDismiss onOpenChange={setOpen} />
          </BannerActions>
        </Banner>
      </div>
    );
  },
};
