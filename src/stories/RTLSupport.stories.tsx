import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "../Breadcrumb";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "../Pagination";
import { Button } from "../Button";
import { DirectionProvider, useDirection } from "../../hooks/useDirection";

const meta: Meta = {
  title: "Guides/RTL Support",
  parameters: {
    layout: "centered",
  },
};

export default meta;

type Story = StoryObj;

const RTLWrapper = ({ children }: { children: React.ReactNode }) => {
  React.useEffect(() => {
    document.documentElement.setAttribute("dir", "rtl");
    return () => document.documentElement.setAttribute("dir", "ltr");
  }, []);
  return (
    <div className="rtl" dir="rtl">
      {children}
    </div>
  );
};

export const DirectionDemo: Story = {
  render: () => {
    const DirectionToggle = () => {
      const [direction, setDirection] = React.useState<"ltr" | "rtl">("ltr");
      
      const toggleDirection = () => {
        const newDir = direction === "ltr" ? "rtl" : "ltr";
        setDirection(newDir);
        document.documentElement.setAttribute("dir", newDir);
      };
      
      return (
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Current Direction: {direction.toUpperCase()}</span>
            <Button onClick={toggleDirection}>
              Switch to {direction === "ltr" ? "RTL" : "LTR"}
            </Button>
          </div>
        </div>
      );
    };
    
    return <DirectionToggle />;
  },
};

export const BreadcrumbRTL: Story = {
  decorators: [
    (Story) => (
      <RTLWrapper>
        <Story />
      </RTLWrapper>
    ),
  ],
  render: () => (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href="#">الرئيسية</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbLink href="#">المكونات</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>مسار التنقل</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  ),
};

export const PaginationRTL: Story = {
  decorators: [
    (Story) => (
      <RTLWrapper>
        <Story />
      </RTLWrapper>
    ),
  ],
  render: () => (
    <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  ),
};

export const MixedContentRTL: Story = {
  decorators: [
    (Story) => (
      <RTLWrapper>
        <Story />
      </RTLWrapper>
    ),
  ],
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">نظام التصميم</h2>
        <p className="text-sm text-muted-foreground">
          هذا مثال على النص العربي في تخطيط من اليمين إلى اليسار. يدعم نظام التصميم الخاص بنا اللغات التي تُكتب من اليمين إلى اليسار.
        </p>
      </div>
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">الرئيسية</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">المكونات</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>مسار التنقل</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex gap-2 justify-start">
        <Button variant="default">إرسال</Button>
        <Button variant="outline">إلغاء</Button>
      </div>
      
      <Pagination>
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious href="#" />
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">1</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationLink href="#">2</PaginationLink>
          </PaginationItem>
          <PaginationItem>
            <PaginationNext href="#" />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  ),
};

export const HebrewExample: Story = {
  decorators: [
    (Story) => (
      <RTLWrapper>
        <Story />
      </RTLWrapper>
    ),
  ],
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div className="space-y-2">
        <h2 className="text-lg font-semibold">מערכת עיצוב</h2>
        <p className="text-sm text-muted-foreground">
          זוהי דוגמה לטקסט בעברית בפריסה מימין לשמאל. מערכת העיצוב שלנו תומכת בשפות הנכתבות מימין לשמאל.
        </p>
      </div>
      
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href="#">בית</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href="#">רכיבים</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>פירורי לחם</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      
      <div className="flex gap-2 justify-start">
        <Button variant="default">שלח</Button>
        <Button variant="outline">ביטול</Button>
      </div>
    </div>
  ),
};
