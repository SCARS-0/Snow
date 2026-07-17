import AppShell from "@/components/layout/app-shell";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const requests = [
  {
    id: 1,
    employee: "Sara Khan",
    type: "Planned Leave",
    date: "21 Jul 2026",
    status: "Pending",
  },
  {
    id: 2,
    employee: "Aman Sharma",
    type: "Emergency Leave",
    date: "18 Jul 2026",
    status: "Approved",
  },
  {
    id: 3,
    employee: "John D'Souza",
    type: "Planned Leave",
    date: "24 Jul 2026",
    status: "Pending",
  },
  {
    id: 4,
    employee: "Fatima Sheikh",
    type: "Emergency Leave",
    date: "15 Jul 2026",
    status: "Rejected",
  },
];

export default function LeavePage() {
  return (
    <AppShell>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>
            <h1 className="text-3xl font-bold">
              Leave Management
            </h1>

            <p className="text-muted-foreground">
              Review and manage employee leave requests.
            </p>
          </div>

          <Button>
            New Leave Request
          </Button>

        </div>

        <div className="grid md:grid-cols-4 gap-6">

          <Card>
            <CardHeader>
              <CardTitle>Total Requests</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold">12</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Pending</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold text-yellow-600">3</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Approved</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold text-green-600">7</p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Rejected</CardTitle>
            </CardHeader>

            <CardContent>
              <p className="text-4xl font-bold text-red-600">2</p>
            </CardContent>
          </Card>

        </div>

        <Card>

          <CardHeader>

            <CardTitle>
              Recent Leave Requests
            </CardTitle>

          </CardHeader>

          <CardContent>

            <div className="space-y-4">

              {requests.map((request) => (

                <div
                  key={request.id}
                  className="flex items-center justify-between rounded-lg border p-4"
                >

                  <div>

                    <h3 className="font-semibold">
                      {request.employee}
                    </h3>

                    <p className="text-sm text-muted-foreground">
                      {request.type}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      {request.date}
                    </p>

                  </div>

                  <div className="flex items-center gap-3">

                    <Badge
                      className={
                        request.status === "Approved"
                          ? "bg-green-100 text-green-700"
                          : request.status === "Rejected"
                          ? "bg-red-100 text-red-700"
                          : "bg-yellow-100 text-yellow-700"
                      }
                    >
                      {request.status}
                    </Badge>

                    {request.status === "Pending" && (
                      <>
                        <Button size="sm">
                          Approve
                        </Button>

                        <Button
                          size="sm"
                          variant="destructive"
                        >
                          Reject
                        </Button>
                      </>
                    )}

                  </div>

                </div>

              ))}

            </div>

          </CardContent>

        </Card>

      </div>
    </AppShell>
  );
}