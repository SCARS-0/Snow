from fastapi import FastAPI

from app.api.employee import router as employee_router
from app.exceptions.handlers import register_exception_handlers

app = FastAPI()


@app.get("/")
def root():
    return {"message": "Team Rostering API is running!"}


app.include_router(employee_router)

register_exception_handlers(app)