# 04 - API Design

Version: 2.0
Status: Active
Last Updated: July 2026

---

# Purpose

This document defines the REST API for the Operations Workforce Management System.

It describes:

- API architecture
- Endpoint organization
- Resource naming
- Request and response conventions
- DTO design
- Validation rules
- Error handling
- Planned endpoints

The API follows REST principles and serves as the contract between the frontend and backend.

---

# API Architecture

The application exposes a REST API through FastAPI.

```
React
   │
   ▼
Frontend Services
   │
   ▼
ApiClient
   │
   ▼
FastAPI
   │
   ▼
Service Layer
   │
   ▼
Repository Layer
   │
   ▼
Database
```

All frontend communication must pass through the API.

---

# API Design Principles

The API follows these principles:

- Resource-oriented URLs
- Stateless requests
- JSON request and response bodies
- Consistent error responses
- Predictable naming
- DTO separation from database models

---

# URL Conventions

Plural resource names are used.

Examples:

```
/employees
/queues
/time-blocks
/monthly-rosters
/daily-allocations
```

Nested resources are avoided unless they express ownership.

---

# Response Format

Successful responses return appropriate HTTP status codes.

Example:

```json
{
  "id": 1,
  "name": "John Doe"
}
```

---

# Error Format

All errors follow a consistent structure.

```json
{
  "detail": "Employee not found."
}
```

---

# DTO Policy

Database entities are never exposed directly.

The flow is:

```
Database Entity
        │
        ▼
Pydantic DTO
        │
        ▼
JSON
        │
        ▼
Frontend DTO
        │
        ▼
Mapper
        │
        ▼
Frontend Domain Model
```

This allows backend and frontend to evolve independently.

---

# Workforce Planning APIs

## Employees

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /employees | List employees |
| GET | /employees/{id} | Get employee |
| POST | /employees | Create employee |
| PUT | /employees/{id} | Update employee |
| DELETE | /employees/{id} | Archive employee |

---

## Monthly Rosters

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /monthly-rosters | List monthly rosters |
| GET | /monthly-rosters/{id} | Get roster |
| POST | /monthly-rosters | Create roster |
| PUT | /monthly-rosters/{id} | Update roster |

---

## Leave

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /leave |
| POST | /leave |
| PUT | /leave/{id} |
| DELETE | /leave/{id} |

---

# Operations Execution APIs

## Queues

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /queues | List queues |
| POST | /queues | Create queue |
| PUT | /queues/{id} | Update queue |
| DELETE | /queues/{id} | Archive queue |

---

## Time Blocks

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /time-blocks |
| POST | /time-blocks |
| PUT | /time-blocks/{id} |
| DELETE | /time-blocks/{id} |

---

## Daily Allocations

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /daily-allocations | List allocations |
| GET | /daily-allocations/{id} | Get allocation |
| POST | /daily-allocations | Generate draft allocation |
| PUT | /daily-allocations/{id} | Update allocation |
| POST | /daily-allocations/{id}/publish | Publish allocation |

---

## Queue Assignments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /queue-assignments |
| POST | /queue-assignments |
| PUT | /queue-assignments/{id} |
| DELETE | /queue-assignments/{id} |

---

## Supervisor Assignments

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /supervisor-assignments |
| POST | /supervisor-assignments |
| PUT | /supervisor-assignments/{id} |
| DELETE | /supervisor-assignments/{id} |

---

## Staffing Requirements

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | /staffing-requirements |
| POST | /staffing-requirements |
| PUT | /staffing-requirements/{id} |

---

# Validation

Validation is performed in the Router layer using Pydantic models.

Business validation is performed in the Service layer.

Examples:

- Duplicate employee codes
- Invalid staffing requirements
- Invalid queue assignments
- Publishing incomplete allocations

---

# Authentication

Authentication is not part of the initial release.

The API is designed so authentication and authorization can be introduced later without changing endpoint structure.

---

# Versioning

The initial implementation uses:

```
/api/v1/
```

Future versions can coexist if breaking changes are introduced.

---

# Related Documentation

- 01_Project_Overview.md
- 02_System_Architecture.md
- 03_Database_Design.md
- 05_Business_Rules.md
- 09_Domain_Model.md

---

**End of Document**