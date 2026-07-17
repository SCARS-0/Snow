import AppShell from "@/components/layout/app-shell";

import EmployeeStats from "@/components/employees/employee-stats";
import EmployeeToolbar from "@/components/employees/employee-toolbar";
import EmployeeTable from "@/components/employees/employee-table";

import { EmployeeService } from "@/services/employee-service";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default async function EmployeesPage() {

  const employees = await EmployeeService.getEmployees();

  const total = employees.length;

  const l1 = employees.filter(e => e.role === "L1").length;

  const l2 = employees.filter(e => e.role === "L2").length;

  const active = employees.filter(e => e.isActive).length;

  return (

    <AppShell>

      <div className="space-y-8">

        <div>

          <h1 className="text-3xl font-bold">
            Employee Management
          </h1>

          <p className="text-muted-foreground">
            Manage employees, roles and workforce.
          </p>

        </div>

        <EmployeeStats
          total={total}
          l1={l1}
          l2={l2}
          active={active}
        />

        <Card>

          <CardHeader>

            <CardTitle>

              Employees

            </CardTitle>

          </CardHeader>

          <CardContent className="space-y-6">

            <EmployeeToolbar />

            <EmployeeTable
              employees={employees}
            />

          </CardContent>

        </Card>

      </div>

    </AppShell>

  );
}