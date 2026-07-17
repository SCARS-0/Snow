import AppShell from "@/components/layout/app-shell";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  CalendarDays,
  Download,
  Sparkles,
} from "lucide-react";

type Shift = "M" | "A" | "OFF" | "L";

interface EmployeeRoster {
  employeeCode: string;
  fullName: string;
  role: "L1" | "L2";
  shifts: Shift[];
}

const weekDays = [
  "Mon",
  "Tue",
  "Wed",
  "Thu",
  "Fri",
  "Sat",
  "Sun",
];

const roster: EmployeeRoster[] = [
  {
    employeeCode: "L1001",
    fullName: "Aman Sharma",
    role: "L1",
    shifts: ["M","M","A","A","OFF","OFF","M"],
  },
  {
    employeeCode: "L1002",
    fullName: "Sara Khan",
    role: "L1",
    shifts: ["A","A","OFF","M","M","A","OFF"],
  },
  {
    employeeCode: "L2001",
    fullName: "John D'Souza",
    role: "L2",
    shifts: ["M","OFF","M","M","A","A","M"],
  },
  {
    employeeCode: "L2002",
    fullName: "Fatima Sheikh",
    role: "L2",
    shifts: ["A","M","M","OFF","A","A","M"],
  },
  {
    employeeCode: "L1003",
    fullName: "Rahul Patil",
    role: "L1",
    shifts: ["M","A","A","M","OFF","M","A"],
  },
];

function ShiftBadge({
  shift,
}:{
  shift:Shift
}){

  if(shift==="M"){
    return(
      <Badge className="bg-blue-600 hover:bg-blue-600">
        Morning
      </Badge>
    )
  }

  if(shift==="A"){
    return(
      <Badge className="bg-green-600 hover:bg-green-600">
        Afternoon
      </Badge>
    )
  }

  if(shift==="OFF"){
    return(
      <Badge
        variant="secondary"
      >
        Week Off
      </Badge>
    )
  }

  return(
    <Badge
      variant="destructive"
    >
      Leave
    </Badge>
  )
}
export default function RosterPage() {
  return (
    <AppShell>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <div className="flex items-center gap-3">

              <CalendarDays className="h-7 w-7 text-blue-600" />

              <h1 className="text-3xl font-bold">
                Weekly Team Roster
              </h1>

            </div>

            <p className="mt-2 text-muted-foreground">
              Demo View • Week 3 • July 2026
            </p>

          </div>

          <div className="flex gap-3">

            <Button variant="outline">

              <Download className="mr-2 h-4 w-4" />

              Export

            </Button>

            <Button>

              <Sparkles className="mr-2 h-4 w-4" />

              Generate Roster

            </Button>

          </div>

        </div>

        <Card>

          <CardHeader>

            <CardTitle>
              Operations Weekly Schedule
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="overflow-x-auto">

              <table className="w-full border-collapse">

                <thead>

                  <tr className="border-b bg-slate-100">

                    <th className="p-3 text-left">
                      Employee
                    </th>

                    <th className="p-3 text-left">
                      Role
                    </th>

                    {weekDays.map((day) => (
                      <th
                        key={day}
                        className="p-3 text-center"
                      >
                        {day}
                      </th>
                    ))}

                  </tr>

                </thead>

                <tbody>

                  {roster.map((employee) => (

                    <tr
                      key={employee.employeeCode}
                      className="border-b hover:bg-slate-50"
                    >

                      <td className="p-4">

                        <div>

                          <p className="font-semibold">
                            {employee.fullName}
                          </p>

                          <p className="text-xs text-muted-foreground">
                            {employee.employeeCode}
                          </p>

                        </div>

                      </td>

                      <td className="p-4">

                        <Badge
                          variant="outline"
                        >
                          {employee.role}
                        </Badge>

                      </td>

                      {employee.shifts.map((shift, index) => (

                        <td
                          key={index}
                          className="p-3 text-center"
                        >
                          <ShiftBadge shift={shift} />
                        </td>

                      ))}

                    </tr>

                  ))}

                </tbody>

              </table>

            </div>

          </CardContent>

        </Card>

        <Card>

          <CardHeader>

            <CardTitle>
              Weekly Summary
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="grid gap-6 md:grid-cols-4">

              <div className="rounded-lg border p-4">

                <p className="text-sm text-muted-foreground">
                  Morning Shifts
                </p>

                <p className="mt-2 text-3xl font-bold text-blue-600">
                  18
                </p>

              </div>

              <div className="rounded-lg border p-4">

                <p className="text-sm text-muted-foreground">
                  Afternoon Shifts
                </p>

                <p className="mt-2 text-3xl font-bold text-green-600">
                  13
                </p>

              </div>

              <div className="rounded-lg border p-4">

                <p className="text-sm text-muted-foreground">
                  Week Off
                </p>

                <p className="mt-2 text-3xl font-bold">
                  4
                </p>

              </div>

              <div className="rounded-lg border p-4">

                <p className="text-sm text-muted-foreground">
                  Leave
                </p>

                <p className="mt-2 text-3xl font-bold text-red-600">
                  0
                </p>

              </div>

            </div>

          </CardContent>

        </Card>

      </div>
    </AppShell>
  );
}