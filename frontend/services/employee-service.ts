import { apiClient } from "@/lib/api";
import { ENDPOINTS } from "@/lib/endpoints";

import type { EmployeeDto } from "@/types/dto/employee-dto";
import type { Employee } from "@/types/employee";

import { mapEmployeeDtosToEmployees } from "@/services/mappers/employee-mapper";

export class EmployeeService {
  static async getEmployees(): Promise<Employee[]> {
    const employeeDtos = await apiClient.get<EmployeeDto[]>(
      ENDPOINTS.employees
    );

    return mapEmployeeDtosToEmployees(employeeDtos);
  }
}