import { LayoutDashboard, Users, BarChart, Settings } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/lib/utils";

const navItems = [
  { label: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
  { label: "Analytics", path: "/analytics", icon: BarChart },
  { label: "Users", path: "/users", icon: Users },
  { label: "Settings", path: "/settings", icon: Settings },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="hidden lg:flex flex-col w-64 bg-background border-r px-4 py-6">
      <h2 className="mb-6 text-2xl font-bold">PremiumPanel</h2>
      <nav className="flex flex-col space-y-2">
        {navItems.map(({ label, path, icon: Icon }) => {
          const active = location.pathname.startsWith(path);
          return (
            <Link
              key={label}
              to={path}
              className={cn(
                "flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-sm font-medium",
                active
                  ? "bg-muted text-primary"
                  : "text-muted-foreground hover:bg-muted"
              )}
            >
              <Icon className="h-5 w-5" />
              {label}
            </Link>
          );
        })}
      </nav>
    </aside>
  );
}
