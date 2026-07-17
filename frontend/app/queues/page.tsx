import AppShell from "@/components/layout/app-shell";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const queues = [
  {
    name: "Voice Queue",
    requiredL1: 5,
    assignedL1: 5,
    requiredL2: 2,
    assignedL2: 2,
    status: "Healthy",
  },
  {
    name: "Email Queue",
    requiredL1: 4,
    assignedL1: 3,
    requiredL2: 1,
    assignedL2: 1,
    status: "Attention",
  },
  {
    name: "Chat Queue",
    requiredL1: 3,
    assignedL1: 3,
    requiredL2: 1,
    assignedL2: 1,
    status: "Healthy",
  },
  {
    name: "Escalation Desk",
    requiredL1: 2,
    assignedL1: 2,
    requiredL2: 2,
    assignedL2: 1,
    status: "Critical",
  },
];

export default function QueuePage() {
  return (
    <AppShell>
      <div className="space-y-8">

        <div className="flex items-center justify-between">

          <div>

            <h1 className="text-3xl font-bold">
              Queue Assignment
            </h1>

            <p className="text-muted-foreground">
              Monitor staffing levels across operational queues.
            </p>

          </div>

          <Button>
            Auto Assign
          </Button>

        </div>

        <div className="grid gap-6 md:grid-cols-2">

          {queues.map((queue) => (

            <Card key={queue.name}>

              <CardHeader className="flex flex-row items-center justify-between">

                <CardTitle>
                  {queue.name}
                </CardTitle>

                <Badge
                  className={
                    queue.status === "Healthy"
                      ? "bg-green-100 text-green-700"
                      : queue.status === "Attention"
                      ? "bg-yellow-100 text-yellow-700"
                      : "bg-red-100 text-red-700"
                  }
                >
                  {queue.status}
                </Badge>

              </CardHeader>

              <CardContent>

                <div className="space-y-4">

                  <div className="flex justify-between">

                    <span>L1 Analysts</span>

                    <span>

                      {queue.assignedL1} / {queue.requiredL1}

                    </span>

                  </div>

                  <div className="h-2 rounded bg-slate-200">

                    <div
                      className="h-2 rounded bg-blue-500"
                      style={{
                        width: `${(queue.assignedL1 / queue.requiredL1) * 100}%`,
                      }}
                    />

                  </div>

                  <div className="flex justify-between">

                    <span>L2 Analysts</span>

                    <span>

                      {queue.assignedL2} / {queue.requiredL2}

                    </span>

                  </div>

                  <div className="h-2 rounded bg-slate-200">

                    <div
                      className="h-2 rounded bg-emerald-500"
                      style={{
                        width: `${(queue.assignedL2 / queue.requiredL2) * 100}%`,
                      }}
                    />

                  </div>

                  <Button
                    className="mt-5 w-full"
                    variant="outline"
                  >
                    View Assignments
                  </Button>

                </div>

              </CardContent>

            </Card>

          ))}

        </div>

      </div>

    </AppShell>
  );
}