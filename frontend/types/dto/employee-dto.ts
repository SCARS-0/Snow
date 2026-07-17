export interface EmployeeDto {
  employee_code: string;
  full_name: string;
  role: "L1" | "L2";
  gender: "Male" | "Female";
  is_active: boolean;
}