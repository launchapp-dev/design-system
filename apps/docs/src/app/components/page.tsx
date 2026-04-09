import { redirect } from "next/navigation";
import { components } from "@/lib/registry";

export default function ComponentsIndexPage() {
  redirect(`/components/${components[0].slug}`);
}
