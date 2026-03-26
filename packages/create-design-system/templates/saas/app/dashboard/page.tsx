import { Card } from "@launchapp/design-system";

export default function DashboardPage() {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-xl font-semibold">Welcome back!</h2>
        <p className="text-sm text-muted-foreground">
          Here's what's happening with your account today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-4">
        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Total Users</p>
            <p className="text-3xl font-bold">1,234</p>
            <p className="text-xs text-muted-foreground">+5% from last month</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Revenue</p>
            <p className="text-3xl font-bold">$45,231</p>
            <p className="text-xs text-muted-foreground">+12% from last month</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Active Projects</p>
            <p className="text-3xl font-bold">24</p>
            <p className="text-xs text-muted-foreground">3 in progress</p>
          </div>
        </Card>

        <Card className="p-6">
          <div className="space-y-2">
            <p className="text-sm font-medium text-muted-foreground">Conversion</p>
            <p className="text-3xl font-bold">3.2%</p>
            <p className="text-xs text-muted-foreground">+0.5% from last month</p>
          </div>
        </Card>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <Card className="p-6">
          <h3 className="font-semibold mb-4">Recent Activity</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">New user signup</p>
                <p className="text-sm text-muted-foreground">2 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2 border-b">
              <div>
                <p className="font-medium">Project completed</p>
                <p className="text-sm text-muted-foreground">5 hours ago</p>
              </div>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="font-medium">Payment received</p>
                <p className="text-sm text-muted-foreground">1 day ago</p>
              </div>
            </div>
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="font-semibold mb-4">Quick Actions</h3>
          <div className="space-y-2">
            <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition">
              Create new project
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition">
              Invite team member
            </button>
            <button className="w-full text-left p-3 rounded-lg hover:bg-muted transition">
              View reports
            </button>
          </div>
        </Card>
      </div>
    </div>
  );
}
