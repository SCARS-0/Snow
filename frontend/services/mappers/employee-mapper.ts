import type { EmployeeDto } from "@/types/dto/employee-dto";
import type { Employee } from "@/types/employee";

export function mapEmployeeDtoToEmployee(dto: EmployeeDto): Employee {
  return {
    employeeCode: dto.employee_code,
    fullName: dto.full_name,
    role: dto.role,
    gender: dto.gender,
    isActive: dto.is_active,
  };
}

export function mapEmployeeDtosToEmployees(
  dtos: EmployeeDto[],
): Employee[] {
  return dtos.map(mapEmployeeDtoToEmployee);
}