import { Bell } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Button } from "./ui/button";

export function Topbar() {
  return (
    <header className="flex items-center justify-between px-6 py-4 border-b bg-background">
      <h1 className="text-xl font-semibold capitalize">Dashboard</h1>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon" aria-label="Notifications">
          <Bell className="h-5 w-5" />
        </Button>
        <Avatar>
          <AvatarImage src="https://api.dicebear.com/6.x/notionists/svg?seed=shrey" />
          <AvatarFallback>SV</AvatarFallback>
        </Avatar>
      </div>
    </header>
  );
}
