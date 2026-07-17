from sqlalchemy import select
from sqlalchemy.orm import Session

from app.models.employee import Employee


class EmployeeRepository:
    """
    Repository responsible only for database operations
    related to the Employee entity.

    Business logic must NOT be placed here.
    """

    def __init__(self, db: Session) -> None:
        self.db = db

    def get_by_employee_code(self, employee_code: str) -> Employee | None:
        
        """
        Retrieve a single employee by employee code.

        Returns:
            Employee | None
        """

        statement = select(Employee).where(
            Employee.employee_code == employee_code
        )

        result = self.db.execute(statement)

        return result.scalar_one_or_none()
    
    def add(self, employee: Employee) -> None:
        
        """
Add a new employee to the current transaction.

The repository does NOT commit.
Transaction management belongs to the service layer.
"""

        self.db.add(employee)

def get_all_employees(self) -> list[Employee]:
    """
    Retrieve all employees.

    Returns:
        list[Employee]
    """

    statement = (
        select(Employee)
        .order_by(Employee.employee_code)
    )

    result = self.db.execute(statement)

    return list(result.scalars().all())

def get_all(self) -> list[Employee]:
    """
    Retrieve all non-archived employees.

    Returns:
        list[Employee]
    """

    statement = (
        select(Employee)
        .where(Employee.is_archived.is_(False))
        .order_by(Employee.employee_code)
    )

    result = self.db.execute(statement)

    return list(result.scalars().all())