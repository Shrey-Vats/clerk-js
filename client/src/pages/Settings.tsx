import { useEffect, useState } from "react";
import { Switch } from "@/components/ui/switch";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export default function Settings() {
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Initialize from localStorage or system preference
    const stored = localStorage.getItem("dark-mode");
    if (stored !== null) {
      setDarkMode(stored === "true");
      document.documentElement.classList.toggle("dark", stored === "true");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)"
      ).matches;
      setDarkMode(prefersDark);
      document.documentElement.classList.toggle("dark", prefersDark);
    }
  }, []);

  const toggleDarkMode = () => {
    setDarkMode((prev) => {
      const next = !prev;
      document.documentElement.classList.toggle("dark", next);
      localStorage.setItem("dark-mode", next.toString());
      return next;
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Settings</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex items-center justify-between">
          <span>Dark Mode</span>
          <Switch checked={darkMode} onCheckedChange={toggleDarkMode} />
        </div>

        {/* Add more settings here */}
      </CardContent>
    </Card>
  );
}
