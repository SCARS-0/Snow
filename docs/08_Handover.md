# Team Rostering & Queue Management System

# Project Handover

---

| Document | Project Handover |
|----------|------------------|
| Version | 2.0 |
| Status | Active Development |
| Project | Team Rostering & Queue Management System |
| Last Updated | July 2026 |
| Current Milestone | Milestone 4.1 Complete |
| Next Milestone | Milestone 5 – Frontend ↔ Backend Integration |

---

# 1. Executive Summary

The Team Rostering & Queue Management System is a production-oriented internal web application being developed to replace an Excel-based workforce rostering process.

The application is intended for operations managers and provides centralized management of employees, queues, leave, and monthly rosters.

Development has intentionally prioritized long-term maintainability and architectural consistency over rapid feature implementation.

At the time of writing, the project has completed all foundational architectural work.

The backend exposes a production-ready Employee Management API.

The frontend provides a stable and reusable architecture with dedicated presentation, service, and infrastructure layers.

The next development milestone is the first complete frontend ↔ backend vertical slice.

---

# 2. Current Project Status

Overall Status

🟢 Active Development

Project Phase

Architecture Complete

Current Focus

Frontend ↔ Backend Integration

Current Stability

Backend

✅ Stable

Frontend

✅ Stable

Architecture

✅ Stable

Documentation

✅ Current

Known Architectural Issues

None

Known Critical Bugs

None

Outstanding Work

Business functionality.

Not architectural restructuring.

---

# 3. Business Overview

## Purpose

The application replaces the existing Excel-based workforce management process.

Managers currently perform:

- Employee management
- Shift allocation
- Queue assignment
- Leave planning
- Monthly roster generation

using spreadsheets.

This approach is time-consuming, error-prone, and difficult to maintain.

The objective of the project is to provide a centralized web application that enforces business rules automatically while simplifying workforce planning.

---

## Intended Users

Current users:

- Operations Managers

Future users may include:

- Team Leads
- Workforce Planning
- HR
- Administrators

Employees do not currently interact with the application.

Authentication will be introduced during a later milestone.

---

## Functional Modules

Current and planned modules include:

| Module | Status |
|---------|--------|
| Employee Management | ✅ Backend Complete / UI Complete |
| Queue Management | 🟡 UI Prototype |
| Leave Management | 🟡 UI Prototype |
| Weekly Roster | 🟡 UI Prototype |
| Monthly Roster Engine | ⏳ Planned |
| Daily Regeneration | ⏳ Planned |
| Reporting | ⏳ Planned |
| Authentication | ⏳ Planned |

---

# 4. Project Health

The following assessment reflects the current maturity of the project.

| Area | Status |
|------|--------|
| Architecture | ★★★★★ |
| Documentation | ★★★★★ |
| Backend Foundation | ★★★★★ |
| Frontend Foundation | ★★★★★ |
| Business Features | ★★☆☆☆ |
| Testing | ★☆☆☆☆ |
| Deployment | ☆☆☆☆☆ |
| Production Readiness | ★★★☆☆ |

---

## Interpretation

Architecture

The project possesses a stable architecture capable of supporting future business modules.

Documentation

Documentation accurately reflects the current implementation and architectural decisions.

Backend

The backend infrastructure is complete and the Employee module serves as the reference implementation.

Frontend

The frontend architecture has been fully refactored into reusable layers.

Business Features

Only the Employee module has been fully implemented.

Additional modules remain under development.

Testing

Formal automated testing has not yet been introduced.

Deployment

Development currently targets the local Docker environment.

Production deployment will be addressed after core business functionality has stabilized.

---

# 5. Technology Stack

## Backend

- Python 3.12
- FastAPI
- SQLAlchemy 2
- PostgreSQL 16
- Alembic
- Docker
- Pydantic v2

---

## Frontend

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui (Base UI)
- Lucide React

---

## Documentation

The project maintains comprehensive engineering documentation.

Current documents include:

```
01_Project_Overview.md

02_System_Architecture.md

03_Database_Design.md

04_API_Design.md

05_Business_Rules.md

06_Development_Log.md

07_Decision_Log.md

08_Handover.md
```

Documentation is considered part of the implementation.

---

# 6. Current Implementation Summary

At the conclusion of Milestone 4.1, the project contains:

Backend

- Infrastructure complete.
- Employee module complete.
- REST API complete.
- Swagger verified.

Frontend

- Shared layout complete.
- Navigation complete.
- Employee UI complete.
- Queue UI complete.
- Leave UI complete.
- Weekly Roster UI complete.

Infrastructure

- ApiClient implemented.
- Configuration centralized.
- Endpoints centralized.

Documentation

- Architecture documented.
- Development history documented.
- Engineering decisions documented.

The application is now prepared for its first end-to-end frontend ↔ backend integration.

---

# 7. Current Milestone

Completed

✅ Milestone 4.1

The architecture has stabilized.

Both backend and frontend now follow clearly defined engineering standards.

The codebase is considered ready for feature-focused development.

Next Milestone

Milestone 5

Frontend ↔ Backend Integration

This milestone will establish the project's first production-quality vertical slice by replacing mock employee data with live communication to the FastAPI backend.

This implementation will become the template for every future module.

---

# 8. Repository Structure

The repository is organized into three primary areas.

```
Roster_App/

├── backend/
├── frontend/
└── docs/
```

Each directory has a distinct responsibility.

---

## Backend

The backend contains all server-side functionality.

Current structure:

```
backend/

├── alembic/
├── app/
│
│   ├── api/
│   │   └── routers/
│   │
│   ├── core/
│   │
│   ├── db/
│   │
│   ├── exceptions/
│   │
│   ├── models/
│   │
│   ├── repositories/
│   │
│   ├── schemas/
│   │
│   └── services/
│
├── tests/
│
├── Dockerfile
├── alembic.ini
├── requirements.txt
└── .env
```

### Responsibilities

**api/**

Contains HTTP endpoints only.

Responsibilities:

- Request validation
- Response serialization
- Dependency injection

Business logic is not implemented here.

---

**services/**

Contains business logic.

Responsibilities:

- Validation
- Workflow orchestration
- Transactions
- Business exceptions

This layer coordinates repositories while remaining independent of HTTP concerns.

---

**repositories/**

Contains persistence logic.

Responsibilities:

- CRUD operations
- Query construction
- Entity persistence

Repositories never:

- Commit transactions
- Perform validation
- Contain business logic

---

**models/**

Contains SQLAlchemy entities.

These classes represent persistent database objects.

---

**schemas/**

Contains Pydantic models used for request and response validation.

These models define the API contract exposed by FastAPI.

---

**exceptions/**

Contains domain-specific exception classes.

Current examples include:

- EmployeeNotFoundError
- DuplicateEmployeeCodeError

Future modules will introduce additional exceptions as required.

---

**db/**

Responsible for:

- Database session creation
- Engine configuration
- Database initialization

---

**core/**

Contains shared backend infrastructure.

Examples include:

- Application configuration
- Dependency definitions
- Common utilities

---

# 9. Frontend Structure

The frontend follows a layered architecture that mirrors the backend wherever practical.

Current structure:

```
frontend/

src/

├── app/
│
├── components/
│   ├── employees/
│   ├── layout/
│   └── ui/
│
├── services/
│
├── types/
│
└── lib/
```

---

## Responsibilities

### app/

Contains application routes.

Pages orchestrate user interactions.

Pages never:

- call fetch()
- know API URLs
- contain business logic

---

### components/

Contains reusable presentation components.

Examples:

```
EmployeeTable

EmployeeToolbar

EmployeeStats

Sidebar

Header
```

Components should be reusable and unaware of the data source.

---

### services/

Acts as the business layer of the frontend.

Responsibilities include:

- Calling ApiClient
- Mapping DTOs
- Returning frontend models

Future services include:

- QueueService
- LeaveService
- RosterService

---

### types/

Contains frontend domain models.

These models are consumed by React components.

Transport DTOs should not be placed here.

---

### lib/

Contains shared frontend infrastructure.

Current files include:

```
api.ts

config.ts

endpoints.ts
```

Each file owns a single responsibility.

---

# 10. Backend Status

The backend is considered architecturally complete for the Employee module.

Infrastructure completed:

- FastAPI
- Docker
- PostgreSQL
- SQLAlchemy
- Alembic
- Dependency Injection
- Exception framework

Employee module completed:

- Entity
- Repository
- Service
- Router
- Swagger verification

Current API endpoints:

```
GET /

GET /employees

GET /employees/{employee_code}

POST /employees
```

The Employee module serves as the reference implementation for all future backend modules.

---

# 11. Frontend Status

The frontend has reached architectural stability.

Completed:

- Dashboard
- Employee Management page
- Queue page
- Leave page
- Weekly Roster page
- Shared layout
- Sidebar
- Header
- Navigation
- ApiClient
- Configuration layer
- Endpoint layer

The application compiles successfully and provides a consistent user experience across implemented modules.

---

## Current Limitation

EmployeeService currently returns mock employee data.

Example:

```
Promise.resolve(mockEmployees)
```

This implementation is temporary and will be replaced during Milestone 5.

---

# 12. Database Status

The database currently contains the Employee module.

Implemented table:

```
Employee
```

Key fields include:

- employee_code
- full_name
- role
- gender
- is_active
- is_archived
- created_at
- updated_at

Future tables will include:

- Queue
- Leave
- Roster
- Shift
- QueueAssignment

The schema has been designed to support this future expansion without requiring architectural changes.

---

# 13. API Status

The backend currently exposes the Employee Management API.

Verified endpoints:

```
GET /

GET /employees

GET /employees/{employee_code}

POST /employees
```

Swagger documentation has been verified and serves as the primary API reference during development.

Future modules will expose additional endpoints following the same REST conventions.

---

# 14. Running the Project

## Backend

Start Docker containers.

```
docker compose up --build
```

Run database migrations.

```
alembic upgrade head
```

Start the FastAPI application.

```
uvicorn app.main:app --reload
```

The backend is available at:

```
http://localhost:8000
```

Swagger documentation:

```
http://localhost:8000/docs
```

---

## Frontend

Navigate to the frontend directory.

Install dependencies.

```
npm install
```

Start the development server.

```
npm run dev
```

The frontend is available at:

```
http://localhost:3000
```

---

# 15. Verification Workflow

Every implementation must pass verification before additional work begins.

Backend verification:

```
python -m compileall app
```

Frontend verification:

```
npx tsc --noEmit
```

Compilation failures should be resolved immediately rather than postponed.

This practice has proven effective at maintaining a continuously stable codebase.

---

# 16. Current Development Roadmap

The project follows an incremental milestone-based development strategy.

Each milestone delivers a complete, verifiable piece of functionality before introducing additional business modules.

The current roadmap is shown below.

| Milestone | Description | Status |
|------------|-------------|--------|
| Milestone 1 | Infrastructure Foundation | ✅ Complete |
| Milestone 2 | Employee Management Backend | ✅ Complete |
| Milestone 3 | Frontend Foundation | ✅ Complete |
| Milestone 4 | Frontend Architecture | ✅ Complete |
| Milestone 4.1 | Architecture Stabilization | ✅ Complete |
| Milestone 5 | Frontend ↔ Backend Integration | 🔄 Current |
| Milestone 6 | Queue Management | ⏳ Planned |
| Milestone 7 | Leave Management | ⏳ Planned |
| Milestone 8 | Monthly Roster Engine | ⏳ Planned |
| Milestone 9 | Reporting | ⏳ Planned |
| Milestone 10 | Authentication & Authorization | ⏳ Planned |

Development should proceed in milestone order.

Skipping milestones is discouraged because later modules depend on earlier architectural work.

---

# 17. Current Milestone

## Milestone 5

### Objective

Replace temporary mock employee data with live backend communication.

This is the first complete frontend-to-backend vertical slice.

Unlike previous milestones, this milestone focuses on integration rather than architecture.

---

## Planned Work

### Step 1

Create:

```
EmployeeDto
```

The DTO should accurately represent the JSON returned by the FastAPI API.

---

### Step 2

Create:

```
employee-mapper.ts
```

Responsibilities:

- Convert EmployeeDto
- Return Employee frontend model

---

### Step 3

Refactor EmployeeService.

Current implementation:

```
Promise.resolve(mockEmployees)
```

Target implementation:

```
ApiClient

↓

EmployeeDto

↓

Employee Mapper

↓

Employee
```

---

### Step 4

Connect Employee Page.

The Employee page should continue using EmployeeService.

No page-level architectural changes should be required.

---

### Step 5

Introduce loading state.

---

### Step 6

Introduce error state.

---

### Step 7

Verification

Backend

```
python -m compileall app
```

Frontend

```
npx tsc --noEmit
```

Swagger

React UI

---

## Expected Result

Upon completion:

- Mock data removed
- Live API communication established
- Components remain unchanged
- Architecture preserved

This implementation becomes the template for all future modules.

---

# 18. Engineering Standards

The following standards are mandatory throughout the project.

---

## Backend

Architecture:

```
Router

↓

Service

↓

Repository

↓

Database
```

Rules:

Router

- HTTP only
- Validation only
- Dependency Injection only

Service

- Business logic
- Validation
- Transactions
- Exceptions

Repository

- CRUD only
- No commits
- No business logic

---

## Frontend

Architecture:

```
Page

↓

Components

↓

Services

↓

ApiClient

↓

FastAPI
```

Rules:

Pages

- Orchestrate only
- Never call fetch()

Components

- Presentation only
- No API communication

Services

- API communication
- DTO mapping

ApiClient

- HTTP only

---

## DTO Rule

React components never consume transport DTOs.

Required flow:

```
EmployeeDto

↓

EmployeeMapper

↓

Employee

↓

React Component
```

This rule applies to every future business module.

---

## Configuration Rule

Never hardcode:

- API URLs
- Endpoint paths
- Environment values

Use:

```
config.ts

endpoints.ts
```

---

## Database Rule

Employees are never deleted.

Instead:

```
is_archived = TRUE
```

is used.

Operational queries return:

```
is_archived = FALSE
```

---

## Documentation Rule

Whenever architecture changes:

Update

- System Architecture
- Development Log
- Decision Log
- Handover

Documentation is part of implementation.

---

# 19. Known Limitations

The following limitations are intentional.

They are scheduled work rather than architectural defects.

Backend

Not yet implemented:

- Queue module
- Leave module
- Roster Engine
- Reporting
- Authentication

Frontend

Current limitations:

- Employee mock data
- No loading state
- No error state

Infrastructure

Not yet implemented:

- Automated tests
- CI/CD
- Production deployment

These limitations should be addressed according to the project roadmap rather than through ad hoc development.

---

# 20. First-Day Onboarding Checklist

A developer joining the project should complete the following steps before writing code.

### Step 1

Read:

```
02_System_Architecture.md
```

Understand the architectural boundaries.

---

### Step 2

Read:

```
05_Business_Rules.md
```

Understand the operational requirements.

---

### Step 3

Read:

```
07_Decision_Log.md
```

Understand why the architecture was designed this way.

---

### Step 4

Run the backend.

Verify:

- Docker
- PostgreSQL
- Swagger

---

### Step 5

Run the frontend.

Verify:

- Dashboard
- Navigation
- Employee page

---

### Step 6

Run verification.

Backend:

```
python -m compileall app
```

Frontend:

```
npx tsc --noEmit
```

---

### Step 7

Read the Current Milestone section.

Begin work only after understanding the existing implementation and architectural constraints.

---

# 21. Definition of Done

A feature is considered complete only when it satisfies every requirement listed below.

Completion is measured by quality rather than implementation alone.

---

## Implementation

✓ Business requirements implemented

✓ Architecture followed

✓ Naming conventions respected

✓ No architectural shortcuts introduced

---

## Backend

The backend implementation must include:

- Repository
- Service
- Router
- DTOs
- Exceptions (where required)

Verification:

```
python -m compileall app
```

Must complete successfully before continuing development.

---

## Frontend

The frontend implementation must include:

- Page
- Components
- Service
- DTO
- Mapper
- ApiClient integration

Verification:

```
npx tsc --noEmit
```

Must return zero TypeScript errors.

---

## Functional Verification

Before a milestone is considered complete:

- Swagger endpoints verified
- React UI verified
- Business rules validated
- No console errors
- No runtime exceptions

---

## Documentation

The following documents must be updated whenever architectural changes occur.

```
02_System_Architecture.md

06_Development_Log.md

07_Decision_Log.md

08_Handover.md
```

Documentation is considered part of the feature.

---

# 22. Immediate Next Files

The following files should be implemented next.

Development order is important.

---

## 1

```
EmployeeDto.ts
```

Purpose:

Represent the API contract returned by FastAPI.

---

## 2

```
employee-mapper.ts
```

Purpose:

Convert EmployeeDto into the frontend Employee domain model.

---

## 3

```
employee-service.ts
```

Replace:

```
Promise.resolve(mockEmployees)
```

With:

```
ApiClient

↓

EmployeeDto

↓

EmployeeMapper

↓

Employee
```

---

## 4

Employee Page

Replace mock data with live API communication.

The page itself should require minimal changes because the architecture has already isolated API communication within the service layer.

---

## 5

Loading State

Introduce a reusable loading experience.

This pattern should later be reused by:

- Queue
- Leave
- Roster
- Reports

---

## 6

Error State

Introduce a reusable error presentation component.

Future modules should reuse this implementation rather than creating custom error handling.

---

# 23. Long-Term Vision

Although the current implementation focuses primarily on Employee Management, the architecture has been designed to support a complete workforce management platform.

Future capabilities include:

- Queue assignment
- Leave approval workflows
- Automatic monthly roster generation
- Daily roster regeneration
- Staffing analytics
- Reporting dashboards
- Authentication
- Role-based authorization

Each new capability should integrate into the existing architecture without requiring structural redesign.

This validates one of the project's primary architectural goals: extensibility.

---

# 24. Project Health Summary

The current state of the project can be summarized as follows.

| Area | Status |
|------|--------|
| Architecture | Stable |
| Backend | Stable |
| Frontend | Stable |
| Database | Stable |
| Documentation | Current |
| Technical Debt | Low |
| Testing | Planned |
| Deployment | Planned |

The application is considered architecturally mature.

Future effort should focus on implementing business functionality rather than restructuring existing code.

---

# 25. Guidance for Future Contributors

When contributing to the project:

1. Read the System Architecture document before making architectural changes.
2. Review the Decision Log to understand why current patterns exist.
3. Follow the established layer responsibilities.
4. Do not introduce new architectural patterns without documenting the rationale.
5. Verify all changes before proceeding.
6. Keep documentation synchronized with implementation.

Consistency is more valuable than individual preference.

The project favors predictable engineering practices over ad hoc solutions.

---

# 26. Final Notes

The Team Rostering & Queue Management System has intentionally been developed using enterprise software engineering practices from its earliest stages.

Rather than optimizing for rapid feature delivery, the project emphasizes:

- Clean Architecture
- Separation of Concerns
- Layered design
- Strong typing
- Centralized configuration
- Comprehensive documentation
- Continuous verification

This approach establishes a stable foundation upon which increasingly complex business functionality can be implemented with confidence.

At the conclusion of Milestone 4.1, the project has achieved architectural stability.

The next milestone introduces the first fully integrated frontend-to-backend workflow and establishes the implementation pattern that every future business module will follow.

This document should be reviewed and updated whenever a significant milestone is completed to ensure that it remains an accurate representation of the project's current state.

---

# Handover Summary

If you are taking over this project, the immediate priorities are:

1. Verify the project builds successfully.
2. Read the architecture and decision documentation.
3. Complete Milestone 5 (Frontend ↔ Backend Integration).
4. Verify the implementation.
5. Update the documentation.
6. Continue with Queue Management.

By following this workflow, the project will continue to evolve while preserving its architectural consistency and long-term maintainability.

---

**End of Document**