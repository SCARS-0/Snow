export type EmployeeRole = "L1" | "L2";

export type Gender = "Male" | "Female";

export interface Employee {
  employeeCode: string;
  fullName: string;
  role: EmployeeRole;
  gender: Gender;
  isActive: boolean;
}