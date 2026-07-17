from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.repositories.employee_repository import EmployeeRepository
from app.services.employee_service import EmployeeService


def get_employee_repository(
    db: Annotated[Session, Depends(get_db)],
) -> EmployeeRepository:
    return EmployeeRepository(db)


def get_employee_service(
    repository: Annotated[
        EmployeeRepository,
        Depends(get_employee_repository),
    ],
    db: Annotated[
        Session,
        Depends(get_db),
    ],
) -> EmployeeService:
    return EmployeeService(repository, db)