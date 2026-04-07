import { redirect } from "next/navigation";
import { components } from "@/lib/registry";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return components.map((c) => ({ slug: c.slug }));
}

export default async function DocsComponentRedirect({ params }: PageProps) {
  const { slug } = await params;
  redirect(`/components/${slug}`);
}
