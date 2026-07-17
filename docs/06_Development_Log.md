# Team Rostering & Queue Management System

# Development Log

---

| Document | Development Log |
|----------|-----------------|
| Version | 2.0 |
| Status | Active Development |
| Project | Team Rostering & Queue Management System |
| Last Updated | July 2026 |

---

# 1. Purpose

This document records the development history of the Team Rostering & Queue Management System.

Unlike the System Architecture document, which describes how the application is designed, this document explains how the project evolved over time.

Every milestone documents:

- Objectives
- Implementation
- Architectural decisions
- Verification
- Lessons learned
- Outcome

The Development Log provides historical context for future contributors and serves as a record of engineering progress throughout the project lifecycle.

---

# 2. Project Initiation

## Background

The project originated from a real operational challenge.

The operations team managed monthly workforce rosters using Microsoft Excel.

Although flexible, the spreadsheet-based workflow suffered from several limitations:

- Manual shift allocation
- Time-consuming monthly planning
- Difficult leave adjustments
- Lack of validation
- Human error
- No centralized data management
- No audit trail
- Limited reporting capabilities

As the number of employees and business rules increased, maintaining the roster became increasingly difficult.

The decision was made to replace the spreadsheet-based process with a dedicated web application.

---

## Initial Objectives

The initial goals of the project were deliberately limited.

Rather than attempting to build a complete workforce management platform immediately, the project would evolve incrementally.

The first objectives were:

- Build a stable backend foundation
- Design a scalable database
- Implement Employee Management
- Create a reusable frontend architecture
- Prepare for future roster generation

This incremental approach reduced complexity while allowing architectural decisions to be validated early.

---

# 3. Milestone 1 — Infrastructure Foundation

Status

✅ Complete

---

## Objectives

Establish the technical foundation required for all future development.

This milestone focused entirely on infrastructure rather than business functionality.

---

## Backend Infrastructure

The backend project was initialized using FastAPI.

Core technologies selected during this phase included:

- Python 3.12
- FastAPI
- SQLAlchemy 2
- PostgreSQL 16
- Alembic
- Docker
- Pydantic v2

These technologies were chosen because they provide a modern, production-ready foundation while supporting clean architecture principles.

---

## Development Environment

A containerized development environment was established using Docker.

Benefits achieved:

- Consistent runtime
- Reproducible environments
- Simplified onboarding
- Database isolation
- Environment parity

This eliminated the "works on my machine" problem and simplified future deployment.

---

## Database

A PostgreSQL database was configured within Docker.

The initial database configuration included:

- Persistent Docker volume
- Environment configuration
- Local development access
- Alembic integration

The database became the single source of truth for all persistent application data.

---

## Alembic Integration

Database schema versioning was introduced using Alembic.

Capabilities established:

- Version-controlled schema
- Upgrade support
- Downgrade support
- Migration history

From this point onward, database changes were introduced exclusively through migrations.

Manual schema modifications were intentionally avoided.

---

## Project Structure

A layered backend structure was established.

Primary modules included:

```
api/
core/
db/
exceptions/
models/
repositories/
schemas/
services/
```

This structure mirrored Clean Architecture principles and established clear ownership of responsibilities.

---

## Documentation

A dedicated documentation directory was introduced.

Initial project documentation included:

- Project Overview
- System Architecture
- Database Design
- API Design
- Business Rules
- Development Log
- Decision Log
- Handover

Documentation was treated as part of the implementation rather than an afterthought.

---

## Verification

Infrastructure verification included:

- Docker containers started successfully.
- PostgreSQL connectivity verified.
- FastAPI server launched successfully.
- Swagger documentation accessible.
- Alembic migrations executed successfully.

The project now possessed a stable technical foundation.

---

## Lessons Learned

Several important engineering practices were established during this milestone.

- Infrastructure should be completed before business features.
- Containerization simplifies development.
- Database schema changes must be version controlled.
- Documentation should evolve alongside the codebase.

These principles guided every subsequent milestone.

---

## Outcome

Milestone 1 successfully established the technical foundation for the application.

At its conclusion, the project contained no business functionality but provided a production-ready development environment upon which future modules could be built.

---

# 4. Milestone 2 — Employee Management Backend

Status

✅ Complete

---

## Objectives

Implement the first complete vertical slice of backend functionality.

The Employee module was selected because it forms the foundation for all future business processes.

Queues, leave requests, and roster generation all depend upon employee information.

---

## Employee Entity

The first production entity introduced into the application was Employee.

The model included:

- employee_code
- full_name
- role
- gender
- is_active
- is_archived
- created_at
- updated_at

Employee codes were selected as the primary key because they already exist within the organization and uniquely identify employees.

No surrogate integer or UUID key was required.

---

## Repository Layer

The EmployeeRepository became the first implementation of the repository pattern.

Responsibilities implemented:

- Retrieve employee by employee code
- Retrieve all active employees
- Create employee records

Business logic was intentionally excluded from the repository.

This milestone established the repository pattern that future modules will follow.

---

## Service Layer

The EmployeeService introduced the project's first business layer.

Responsibilities included:

- Employee creation
- Duplicate employee validation
- Employee retrieval
- Exception handling

The separation between repository and service layers significantly improved maintainability and testability.

---

## API Layer

The first REST endpoints were implemented.

Completed endpoints:

```
GET /

GET /employees

GET /employees/{employee_code}

POST /employees
```

The API exposed only the functionality required by the Employee module while establishing conventions for future endpoints.

---

## Business Rules

Several core business rules were implemented.

Examples included:

- Employee codes must be unique.
- Employees are never deleted.
- Archived employees are excluded from default listings.
- Employee listings are ordered by employee_code.

These rules were enforced within the Service Layer rather than the database or router.

---

## Verification

The Employee module successfully passed verification.

Completed checks included:

- Backend compilation.
- Swagger verification.
- Endpoint testing.
- Database persistence.
- Exception handling.

The project now contained its first complete backend business module.

---

## Lessons Learned

The Employee module validated several architectural assumptions.

- Clean Architecture reduced coupling.
- Service-layer validation simplified repositories.
- Repository abstraction improved readability.
- Swagger significantly accelerated API testing.

These lessons confirmed that the chosen architecture would scale effectively as additional modules were introduced.

---

## Outcome

Milestone 2 transformed the project from infrastructure into a functioning backend application.

The Employee module became the reference implementation for future backend development.

---

# 5. Milestone 3 — Frontend Foundation

Status

✅ Complete

---

## Objectives

Following completion of the initial backend functionality, attention shifted toward establishing a modern frontend application.

Rather than developing individual pages immediately, the objective of this milestone was to create a scalable frontend foundation capable of supporting future business modules.

The emphasis remained on architecture rather than feature completeness.

---

## Technology Selection

The frontend technology stack was selected after evaluating long-term maintainability, ecosystem maturity, and compatibility with the backend architecture.

Technologies adopted:

- Next.js 16
- React 19
- TypeScript
- Tailwind CSS
- shadcn/ui (Base UI)
- Lucide React

Together these technologies provided a strongly typed, component-based development environment capable of supporting enterprise-scale applications.

---

## Project Initialization

A dedicated frontend application was created.

The initial project included:

- App Router
- TypeScript configuration
- Tailwind CSS
- ESLint
- Modern React architecture

The frontend remained completely independent from the backend, communicating only through HTTP APIs.

This separation allows each application to evolve independently.

---

## Shared Layout

A reusable application layout was implemented.

Primary layout components included:

- Sidebar
- Header
- Navigation
- Main content container

The shared layout eliminated duplication across pages while providing a consistent user experience.

---

## Navigation

Application navigation was introduced early to support incremental feature development.

Navigation currently includes:

- Dashboard
- Employees
- Queue
- Leave
- Weekly Roster

Although several modules were not yet implemented, establishing navigation early simplified future expansion.

---

## UI Components

The project adopted shadcn/ui (Base UI) as the primary component library.

Reusable UI components were introduced for:

- Cards
- Buttons
- Tables
- Dialogs
- Forms
- Inputs

The decision to standardize on a single UI framework ensures visual consistency throughout the application.

---

## TypeScript

TypeScript became a mandatory part of the development workflow.

Benefits observed included:

- Compile-time validation
- Improved IntelliSense
- Safer refactoring
- Stronger type contracts

Several early integration issues were identified and corrected through TypeScript before runtime.

---

## Verification

Verification activities included:

- Next.js development server
- React rendering
- Navigation testing
- TypeScript compilation

Verification command:

```
npx tsc --noEmit
```

The frontend foundation was considered complete after the application compiled successfully with zero TypeScript errors.

---

## Lessons Learned

Several frontend engineering principles were established during this milestone.

- Shared layouts reduce duplication.
- TypeScript should be treated as a design tool rather than merely a compiler.
- Reusable UI components simplify future development.
- Early architectural investment prevents future refactoring.

---

## Outcome

Milestone 3 delivered a stable frontend application capable of supporting future business functionality.

Although no backend integration existed at this stage, the project now possessed a professional frontend architecture.

---

# 6. Milestone 4 — Frontend Architecture

Status

✅ Complete

---

## Objectives

The primary objective of this milestone was to establish architectural boundaries within the frontend before introducing live API communication.

Rather than allowing pages to communicate directly with the backend, the project adopted a layered frontend architecture.

---

## Architectural Refactoring

The frontend architecture evolved into the following structure.

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

This structure intentionally mirrors the backend architecture.

The result is improved consistency between frontend and backend development.

---

## Employee Module Refactoring

The Employee page was redesigned using reusable components.

Major components introduced included:

- EmployeeTable
- EmployeeToolbar
- EmployeeStats

Each component owns a single presentation responsibility.

Business logic was intentionally excluded.

---

## Service Layer

A dedicated EmployeeService was introduced.

Responsibilities include:

- Supplying employee data
- Hiding implementation details
- Acting as the interface between pages and data sources

At this stage, the service intentionally returned mock employee data.

This allowed frontend development to proceed independently of backend integration.

---

## API Infrastructure

To prepare for future backend integration, a centralized API infrastructure was implemented.

Created modules:

```
api.ts

config.ts

endpoints.ts
```

Each file owns one responsibility.

---

### api.ts

Responsible for:

- HTTP communication
- Request execution
- Shared configuration

---

### config.ts

Responsible for:

- Environment configuration
- Base API URL

---

### endpoints.ts

Responsible for:

- API endpoint definitions

This eliminated hardcoded URLs throughout the frontend.

---

## Reusable Components

Significant effort was invested in creating reusable presentation components.

Benefits achieved:

- Reduced duplication
- Improved readability
- Consistent UI behaviour
- Easier future maintenance

Component extraction also reduced the size and complexity of page-level code.

---

## Verification

Completed verification included:

- React rendering
- Navigation
- Component integration
- TypeScript compilation

The frontend remained fully functional following architectural refactoring.

---

## Lessons Learned

Important architectural lessons emerged.

- Pages should orchestrate rather than implement business logic.
- Services provide a stable interface regardless of the data source.
- API communication should remain centralized.
- Small reusable components are easier to maintain than large page files.

These principles became mandatory standards for all future frontend development.

---

## Outcome

Milestone 4 established the long-term frontend architecture.

The application now possessed clearly defined architectural layers comparable to those already implemented within the backend.

---

# 7. Milestone 4.1 — Architecture Stabilization

Status

✅ Complete

---

## Objectives

Before replacing mock data with live API communication, the architecture was reviewed and stabilized.

The objective was to eliminate architectural inconsistencies before introducing backend integration.

---

## DTO Strategy

A frontend DTO strategy was designed.

Future request flow:

```
FastAPI

↓

EmployeeResponse

↓

HTTP

↓

EmployeeDto

↓

Employee Mapper

↓

Employee

↓

React Components
```

This design intentionally separates API contracts from frontend domain models.

---

## Architectural Standards

Several engineering standards were finalized.

Examples include:

- Pages never call fetch().
- Components remain presentation only.
- Services own API communication.
- ApiClient owns HTTP.
- Configuration remains centralized.
- DTO mapping occurs within services.
- Repositories never commit.
- Services own transactions.

These standards now govern every future module.

---

## Documentation

Significant effort was invested in documenting the architecture.

Documentation became an active part of the development workflow rather than a final project activity.

The following documents were maintained:

- System Architecture
- Business Rules
- Database Design
- API Design
- Development Log
- Decision Log
- Handover

---

## Verification

Verification completed successfully.

Backend:

```
python -m compileall app
```

Frontend:

```
npx tsc --noEmit
```

Both environments compiled successfully.

---

## Lessons Learned

The project reached an important maturity point.

Architecture should always stabilize before feature expansion.

Investing in maintainability early dramatically reduces future technical debt.

---

## Outcome

Milestone 4.1 completed the architectural preparation required for full frontend ↔ backend integration.

The next milestone will replace the temporary mock implementation with production API communication while preserving the established architectural boundaries.

---

# 8. Current Project Status

Status

🟢 Active Development

Current Milestone

**Milestone 4.1 Complete**

The project has successfully completed the foundational phases required for long-term development.

Both backend and frontend now possess stable architectures, allowing future work to focus primarily on implementing business functionality rather than restructuring existing code.

---

# 9. Backend Status

The backend has progressed from an empty FastAPI application into a structured business application following Clean Architecture principles.

## Completed Infrastructure

Completed items include:

- Docker development environment
- PostgreSQL integration
- SQLAlchemy configuration
- Alembic migration framework
- Dependency Injection
- Environment configuration
- Exception handling framework
- Swagger/OpenAPI documentation

This infrastructure now serves as the foundation for every future backend module.

---

## Employee Module

The Employee module represents the first production-ready backend implementation.

Completed functionality includes:

### Database

- Employee entity
- Base model
- Timestamp support
- Employee code primary key

### Repository

Implemented methods:

- get_by_employee_code()
- get_all()
- add()

Repositories remain responsible only for persistence.

---

### Service

Implemented methods:

- create_employee()
- get_employee_by_code()
- get_all_employees()

Business rules remain centralized within the service layer.

---

### Router

Completed REST endpoints:

```
GET /

GET /employees

GET /employees/{employee_code}

POST /employees
```

Swagger documentation has been verified for each endpoint.

---

## Backend Architecture

Current architectural layers:

```
Router

↓

Service

↓

Repository

↓

Database
```

Each layer currently respects its intended responsibilities.

No architectural violations are known.

---

# 10. Frontend Status

The frontend has evolved into a modular React application.

Current architecture mirrors the backend wherever practical.

---

## Infrastructure

Completed infrastructure includes:

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui
- Shared layout
- Navigation
- API infrastructure

---

## Current Pages

Implemented pages:

- Dashboard
- Employees
- Queue
- Leave
- Weekly Roster

These pages currently provide the application's primary navigation experience.

---

## Shared Components

Implemented reusable components include:

Layout:

- Sidebar
- Header
- Application shell

Employees:

- EmployeeTable
- EmployeeToolbar
- EmployeeStats

UI:

- Shared shadcn components
- Forms
- Tables
- Dialogs
- Buttons
- Cards

The emphasis throughout this milestone was component reuse rather than rapid feature implementation.

---

## Frontend Architecture

Current frontend architecture:

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

The application has intentionally avoided placing business logic within pages or components.

---

## Current Limitation

EmployeeService currently returns mock employee data.

Example:

```
Promise.resolve(mockEmployees)
```

This behaviour is temporary.

The architecture has already been prepared for replacement with live API communication.

---

# 11. Documentation Status

Documentation has become a first-class project artifact.

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

The objective is to keep documentation synchronized with implementation rather than updating it only at project completion.

---

# 12. Known Limitations

Although the project has reached a stable architectural state, several intentional limitations remain.

These are not considered technical debt.

Instead, they represent planned future work.

---

## Backend

Not yet implemented:

- Queue Management
- Leave Management
- Monthly Roster Engine
- Daily Regeneration
- Reporting
- Authentication
- Authorization

These modules will follow the same architectural patterns established by the Employee module.

---

## Frontend

Current frontend limitations include:

- Mock employee data
- No loading state
- No error state
- No API integration
- No authentication

These limitations were intentionally deferred until the architecture stabilized.

---

## Database

Current schema includes only the Employee entity.

Future milestones will introduce additional entities for:

- Queues
- Leave
- Rosters
- Queue assignments
- Shift templates

The current schema has been designed to accommodate this future expansion.

---

# 13. Technical Debt Assessment

The project currently carries very little technical debt.

This is primarily due to the emphasis placed on architecture before feature development.

Current observations:

### Low Technical Debt

- Clean Architecture established
- Layer responsibilities clearly defined
- Centralized configuration
- Reusable components
- Service abstraction
- Repository pattern
- Documentation maintained

---

### Planned Refactoring

The following improvements are already planned rather than representing unexpected debt.

- Employee DTO mapping
- Live API integration
- Loading state
- Error state

These improvements form the objectives of the next milestone.

---

# 14. Upcoming Milestone

## Milestone 5

Frontend ↔ Backend Integration

This milestone represents the first complete vertical slice connecting the React application to the FastAPI backend.

Objectives include:

### Step 1

Create EmployeeDto.

---

### Step 2

Create employee-mapper.ts.

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

Mapper

↓

Employee
```

---

### Step 4

Connect Employee page to FastAPI.

---

### Step 5

Remove mock data.

---

### Step 6

Implement loading state.

---

### Step 7

Implement error state.

---

### Step 8

Verify:

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

### Expected Outcome

Upon completion of Milestone 5, the application will contain its first fully integrated frontend-to-backend business workflow.

This milestone establishes the implementation pattern that every future module will follow.

---

# 15. Engineering Practices Adopted

Throughout the project several engineering practices have become mandatory standards rather than recommendations.

These practices ensure that the application remains maintainable as additional modules are introduced.

---

## Architecture First

One of the primary goals of the project has been to establish architecture before implementing business functionality.

Rather than rapidly developing features and restructuring later, architectural boundaries are designed first.

Benefits observed include:

- Reduced technical debt
- Consistent implementation
- Easier onboarding
- Predictable development workflow

This philosophy will continue throughout the project lifecycle.

---

## One Responsibility Per Layer

Every architectural layer owns exactly one responsibility.

Backend

```
Router

↓

Service

↓

Repository

↓

Database
```

Frontend

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

Maintaining these boundaries has significantly improved readability and reduced coupling between modules.

---

## Incremental Development

The project is intentionally developed in small, verifiable milestones.

Each milestone introduces a complete piece of functionality before moving to the next objective.

Advantages include:

- Easier debugging
- Simpler verification
- Lower implementation risk
- Continuous architectural validation

---

## Verification Before Progress

No implementation is considered complete until it has passed verification.

Backend verification:

```
python -m compileall app
```

Frontend verification:

```
npx tsc --noEmit
```

Development never proceeds while compilation errors remain unresolved.

This practice has greatly reduced the likelihood of introducing unstable code.

---

## Documentation as Code

Documentation is treated as part of the implementation rather than an optional deliverable.

Whenever significant architectural changes occur, documentation is updated to reflect the current codebase.

Maintained documents include:

- System Architecture
- Database Design
- API Design
- Business Rules
- Development Log
- Decision Log
- Handover

Keeping documentation synchronized ensures that future contributors can understand the project without relying on historical conversations.

---

# 16. Project Metrics

The following metrics summarize the current state of the project.

---

## Backend

Infrastructure

✅ Complete

Employee Management

✅ Complete

Queue Management

⏳ Planned

Leave Management

⏳ Planned

Roster Engine

⏳ Planned

Reporting

⏳ Planned

Authentication

⏳ Planned

---

## REST API

Implemented endpoints:

```
GET /

GET /employees

GET /employees/{employee_code}

POST /employees
```

Additional endpoints will be introduced incrementally as business modules are implemented.

---

## Frontend

Completed pages:

- Dashboard
- Employees
- Queue
- Leave
- Weekly Roster

Shared infrastructure:

- Shared layout
- Sidebar
- Header
- Navigation
- ApiClient
- Configuration layer
- Endpoint layer

---

## Documentation

Current documentation:

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

The documentation set now provides comprehensive coverage of the project's architecture, history, business rules, and implementation status.

---

# 17. Overall Project Assessment

The project has successfully progressed beyond the initial setup phase.

Current strengths include:

- Stable backend architecture
- Stable frontend architecture
- Clearly defined coding standards
- Centralized configuration
- Reusable component structure
- Strong separation of concerns
- Comprehensive documentation
- Repeatable verification workflow

The application now provides a solid foundation for implementing additional business functionality.

Future work can focus on delivering features rather than restructuring the architecture.

---

# 18. Next Review Point

The next major review will occur after completion of **Milestone 5 – Frontend ↔ Backend Integration**.

The review will confirm:

- EmployeeDto implementation
- Mapper implementation
- EmployeeService refactoring
- Live API communication
- Removal of mock data
- Loading state
- Error state
- Successful backend verification
- Successful frontend verification
- Updated documentation

Upon successful completion, the Employee module will become the project's first fully integrated end-to-end vertical slice and will serve as the reference implementation for all subsequent modules.

---

# 19. Conclusion

The Team Rostering & Queue Management System has evolved from an empty repository into a well-structured enterprise application with a stable architectural foundation.

Development has intentionally prioritized long-term maintainability over short-term implementation speed.

By establishing consistent architectural patterns, centralized configuration, comprehensive documentation, and rigorous verification practices early in the project, future development can proceed with significantly lower risk and greater consistency.

This Development Log serves as the historical record of the project's evolution and should continue to be updated whenever significant milestones are completed.

---

**End of Document**