import { Bell, CircleUserRound } from "lucide-react";

export default function AppHeader() {
  return (
    <header className="h-16 border-b bg-white flex items-center justify-between px-8">
      <div>
        <h1 className="font-bold text-2xl">
          Dashboard
        </h1>

        <p className="text-slate-500 text-sm">
          Welcome back, Sherzaman
        </p>
      </div>

      <div className="flex items-center gap-5">
        <Bell className="cursor-pointer" />

        <CircleUserRound
          className="cursor-pointer"
          size={34}
        />
      </div>
    </header>
  );
}