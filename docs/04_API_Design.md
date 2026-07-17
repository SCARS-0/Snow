# API Design

**Document Version:** 1.0

**Project:** Team Rostering & Queue Management System

**Last Updated:** July 2026

---

# 1. Introduction

This document defines the REST API architecture for the Team Rostering & Queue Management System.

The API follows RESTful principles and uses JSON for request and response payloads.

FastAPI automatically generates OpenAPI (Swagger) documentation from these API definitions.

Current Swagger URL

```
http://localhost:8000/docs
```

---

# 2. API Design Principles

The API follows these principles.

- RESTful design
- JSON communication
- Stateless requests
- Predictable endpoints
- Consistent error responses
- Request validation using Pydantic
- Response serialization using Pydantic
- Domain exceptions mapped to HTTP responses

---

# 3. Base URL

Development

```
http://localhost:8000
```

Future Production

```
https://api.company.com
```

---

# 4. API Versioning

Current version

```
v1 (implicit)
```

Future versions may use

```
/api/v1/

/api/v2/
```

The current prototype does not require explicit versioning.

---

# 5. Content Type

Requests

```
Content-Type: application/json
```

Responses

```
application/json
```

---

# 6. Current Endpoints

## Health Check

Method

```
GET /
```

Purpose

Verify the backend is running.

Example Response

```json
{
    "message": "Team Rostering API is running!"
}
```

HTTP Status

```
200 OK
```

---

## Get Employee

Method

```
GET /employees/{employee_code}
```

Purpose

Retrieve a single employee using the employee code.

---

### Path Parameter

| Parameter | Type |
|------------|------|
| employee_code | String |

---

### Successful Response

```json
{
    "employee_code": "3051827",
    "full_name": "Sherzaman Khan",
    "role": "L1",
    "gender": "Male",
    "is_active": true
}
```

Status

```
200 OK
```

---

### Error Response

```json
{
    "detail": "Employee with code '3051827' was not found."
}
```

Status

```
404 Not Found
```

---

## Create Employee

Method

```
POST /employees
```

Purpose

Create a new employee.

---

### Request Body

```json
{
    "employee_code": "3051827",
    "full_name": "Sherzaman Khan",
    "role": "L1",
    "gender": "Male"
}
```

---

### Successful Response

```json
{
    "employee_code": "3051827",
    "full_name": "Sherzaman Khan",
    "role": "L1",
    "gender": "Male",
    "is_active": true
}
```

Status

```
201 Created
```

---

### Duplicate Employee

```json
{
    "detail": "Employee code '3051827' already exists."
}
```

Status

```
409 Conflict
```

---

### Validation Error

```json
{
    "detail": [
        ...
    ]
}
```

Status

```
422 Unprocessable Entity
```

Generated automatically by FastAPI and Pydantic.

---

# 7. Request Models

Current request models

## EmployeeCreate

Purpose

Represents data required to create a new employee.

Fields

| Field | Type | Required |
|--------|------|----------|
| employee_code | String | Yes |
| full_name | String | Yes |
| role | EmployeeRole | Yes |
| gender | Gender | Yes |

---

# 8. Response Models

Current response models

## EmployeeResponse

Purpose

Represents employee information returned to API consumers.

Fields

| Field | Type |
|--------|------|
| employee_code | String |
| full_name | String |
| role | EmployeeRole |
| gender | Gender |
| is_active | Boolean |

---

# 9. Validation

Validation is performed before requests reach the service layer.

Validation uses

```
Pydantic v2
```

Current validation

Employee Code

- Required
- Maximum length 20

Full Name

- Required
- Maximum length 100

Role

- Enum validation

Gender

- Enum validation

Future validation

- Employee code pattern
- Name formatting
- Length restrictions
- Business-specific validation

---

# 10. Error Handling

Business exceptions are never returned directly.

Flow

```
Service

↓

Domain Exception

↓

Global Exception Handler

↓

HTTP Response
```

Current mappings

| Exception | Status |
|------------|---------|
| EmployeeNotFoundError | 404 |
| DuplicateEmployeeCodeError | 409 |

Framework validation

| Error | Status |
|---------|--------|
| Validation Error | 422 |

---

# 11. API Layer Responsibilities

Routers perform only the following responsibilities.

- Receive requests
- Receive dependencies
- Call services
- Return responses

Routers never

- Write SQL
- Commit transactions
- Implement business logic
- Catch business exceptions

---

# 12. Service Layer Responsibilities

Services

- Business logic
- Validation
- Transactions
- Calling repositories
- Raising domain exceptions

Services never

- Return HTTP responses
- Use HTTPException
- Access request objects

---

# 13. Repository Responsibilities

Repositories

- Query database
- Persist entities
- Return ORM models

Repositories never

- Commit
- Rollback
- Validate business rules

---

# 14. Current API Flow

## GET Employee

```
Client

↓

Router

↓

EmployeeService

↓

EmployeeRepository

↓

Database

↓

EmployeeResponse

↓

JSON
```

---

## POST Employee

```
Client

↓

EmployeeCreate

↓

Router

↓

EmployeeService

↓

Duplicate Check

↓

Repository

↓

Commit

↓

EmployeeResponse

↓

JSON
```

---

# 15. HTTP Status Codes

| Status | Meaning |
|----------|----------|
| 200 | Successful GET |
| 201 | Resource Created |
| 404 | Resource Not Found |
| 409 | Duplicate Resource |
| 422 | Validation Error |
| 500 | Unexpected Server Error |

---

# 16. Future Endpoints

Employee

```
GET /employees

PUT /employees/{employee_code}

PATCH /employees/{employee_code}/archive

PATCH /employees/{employee_code}/restore
```

Queues

```
GET /queues

POST /queues
```

Roster

```
POST /rosters/generate

GET /rosters

PATCH /rosters/regenerate
```

Leaves

```
POST /leave

GET /leave

PUT /leave/{id}
```

Authentication

```
POST /login

POST /logout

POST /refresh-token
```

---

# 17. API Standards

Every endpoint should

- Use request schemas
- Use response schemas
- Return appropriate HTTP status codes
- Never expose SQLAlchemy models directly
- Never contain business logic
- Use dependency injection
- Rely on global exception handlers

---

# 18. Current API Status

Completed

- Health Check
- Get Employee
- Create Employee
- Swagger Documentation
- Request Validation
- Response Models
- Exception Handling

In Progress

- Transaction Improvements

Planned

- Employee CRUD Completion
- Pagination
- Filtering
- Queue APIs
- Leave APIs
- Roster APIs
- Authentication APIs

---

# 19. Summary

The current API follows enterprise backend development practices by separating responsibilities between routers, services, repositories, schemas, and exception handlers.

This architecture ensures maintainability, scalability, and consistent behavior as additional modules are implemented.

# API Conventions

This document defines the standards that every API endpoint in the Team Rostering & Queue Management System must follow.

---

## Naming Convention

### Backend

Python code follows the standard Python naming convention.

- snake_case for variables
- snake_case for functions
- snake_case for JSON fields

Example:

```json
{
  "employee_code": "3051827",
  "full_name": "Sherzaman Khan",
  "is_active": true
}
```

---

### Frontend

TypeScript follows standard JavaScript conventions.

- camelCase for variables
- camelCase for interfaces
- camelCase for component props

Example:

```ts
employeeCode
fullName
isActive
```

---

## DTO Mapping

The frontend must never expose backend DTOs directly to UI components.

Architecture:

Backend JSON

↓

DTO

↓

Mapper

↓

Frontend Model

↓

React Components

This allows backend and frontend naming conventions to evolve independently.

---

## API Layer Responsibilities

FastAPI Routers

Responsible for:

- HTTP routing
- Request validation
- Response models
- Dependency Injection

Routers must NOT contain business logic.

---

Services

Responsible for:

- Business rules
- Transactions
- Validation
- Exceptions

Services own application logic.

---

Repositories

Responsible only for:

- Database queries
- CRUD operations

Repositories must never:

- Commit transactions
- Perform business validation
- Raise business exceptions

---

## API Client

The frontend must communicate with the backend only through:

lib/api.ts

React components must never call fetch() directly.

Pages communicate with Services.

Services communicate with ApiClient.

ApiClient communicates with FastAPI.

---

## Endpoint Definitions

API endpoints are centralized in:

lib/endpoints.ts

Hardcoded endpoint strings are prohibited.

Correct:

ENDPOINTS.employees

Incorrect:

"/employees"

---

## Configuration

Application configuration is centralized in:

lib/config.ts

Environment variables must never be accessed directly outside the configuration layer.

---

## Employee Visibility

The default employee endpoints return only non-archived employees.

Archived employees remain stored in the database but are excluded from normal operational workflows.

Future archive management endpoints will expose archived employees separately.

---

## API Evolution

Frontend pages should never depend directly on API response structures.

Services are responsible for converting DTOs into frontend models.

This allows backend contracts to evolve with minimal impact on the UI.