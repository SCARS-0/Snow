from pydantic import BaseModel, ConfigDict, Field

from app.core.enums import EmployeeRole, Gender

class EmployeeCreate(BaseModel):
    employee_code: str = Field(
        ...,
        min_length=1,
        max_length=20,
    )

    full_name: str = Field(
        ...,
        min_length=1,
        max_length=100,
    )

    role: EmployeeRole

    gender: Gender

class EmployeeResponse(BaseModel):
    employee_code: str
    full_name: str
    role: EmployeeRole
    gender: Gender
    is_active: bool
    model_config = ConfigDict(from_attributes=True)

