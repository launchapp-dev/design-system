import { Button, Card, Input } from "@launchapp/design-system";

export default function AdminDashboard() {
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r bg-card text-card-foreground">
        <div className="p-6 border-b">
          <h1 className="text-lg font-bold">{{projectName}} Admin</h1>
        </div>
        <nav className="space-y-2 p-4">
          <Button variant="default" className="w-full justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Users
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Content
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Reports
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Settings
          </Button>
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden">
        <header className="border-b bg-card p-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Dashboard</h2>
            <div className="flex gap-2">
              <Input placeholder="Search..." className="w-48" />
              <Button variant="default" size="sm">
                Export
              </Button>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-auto p-6">
          <div className="space-y-6">
            <div className="grid gap-4 md:grid-cols-4">
              <Card className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-3xl font-bold">12,543</p>
                  <p className="text-xs text-muted-foreground">↑ 8.2% from last week</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Active Sessions</p>
                  <p className="text-3xl font-bold">2,831</p>
                  <p className="text-xs text-muted-foreground">↑ 12% from last week</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                  <p className="text-3xl font-bold">45.2K</p>
                  <p className="text-xs text-muted-foreground">↓ 2.5% from last week</p>
                </div>
              </Card>

              <Card className="p-6">
                <div className="space-y-2">
                  <p className="text-sm font-medium text-muted-foreground">Conversion Rate</p>
                  <p className="text-3xl font-bold">3.24%</p>
                  <p className="text-xs text-muted-foreground">↑ 1.3% from last week</p>
                </div>
              </Card>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Recent Users</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b">
                      <th className="text-left py-3 px-4 font-semibold">Name</th>
                      <th className="text-left py-3 px-4 font-semibold">Email</th>
                      <th className="text-left py-3 px-4 font-semibold">Status</th>
                      <th className="text-left py-3 px-4 font-semibold">Joined</th>
                      <th className="text-left py-3 px-4 font-semibold">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      { name: "Alice Johnson", email: "alice@example.com", status: "Active", joined: "2 days ago" },
                      { name: "Bob Smith", email: "bob@example.com", status: "Active", joined: "5 days ago" },
                      { name: "Carol Williams", email: "carol@example.com", status: "Inactive", joined: "1 week ago" },
                      { name: "David Brown", email: "david@example.com", status: "Active", joined: "2 weeks ago" },
                      { name: "Eva Davis", email: "eva@example.com", status: "Active", joined: "3 weeks ago" },
                    ].map((user) => (
                      <tr key={user.email} className="border-b hover:bg-muted/50">
                        <td className="py-3 px-4">{user.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                        <td className="py-3 px-4">
                          <span
                            className={`inline-flex px-2 py-1 rounded text-xs font-medium ${
                              user.status === "Active"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4 text-muted-foreground">{user.joined}</td>
                        <td className="py-3 px-4">
                          <Button variant="ghost" size="sm">
                            View
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Content Overview</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Published</p>
                  <p className="text-2xl font-bold">248</p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Drafts</p>
                  <p className="text-2xl font-bold">42</p>
                </div>
                <div className="space-y-2 p-4 border rounded-lg">
                  <p className="text-sm text-muted-foreground">Archived</p>
                  <p className="text-2xl font-bold">156</p>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
