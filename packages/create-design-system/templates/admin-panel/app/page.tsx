import { Button, Card, Badge } from "@launchapp/design-system";

export default function AdminDashboard() {
  return (
    <div className="flex min-h-screen bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r bg-card p-6 space-y-6">
        <div>
          <h1 className="text-2xl font-bold">{{projectName}}</h1>
          <p className="text-sm text-muted-foreground">Admin Panel</p>
        </div>

        <nav className="space-y-2">
          <NavItem label="Dashboard" href="/" active />
          <NavItem label="Users" href="/users" />
          <NavItem label="Settings" href="/settings" />
          <NavItem label="Reports" href="/reports" />
          <NavItem label="Documentation" href="/docs" />
        </nav>

        <div className="pt-6 border-t">
          <Button variant="outline" className="w-full">Sign Out</Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        {/* Top Bar */}
        <header className="border-b bg-card px-8 py-4">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-semibold">Welcome back</h2>
            <div className="flex items-center gap-4">
              <span className="text-sm text-muted-foreground">Admin User</span>
              <div className="w-10 h-10 rounded-full bg-primary/20"></div>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-8 space-y-8">
          {/* Stats Overview */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Overview</h3>
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold mt-2">1,234</p>
                <p className="text-xs text-muted-foreground mt-2">+5% from last month</p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Active Sessions</p>
                <p className="text-3xl font-bold mt-2">456</p>
                <p className="text-xs text-muted-foreground mt-2">Right now</p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Revenue</p>
                <p className="text-3xl font-bold mt-2">$45.2K</p>
                <p className="text-xs text-muted-foreground mt-2">This month</p>
              </Card>
              <Card className="p-6">
                <p className="text-sm text-muted-foreground">Server Status</p>
                <div className="flex items-center gap-2 mt-2">
                  <span className="w-3 h-3 rounded-full bg-green-500"></span>
                  <p className="font-bold">Healthy</p>
                </div>
              </Card>
            </div>
          </div>

          {/* Users Table */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Recent Users</h3>
              <Button variant="default" size="sm">Add User</Button>
            </div>
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-muted border-b">
                  <tr>
                    <th className="text-left px-6 py-3 font-semibold">Name</th>
                    <th className="text-left px-6 py-3 font-semibold">Email</th>
                    <th className="text-left px-6 py-3 font-semibold">Status</th>
                    <th className="text-left px-6 py-3 font-semibold">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <TableRow name="Sarah Johnson" email="sarah@example.com" status="Active" />
                  <TableRow name="Mike Chen" email="mike@example.com" status="Active" />
                  <TableRow name="Emma Wilson" email="emma@example.com" status="Pending" />
                  <TableRow name="John Brown" email="john@example.com" status="Active" />
                </tbody>
              </table>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}

function NavItem({ label, href, active = false }: { label: string; href: string; active?: boolean }) {
  return (
    <a
      href={href}
      className={`block px-4 py-2 rounded-md transition-colors ${
        active
          ? "bg-primary text-primary-foreground"
          : "hover:bg-muted text-foreground"
      }`}
    >
      {label}
    </a>
  );
}

function TableRow({ name, email, status }: { name: string; email: string; status: string }) {
  return (
    <tr className="border-b hover:bg-muted/50 transition-colors">
      <td className="px-6 py-4 font-medium">{name}</td>
      <td className="px-6 py-4 text-sm text-muted-foreground">{email}</td>
      <td className="px-6 py-4">
        <Badge variant={status === "Active" ? "default" : "outline"}>
          {status}
        </Badge>
      </td>
      <td className="px-6 py-4">
        <Button variant="ghost" size="sm">Edit</Button>
      </td>
    </tr>
  );
}
