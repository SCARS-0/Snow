from typing import Annotated

from fastapi import Depends
from sqlalchemy.orm import Session

from app.db.session import get_db
from app.repositories.employee_repository import EmployeeRepository


def get_employee_repository(
    db: Annotated[Session, Depends(get_db)],
) -> EmployeeRepository:
    return EmployeeRepository(db)