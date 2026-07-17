from sqlalchemy import Boolean
from sqlalchemy import Enum
from sqlalchemy import String
from sqlalchemy.orm import Mapped
from sqlalchemy.orm import mapped_column

from app.core.enums import EmployeeRole
from app.core.enums import Gender
from app.db.base_model import BaseModel


class Employee(BaseModel):
    __tablename__ = "employees"

    employee_code: Mapped[str] = mapped_column(
        String(20),
        primary_key=True,
        nullable=False,
    )

    full_name: Mapped[str] = mapped_column(
        String(100),
        nullable=False,
    )

    role: Mapped[EmployeeRole] = mapped_column(
        Enum(EmployeeRole),
        nullable=False,
    )

    gender: Mapped[Gender] = mapped_column(
        Enum(Gender),
        nullable=False,
    )

    is_active: Mapped[bool] = mapped_column(
        Boolean,
        default=True,
        nullable=False,
    )

    is_archived: Mapped[bool] = mapped_column(
        Boolean,
        default=False,
        nullable=False,
    )