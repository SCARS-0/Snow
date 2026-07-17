import { Employee } from "@/types/employee";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface EmployeeTableProps {
  employees: Employee[];
}

export default function EmployeeTable({
  employees,
}: EmployeeTableProps) {
  return (
    <Table>

      <TableHeader>

        <TableRow>

          <TableHead>Employee Code</TableHead>

          <TableHead>Full Name</TableHead>

          <TableHead>Role</TableHead>

          <TableHead>Gender</TableHead>

          <TableHead>Status</TableHead>

          <TableHead className="text-right">
            Actions
          </TableHead>

        </TableRow>

      </TableHeader>

      <TableBody>

        {employees.map((employee) => (

          <TableRow key={employee.employeeCode}>

            <TableCell className="font-medium">
              {employee.employeeCode}
            </TableCell>

            <TableCell>
              {employee.fullName}
            </TableCell>

            <TableCell>

              <Badge
                variant={
                  employee.role === "L1"
                    ? "default"
                    : "secondary"
                }
              >
                {employee.role}
              </Badge>

            </TableCell>

            <TableCell>
              {employee.gender}
            </TableCell>

            <TableCell>

              <Badge
                variant={
                  employee.isActive
                    ? "default"
                    : "destructive"
                }
              >
                {employee.isActive
                  ? "Active"
                  : "Inactive"}
              </Badge>

            </TableCell>

            <TableCell className="text-right space-x-2">

              <Button
                size="sm"
                variant="outline"
              >
                Edit
              </Button>

              <Button
                size="sm"
                variant="destructive"
              >
                Archive
              </Button>

            </TableCell>

          </TableRow>

        ))}

      </TableBody>

    </Table>
  );
}