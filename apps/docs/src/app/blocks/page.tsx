import { redirect } from "next/navigation";
import { ALL_BLOCK_CATEGORIES } from "@/lib/blocks-registry";

export default function BlocksIndexPage() {
  redirect(`/blocks/${ALL_BLOCK_CATEGORIES[0]}`);
}
