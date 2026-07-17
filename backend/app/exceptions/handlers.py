from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

from app.exceptions.employee import (
    DuplicateEmployeeCodeError,
    EmployeeNotFoundError,
)

def register_exception_handlers(app: FastAPI) -> None:
    @app.exception_handler(EmployeeNotFoundError)
    async def employee_not_found_handler(
        request: Request,
        exc: EmployeeNotFoundError,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=404,
            content={
                "detail": str(exc),
            },
        )
    
    @app.exception_handler(DuplicateEmployeeCodeError)
    async def duplicate_employee_code_handler(
        request: Request,
        exc: DuplicateEmployeeCodeError,
    ) -> JSONResponse:
        return JSONResponse(
            status_code=409,
            content={
                "detail": str(exc),
            },
        )