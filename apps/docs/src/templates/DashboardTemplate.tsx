'use client';

import * as React from 'react';
import { AppSidebar } from '@launchapp/design-system/blocks/navigation';
import { TopNav } from '@launchapp/design-system/blocks/navigation';
import { StatsOverview } from '@launchapp/design-system/blocks/dashboard';
import { ActivityFeed } from '@launchapp/design-system/blocks/dashboard';
import { FullDataTable } from '@launchapp/design-system/blocks/data';
import { Button } from '@launchapp/design-system/components/Button';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@launchapp/design-system/components/Card';
import { Badge } from '@launchapp/design-system/components/Badge';

const MOCK_STATS = [
  { id: 'revenue', label: 'Revenue', value: '$45,231.89', change: '+20.1%' },
  { id: 'users', label: 'Active Users', value: '2,350', change: '+15.3%' },
  { id: 'orders', label: 'Orders', value: '1,234', change: '+8.2%' },
  { id: 'growth', label: 'Growth', value: '12.5%', change: '+4.3%' },
];

const MOCK_CHART_DATA = [
  { label: 'Mon', revenue: 4000, users: 2400 },
  { label: 'Tue', revenue: 3000, users: 1398 },
  { label: 'Wed', revenue: 2000, users: 9800 },
  { label: 'Thu', revenue: 2780, users: 3908 },
  { label: 'Fri', revenue: 1890, users: 4800 },
  { label: 'Sat', revenue: 2390, users: 3800 },
  { label: 'Sun', revenue: 3490, users: 4300 },
];

const MOCK_ACTIVITIES = [
  { id: '1', user: 'Sarah Chen', action: 'Created new campaign', time: '5 minutes ago', timestamp: Date.now() - 5 * 60000 },
  { id: '2', user: 'Marcus Johnson', action: 'Updated user preferences', time: '2 hours ago', timestamp: Date.now() - 2 * 60 * 60000 },
  { id: '3', user: 'Alex Rivera', action: 'Completed setup wizard', time: '1 day ago', timestamp: Date.now() - 24 * 60 * 60000 },
  { id: '4', user: 'Emma Wilson', action: 'Published content update', time: '2 days ago', timestamp: Date.now() - 2 * 24 * 60 * 60000 },
];

const MOCK_USERS = [
  { id: '1', name: 'Alice Johnson', email: 'alice@example.com', status: 'Active', joinDate: '2024-01-15' },
  { id: '2', name: 'Bob Smith', email: 'bob@example.com', status: 'Active', joinDate: '2024-02-20' },
  { id: '3', name: 'Carol Davis', email: 'carol@example.com', status: 'Inactive', joinDate: '2024-01-10' },
  { id: '4', name: 'David Brown', email: 'david@example.com', status: 'Active', joinDate: '2024-03-01' },
  { id: '5', name: 'Eve Wilson', email: 'eve@example.com', status: 'Active', joinDate: '2024-02-14' },
];

export default function DashboardTemplate() {
  const [sidebarOpen, setSidebarOpen] = React.useState(true);

  return (
    <div className="flex h-screen overflow-hidden bg-background">
      {/* Sidebar */}
      <AppSidebar className={sidebarOpen ? '' : 'hidden'} />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Top Navigation */}
        <TopNav
          logo={<span className="text-lg font-bold">Dashboard</span>}
          items={[
            { label: 'Dashboard', href: '#', isActive: true },
            { label: 'Analytics', href: '#' },
            { label: 'Reports', href: '#' },
          ]}
          notificationCount={3}
          user={{
            name: 'John Doe',
            email: 'john@example.com',
            avatarFallback: 'JD',
          }}
        />

        {/* Main Content Area */}
        <main className="flex-1 overflow-auto">
          <div className="p-8 space-y-8">
            {/* Header */}
            <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
              <p className="text-muted-foreground">
                Welcome back! Here's your performance overview for this month.
              </p>
            </div>

            {/* Stats Overview */}
            <StatsOverview
              items={MOCK_STATS}
              cols={4}
              title="Key Metrics"
              description="Real-time performance indicators"
              chartData={MOCK_CHART_DATA}
              chartKeys={[
                { key: 'revenue', color: 'hsl(var(--la-primary))' },
                { key: 'users', color: 'hsl(var(--la-chart-2))' },
              ]}
            />

            {/* Content Grid */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Activity Feed */}
              <div className="lg:col-span-2">
                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                    <CardDescription>Latest actions from your team</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ActivityFeed
                      items={MOCK_ACTIVITIES.map((activity) => ({
                        id: activity.id,
                        icon: '→',
                        title: activity.action,
                        subtitle: activity.user,
                        timestamp: activity.timestamp,
                        time: activity.time,
                      }))}
                    />
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-base">Quick Stats</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Conversion Rate</p>
                    <p className="text-2xl font-bold">3.24%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Bounce Rate</p>
                    <p className="text-2xl font-bold">42.1%</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-sm text-muted-foreground">Avg. Session</p>
                    <p className="text-2xl font-bold">3m 42s</p>
                  </div>
                  <Button variant="outline" className="w-full mt-4">
                    View Details
                  </Button>
                </CardContent>
              </Card>
            </div>

            {/* Users Table */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Users</CardTitle>
                    <CardDescription>Manage and view all registered users</CardDescription>
                  </div>
                  <Button variant="default" size="sm">
                    Add User
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left py-3 px-4 font-medium">Name</th>
                        <th className="text-left py-3 px-4 font-medium">Email</th>
                        <th className="text-left py-3 px-4 font-medium">Status</th>
                        <th className="text-left py-3 px-4 font-medium">Join Date</th>
                        <th className="text-right py-3 px-4 font-medium">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {MOCK_USERS.map((user) => (
                        <tr key={user.id} className="border-b hover:bg-muted/50 transition-colors">
                          <td className="py-3 px-4 font-medium">{user.name}</td>
                          <td className="py-3 px-4 text-muted-foreground">{user.email}</td>
                          <td className="py-3 px-4">
                            <Badge variant={user.status === 'Active' ? 'default' : 'secondary'}>
                              {user.status}
                            </Badge>
                          </td>
                          <td className="py-3 px-4 text-muted-foreground">{user.joinDate}</td>
                          <td className="py-3 px-4 text-right">
                            <Button variant="ghost" size="sm">
                              Edit
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}
