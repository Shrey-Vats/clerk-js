import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  BarChart,
  Bar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const lineData = [
  { name: "Jan", users: 400, revenue: 2400 },
  { name: "Feb", users: 300, revenue: 1398 },
  { name: "Mar", users: 500, revenue: 2210 },
  { name: "Apr", users: 478, revenue: 2290 },
  { name: "May", users: 589, revenue: 2000 },
  { name: "Jun", users: 439, revenue: 2181 },
  { name: "Jul", users: 449, revenue: 2500 },
];

const barData = [
  { name: "Product A", sales: 4000 },
  { name: "Product B", sales: 3000 },
  { name: "Product C", sales: 2000 },
  { name: "Product D", sales: 2780 },
  { name: "Product E", sales: 1890 },
];

export default function Analytics() {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>User Growth Over Time</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart
              data={lineData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line
                type="monotone"
                dataKey="users"
                stroke="#4f46e5"
                activeDot={{ r: 8 }}
              />
              <Line type="monotone" dataKey="revenue" stroke="#10b981" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Sales by Product</CardTitle>
        </CardHeader>
        <CardContent className="h-64">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={barData}
              margin={{ top: 20, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="sales" fill="#4f46e5" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
