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
import { Badge } from "../Badge";
import { Input } from "../Input";
import { Label } from "../Label";
import { Separator } from "../Separator";
import { Marquee, MarqueeItem } from "../Marquee";
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

export const FormExampleRTL: Story = {
  decorators: [
    (Story) => (
      <RTLWrapper>
        <Story />
      </RTLWrapper>
    ),
  ],
  render: () => (
    <div className="w-[400px] space-y-4">
      <h2 className="text-lg font-semibold">نموذج إدخال</h2>
      <div className="space-y-3">
        <div className="space-y-2">
          <Label htmlFor="name-ar">الاسم الكامل</Label>
          <Input id="name-ar" dir="rtl" placeholder="أدخل اسمك" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email-ar">البريد الإلكتروني</Label>
          <Input id="email-ar" dir="rtl" type="email" placeholder="example@email.com" />
        </div>
        <div className="flex gap-2 justify-end">
          <Button variant="outline">إلغاء</Button>
          <Button>إرسال</Button>
        </div>
      </div>
    </div>
  ),
};

export const BadgeExampleRTL: Story = {
  decorators: [
    (Story) => (
      <RTLWrapper>
        <Story />
      </RTLWrapper>
    ),
  ],
  render: () => (
    <div className="space-y-4 w-[400px]">
      <h2 className="text-lg font-semibold">الشارات والعلامات</h2>
      <div className="flex flex-wrap gap-2">
        <Badge>افتراضي</Badge>
        <Badge variant="secondary">ثانوي</Badge>
        <Badge variant="destructive">تحذير</Badge>
        <Badge variant="outline">حدود</Badge>
      </div>
      <Separator />
      <div className="flex flex-wrap gap-2">
        <Badge variant="default" className="flex items-center gap-1">
          <span>نشط</span>
          <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
          </svg>
        </Badge>
        <Badge variant="secondary" className="flex items-center gap-1">
          <span>معلق</span>
        </Badge>
      </div>
    </div>
  ),
};

export const MarqueeRTL: Story = {
  decorators: [
    (Story) => (
      <RTLWrapper>
        <Story />
      </RTLWrapper>
    ),
  ],
  render: () => (
    <div className="w-[600px] space-y-4">
      <h2 className="text-lg font-semibold text-center">شريط الأخبار</h2>
      <Marquee direction="left" showGradient className="py-3">
        <MarqueeItem className="px-8">
          <span className="text-sm">مرحباً بكم في نظام التصميم الجديد</span>
        </MarqueeItem>
        <MarqueeItem className="px-8">
          <span className="text-sm">دعم كامل للغات RTL</span>
        </MarqueeItem>
        <MarqueeItem className="px-8">
          <span className="text-sm">مكونات سهلة الاستخدام</span>
        </MarqueeItem>
        <MarqueeItem className="px-8">
          <span className="text-sm">تصميم متجاوب ومتاح للجميع</span>
        </MarqueeItem>
      </Marquee>
    </div>
  ),
};

export const ButtonsAndActionsRTL: Story = {
  decorators: [
    (Story) => (
      <RTLWrapper>
        <Story />
      </RTLWrapper>
    ),
  ],
  render: () => (
    <div className="space-y-6 w-[400px]">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">أزرار أساسية</h3>
        <div className="flex flex-wrap gap-2">
          <Button>إرسال</Button>
          <Button variant="secondary">إلغاء</Button>
          <Button variant="destructive">حذف</Button>
          <Button variant="outline">مزيد</Button>
          <Button variant="ghost">تخطي</Button>
        </div>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">أحجام مختلفة</h3>
        <div className="flex flex-wrap items-center gap-2">
          <Button size="sm">صغير</Button>
          <Button size="md">متوسط</Button>
          <Button size="lg">كبير</Button>
        </div>
      </div>
    </div>
  ),
};

export const NavigationDemoRTL: Story = {
  decorators: [
    (Story) => (
      <RTLWrapper>
        <Story />
      </RTLWrapper>
    ),
  ],
  render: () => (
    <div className="space-y-6 w-[500px]">
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">مسار التنقل</h3>
        <Breadcrumb>
          <BreadcrumbList>
            <BreadcrumbItem>
              <BreadcrumbLink href="#">الرئيسية</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">المنتجات</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbLink href="#">الإلكترونيات</BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
            <BreadcrumbItem>
              <BreadcrumbPage>الهواتف الذكية</BreadcrumbPage>
            </BreadcrumbItem>
          </BreadcrumbList>
        </Breadcrumb>
      </div>
      
      <Separator />
      
      <div className="space-y-3">
        <h3 className="text-sm font-semibold text-muted-foreground">الصفحات</h3>
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">1</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#" isActive>2</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">3</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href="#">10</PaginationLink>
            </PaginationItem>
            <PaginationItem>
              <PaginationNext href="#" />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  ),
};
