class EmployeeNotFoundError(Exception):
    """
    Raised when an employee cannot be found.
    """

    def __init__(self, employee_code: str) -> None:
        self.employee_code = employee_code
        super().__init__(
            f"Employee with code '{employee_code}' was not found."
        )


class DuplicateEmployeeCodeError(Exception):
    """
    Raised when attempting to create an employee
    with an existing employee code.
    """

    def __init__(self, employee_code: str) -> None:
        self.employee_code = employee_code
        super().__init__(
            f"Employee code '{employee_code}' already exists."
        )