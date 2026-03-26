import { Button, Input, Label, Card } from "@launchapp/design-system";

export default function SettingsPage() {
  return (
    <div className="flex h-screen bg-background">
      <aside className="w-64 border-r bg-card text-card-foreground">
        <div className="p-6">
          <h1 className="text-lg font-bold">{{projectName}}</h1>
        </div>
        <nav className="space-y-2 px-4">
          <Button variant="ghost" className="w-full justify-start">
            Dashboard
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Team
          </Button>
          <Button variant="ghost" className="w-full justify-start">
            Projects
          </Button>
          <Button variant="default" className="w-full justify-start">
            Settings
          </Button>
        </nav>
      </aside>

      <main className="flex-1 overflow-auto">
        <div className="border-b bg-card p-6 text-card-foreground">
          <h2 className="text-2xl font-bold">Settings</h2>
        </div>

        <div className="p-6 max-w-4xl">
          <div className="space-y-8">
            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Account Settings</h3>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" placeholder="you@example.com" />
                </div>
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input id="name" type="text" placeholder="John Doe" />
                </div>
                <Button>Save Changes</Button>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Notifications</h3>
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Email Notifications</p>
                    <p className="text-sm text-muted-foreground">Receive updates via email</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" defaultChecked />
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Marketing Emails</p>
                    <p className="text-sm text-muted-foreground">Receive promotions and updates</p>
                  </div>
                  <input type="checkbox" className="w-4 h-4" />
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4 text-destructive">Danger Zone</h3>
              <div className="space-y-2">
                <Button variant="destructive">Delete Account</Button>
                <p className="text-sm text-muted-foreground">This action cannot be undone.</p>
              </div>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}
