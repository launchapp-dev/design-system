import * as React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { useForm } from "react-hook-form";
import {
  FormWizard,
  FormWizardProgress,
  FormWizardNav,
  FormWizardContent,
} from "./FormWizard";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormDescription,
  FormMessage,
} from "../Form";
import { Input } from "../Input";
import { Checkbox } from "../Checkbox";

const meta: Meta = {
  title: "Components/FormWizard",
  component: FormWizard,
  tags: ["autodocs"],
};

export default meta;
type Story = StoryObj<typeof FormWizard>;

function BasicWizardContent() {
  const form = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      subscribe: false,
      company: "",
      industry: "",
    },
  });

  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
    alert(JSON.stringify(data, null, 2));
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <FormWizard initialStep={0}>
          <FormWizardProgress
            showLabels={true}
            getStepLabel={(i) =>
              ["Personal", "Account", "Preferences"][i] || `Step ${i + 1}`
            }
            className="mb-6"
          />

          {/* Step 1: Personal Information */}
          <FormWizardContent stepIndex={0} className="space-y-4">
            <h3 className="text-lg font-semibold">Personal Information</h3>
            <FormField
              control={form.control}
              name="firstName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>First Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your first name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="lastName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Last Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your last name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormWizardContent>

          {/* Step 2: Account Details */}
          <FormWizardContent stepIndex={1} className="space-y-4">
            <h3 className="text-lg font-semibold">Account Details</h3>
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Enter your email"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter your company" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormWizardContent>

          {/* Step 3: Preferences */}
          <FormWizardContent stepIndex={2} className="space-y-4">
            <h3 className="text-lg font-semibold">Preferences</h3>
            <FormField
              control={form.control}
              name="industry"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Industry</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter your industry"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="subscribe"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center gap-2 space-y-0">
                  <FormControl>
                    <Checkbox
                      checked={field.value}
                      onCheckedChange={field.onChange}
                    />
                  </FormControl>
                  <FormLabel className="!mt-0">
                    Subscribe to updates
                  </FormLabel>
                  <FormMessage />
                </FormItem>
              )}
            />
          </FormWizardContent>

          <FormWizardNav
            nextLabel="Next"
            previousLabel="Back"
            submitLabel="Complete"
            className="mt-6"
          />
        </FormWizard>
      </form>
    </Form>
  );
}

export const Basic: Story = {
  render: () => <BasicWizardContent />,
};

function AdvancedWizardContent() {
  const form = useForm({
    defaultValues: {
      productName: "",
      description: "",
      price: "",
      category: "",
      tags: [],
      features: false,
    },
  });

  const [activeStep, setActiveStep] = React.useState(0);

  const onSubmit = (data: any) => {
    console.log("Product form submitted:", data);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="max-w-2xl">
        <FormWizard
          initialStep={0}
          onStepChange={setActiveStep}
        >
          <div className="space-y-6">
            <FormWizardProgress
              showLabels={true}
              getStepLabel={(i) =>
                ["Basic Info", "Details", "Review"][i] || `Step ${i + 1}`
              }
            />

            {/* Step 1: Basic Info */}
            <FormWizardContent stepIndex={0} className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Information</h3>
                <FormField
                  control={form.control}
                  name="productName"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Product Name</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Enter product name"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription>
                        This is the name of your product
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormWizardContent>

            {/* Step 2: Details */}
            <FormWizardContent stepIndex={1} className="space-y-4">
              <div>
                <h3 className="text-lg font-semibold mb-4">Product Details</h3>
                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <textarea
                          placeholder="Describe your product"
                          className="w-full px-3 py-2 rounded-md border border-[hsl(var(--la-input))] bg-[hsl(var(--la-background))] text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[hsl(var(--la-ring))]"
                          rows={4}
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="price"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Price</FormLabel>
                      <FormControl>
                        <Input
                          type="number"
                          placeholder="0.00"
                          step="0.01"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </FormWizardContent>

            {/* Step 3: Review */}
            <FormWizardContent stepIndex={2} className="space-y-4">
              <div className="bg-[hsl(var(--la-muted))] p-4 rounded-lg">
                <h3 className="text-lg font-semibold mb-4">Review Your Information</h3>
                <div className="space-y-2 text-sm">
                  <p>
                    <strong>Product Name:</strong> {form.getValues("productName")}
                  </p>
                  <p>
                    <strong>Description:</strong> {form.getValues("description")}
                  </p>
                  <p>
                    <strong>Price:</strong> ${form.getValues("price")}
                  </p>
                </div>
              </div>
            </FormWizardContent>

            <FormWizardNav
              nextLabel="Continue"
              previousLabel="Back"
              submitLabel="Publish Product"
            />
          </div>
        </FormWizard>
      </form>
    </Form>
  );
}

export const Advanced: Story = {
  render: () => <AdvancedWizardContent />,
};
