import { Button } from "@launchapp/design-system";
import Link from "next/link";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r bg-card text-card-foreground">
        <div className="p-6">
          <h1 className="text-lg font-bold">{{projectName}}</h1>
        </div>
        <nav className="space-y-2 px-4">
          <Link href="/dashboard" className="block">
            <Button variant="ghost" className="w-full justify-start">
              Dashboard
            </Button>
          </Link>
          <Link href="/dashboard/team" className="block">
            <Button variant="ghost" className="w-full justify-start">
              Team
            </Button>
          </Link>
          <Link href="/dashboard/projects" className="block">
            <Button variant="ghost" className="w-full justify-start">
              Projects
            </Button>
          </Link>
          <Link href="/settings" className="block">
            <Button variant="ghost" className="w-full justify-start">
              Settings
            </Button>
          </Link>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="border-b bg-card p-6 text-card-foreground">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="flex gap-2">
              <Button variant="outline" size="sm">
                Help
              </Button>
              <Button variant="default" size="sm">
                Settings
              </Button>
            </div>
          </div>
        </div>
        <div className="p-6">{children}</div>
      </main>
    </div>
  );
}
