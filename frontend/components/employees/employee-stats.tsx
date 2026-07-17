import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";

interface Props {
  total: number;
  l1: number;
  l2: number;
  active: number;
}

export default function EmployeeStats({
  total,
  l1,
  l2,
  active,
}: Props) {
  return (
    <div className="grid gap-6 md:grid-cols-4">

      <Card>
        <CardHeader>
          <CardDescription>Total Employees</CardDescription>
          <CardTitle>{total}</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>L1 Analysts</CardDescription>
          <CardTitle>{l1}</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>L2 Analysts</CardDescription>
          <CardTitle>{l2}</CardTitle>
        </CardHeader>
      </Card>

      <Card>
        <CardHeader>
          <CardDescription>Active</CardDescription>
          <CardTitle>{active}</CardTitle>
        </CardHeader>
      </Card>

    </div>
  );
}