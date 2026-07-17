# Team Rostering & Queue Management System

# Architecture Decision Log (ADR)

---

| Document | Architecture Decision Log |
|----------|---------------------------|
| Version | 2.0 |
| Status | Active Development |
| Project | Team Rostering & Queue Management System |
| Last Updated | July 2026 |

---

# 1. Purpose

This document records the significant architectural decisions made during the development of the Team Rostering & Queue Management System.

Unlike the Development Log, which records what was implemented and when, this document records why major engineering decisions were made.

Every decision follows the Architecture Decision Record (ADR) format.

Each ADR contains:

- Context
- Decision
- Alternatives Considered
- Consequences
- Future Impact

Documenting these decisions prevents repeated architectural debates and provides future developers with the reasoning behind the current implementation.

---

# 2. ADR-001

## Adopt Clean Architecture

Status

✅ Accepted

Date

July 2026

---

### Context

The application is expected to grow beyond simple CRUD operations.

Future functionality will include:

- Queue assignment
- Leave management
- Monthly roster generation
- Daily regeneration
- Reporting
- Authentication

Without a structured architecture, business logic would gradually spread across routers, repositories, and frontend pages, making the system increasingly difficult to maintain.

---

### Decision

Adopt a layered architecture.

Backend:

```
Router

↓

Service

↓

Repository

↓

Database
```

Frontend:

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

Every layer owns exactly one responsibility.

---

### Alternatives Considered

Traditional MVC

Rejected because controllers often accumulate business logic as applications grow.

---

Fat Routers

Rejected because business logic becomes tightly coupled to HTTP concerns.

---

Direct Database Access

Rejected because it prevents proper separation of concerns and complicates testing.

---

### Consequences

Positive

- Clear responsibilities
- Easier maintenance
- Better testing
- Predictable development
- Improved scalability

Negative

- Additional files
- Slightly more boilerplate
- More initial planning

---

### Future Impact

Every future module must follow the same architecture.

Architectural consistency is considered more valuable than minimizing the number of files.

---

# 3. ADR-002

## Select FastAPI as the Backend Framework

Status

✅ Accepted

Date

July 2026

---

### Context

A backend framework was required that supported:

- Modern Python
- Automatic validation
- OpenAPI documentation
- Dependency Injection
- High performance

The application also required a framework suitable for long-term enterprise development.

---

### Decision

FastAPI was selected.

---

### Alternatives Considered

Flask

Advantages:

- Lightweight
- Large ecosystem

Rejected because additional libraries would be required to achieve the desired architecture.

---

Django

Advantages:

- Batteries included
- Mature ecosystem

Rejected because the project did not require a monolithic framework with an integrated ORM and templating engine.

---

### Consequences

Positive

- Automatic Swagger documentation
- Strong typing
- Excellent dependency injection
- Modern asynchronous support
- Excellent developer experience

Negative

- Smaller ecosystem than Django
- Requires understanding of dependency injection

---

### Future Impact

FastAPI provides a scalable foundation for future authentication, reporting, and optimization modules.

---

# 4. ADR-003

## Select SQLAlchemy 2 as the ORM

Status

✅ Accepted

Date

July 2026

---

### Context

The project required a mature ORM capable of supporting PostgreSQL while remaining compatible with Clean Architecture.

---

### Decision

Adopt SQLAlchemy 2.

---

### Alternatives Considered

Raw SQL

Rejected because it would increase duplication and reduce maintainability.

---

Django ORM

Rejected because the project does not use Django.

---

### Consequences

Positive

- Mature ORM
- Excellent PostgreSQL support
- Explicit query construction
- Strong typing
- Enterprise adoption

Negative

- Slight learning curve
- More verbose than lightweight ORMs

---

### Future Impact

All future persistence layers will use SQLAlchemy.

Repository implementations should remain ORM-specific while business logic remains ORM-independent.

---

# 5. ADR-004

## Containerize Development Using Docker

Status

✅ Accepted

Date

July 2026

---

### Context

The project should run consistently across different developer machines.

Database installation should not become a prerequisite for contributing.

---

### Decision

Use Docker Compose for local development.

Current containers include:

- PostgreSQL
- FastAPI backend

---

### Alternatives Considered

Native installation

Rejected because local environments often diverge over time.

---

Virtual Machines

Rejected because they introduce unnecessary overhead for local development.

---

### Consequences

Positive

- Consistent environments
- Easy onboarding
- Simplified deployment
- Environment isolation

Negative

- Initial Docker learning curve
- Slight resource overhead

---

### Future Impact

Docker provides a foundation for future deployment pipelines and production environments.

---

---

# 6. ADR-005

## Use Employee Code as the Primary Key

Status

✅ Accepted

Date

July 2026

---

### Context

Every employee within the organization already possesses a unique employee code assigned by the business.

The application required a primary key for employee identification.

The engineering team had to decide whether to introduce a surrogate key (UUID or integer) or reuse the existing business identifier.

---

### Decision

Use **employee_code** as the primary key.

Example:

```
3051827
```

No additional UUID or auto-incrementing integer key will be introduced.

---

### Alternatives Considered

#### UUID

Advantages:

- Globally unique
- Common in distributed systems

Rejected because the organization already maintains unique employee identifiers.

Introducing UUIDs would increase complexity without providing additional business value.

---

#### Auto Increment Integer

Advantages:

- Simple
- Small index size

Rejected because it would require maintaining two identifiers:

- Internal database ID
- Business employee code

This would increase complexity for both developers and users.

---

### Consequences

Positive

- Matches business terminology.
- Eliminates duplicate identifiers.
- Simplifies API design.
- Simplifies reporting.
- Easier debugging.

Negative

- Employee code format becomes part of the database schema.

---

### Future Impact

Future modules will reference employees using employee_code.

This identifier is now considered part of the system's public contract.

---

# 7. ADR-006

## Archive Employees Instead of Deleting Them

Status

✅ Accepted

Date

July 2026

---

### Context

Employee history must remain available.

Deleting employee records would invalidate:

- Historical rosters
- Leave history
- Reports
- Future auditing

The application therefore required a strategy for removing employees from operational use while preserving historical information.

---

### Decision

Employees will never be physically deleted.

Instead:

```
is_archived = TRUE
```

marks an employee as archived.

Default operational queries return only:

```
is_archived = FALSE
```

---

### Alternatives Considered

#### Physical Delete

Rejected because historical references would be lost.

---

#### Separate Archive Database

Rejected because it introduces unnecessary operational complexity for the current scope.

---

### Consequences

Positive

- Preserves historical data.
- Simplifies reporting.
- Maintains referential integrity.
- Supports future auditing.

Negative

- Tables gradually increase in size.

The expected employee volume is sufficiently small that this trade-off is acceptable.

---

### Future Impact

Future archive and restore APIs will operate by updating the archive flag rather than deleting rows.

---

# 8. ADR-007

## Adopt the Repository Pattern

Status

✅ Accepted

Date

July 2026

---

### Context

Business logic must remain independent of persistence concerns.

Without repositories, SQL queries would gradually spread throughout the application.

---

### Decision

Every database operation must be implemented within a repository.

Repositories own:

- CRUD operations
- Query construction
- Entity persistence

Repositories never own:

- Business rules
- Transactions
- Validation
- HTTP concerns

---

### Alternatives Considered

#### Direct SQL in Services

Rejected because business logic becomes tightly coupled to persistence.

---

#### Active Record Pattern

Rejected because entities would become responsible for their own persistence, increasing coupling between the domain and the database.

---

### Consequences

Positive

- Clear separation of concerns.
- Easier testing.
- Improved maintainability.
- Reusable persistence layer.

Negative

- Additional files.
- Slight increase in boilerplate.

---

### Future Impact

Every future module (Queues, Leave, Rosters, Reports) will implement its own repository.

Repository behaviour should remain consistent throughout the application.

---

# 9. ADR-008

## Centralize Business Logic in the Service Layer

Status

✅ Accepted

Date

July 2026

---

### Context

Business rules become increasingly complex as applications evolve.

Examples include:

- Duplicate employee validation
- Queue balancing
- Leave approval
- Shift allocation
- Roster generation

A dedicated location for business logic was required.

---

### Decision

The Service Layer owns all business logic.

Services are responsible for:

- Validation
- Workflow orchestration
- Transactions
- Repository coordination
- Business exceptions

Routers remain thin.

Repositories remain persistence-focused.

---

### Alternatives Considered

#### Business Logic in Routers

Rejected because routers should remain responsible only for HTTP communication.

---

#### Business Logic in Repositories

Rejected because repositories should not understand business rules.

---

### Consequences

Positive

- Business logic centralized.
- Easier maintenance.
- Easier testing.
- Better scalability.

Negative

- Slight increase in abstraction.

---

### Future Impact

Complex modules such as the Roster Engine will rely heavily on the Service Layer.

Maintaining this separation is critical to long-term maintainability.

---

# 10. ADR-009

## Standardize Business Exception Handling

Status

✅ Accepted

Date

July 2026

---

### Context

Business failures should be represented explicitly.

Returning generic runtime exceptions or database errors directly to API consumers would produce inconsistent behaviour and make debugging difficult.

---

### Decision

Introduce domain-specific exceptions.

Current examples:

```
EmployeeNotFoundError

DuplicateEmployeeCodeError
```

Services raise business exceptions.

Routers translate those exceptions into HTTP responses.

---

### Alternatives Considered

#### Generic Python Exceptions

Rejected because they do not express business intent.

---

#### Returning Error Dictionaries

Rejected because it mixes error handling with normal control flow and makes the code harder to reason about.

---

### Consequences

Positive

- Clear error semantics.
- Consistent HTTP responses.
- Easier debugging.
- Better API design.

Negative

- Requires additional exception classes.

---

### Future Impact

Each business module should define its own domain-specific exceptions.

Examples:

- QueueNotFoundError
- LeaveConflictError
- RosterGenerationError
- InvalidShiftAssignmentError

This approach keeps business failures explicit and improves maintainability.

---

---

# 11. ADR-010

## Separate API DTOs from Frontend Domain Models

Status

✅ Accepted

Date

July 2026

---

### Context

The frontend consumes data produced by the FastAPI backend.

Initially, it would have been possible for React components to use the JSON response directly.

Example:

```
{
    "employee_code": "3051827",
    "full_name": "Sherzaman Khan"
}
```

Although this approach appears simpler, it tightly couples the frontend to the API contract.

Any future API change would require modifications throughout the React application.

---

### Decision

Introduce a dedicated mapping layer.

The data flow becomes:

```
FastAPI

↓

EmployeeResponse

↓

HTTP

↓

EmployeeDto

↓

EmployeeMapper

↓

Employee

↓

React Components
```

React components will consume only frontend domain models.

They will never consume transport DTOs directly.

---

### Alternatives Considered

#### Use API JSON Directly

Advantages:

- Less code
- Faster initial development

Rejected because the frontend becomes tightly coupled to backend implementation details.

---

#### Perform Mapping Inside Components

Rejected because components should remain presentation-focused.

Mixing rendering with transformation logic increases complexity and reduces reusability.

---

### Consequences

Positive

- Loose coupling.
- Easier API evolution.
- Cleaner components.
- Easier testing.
- Stable frontend models.

Negative

- Additional mapper classes.
- Slight increase in implementation effort.

---

### Future Impact

Every business module will implement its own mapper.

Examples include:

- EmployeeMapper
- QueueMapper
- LeaveMapper
- RosterMapper

DTO mapping becomes the standard frontend integration pattern.

---

# 12. ADR-011

## Centralize HTTP Communication Using ApiClient

Status

✅ Accepted

Date

July 2026

---

### Context

Without a shared HTTP client, pages and services would gradually begin creating requests independently.

This often results in duplicated configuration, inconsistent headers, and scattered error handling.

---

### Decision

Create a single ApiClient.

Responsibilities include:

- HTTP requests
- Base URL management
- Shared headers
- Request configuration
- Error normalization

No other module should communicate with FastAPI directly.

---

### Alternatives Considered

#### fetch() Everywhere

Rejected because configuration becomes duplicated throughout the project.

---

#### Axios in Every Service

Rejected because each service would still duplicate common configuration.

---

### Consequences

Positive

- Single location for HTTP behaviour.
- Consistent error handling.
- Easy authentication integration.
- Easier testing.

Negative

- Small additional abstraction layer.

---

### Future Impact

Authentication, request interceptors, logging, and retry behaviour can all be implemented within ApiClient without modifying business modules.

---

# 13. ADR-012

## Centralize Configuration

Status

✅ Accepted

Date

July 2026

---

### Context

Hardcoded configuration values become difficult to maintain as applications grow.

Examples include:

- API URLs
- Environment values
- Endpoint paths

Duplicated configuration also increases the likelihood of inconsistencies.

---

### Decision

Separate configuration into dedicated modules.

Current structure:

```
config.ts

↓

Application configuration

--------------------------------

endpoints.ts

↓

API endpoint definitions

--------------------------------

api.ts

↓

HTTP communication
```

Each file owns exactly one responsibility.

---

### Alternatives Considered

#### Hardcoded URLs

Rejected because updates require modifying multiple files.

---

#### Configuration Inside Components

Rejected because presentation components should remain independent of infrastructure.

---

### Consequences

Positive

- Centralized configuration.
- Easier deployment.
- Improved readability.
- Simplified maintenance.

Negative

- Slightly more project structure.

---

### Future Impact

Future environments (Development, QA, Production) can be introduced through configuration without modifying application code.

---

# 14. ADR-013

## Mirror Backend Architecture Within the Frontend

Status

✅ Accepted

Date

July 2026

---

### Context

Many frontend applications gradually accumulate business logic inside React pages.

As features grow, page files become increasingly difficult to understand.

The project required an architectural pattern that remained scalable.

---

### Decision

Adopt the following frontend architecture.

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

Responsibilities:

Pages

- Orchestration
- State management

Components

- Rendering
- User interaction

Services

- Business-facing operations
- DTO mapping

ApiClient

- HTTP communication

---

### Alternatives Considered

#### Business Logic Inside Pages

Rejected because pages become excessively large.

---

#### Components Performing HTTP Requests

Rejected because presentation and infrastructure become tightly coupled.

---

### Consequences

Positive

- Smaller pages.
- Highly reusable components.
- Better separation of concerns.
- Easier testing.

Negative

- Additional service classes.

---

### Future Impact

Every future page within the project will follow the same layered architecture.

Examples include:

- Queue Page
- Leave Page
- Roster Page
- Reporting Page

Architectural consistency is considered more valuable than minimizing the number of files.

---

# 15. ADR-014

## Establish Verification as a Mandatory Development Step

Status

✅ Accepted

Date

July 2026

---

### Context

Continuing development without verifying previous changes often allows compilation errors to accumulate.

Correcting multiple unrelated issues simultaneously significantly slows development.

---

### Decision

Every implementation must be verified before continuing.

Backend verification:

```
python -m compileall app
```

Frontend verification:

```
npx tsc --noEmit
```

No additional implementation begins until verification succeeds.

---

### Alternatives Considered

#### Verify Only at the End of a Milestone

Rejected because defects become more difficult to isolate.

---

#### Verify Only Before Release

Rejected because architectural issues remain undetected for too long.

---

### Consequences

Positive

- Stable codebase.
- Easier debugging.
- Faster issue isolation.
- Reduced regression risk.

Negative

- Slightly slower day-to-day development.

---

### Future Impact

Verification is now considered part of the implementation process rather than a separate activity.

Every future contributor is expected to follow the same workflow.

---

---

# 16. ADR-015

## Treat Documentation as a First-Class Deliverable

Status

✅ Accepted

Date

July 2026

---

### Context

Many software projects postpone documentation until development is complete.

In practice, documentation is frequently forgotten, becomes outdated, or no longer reflects the implementation.

As the Team Rostering & Queue Management System is intended to evolve over multiple milestones, relying on undocumented architectural decisions would significantly increase onboarding time and maintenance effort.

---

### Decision

Documentation is considered part of the implementation.

A feature is not complete until the relevant documentation has been updated.

The project maintains the following engineering documents:

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

Documentation should evolve alongside the codebase rather than after it.

---

### Alternatives Considered

#### Write Documentation at Project Completion

Rejected because important design decisions would likely be forgotten or reconstructed inaccurately.

---

#### Minimal Documentation

Rejected because the project is intended to serve as both a production-quality application and a long-term learning resource.

---

### Consequences

Positive

- Documentation remains accurate.
- Easier onboarding.
- Better architectural consistency.
- Reduced knowledge loss.

Negative

- Slightly increases milestone completion time.

---

### Future Impact

Future contributors should update documentation whenever significant architectural or business changes occur.

Documentation quality is considered an engineering responsibility rather than a separate task.

---

# 17. ADR-016

## Implement Features One Complete File at a Time

Status

✅ Accepted

Date

July 2026

---

### Context

Generating or modifying multiple files simultaneously makes verification difficult.

Compilation failures become harder to isolate because several independent changes occur at once.

During development, a disciplined workflow was required to keep the codebase continuously buildable.

---

### Decision

Implementation follows a sequential workflow.

For every feature:

1. Explain the architectural reasoning.
2. Explain the implementation approach.
3. Generate one complete file.
4. Verify compilation.
5. Continue only after successful verification.

This approach keeps the application in a stable state throughout development.

---

### Alternatives Considered

#### Multi-file Implementation

Rejected because failures become harder to diagnose and review.

---

#### Complete Feature Before Verification

Rejected because errors accumulate and debugging becomes significantly more difficult.

---

### Consequences

Positive

- Easier debugging.
- Continuous stability.
- Smaller review scope.
- Predictable workflow.

Negative

- Slightly slower implementation.

---

### Future Impact

All future milestones should continue following this workflow unless a compelling architectural reason exists to deviate.

---

# 18. Architecture Decision Review Process

Architecture is expected to evolve as the project grows.

Not every future requirement can be anticipated today.

When introducing a significant architectural change, the following process should be followed.

---

## Step 1

Identify the problem.

Clearly describe the limitation of the current architecture.

---

## Step 2

Evaluate alternatives.

Consider at least two viable approaches.

Record the advantages and disadvantages of each.

---

## Step 3

Select the preferred solution.

Document:

- Decision
- Rationale
- Expected impact

---

## Step 4

Implement the change.

Follow established engineering practices.

Maintain architectural consistency wherever possible.

---

## Step 5

Update documentation.

If the decision affects architecture, update:

- System Architecture
- Decision Log
- Handover

This ensures that documentation remains synchronized with implementation.

---

# 19. Superseding Decisions

Architectural decisions are not immutable.

If a future decision replaces an existing ADR:

- The original ADR should remain in the document.
- Its status should change to **Superseded**.
- A reference to the new ADR should be added.

Example:

```
ADR-008

Status:

Superseded by ADR-021
```

Maintaining historical decisions provides valuable context for future contributors.

---

# 20. Future Architectural Decisions

The following areas are expected to require additional ADRs as development progresses.

Examples include:

### Authentication Strategy

Potential topics:

- JWT
- Session management
- Role-based access control

---

### Queue Assignment Engine

Topics:

- Assignment algorithm
- Capacity balancing
- Fair distribution

---

### Roster Generation

Topics:

- Scheduling algorithm
- Constraint handling
- Regeneration strategy

---

### Reporting

Topics:

- Aggregation strategy
- Dashboard architecture
- Data export

---

### Deployment

Topics:

- Reverse proxy
- Container orchestration
- Environment management
- CI/CD pipeline

---

### Testing

Topics:

- Unit testing
- Integration testing
- End-to-end testing
- Test data management

These future ADRs will extend the current document while preserving a complete architectural history.

---

# 21. Summary of Accepted Decisions

The following architectural decisions are currently active.

| ADR | Title | Status |
|-----|-------|--------|
| ADR-001 | Adopt Clean Architecture | ✅ Accepted |
| ADR-002 | Select FastAPI | ✅ Accepted |
| ADR-003 | Select SQLAlchemy 2 | ✅ Accepted |
| ADR-004 | Containerize Development Using Docker | ✅ Accepted |
| ADR-005 | Use Employee Code as Primary Key | ✅ Accepted |
| ADR-006 | Archive Instead of Delete | ✅ Accepted |
| ADR-007 | Adopt Repository Pattern | ✅ Accepted |
| ADR-008 | Centralize Business Logic in the Service Layer | ✅ Accepted |
| ADR-009 | Standardize Business Exception Handling | ✅ Accepted |
| ADR-010 | Separate API DTOs from Frontend Domain Models | ✅ Accepted |
| ADR-011 | Centralize HTTP Communication Using ApiClient | ✅ Accepted |
| ADR-012 | Centralize Configuration | ✅ Accepted |
| ADR-013 | Mirror Backend Architecture Within the Frontend | ✅ Accepted |
| ADR-014 | Mandatory Verification Workflow | ✅ Accepted |
| ADR-015 | Documentation as a First-Class Deliverable | ✅ Accepted |
| ADR-016 | One Complete File at a Time Development | ✅ Accepted |

---

# 22. Conclusion

The Team Rostering & Queue Management System has been developed with deliberate architectural discipline.

Rather than allowing design decisions to remain implicit, this document records the reasoning behind every major architectural choice.

The Decision Log serves three primary purposes:

- Preserve engineering knowledge.
- Explain architectural intent.
- Provide guidance for future development.

Future contributors are encouraged to consult this document before introducing new architectural patterns or modifying existing ones.

Maintaining a clear and consistent decision history helps ensure that the application continues to evolve in a predictable, maintainable, and production-ready manner.

---

**End of Document**