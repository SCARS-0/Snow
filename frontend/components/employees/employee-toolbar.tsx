import { Search, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function EmployeeToolbar() {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      <div className="relative w-full md:w-96">

        <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

        <Input
          className="pl-10"
          placeholder="Search employee..."
        />

      </div>

      <div className="flex gap-3">

        <Button variant="outline">
          All Roles
        </Button>

        <Button variant="outline">
          Active
        </Button>

        <Button>

          <Plus className="mr-2 h-4 w-4"/>

          Add Employee

        </Button>

      </div>

    </div>
  );
}