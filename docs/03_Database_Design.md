# Database Design

**Document Version:** 1.0

**Project:** Team Rostering & Queue Management System

**Last Updated:** July 2026

---

# 1. Introduction

This document describes the database architecture of the Team Rostering & Queue Management System.

The application uses PostgreSQL 16 as its relational database and SQLAlchemy 2.0 as the Object Relational Mapper (ORM).

Database schema changes are version controlled using Alembic migrations.

The database has been designed to support future expansion while keeping the current implementation simple and maintainable.

---

# 2. Design Goals

The database has been designed with the following objectives.

- Normalize operational data
- Minimize data duplication
- Maintain referential integrity
- Support future business growth
- Keep queries efficient
- Remain compatible with SQLAlchemy ORM

---

# 3. Current Database

Current Tables

```
employees

alembic_version
```

The Employee table is currently the only business table.

Additional tables will be introduced as new modules are implemented.

---

# 4. Entity Relationship Overview

Current System

```
+------------------+
|    Employees     |
+------------------+
```

Future System

```
Employees
      │
      ├────────────┐
      │            │
      ▼            ▼
Leaves        Queue Assignments
      │            │
      ▼            ▼
Roster Generation
      │
      ▼
Roster History
```

---

# 5. Employee Table

Table Name

```
employees
```

Purpose

Stores all employee master information required for roster generation.

---

## Columns

| Column | Type | Nullable | Description |
|----------|------------|----------|---------------------------|
| employee_code | VARCHAR(20) | No | Primary Key |
| full_name | VARCHAR(100) | No | Employee Full Name |
| role | ENUM | No | L1 or L2 |
| gender | ENUM | No | Male or Female |
| is_active | BOOLEAN | No | Active employee |
| is_archived | BOOLEAN | No | Soft delete flag |
| created_at | TIMESTAMP | No | Record creation time |
| updated_at | TIMESTAMP | No | Last update time |

---

# 6. Primary Key Strategy

Current Primary Key

```
employee_code
```

Reason

The business guarantees that employee codes are

- Unique
- Permanent
- Never reused
- Immutable

Using the business identifier as the primary key avoids unnecessary surrogate IDs.

Future tables may use internal numeric IDs where appropriate.

---

# 7. Employee Roles

Employee roles are stored as PostgreSQL ENUM values.

Current Roles

```
L1

L2
```

Reason

Roles are limited, stable, and rarely change.

ENUM improves readability and prevents invalid values.

---

# 8. Gender Enumeration

Current values

```
Male

Female
```

Gender is implemented using PostgreSQL ENUM through SQLAlchemy.

Advantages

- Prevents invalid values
- Consistent API responses
- Easy validation

---

# 9. Audit Fields

Every business entity inherits from BaseModel.

Current audit columns

```
created_at

updated_at
```

Purpose

- Track record creation
- Track last modification
- Future reporting
- Auditing
- Troubleshooting

---

# 10. Soft Delete Strategy

Employees are never physically deleted.

Instead,

```
is_archived = TRUE
```

Advantages

- Prevent accidental data loss
- Preserve historical roster information
- Maintain audit history
- Support employee restoration

Current implementation

```
FALSE
```

Future implementation

Archive endpoint

```
PATCH /employees/{employee_code}/archive
```

---

# 11. Active Status

Current field

```
is_active
```

Purpose

Indicates whether an employee is currently eligible for scheduling.

Possible values

```
TRUE

FALSE
```

Difference from archive

```
Active

↓

Employee currently works
```

```
Archived

↓

Employee removed from system
```

---

# 12. Naming Conventions

Tables

Plural

Examples

```
employees

queues

rosters

leaves
```

Columns

Snake case

Examples

```
employee_code

full_name

created_at
```

Primary Keys

Business key where appropriate.

Otherwise

```
id
```

Foreign Keys

Reference target table.

Example

```
employee_id

queue_id

roster_id
```

---

# 13. SQLAlchemy Model Hierarchy

```
DeclarativeBase

↓

Base

↓

BaseModel

↓

Employee
```

Only one DeclarativeBase exists.

This prevents SQLAlchemy metadata fragmentation and Alembic migration issues.

---

# 14. Migration Strategy

Database schema changes are managed using Alembic.

Migration Workflow

```
Modify SQLAlchemy Model

↓

Generate Migration

↓

Review Migration

↓

Upgrade Database

↓

Verify Schema
```

Current migration

```
Create Employees Table
```

Future migrations

```
Queues

Leaves

Roster Tables

Authentication

Indexes
```

---

# 15. Database Constraints

Current constraints

Primary Key

```
employee_code
```

NOT NULL

```
employee_code

full_name

role

gender

is_active

is_archived
```

Future constraints

- Foreign Keys
- Unique Constraints
- Check Constraints
- Composite Keys

---

# 16. Index Strategy

Current

Primary Key index

```
employee_code
```

Future indexes

```
role

is_active

is_archived
```

Composite indexes

```
(role, is_active)

(queue_id, roster_date)
```

Indexes will be introduced only when justified by query performance.

Premature indexing is intentionally avoided.

---

# 17. Planned Tables

Employee

```
employees
```

Queues

```
queues

employee_queue_assignments
```

Leaves

```
leave_requests
```

Roster

```
monthly_rosters

daily_rosters

roster_assignments
```

Audit

```
audit_logs
```

Authentication

```
users

roles

permissions
```

---

# 18. Future Relationships

```
Employee

↓

Employee Queue Assignment

↓

Queue
```

```
Employee

↓

Leave Request
```

```
Employee

↓

Roster Assignment

↓

Roster
```

---

# 19. Database Principles

The database follows these principles.

- Normalize until business requires denormalization.
- Store facts, not calculations.
- Preserve historical information.
- Prefer soft deletes over hard deletes.
- Use business keys only when guaranteed immutable.
- Keep migrations under version control.
- Avoid premature optimization.
- Keep schema compatible with ORM.

---

# 20. Current Status

Completed

- PostgreSQL setup
- SQLAlchemy integration
- Alembic configuration
- Employee table
- ENUM implementation
- Audit fields
- Primary key strategy
- Soft delete design

In Progress

- Employee CRUD

Planned

- Queue schema
- Leave schema
- Monthly roster schema
- Reporting schema
- Authentication schema
- Audit logging
- Performance indexes

---

# 21. Database Roadmap

Phase 1

- Employee Management

Phase 2

- Queue Management

Phase 3

- Leave Management

Phase 4

- Monthly Roster Engine

Phase 5

- Reporting

Phase 6

- Authentication & Authorization

The database has been intentionally designed to accommodate these future modules without requiring major schema redesign.