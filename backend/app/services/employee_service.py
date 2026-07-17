from app.exceptions import EmployeeNotFoundError
from app.models.employee import Employee
from app.repositories.employee_repository import EmployeeRepository
from sqlalchemy.orm import Session
from app.exceptions import DuplicateEmployeeCodeError
from app.schemas.employee import EmployeeCreate

class EmployeeService:
    """
    Service responsible for Employee business logic.
    """

    def __init__(
    self,
    repository: EmployeeRepository,
    db: Session,
) -> None:
        self.repository = repository
        self.db = db

    def get_employee_by_code(self, employee_code: str) -> Employee:
        """
        Retrieve an employee by employee code.

        Raises:
            EmployeeNotFoundError
        """

        employee = self.repository.get_by_employee_code(employee_code)

        if employee is None:
            raise EmployeeNotFoundError(employee_code)

        return employee

    def create_employee(
        self,
        employee_data: EmployeeCreate,
    ) -> Employee:
        existing_employee = self.repository.get_by_employee_code(
            employee_data.employee_code
        )

        if existing_employee is not None:
            raise DuplicateEmployeeCodeError(
                employee_data.employee_code
            )

        employee = Employee(
            employee_code=employee_data.employee_code,
            full_name=employee_data.full_name,
            role=employee_data.role,
            gender=employee_data.gender,
        )

        self.repository.add(employee)

        self.db.commit()
        self.db.refresh(employee)

        return employee

def get_all_employees(self) -> list[Employee]:
    """
    Retrieve all non-archived employees.
    """

    return self.repository.get_all()