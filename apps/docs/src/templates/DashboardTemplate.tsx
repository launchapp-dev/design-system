"use client";

import { AppSidebar } from "@launchapp/design-system/blocks/navigation";
import { TopNav } from "@launchapp/design-system/blocks/navigation";
import { StatsOverview } from "@launchapp/design-system/blocks/dashboard";
import { MetricCards } from "@launchapp/design-system/blocks/dashboard";
import { ActivityFeed } from "@launchapp/design-system/blocks/dashboard";
import { Button } from "@launchapp/design-system/components/Button";
import { Card } from "@launchapp/design-system/components/Card";
import React, { useState } from "react";

const mockMetrics = [
  { id: "revenue", label: "Total Revenue", value: "$45,231.89", change: "+20.1%", trend: "up" as const },
  { id: "users", label: "Active Users", value: "2,350", change: "+15.3%", trend: "up" as const },
  { id: "orders", label: "Total Orders", value: "1,234", change: "+8.2%", trend: "up" as const },
  { id: "growth", label: "Growth Rate", value: "12.5%", change: "+4.3%", trend: "up" as const },
];

const mockActivities = [
  {
    id: "1",
    user: "Sarah Johnson",
    action: "Created new campaign",
    timestamp: "2 hours ago",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=32&h=32&fit=crop",
  },
  {
    id: "2",
    user: "Mike Chen",
    action: "Updated product catalog",
    timestamp: "4 hours ago",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop",
  },
  {
    id: "3",
    user: "Emily Rodriguez",
    action: "Generated monthly report",
    timestamp: "1 day ago",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=32&h=32&fit=crop",
  },
];

interface DashboardStats {
  total: number;
  growth: number;
  trend: "up" | "down" | "stable";
}

export default function DashboardTemplate() {
  const [selectedPeriod, setSelectedPeriod] = useState<"week" | "month" | "year">("month");

  const stats: Record<"week" | "month" | "year", DashboardStats> = {
    week: { total: 4231, growth: 15, trend: "up" },
    month: { total: 45231, growth: 20, trend: "up" },
    year: { total: 523411, growth: 45, trend: "up" },
  };

  return (
    <div className="flex h-screen bg-background">
      <AppSidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <TopNav />
        <main className="flex-1 overflow-auto">
          <div className="p-8">
            <div className="mb-8">
              <h1 className="text-3xl font-bold tracking-tight mb-2">Dashboard</h1>
              <p className="text-muted-foreground">Welcome back! Here's what's happening with your business today.</p>
            </div>

            <div className="flex gap-2 mb-8">
              {(["week", "month", "year"] as const).map((period) => (
                <Button
                  key={period}
                  variant={selectedPeriod === period ? "default" : "outline"}
                  size="sm"
                  onClick={() => setSelectedPeriod(period)}
                  className="capitalize"
                >
                  {period}
                </Button>
              ))}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              {mockMetrics.map((metric) => (
                <Card key={metric.id} className="p-6">
                  <p className="text-sm text-muted-foreground mb-1">{metric.label}</p>
                  <div className="flex items-baseline justify-between">
                    <p className="text-2xl font-bold">{metric.value}</p>
                    <span className={metric.trend === "up" ? "text-green-600 text-sm font-medium" : "text-red-600 text-sm font-medium"}>
                      {metric.change}
                    </span>
                  </div>
                </Card>
              ))}
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <div className="lg:col-span-2">
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-6">Revenue Overview</h2>
                  <div className="h-72 bg-muted/30 rounded-lg flex items-center justify-center">
                    <div className="text-center">
                      <p className="text-muted-foreground mb-2">Chart Placeholder</p>
                      <p className="text-sm text-muted-foreground">Line chart showing revenue trends</p>
                    </div>
                  </div>
                </Card>
              </div>

              <div>
                <Card className="p-6">
                  <h2 className="text-lg font-semibold mb-4">Recent Activity</h2>
                  <div className="space-y-4">
                    {mockActivities.map((activity) => (
                      <div key={activity.id} className="flex gap-3">
                        <img
                          src={activity.avatar}
                          alt={activity.user}
                          className="w-8 h-8 rounded-full flex-shrink-0"
                        />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{activity.user}</p>
                          <p className="text-xs text-muted-foreground truncate">{activity.action}</p>
                          <p className="text-xs text-muted-foreground mt-1">{activity.timestamp}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
