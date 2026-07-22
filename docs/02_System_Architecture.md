# 02 - System Architecture

Version: 2.0
Status: Active
Last Updated: July 2026

---

# Purpose

This document describes the technical architecture of the Operations Workforce Management System.

It explains:

- Overall system architecture
- Architectural principles
- Backend architecture
- Frontend architecture
- Module organization
- Layer responsibilities
- Dependency rules
- Data flow
- Design conventions

This document complements the Domain Model by explaining how the business model is implemented in software.

---

# Architectural Goals

The architecture has been designed with the following objectives.

- Maintainability
- Scalability
- Testability
- Separation of Concerns
- Low Coupling
- High Cohesion
- Clear Ownership
- Enterprise Readability

The system should remain understandable and maintainable as additional modules are introduced.

---

# High-Level Architecture

The application follows a layered enterprise architecture based on Clean Architecture principles.

```
                    Users
                      │
                      ▼
             Next.js Frontend
                      │
                      ▼
              FastAPI Backend
                      │
                      ▼
             Business Services
                      │
                      ▼
             Repository Layer
                      │
                      ▼
               PostgreSQL Database
```

Each layer has clearly defined responsibilities.

---

# Business Architecture

The application is organized into two primary business domains.

```
Operations Workforce Management System
│
├──────────────────────────────────────
│
├── Workforce Planning
│
│      ├── Employee Management
│      ├── Shift Planning
│      ├── Monthly Roster
│      ├── Leave Management
│      └── Availability Calculation
│
└──────────────────────────────────────
                │
                ▼
        Available Employees
                │
                ▼
┌──────────────────────────────────────
│
├── Operations Execution
│
│      ├── Queue Master
│      ├── Time Blocks
│      ├── Daily Allocation
│      ├── Queue Assignment
│      ├── Supervisor Assignment
│      └── Reporting
│
└──────────────────────────────────────
```

The domains are independent.

Operations Execution consumes Workforce Planning data but never modifies it.

---

# Backend Architecture

The backend follows strict Clean Architecture.

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

Each layer has exactly one responsibility.

---

## Router Layer

Responsibilities:

- HTTP endpoints
- Request validation
- Dependency injection
- Response models

Routers never contain business logic.

---

## Service Layer

Responsibilities:

- Business rules
- Transactions
- Validation
- Domain coordination
- Exception handling

Services orchestrate repositories and enforce domain rules.

---

## Repository Layer

Responsibilities:

- CRUD operations
- Query construction
- Entity persistence

Repositories never contain business logic and never commit transactions.

---

## Database Layer

Responsibilities:

- Data persistence
- Constraints
- Referential integrity
- Indexes

Business rules belong in the Service Layer, not the database.

---

# Frontend Architecture

The frontend follows a layered architecture matching the backend.

```
Page
    │
    ▼
Component
    │
    ▼
Service
    │
    ▼
ApiClient
    │
    ▼
FastAPI
```

This prevents business logic from leaking into the presentation layer.

---

## Pages

Responsibilities:

- Page orchestration
- State composition
- Layout

Pages never perform HTTP requests directly.

---

## Components

Responsibilities:

- Rendering
- User interaction
- Presentation

Components never contain business logic.

---

## Services

Responsibilities:

- API communication
- DTO mapping
- Data transformation
- Frontend business helpers

Services isolate the UI from backend DTOs.

---

## ApiClient

Responsibilities:

- HTTP communication
- Authentication headers
- Base URL configuration
- Error handling
- Request configuration

All HTTP traffic passes through the ApiClient.

---

# Module Organization

The system is organized into feature-oriented modules.

## Workforce Planning

Backend

```
employees
monthly_roster
leave
shift
```

Frontend

```
employees/
monthly-roster/
```

---

## Operations Execution

Backend

```
queues
time_blocks
daily_allocation
queue_assignment
supervisor_assignment
```

Frontend

```
queues/
daily-allocation/
```

This organization aligns the codebase with the business domains.

---

# Dependency Rules

Dependencies always flow inward.

```
Frontend
      │
      ▼
API
      │
      ▼
Services
      │
      ▼
Repositories
      │
      ▼
Database
```

Forbidden dependencies include:

- Repository → Service
- Database → Service
- Component → ApiClient
- Component → Backend DTO
- Page → fetch()

These rules preserve architectural consistency.

---

# DTO Architecture

The frontend never consumes backend DTOs directly.

```
Backend DTO
      │
      ▼
Frontend Service
      │
      ▼
Mapper
      │
      ▼
Frontend Domain Model
      │
      ▼
React Component
```

This separation allows backend APIs to evolve without tightly coupling the UI.

---

# Configuration

Application configuration is centralized.

Examples include:

- API URLs
- Environment variables
- Endpoints
- Feature flags

Configuration values must never be hardcoded.

---

# Data Flow

A typical request follows this path.

```
User
 │
 ▼
React Page
 │
 ▼
React Component
 │
 ▼
Frontend Service
 │
 ▼
ApiClient
 │
 ▼
FastAPI Router
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

The response follows the reverse path.

---

# Cross-Cutting Concerns

The following concerns apply across all modules.

- Validation
- Logging
- Error handling
- Authorization
- Auditing
- Configuration
- Exception management

These should remain centralized wherever practical.

---

# Design Principles

The system follows several architectural principles.

## Separation of Concerns

Each layer owns a single responsibility.

---

## Dependency Inversion

Higher-level modules never depend on implementation details.

---

## Single Source of Truth

Each business concept has one authoritative owner.

---

## Explicit Over Implicit

Readable code is preferred over clever abstractions.

---

## Composition Over Duplication

Reusable behavior should be composed rather than copied.

---

## Enterprise Maintainability

Architectural decisions prioritize long-term maintainability over short-term convenience.

---

# Future Expansion

The architecture supports future additions such as:

- Multiple departments
- Multiple operational sites
- Authentication and authorization
- Notifications
- Reporting engine
- AI-assisted allocation
- Workforce analytics
- External HR integrations

These additions should integrate without requiring architectural redesign.

---

# Related Documentation

This document should be read together with:

- 01_Project_Overview.md
- 03_Database_Design.md
- 04_API_Design.md
- 09_Domain_Model.md

---

**End of Document**