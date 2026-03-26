import { Button } from "@launchapp/design-system";
import Link from "next/link";

export default function AdminDashboard() {
  const menuItems = [
    { label: "Dashboard", href: "#", icon: "📊", active: true },
    { label: "Users", href: "#", icon: "👥" },
    { label: "Settings", href: "#", icon: "⚙️" },
    { label: "Analytics", href: "#", icon: "📈" },
    { label: "Reports", href: "#", icon: "📋" },
    { label: "Help", href: "#", icon: "❓" },
  ];

  return (
    <div className="min-h-screen flex bg-background">
      {/* Sidebar */}
      <aside className="w-64 border-r border-border bg-card">
        <div className="p-6 border-b border-border">
          <h1 className="text-xl font-bold text-foreground">{{projectName}}</h1>
          <p className="text-sm text-muted-foreground">Admin Panel</p>
        </div>

        <nav className="p-4">
          {menuItems.map((item) => (
            <Link key={item.label} href={item.href}>
              <div
                className={`px-4 py-3 rounded-md mb-2 cursor-pointer transition-colors ${
                  item.active
                    ? "bg-primary/10 text-primary font-medium"
                    : "text-muted-foreground hover:bg-muted"
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </div>
            </Link>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {/* Top Header */}
        <header className="border-b border-border bg-card px-8 py-4">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold text-foreground">Dashboard</h2>
            <div className="flex items-center gap-4">
              <input
                type="text"
                placeholder="Search..."
                className="px-3 py-2 border border-input rounded-md bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
              />
              <Button variant="outline" size="sm">
                Account
              </Button>
            </div>
          </div>
        </header>

        {/* Main Content Area */}
        <main className="flex-1 p-8 overflow-auto">
          <div className="grid gap-6">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { title: "Total Users", value: "1,234", change: "+5%" },
                { title: "Active Sessions", value: "256", change: "+12%" },
                { title: "Revenue", value: "$45,231", change: "+8%" },
                { title: "Conversion", value: "3.24%", change: "-2%" },
              ].map((stat) => (
                <div
                  key={stat.title}
                  className="p-6 bg-card rounded-lg border border-border hover:shadow-md transition-shadow"
                >
                  <p className="text-sm text-muted-foreground mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-foreground mb-2">
                    {stat.value}
                  </p>
                  <p className="text-xs text-green-600">
                    {stat.change} from last month
                  </p>
                </div>
              ))}
            </div>

            {/* Data Table */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Recent Users
              </h3>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Name
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Email
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Status
                      </th>
                      <th className="text-left py-3 px-4 font-medium text-muted-foreground">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {[
                      {
                        name: "John Doe",
                        email: "john@example.com",
                        status: "Active",
                      },
                      {
                        name: "Jane Smith",
                        email: "jane@example.com",
                        status: "Active",
                      },
                      {
                        name: "Bob Johnson",
                        email: "bob@example.com",
                        status: "Inactive",
                      },
                    ].map((user, i) => (
                      <tr key={i} className="border-b border-border hover:bg-muted/50">
                        <td className="py-3 px-4 text-foreground">{user.name}</td>
                        <td className="py-3 px-4 text-muted-foreground">
                          {user.email}
                        </td>
                        <td className="py-3 px-4">
                          <span
                            className={`px-2 py-1 rounded text-xs font-medium ${
                              user.status === "Active"
                                ? "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-200"
                                : "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
                            }`}
                          >
                            {user.status}
                          </span>
                        </td>
                        <td className="py-3 px-4">
                          <Button variant="outline" size="sm">
                            Edit
                          </Button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>

            {/* Settings Section */}
            <section className="bg-card rounded-lg border border-border p-6">
              <h3 className="text-lg font-semibold mb-4 text-foreground">
                Settings
              </h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium text-foreground">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">
                      Receive updates via email
                    </p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" defaultChecked />
                </div>
                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div>
                    <p className="font-medium text-foreground">Dark Mode</p>
                    <p className="text-sm text-muted-foreground">
                      Enable dark theme
                    </p>
                  </div>
                  <input type="checkbox" className="w-5 h-5" />
                </div>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}
