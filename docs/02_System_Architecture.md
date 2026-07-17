# Team Rostering & Queue Management System

# System Architecture

---

| Document | System Architecture |
|----------|---------------------|
| Version | 2.0 |
| Status | Active Development |
| Project | Team Rostering & Queue Management System |
| Architecture Style | Clean Architecture |
| Backend Framework | FastAPI |
| Frontend Framework | Next.js |
| Database | PostgreSQL 16 |
| Last Updated | July 2026 |

---

# 1. Purpose of this Document

This document defines the complete software architecture of the Team Rostering & Queue Management System.

Its purpose is to provide a single authoritative reference describing how the application is structured, why architectural decisions were made, and how future development should be carried out.

This document is intended for:

- Software Engineers
- Backend Developers
- Frontend Developers
- Database Engineers
- Technical Leads
- Future Contributors

It should remain synchronized with the implementation throughout the life of the project.

Whenever a significant architectural change occurs, this document must be regenerated to reflect the new design.

---

# 2. Project Vision

## 2.1 Background

The operations team currently manages employee rosters using Microsoft Excel.

Although Excel provides flexibility, it introduces several operational problems:

- Manual shift assignment
- Human error
- No validation of business rules
- Difficult leave adjustments
- No historical tracking
- No audit trail
- Time-consuming monthly planning
- Difficult reporting

As the workforce grows, maintaining monthly rosters becomes increasingly complex.

The objective of this project is to replace the Excel workflow with a centralized web application capable of automatically generating, managing, and adjusting employee rosters while enforcing business rules consistently.

---

## 2.2 Primary Objectives

The application has been designed with the following objectives.

### Reliability

Business rules should always be enforced consistently.

Examples include:

- Minimum staffing requirements
- Shift eligibility
- Employee availability
- Leave validation
- Queue assignment constraints

The application should eliminate accidental violations that are common with manual spreadsheets.

---

### Maintainability

The project is expected to evolve over time.

New modules will include:

- Authentication
- Reporting
- Queue optimization
- Automatic roster generation
- Notifications
- Analytics

The architecture must therefore remain easy to understand and extend.

Maintainability has been prioritized over short-term implementation speed.

---

### Scalability

Although the initial deployment targets a single operations team, the architecture should support future growth without requiring significant redesign.

Examples include:

- Additional departments
- Multiple business units
- Increased employee counts
- Additional shift patterns
- New leave policies
- Future optimization algorithms

Scalability considerations have influenced the selection of technologies and architectural patterns.

---

### Separation of Concerns

Each layer of the application has a clearly defined responsibility.

No layer should assume responsibilities belonging to another.

This principle improves:

- Readability
- Testability
- Reusability
- Maintainability

Throughout the project, strict architectural boundaries are enforced.

---

### Production Readiness

Although this project is currently under development, architectural decisions are made with production deployment in mind.

Examples include:

- Layered architecture
- DTO separation
- Dependency Injection
- Configuration management
- Environment isolation
- Database migrations
- Exception handling
- Centralized API communication

The objective is to produce software that could realistically be maintained by a professional engineering team.

---

# 3. Business Context

The application supports workforce management for an operations environment.

Managers are responsible for:

- Managing employees
- Creating monthly rosters
- Assigning operational queues
- Recording employee leave
- Regenerating daily schedules
- Monitoring staffing coverage

Employees themselves do not interact directly with the application.

This significantly simplifies the initial system design while keeping future authentication support possible.

---

## 3.1 Intended Users

Current users:

- Operations Managers

Future users may include:

- Team Leads
- Workforce Planning Team
- Administrators
- HR Personnel

The architecture has been designed so that authentication and authorization can be added without requiring significant restructuring.

---

## 3.2 Functional Modules

The system is organized into independent business modules.

Each module represents a distinct business capability.

Current and planned modules include:

### Employee Management

Responsibilities:

- Create employees
- View employees
- Archive employees
- Maintain employee information
- Track employee status

Current Status:

✅ Backend Complete

✅ Frontend UI Complete

🔄 Frontend API Integration Pending

---

### Queue Assignment

Responsibilities:

- Maintain operational queues
- Assign employees to queues
- Balance staffing
- Ensure queue coverage

Current Status:

UI Prototype Complete

Backend Pending

---

### Leave Management

Responsibilities:

- Planned leave
- Emergency leave
- Leave validation
- Roster adjustments

Current Status:

UI Prototype Complete

Backend Pending

---

### Monthly Roster

Responsibilities:

- Generate monthly rosters
- Allocate shifts
- Balance workforce
- Enforce staffing rules

Current Status:

Planned

---

### Daily Regeneration

Responsibilities:

- Regenerate individual days
- Preserve remaining monthly schedule
- Adjust staffing after leave
- Rebalance assignments

Current Status:

Planned

---

### Reporting

Responsibilities:

- Staffing reports
- Leave reports
- Coverage reports
- Queue utilization
- Operational analytics

Current Status:

Planned

---

### Authentication

Responsibilities:

- User login
- Authorization
- Role management
- Session handling

Current Status:

Future Enhancement

Authentication has intentionally been deferred until core business functionality has stabilized.

---

# 4. Core Business Rules

The architecture has been designed around several fundamental business rules.

These rules are enforced within the Service Layer.

---

## Employees Are Never Deleted

Historical workforce data must always remain available.

Instead of deletion:

```
is_archived = TRUE
```

is used to remove employees from active operations.

This preserves:

- Historical rosters
- Audit information
- Reporting accuracy
- Referential integrity

---

## Active Employee Listing

Standard employee listings return only employees where:

```
is_archived = FALSE
```

Archived records are intentionally excluded from normal operational workflows.

Future API endpoints will expose archived employees separately.

---

## Shift Types

Current shift structure:

Morning Shift

Afternoon Shift

Future versions may introduce additional shift types without requiring architectural changes.

---

## Employee Roles

Current employee roles:

- L1 Analyst
- L2 Analyst

Business logic for role-specific behavior belongs exclusively within the Service Layer.

Repositories remain unaware of business semantics.

---

## Leave Types

Current leave categories:

- Planned Leave
- Emergency Leave

Additional leave categories can be introduced without affecting architectural boundaries.

---

# 5. High-Level System Architecture

The Team Rostering & Queue Management System is implemented as a modern three-tier web application.

The architecture separates presentation, business logic, and persistence into independent layers to maximize maintainability and scalability.

```
                     ┌──────────────────────────────┐
                     │        Web Browser           │
                     └──────────────┬───────────────┘
                                    │
                                    │ HTTPS / REST
                                    ▼
                     ┌──────────────────────────────┐
                     │       Next.js Frontend       │
                     │                              │
                     │  React 19 + TypeScript       │
                     └──────────────┬───────────────┘
                                    │
                                    │ HTTP Client
                                    ▼
                     ┌──────────────────────────────┐
                     │       FastAPI Backend        │
                     └──────────────┬───────────────┘
                                    │
                                    ▼
                     ┌──────────────────────────────┐
                     │      Service Layer           │
                     └──────────────┬───────────────┘
                                    │
                                    ▼
                     ┌──────────────────────────────┐
                     │    Repository Layer          │
                     └──────────────┬───────────────┘
                                    │
                                    ▼
                     ┌──────────────────────────────┐
                     │      PostgreSQL Database     │
                     └──────────────────────────────┘
```

Each layer communicates only with the layer directly below it.

Skipping layers is not permitted.

For example:

- React components never communicate directly with FastAPI.
- Services never communicate directly with PostgreSQL.
- Routers never execute SQL.

This strict layering greatly improves maintainability and testability.

---

# 6. Technology Stack

The technology stack has been selected to balance developer productivity, long-term maintainability, and production readiness.

---

## 6.1 Backend

### Python 3.12

Python was selected because of its mature ecosystem for backend development, strong typing support, excellent tooling, and readability.

Advantages include:

- Fast development
- Extensive package ecosystem
- Excellent community support
- Strong asynchronous capabilities
- High maintainability

---

### FastAPI

FastAPI serves as the HTTP API framework.

Reasons for selection:

- Automatic OpenAPI documentation
- Native Pydantic integration
- High performance
- Built-in dependency injection
- Excellent async support
- Type-safe request validation

FastAPI enables rapid API development while maintaining production-quality standards.

---

### SQLAlchemy 2

SQLAlchemy provides ORM functionality and database abstraction.

Reasons for selection:

- Modern typed ORM
- Excellent PostgreSQL support
- Explicit query construction
- Strong migration ecosystem
- Enterprise adoption

SQLAlchemy 2's declarative style aligns well with Clean Architecture principles.

---

### Alembic

Alembic manages database schema evolution.

Responsibilities include:

- Version-controlled migrations
- Database upgrades
- Database downgrades
- Schema history

Database changes must always be introduced through migrations.

Manual schema modifications are discouraged.

---

### PostgreSQL 16

PostgreSQL was selected as the primary relational database.

Reasons include:

- Reliability
- ACID compliance
- Excellent indexing
- Advanced SQL capabilities
- Strong community support
- Production maturity

The database is containerized using Docker to ensure consistency across development environments.

---

### Docker

Docker provides an isolated development environment.

Benefits include:

- Reproducible environments
- Simplified onboarding
- Dependency isolation
- Consistent database versions

Containerization also simplifies future deployment.

---

### Pydantic v2

Pydantic is used for:

- Request validation
- Response serialization
- Data transfer objects
- Type enforcement

Using Pydantic ensures that invalid data is rejected before business logic is executed.

---

# 6.2 Frontend

### Next.js 16

Next.js provides the React framework for the frontend.

Reasons for selection:

- Excellent developer experience
- File-based routing
- Modern React support
- Production optimization
- TypeScript integration

The application currently uses the App Router architecture.

---

### React 19

React provides the component-based UI architecture.

Reasons include:

- Reusable components
- Predictable rendering
- Strong ecosystem
- Enterprise adoption

React's compositional model aligns well with modular application design.

---

### TypeScript

TypeScript was selected to improve code quality.

Benefits include:

- Static typing
- Better IDE support
- Safer refactoring
- Compile-time error detection

TypeScript significantly reduces runtime errors in large applications.

---

### Tailwind CSS

Tailwind provides utility-first styling.

Reasons include:

- Consistent design system
- Reduced custom CSS
- Faster UI development
- Responsive design support

Styling remains centralized and predictable.

---

### shadcn/ui (Base UI)

The project uses the Base UI implementation of shadcn.

Reasons include:

- Accessible components
- Customizable styling
- Modern architecture
- Excellent TypeScript support

Future components should follow the same library to maintain consistency.

---

# 7. Backend Architecture

The backend follows a layered architecture inspired by Clean Architecture principles.

```
HTTP Request
      │
      ▼
Router
      │
      ▼
Service
      │
      ▼
Repository
      │
      ▼
Database
```

Each layer has clearly defined responsibilities.

No layer may bypass another.

---

## 7.1 Router Layer

Routers represent the application's HTTP interface.

Responsibilities:

- Define endpoints
- Validate requests
- Perform dependency injection
- Return responses

Routers never:

- Execute SQL
- Implement business rules
- Commit transactions

Keeping routers thin improves readability and maintainability.

---

## 7.2 Service Layer

The Service Layer contains all business logic.

Responsibilities include:

- Business rule enforcement
- Validation
- Transaction coordination
- Repository orchestration
- Exception handling

Examples:

- Employee creation validation
- Duplicate employee detection
- Leave validation
- Future roster generation

All business decisions belong here.

---

## 7.3 Repository Layer

Repositories encapsulate database access.

Responsibilities include:

- CRUD operations
- Query construction
- Entity retrieval
- Persistence

Repositories intentionally avoid:

- Business logic
- Validation
- Transaction commits

This separation allows repositories to remain reusable and easy to test.

---

## 7.4 Database Layer

The database layer is responsible only for persistence.

It has no knowledge of:

- HTTP
- Business logic
- User interface

The database should be considered an implementation detail of the repository layer.

---

# 8. Dependency Injection

FastAPI's dependency injection system is used throughout the backend.

Current dependencies include:

- Database sessions
- Repository instances
- Service instances

Dependency injection provides several advantages:

- Loose coupling
- Improved testability
- Centralized object creation
- Easier mocking during testing

Future services should continue to use dependency injection rather than manual object creation.

---

# 9. Request Lifecycle

The following illustrates how a typical request flows through the backend.

```
HTTP Request
      │
      ▼
FastAPI Router
      │
      ▼
Service Layer
      │
      ▼
Repository Layer
      │
      ▼
PostgreSQL
      │
      ▼
Repository
      │
      ▼
Service
      │
      ▼
Router
      │
      ▼
HTTP Response
```

Every request should follow this lifecycle.

Introducing shortcuts between layers would violate the architectural principles of the project.

---

# 10. Frontend Architecture

The frontend has been designed to mirror the backend architecture wherever practical.

Rather than allowing pages or components to communicate directly with the backend, all communication is routed through dedicated services.

The resulting architecture is predictable, testable, and easy to maintain.

```
React Page
      │
      ▼
Reusable Components
      │
      ▼
Frontend Service
      │
      ▼
Mapper
      │
      ▼
ApiClient
      │
      ▼
FastAPI
```

Every layer has a single responsibility.

---

# 10.1 Frontend Layer Responsibilities

## Pages

Pages are responsible for orchestrating the user interface.

Responsibilities include:

- Requesting data from services
- Maintaining page-level state
- Handling loading and error states
- Passing data to components

Pages should remain small and readable.

Pages never:

- Call fetch()
- Perform HTTP requests
- Know API endpoints
- Transform DTOs
- Contain business logic

Example:

Employee Page

Responsibilities:

- Load employees
- Display loading spinner
- Display error message
- Render EmployeeTable

Nothing more.

---

## Components

Components are purely presentational.

Responsibilities include:

- Rendering UI
- Displaying data
- Capturing user interaction

Components never:

- Fetch data
- Perform business logic
- Know where data originates
- Know API URLs

Example:

EmployeeTable

Responsibilities:

- Display employees
- Render table rows
- Raise edit/delete events

The table should not know whether data came from FastAPI, mock data, or another source.

---

## Services

Frontend services act as the business layer of the frontend.

Responsibilities:

- Communicate with ApiClient
- Retrieve API responses
- Map DTOs
- Return frontend models
- Hide transport details

Future modules such as QueueService, LeaveService, and RosterService will follow the same pattern.

---

## ApiClient

The ApiClient owns all HTTP communication.

Responsibilities:

- GET requests
- POST requests
- PUT requests
- DELETE requests
- Request configuration
- Base URL management
- Shared headers
- Error normalization

The ApiClient provides a single entry point for backend communication.

No other class should execute HTTP requests directly.

---

# 11. Frontend Data Flow

The following diagram illustrates the complete frontend request lifecycle.

```
Employee Page
       │
       ▼
EmployeeService
       │
       ▼
ApiClient
       │
       ▼
FastAPI
       │
       ▼
ApiClient
       │
       ▼
EmployeeService
       │
       ▼
Mapper
       │
       ▼
Employee Domain Model
       │
       ▼
React Components
```

This separation ensures that every layer remains focused on its own responsibility.

---

# 12. DTO Strategy

One of the most important architectural principles in this project is the separation between API contracts and frontend domain models.

React components must never consume API DTOs directly.

Instead, the following flow is used.

```
Backend Entity
        │
        ▼
Response DTO
        │
        ▼
HTTP
        │
        ▼
Frontend DTO
        │
        ▼
Mapper
        │
        ▼
Frontend Domain Model
        │
        ▼
React Components
```

This extra mapping layer introduces a small amount of code but provides significant long-term benefits.

---

## Why DTO Mapping Exists

APIs evolve over time.

For example, the backend may rename:

```
employee_code
```

to

```
employee_id
```

or

```
employeeCode
```

Without DTO mapping, every React component would require modification.

With DTO mapping, only the mapper changes.

The remainder of the frontend continues to function without modification.

---

## Benefits

DTO mapping provides:

- Loose coupling
- Easier backend evolution
- Better maintainability
- Clear separation of concerns
- Simpler testing
- Stable frontend models

Although it introduces additional code, the architectural advantages significantly outweigh the small implementation cost.

---

# 13. Mapper Pattern

Each business module owns its own mapper.

Example:

```
EmployeeDto
        │
        ▼
mapEmployee()
        │
        ▼
Employee
```

Responsibilities of a mapper include:

- Property renaming
- Type conversion
- Enum conversion
- Default values
- Data normalization

Mappers should never:

- Perform HTTP requests
- Execute business logic
- Modify application state

They exist solely to transform data between representations.

---

# 14. API Communication Strategy

The project centralizes API communication.

Current structure:

```
lib/

api.ts

config.ts

endpoints.ts
```

Each file has a single responsibility.

---

## config.ts

Responsibilities:

- Base API URL
- Environment variables
- Runtime configuration

No application code should hardcode URLs.

---

## endpoints.ts

Responsibilities:

- API endpoint definitions

Example:

Employees

Queues

Leaves

Rosters

Using centralized endpoint definitions prevents duplicated strings throughout the application.

---

## api.ts

Responsibilities:

- Execute HTTP requests
- Serialize requests
- Deserialize responses
- Standardize error handling

Future enhancements may include:

- Authentication headers
- Request interceptors
- Refresh tokens
- Retry policies
- Request logging

Because all HTTP traffic passes through ApiClient, these features can be implemented in one location.

---

# 15. Folder Organization

The frontend follows a feature-oriented organization while preserving architectural layers.

```
src/

app/
    dashboard/
    employees/
    queues/
    leave/
    weekly-roster/

components/
    layout/
    employees/
    ui/

services/

types/

lib/
```

This organization keeps feature pages small while encouraging component reuse.

---

# 16. Naming Conventions

Consistency improves readability.

Frontend uses camelCase.

Examples:

```
employeeCode

fullName

isArchived

employeeService

queueService

leaveService
```

Backend uses snake_case.

Examples:

```
employee_code

full_name

is_archived

created_at
```

DTO mapping is responsible for translating between these naming conventions.

---

# 17. Current Frontend Status

Completed:

- Dashboard
- Employee Page
- Queue Page
- Leave Page
- Weekly Roster
- Shared Layout
- Sidebar
- Header
- Employee Components
- ApiClient Infrastructure
- Configuration Layer
- Endpoint Layer

Current Limitation:

EmployeeService still returns mock employee data.

This limitation is intentional and will be removed during Milestone 5.

No React component currently depends directly on FastAPI.

This ensures that introducing live API integration will require minimal UI changes.

---

# 18. Database Architecture

## 18.1 Overview

PostgreSQL 16 is the system of record for all application data.

The database stores the operational state of the application including:

- Employees
- Queues
- Leave Requests
- Monthly Rosters
- Daily Regenerations
- Reports (future)
- Audit Information (future)

The database is accessed exclusively through the Repository Layer.

No other application layer communicates directly with PostgreSQL.

---

## 18.2 Database Design Principles

The database has been designed around the following principles.

### Data Integrity

Data consistency is prioritized over convenience.

The application enforces:

- Primary keys
- Foreign keys
- Constraints
- Transaction consistency

---

### Normalization

The schema follows relational database normalization principles.

Data duplication is minimized whenever practical.

Future reporting requirements may introduce denormalized reporting tables, but operational tables remain normalized.

---

### Auditability

Historical operational data is considered valuable.

Whenever possible:

- records are archived
- not deleted

This ensures:

- historical reporting
- future analytics
- troubleshooting
- audit support

---

## 18.3 Entity Design

Each business module owns its own entity.

Examples:

```
Employee

Queue

Leave

Roster

Shift

QueueAssignment
```

Entities represent persistent database objects.

Business logic is intentionally excluded from entity definitions.

Entities should remain focused on data representation.

---

## 18.4 Base Entity

All persistent entities inherit from a shared base model.

Current shared fields include:

```
created_at

updated_at
```

Future shared fields may include:

```
created_by

updated_by

version

deleted_at
```

Centralizing common fields promotes consistency and reduces duplication.

---

# 19. Repository Pattern

Repositories provide an abstraction over database access.

```
Service
      │
      ▼
Repository
      │
      ▼
SQLAlchemy
      │
      ▼
PostgreSQL
```

Repositories exist to isolate persistence concerns from business logic.

---

## 19.1 Responsibilities

Repositories are responsible for:

- Creating entities
- Reading entities
- Updating entities
- Query construction
- Filtering
- Sorting

Repositories should contain no business decisions.

---

## 19.2 Responsibilities Explicitly Excluded

Repositories must never:

- Commit transactions
- Validate business rules
- Perform authorization
- Raise business exceptions
- Execute application workflows

Keeping repositories simple makes them highly reusable.

---

## 19.3 Current Employee Repository

Current functionality includes:

```
get_by_employee_code()

get_all()

add()
```

Default behaviour:

- Exclude archived employees
- Sort by employee_code

This behaviour supports the operational needs of Employee Management.

---

# 20. Service Layer

The Service Layer is the heart of the application.

It contains all business rules.

```
Router
      │
      ▼
Service
      │
      ▼
Repository
```

---

## 20.1 Responsibilities

Services are responsible for:

- Business validation
- Workflow orchestration
- Calling repositories
- Coordinating transactions
- Raising business exceptions
- Enforcing company policies

Future scheduling algorithms will also belong here.

---

## 20.2 Current Employee Service

Current operations include:

```
get_employee_by_code()

get_all_employees()

create_employee()
```

These methods enforce business rules while delegating persistence to the repository layer.

---

## 20.3 Future Services

Future modules will introduce additional services.

Examples:

```
QueueService

LeaveService

RosterService

ReportingService

AuthenticationService
```

Each service remains independent and focuses on a single business domain.

---

# 21. Transaction Management

Transactions belong to the Service Layer.

Repositories should never commit changes.

Example workflow:

```
Service

↓

Repository A

↓

Repository B

↓

Repository C

↓

Commit
```

This allows a single business operation to coordinate multiple repositories safely.

It also simplifies rollback behaviour when failures occur.

---

# 22. Validation Strategy

Validation occurs at multiple layers.

---

## Router Validation

FastAPI validates:

- Request body
- Query parameters
- Path parameters

Invalid requests are rejected before entering the business layer.

---

## Service Validation

Business validation occurs inside services.

Examples include:

- Duplicate employee codes
- Business rule enforcement
- Leave constraints
- Shift eligibility
- Staffing limits

This separation prevents HTTP concerns from leaking into business logic.

---

## Database Validation

The database provides the final layer of protection.

Examples include:

- Primary keys
- Unique constraints
- Foreign keys
- Non-null constraints

Application validation complements—not replaces—database constraints.

---

# 23. Exception Handling Strategy

Errors are treated as part of the application architecture rather than incidental events.

Business failures should produce meaningful exceptions that can be handled consistently.

---

## 23.1 Exception Flow

```
Database Error
        │
        ▼
Repository
        │
        ▼
Service
        │
Business Exception
        │
        ▼
Router
        │
        ▼
HTTP Response
```

This separation prevents infrastructure concerns from leaking into the presentation layer.

---

## 23.2 Business Exceptions

Business exceptions describe domain-specific problems.

Examples:

```
EmployeeNotFoundError

DuplicateEmployeeCodeError
```

Future modules will introduce additional domain-specific exceptions rather than relying on generic runtime errors.

---

## 23.3 HTTP Responses

Routers translate exceptions into appropriate HTTP responses.

Examples:

| Situation | HTTP Status |
|-----------|------------:|
| Employee not found | 404 |
| Duplicate employee | 409 |
| Validation error | 422 |
| Unexpected server error | 500 |

Maintaining consistent response semantics improves API usability.

---

# 24. Coding Standards

The project follows a consistent set of engineering standards.

---

## Backend

Uses:

```
snake_case
```

Examples:

```
employee_code

created_at

is_archived
```

---

## Frontend

Uses:

```
camelCase
```

Examples:

```
employeeCode

fullName

createdAt
```

---

## Naming

Classes:

```
EmployeeService

EmployeeRepository

EmployeeMapper
```

Functions:

```
create_employee()

get_all_employees()

mapEmployee()
```

Variables should use descriptive names rather than abbreviations.

Readability is preferred over brevity.

---

## General Principles

The project follows:

- Clean Architecture
- Single Responsibility Principle
- Explicit dependencies
- Centralized configuration
- Reusable components
- Production-quality code
- Maintainability over cleverness

These principles guide every implementation decision throughout the project.

---

# 25. API Architecture

## 25.1 API Design Philosophy

The backend exposes a RESTful API that serves as the contract between the frontend and backend.

The API is intentionally kept independent of frontend implementation details.

This separation allows:

- Multiple frontend clients
- Mobile applications
- Future external integrations
- Independent frontend and backend deployment

The API represents a stable contract rather than an implementation detail.

---

## 25.2 Current API Modules

The current API consists of the following modules.

### System

```
GET /
```

Health check endpoint used to verify backend availability.

---

### Employees

Current endpoints:

```
GET /employees

GET /employees/{employee_code}

POST /employees
```

Future endpoints:

```
PUT /employees/{employee_code}

PATCH /employees/{employee_code}

POST /employees/archive/{employee_code}

GET /employees/archived

POST /employees/restore/{employee_code}
```

The API has been designed so that additional endpoints can be introduced without breaking existing clients.

---

## 25.3 API Versioning

The initial release does not expose explicit API versions.

Future production deployments may introduce:

```
/api/v1/

/api/v2/
```

Keeping DTOs isolated from frontend models ensures API versioning can be introduced with minimal frontend changes.

---

# 26. Project Structure

The project is divided into two independent applications.

```
Roster_App/

backend/

frontend/

docs/
```

This separation enables independent development, testing, and deployment.

---

## 26.1 Backend Structure

```
backend/

app/

    api/

        routers/

    core/

    db/

    models/

    repositories/

    schemas/

    services/

    exceptions/

alembic/

tests/
```

### Responsibilities

api/

HTTP interface.

services/

Business logic.

repositories/

Database access.

models/

SQLAlchemy entities.

schemas/

Pydantic DTOs.

exceptions/

Domain-specific exceptions.

core/

Configuration and shared infrastructure.

db/

Database session and initialization.

This organization aligns directly with the Clean Architecture principles adopted by the project.

---

## 26.2 Frontend Structure

```
frontend/

src/

    app/

    components/

        layout/

        employees/

        ui/

    services/

    types/

    lib/
```

### Responsibilities

app/

Application routes.

components/

Reusable presentation components.

services/

Business-facing frontend services.

types/

Frontend domain models.

lib/

Shared infrastructure including:

- ApiClient
- Configuration
- Endpoint definitions

---

## 26.3 Documentation Structure

The project documentation is maintained under:

```
docs/
```

Current documentation includes:

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

Each document has a single responsibility and should remain synchronized with the implementation.

---

# 27. Configuration Management

Configuration is centralized to prevent duplicated values and simplify deployment.

---

## Backend Configuration

Configuration is managed using environment variables.

Examples include:

- Database URL
- Application settings
- Environment selection

Secrets must never be hardcoded into the codebase.

---

## Frontend Configuration

The frontend centralizes configuration within:

```
config.ts
```

API endpoints are defined in:

```
endpoints.ts
```

HTTP communication is centralized within:

```
api.ts
```

No page, component, or service should hardcode URLs or endpoint paths.

---

# 28. Development Workflow

Development follows a predictable workflow to ensure architectural consistency.

---

## Step 1

Understand the business requirement.

Before implementation, determine:

- Why the feature is needed.
- Which architectural layer owns the responsibility.
- Whether the feature affects existing modules.

---

## Step 2

Design the solution.

Architectural reasoning is documented before implementation.

Trade-offs are considered where multiple solutions exist.

---

## Step 3

Implement one complete file at a time.

Partial implementations are avoided unless explicitly required.

This simplifies review and verification.

---

## Step 4

Verify the implementation.

Backend verification:

```
python -m compileall app
```

Frontend verification:

```
npx tsc --noEmit
```

Development proceeds only after successful verification.

---

## Step 5

Update documentation.

When a milestone is completed:

- Architecture documentation
- Development log
- Decision log
- Handover

must all be updated.

Documentation is considered part of the deliverable rather than an optional task.

---

# 29. Quality Standards

Every completed feature must satisfy the following checklist.

## Code Quality

✓ Follows project architecture

✓ Uses consistent naming conventions

✓ Avoids duplicated logic

✓ Maintains separation of concerns

---

## Backend Quality

✓ Repository contains CRUD only

✓ Service owns business logic

✓ Router remains thin

✓ Exceptions handled consistently

---

## Frontend Quality

✓ Pages orchestrate only

✓ Components remain presentational

✓ Services own API communication

✓ DTO mapping performed correctly

✓ No direct fetch() calls

---

## Verification

✓ Backend compilation successful

✓ Frontend TypeScript compilation successful

✓ Swagger verified

✓ React UI verified

---

## Documentation

✓ Documentation updated

✓ Development log updated

✓ Decision log updated

✓ Handover updated

A feature is not considered complete until all of the above conditions are satisfied.

---

# 30. Current System Status

The project is currently in active development.

Completed areas include:

- Backend infrastructure
- Docker environment
- PostgreSQL integration
- Alembic migrations
- Employee Management backend
- Shared frontend infrastructure
- Dashboard
- Employee Management UI
- Queue UI
- Leave UI
- Weekly Roster UI
- Centralized API layer
- Centralized configuration
- Navigation system

The codebase is stable and has passed compilation verification for both backend and frontend.

The next milestone will replace mock employee data with live data from the FastAPI backend while preserving the established architectural boundaries.

---

# 31. Non-Functional Requirements

In addition to functional requirements, the application has been designed to satisfy several non-functional quality attributes.

---

## 31.1 Maintainability

Maintainability has been prioritized throughout the architecture.

The system achieves maintainability through:

- Layered architecture
- Single Responsibility Principle
- Clear module boundaries
- DTO separation
- Centralized configuration
- Reusable components
- Consistent naming conventions

Every new feature should integrate into the existing architecture rather than introducing new patterns.

---

## 31.2 Scalability

Although the initial deployment targets a single operations team, the architecture supports future growth.

Examples include:

- Multiple departments
- Additional office locations
- Multiple roster templates
- Additional shift types
- More employee roles
- Higher employee counts
- Increased reporting requirements

Scalability has been considered during the selection of technologies and architectural patterns.

---

## 31.3 Performance

The current application is expected to operate with a moderate dataset.

Expected characteristics include:

- Fast page loading
- Efficient database queries
- Indexed lookups
- Lightweight REST communication

Future optimization opportunities include:

- Pagination
- Query optimization
- Response caching
- Lazy loading
- Background processing
- Asynchronous job execution

Performance optimization should be driven by measured bottlenecks rather than premature optimization.

---

## 31.4 Reliability

Operational reliability is essential because incorrect rosters directly affect business operations.

Reliability is supported through:

- Database constraints
- Service-layer validation
- Consistent exception handling
- Transaction management
- Controlled business workflows

Critical business rules should always be enforced by the backend, regardless of frontend validation.

---

## 31.5 Security

Authentication and authorization are planned for a future milestone.

Current architecture has been designed so that security features can be introduced without restructuring existing modules.

Future enhancements include:

- User authentication
- Role-based authorization
- JWT authentication
- Password hashing
- Session management
- Audit logging
- API authorization policies

Security concerns will remain centralized rather than distributed across business modules.

---

# 32. Future Architecture Evolution

The project roadmap has been designed so that each milestone builds upon the previous one without requiring architectural redesign.

---

## Phase 1

Infrastructure

Status:

✅ Complete

Includes:

- Docker
- PostgreSQL
- FastAPI
- SQLAlchemy
- Alembic
- Dependency Injection
- Project structure

---

## Phase 2

Employee Management

Status:

✅ Complete

Includes:

- Employee entity
- Repository
- Service
- Router
- CRUD operations
- Swagger verification

---

## Phase 3

Frontend Foundation

Status:

✅ Complete

Includes:

- Next.js
- Tailwind CSS
- shadcn/ui (Base UI)
- Shared layout
- Navigation
- Dashboard
- Feature pages

---

## Phase 4

Frontend Architecture

Status:

✅ Complete

Includes:

- ApiClient
- Configuration layer
- Endpoint management
- Employee components
- Service layer
- Mock data integration

---

## Phase 5

Frontend ↔ Backend Integration

Status:

🔄 Current Milestone

Objectives:

- Introduce EmployeeDto
- Implement mapper layer
- Connect EmployeeService to FastAPI
- Remove mock data
- Introduce loading states
- Introduce error handling

---

## Phase 6

Queue Management

Planned

Includes:

- Queue CRUD
- Queue assignment
- Queue balancing
- Queue management interface

---

## Phase 7

Leave Management

Planned

Includes:

- Planned leave
- Emergency leave
- Leave approval workflow
- Roster impact calculation

---

## Phase 8

Roster Engine

Planned

Includes:

- Monthly roster generation
- Business rule enforcement
- Shift allocation
- Daily regeneration
- Staffing optimization

---

## Phase 9

Reporting

Planned

Includes:

- Operational dashboards
- Leave reports
- Staffing reports
- Queue analytics

---

## Phase 10

Authentication & Authorization

Planned

Includes:

- User accounts
- Role management
- Secure API access
- Audit trails

---

# 33. Architectural Principles Summary

The following principles govern every implementation within the project.

## Separation of Concerns

Each layer owns exactly one responsibility.

---

## Clean Architecture

Dependencies always point inward.

Higher layers depend on lower layers.

Lower layers remain independent of presentation concerns.

---

## Maintainability

Readable code is preferred over clever code.

Future developers should be able to understand the application quickly.

---

## Reusability

Components, services, repositories, and utilities should be designed for reuse whenever practical.

---

## Explicitness

The project favors explicit code over hidden behaviour or unnecessary abstraction.

---

## Consistency

All modules should follow the same architectural patterns.

Introducing new patterns requires strong architectural justification.

---

## Enterprise Readiness

Every implementation should be written as though it will eventually be deployed to production and maintained by a professional software engineering team.

---

# 34. Definition of Done

A feature is considered complete only when all of the following conditions are satisfied.

## Implementation

- Feature fully implemented
- Architecture followed
- Naming conventions respected

---

## Backend

- Business logic implemented
- Repository completed
- Service completed
- Router completed

Verification:

```
python -m compileall app
```

Successful.

---

## Frontend

- UI implemented
- Services updated
- DTO mapping completed
- Components verified

Verification:

```
npx tsc --noEmit
```

Successful.

---

## Functional Verification

- Swagger tested
- React UI verified
- Business rules validated

---

## Documentation

The following documents are updated:

- 02_System_Architecture.md
- 06_Development_Log.md
- 07_Decision_Log.md
- 08_Handover.md

Documentation is considered part of the implementation.

---

# 35. Architecture Governance

Architectural consistency is maintained through continuous review.

Before implementing any feature:

1. Understand the business requirement.
2. Determine the appropriate architectural layer.
3. Explain the design rationale.
4. Implement one complete file at a time.
5. Verify compilation.
6. Update documentation when appropriate.

Any deviation from established architectural patterns should be documented within the Decision Log.

---

# 36. Conclusion

The Team Rostering & Queue Management System has been designed as a modular, scalable, and maintainable enterprise application.

The architecture emphasizes:

- Clear separation of responsibilities
- Consistent engineering standards
- Centralized configuration
- Clean data flow
- Strong typing
- Production-ready practices

These principles provide a stable foundation for future development while ensuring that new features can be introduced without compromising the maintainability or scalability of the system.

This document serves as the authoritative architectural reference for the project and should remain synchronized with the implementation throughout the application's lifecycle.

---
**End of Document**