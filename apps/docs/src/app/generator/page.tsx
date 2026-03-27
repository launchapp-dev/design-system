import { AIComponentGenerator } from "@/components/AIComponentGenerator";

export const metadata = {
  title: "AI Component Generator",
  description: "Generate React components using AI based on natural language descriptions",
};

export default function GeneratorPage() {
  return (
    <main className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-6 py-10">
        <AIComponentGenerator />
      </div>
    </main>
  );
}
