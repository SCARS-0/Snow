export type Employee = {
  employeeCode: string;
  fullName: string;
  role: "L1" | "L2";
  gender: "Male" | "Female";
  status: "Active" | "Archived";
};

export const employees: Employee[] = [
  {
    employeeCode: "L1001",
    fullName: "Aman Sharma",
    role: "L1",
    gender: "Male",
    status: "Active",
  },
  {
    employeeCode: "L1002",
    fullName: "Sara Khan",
    role: "L1",
    gender: "Female",
    status: "Active",
  },
  {
    employeeCode: "L1003",
    fullName: "Rahul Patil",
    role: "L1",
    gender: "Male",
    status: "Active",
  },
  {
    employeeCode: "L1004",
    fullName: "Priya Singh",
    role: "L1",
    gender: "Female",
    status: "Active",
  },
  {
    employeeCode: "L1005",
    fullName: "Neha Joshi",
    role: "L1",
    gender: "Female",
    status: "Archived",
  },
  {
    employeeCode: "L2001",
    fullName: "John D'Souza",
    role: "L2",
    gender: "Male",
    status: "Active",
  },
  {
    employeeCode: "L2002",
    fullName: "Fatima Sheikh",
    role: "L2",
    gender: "Female",
    status: "Active",
  },
  {
    employeeCode: "L2003",
    fullName: "Akash Mehta",
    role: "L2",
    gender: "Male",
    status: "Active",
  },
];