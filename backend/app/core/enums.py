from enum import Enum


class EmployeeRole(str, Enum):
    L1 = "L1"
    L2 = "L2"


class Gender(str, Enum):
    MALE = "Male"
    FEMALE = "Female"