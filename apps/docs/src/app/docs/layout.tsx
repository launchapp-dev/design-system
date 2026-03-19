import * as React from "react";
import { DocsSidebar } from "@/components/DocsSidebar";

export default function DocsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="mx-auto flex w-full max-w-screen-xl flex-1 px-4 sm:px-6 lg:px-8">
      <DocsSidebar />
      <div className="min-w-0 flex-1 py-8 pl-0 md:pl-8">{children}</div>
    </div>
  );
}
