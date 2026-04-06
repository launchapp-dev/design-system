import type { Meta, StoryObj } from "@storybook/react";
import * as React from "react";
import {
  Table,
  TableHeader,
  TableBody,
  TableFooter,
  TableRow,
  TableHead,
  TableCell,
  TableCaption,
} from "./index";

const meta: Meta<typeof Table> = {
  title: "Components/Table",
  component: Table,
  argTypes: {},
};

export default meta;
type Story = StoryObj<typeof meta>;

const users = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", role: "Admin", status: "Active" },
  { id: 2, name: "Bob Smith", email: "bob@example.com", role: "Editor", status: "Active" },
  { id: 3, name: "Carol White", email: "carol@example.com", role: "Viewer", status: "Inactive" },
  { id: 4, name: "David Brown", email: "david@example.com", role: "Editor", status: "Active" },
  { id: 5, name: "Eva Martinez", email: "eva@example.com", role: "Admin", status: "Active" },
];

export const Default: Story = {
  render: () => (
    <div style={{ width: 700 }}>
      <Table>
        <TableCaption>A list of registered users.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total Users</TableCell>
            <TableCell>{users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

export const Striped: Story = {
  render: () => (
    <div style={{ width: 700 }}>
      <Table>
        <TableCaption>Striped rows for improved readability.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody striped>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  ),
};

export const AllVariants: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>
          With Caption and Footer
        </p>
        <Table>
          <TableCaption>Users with full table structure.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          <TableFooter>
            <TableRow>
              <TableCell colSpan={2}>Total</TableCell>
              <TableCell>3</TableCell>
            </TableRow>
          </TableFooter>
        </Table>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>
          Header and Body Only
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Selected Row State</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user, i) => (
              <TableRow key={user.id} data-state={i === 1 ? "selected" : undefined}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};

export const AllSizes: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Default Density</p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>
          Compact (reduced padding)
        </p>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="h-8 py-1 px-2">Name</TableHead>
              <TableHead className="h-8 py-1 px-2">Email</TableHead>
              <TableHead className="h-8 py-1 px-2">Role</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.slice(0, 3).map((user) => (
              <TableRow key={user.id}>
                <TableCell className="py-1 px-2 font-medium">{user.name}</TableCell>
                <TableCell className="py-1 px-2">{user.email}</TableCell>
                <TableCell className="py-1 px-2">{user.role}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  ),
};

export const Interactive: Story = {
  render: () => {
    const [selected, setSelected] = React.useState<number | null>(null);
    return (
      <div style={{ width: 700 }}>
        <p style={{ fontSize: "12px", marginBottom: "8px", color: "#888" }}>
          Click a row to select it.
        </p>
        <Table>
          <TableCaption>Click rows to toggle selection.</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">#</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {users.map((user) => (
              <TableRow
                key={user.id}
                data-state={selected === user.id ? "selected" : undefined}
                onClick={() => setSelected(selected === user.id ? null : user.id)}
                style={{ cursor: "pointer" }}
              >
                <TableCell>{user.id}</TableCell>
                <TableCell className="font-medium">{user.name}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{user.role}</TableCell>
                <TableCell>{user.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    );
  },
};

export const DarkMode: Story = {
  decorators: [
    (Story) => (
      <div className="dark" style={{ background: "#09090b", padding: "24px", borderRadius: "8px" }}>
        <Story />
      </div>
    ),
  ],
  render: () => (
    <div style={{ width: 700 }}>
      <Table>
        <TableCaption>Users table in dark mode.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-12">#</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Role</TableHead>
            <TableHead>Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {users.map((user) => (
            <TableRow key={user.id}>
              <TableCell>{user.id}</TableCell>
              <TableCell className="font-medium">{user.name}</TableCell>
              <TableCell>{user.email}</TableCell>
              <TableCell>{user.role}</TableCell>
              <TableCell>{user.status}</TableCell>
            </TableRow>
          ))}
        </TableBody>
        <TableFooter>
          <TableRow>
            <TableCell colSpan={4}>Total Users</TableCell>
            <TableCell>{users.length}</TableCell>
          </TableRow>
        </TableFooter>
      </Table>
    </div>
  ),
};

export const EdgeCases: Story = {
  render: () => (
    <div style={{ display: "flex", flexDirection: "column", gap: "48px" }}>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Long Text Content</p>
        <div style={{ width: 500 }}>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Description</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell className="font-medium">A Very Long Name That Could Wrap</TableCell>
                <TableCell>
                  This is a particularly long description that tests how the table handles
                  overflowing text content in a cell with no explicit width constraint applied.
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className="font-medium">Short</TableCell>
                <TableCell>Brief content.</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
      <div>
        <p style={{ fontSize: "12px", marginBottom: "8px", fontWeight: 500 }}>Empty Table</p>
        <div style={{ width: 400 }}>
          <Table>
            <TableCaption>No results found.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell colSpan={3} className="text-center text-muted-foreground">
                  No data available.
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </div>
    </div>
  ),
};
