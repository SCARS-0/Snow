from typing import Annotated

from fastapi import APIRouter, Depends

from app.dependencies.employee import get_employee_service
from app.services.employee_service import EmployeeService
from app.schemas.employee import EmployeeCreate, EmployeeResponse

router = APIRouter(
    
    prefix="/employees",
    tags=["Employees"],
)

@router.get(
    "/{employee_code}",
    response_model=EmployeeResponse,
)
def get_employee(
    employee_code: str,
    service: Annotated[
        EmployeeService,
        Depends(get_employee_service),
    ],
) -> EmployeeResponse:
    return service.get_employee_by_code(employee_code)

@router.post(
    "/",
    response_model=EmployeeResponse,
    status_code=201,
)
def create_employee(
    employee_data: EmployeeCreate,
    service: Annotated[
        EmployeeService,
        Depends(get_employee_service),
    ],
) -> EmployeeResponse:
    return service.create_employee(employee_data)