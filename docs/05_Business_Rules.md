# Business Rules

**Document Version:** 1.0

**Project:** Team Rostering & Queue Management System

**Last Updated:** July 2026

---

# 1. Purpose

This document defines the business rules governing roster generation, employee management, shift allocation, queue assignments, and leave handling.

These rules represent business requirements and must be implemented by the Service Layer.

Business rules must never be implemented inside repositories or routers.

---

# 2. Business Objective

The objective of the application is to automate monthly roster generation while allowing managers to manually adjust schedules without affecting the remainder of the month.

The application replaces the current Excel-based workflow.

---

# 3. Employee Roles

The organization currently supports two operational roles.

## L1 Analyst

Responsibilities

- Handles operational queues
- Works Morning or Afternoon shift
- Can be assigned to any supported queue

---

## L2 Analyst

Responsibilities

- Senior analyst
- Supervises operations
- Supports multiple L1 analysts
- Required in every operational shift

---

# 4. Shift Structure

Current shifts

## Morning Shift

Working Hours

```
08:00 AM – 05:00 PM
```

Required staffing

- 5 L1 Analysts
- 2 L2 Analysts

---

## Afternoon Shift

Working Hours

```
01:00 PM – 10:00 PM
```

Required staffing

- 5 L1 Analysts
- 2 L2 Analysts

---

## Overlap Period

Between

```
01:00 PM – 05:00 PM
```

Both shifts operate simultaneously.

Total workforce during overlap

- 10 L1 Analysts
- 4 L2 Analysts

This period is used for queue balancing and workload distribution.

---

# 5. Shift Rotation

Employees rotate between Morning and Afternoon shifts.

Current business rule

Rotation occurs every

```
2 weeks
```

The system should support configurable rotation periods in future versions.

---

# 6. Weekend Rules

Operations run throughout the week.

Employees may work

- Monday
- Tuesday
- Wednesday
- Thursday
- Friday
- Saturday
- Sunday

Employees working weekends receive weekday compensatory offs.

---

# 7. Monthly Off Rules

Each employee receives

```
6 days off
```

per month.

Typical distribution

- 4 Sundays
- 2 Saturdays

Depending on the calendar month, employees may work either

- Five-day weeks
- Six-day weeks

The scheduling engine must distribute offs fairly.

---

# 8. Leave Types

Current leave categories

## Planned Leave

Submitted in advance.

Should be considered during roster generation.

---

## Emergency Leave

Requested on short notice.

May require regeneration of affected roster days.

---

Future leave types may include

- Sick Leave
- Casual Leave
- Earned Leave
- Maternity Leave
- Paternity Leave

---

# 9. Roster Regeneration

Managers may regenerate

```
a single day
```

without affecting the rest of the month's roster.

This minimizes operational disruption.

---

# 10. Employee Status

Employees have two independent states.

## Active

```
is_active = TRUE
```

Employee participates in roster generation.

---

## Inactive

```
is_active = FALSE
```

Employee exists in the system but is excluded from future roster generation.

---

## Archived

```
is_archived = TRUE
```

Employee is removed from operational use while preserving historical records.

Archived employees are excluded from all scheduling activities.

---

# 11. Queue Assignment

Current implementation

Not yet developed.

Planned functionality

Employees will be assigned operational queues according to business requirements.

The scheduling engine will balance workload across available queues.

---

# 12. Queue Balancing

The application will ensure that operational queues receive sufficient staffing.

Objectives

- Prevent understaffing
- Prevent overstaffing
- Balance workload
- Maximize operational efficiency

Queue assignment logic will be implemented during the Queue module.

---

# 13. Roster Generation Principles

The roster engine should

- Meet minimum staffing requirements
- Respect leave requests
- Respect weekly offs
- Balance Morning and Afternoon shifts
- Maintain fairness across employees
- Produce reproducible schedules

---

# 14. Employee Creation Rules

When creating a new employee

The employee code

- Must be unique
- Cannot already exist

The system automatically assigns

```
is_active = TRUE

is_archived = FALSE
```

These values are managed by the application and are not supplied by the client.

---

# 15. Employee Update Rules

Future implementation

Managers may update

- Name
- Role
- Gender
- Active status

Employee code is immutable and cannot be changed after creation.

---

# 16. Employee Archive Rules

Employees are never physically deleted.

Instead

```
is_archived = TRUE
```

This preserves

- Historical rosters
- Leave history
- Audit records

# 16.1 Employee Visibility Rules

Employee listing endpoints return only non-archived employees.

```
is_archived = FALSE
```

Archived employees remain stored in the database to preserve historical information.

Future archive management screens will expose archived employees through dedicated endpoints.

This prevents archived employees from participating in normal operational workflows while maintaining historical integrity.

---

# 17. Roster Integrity Rules

The application must never produce a roster that violates minimum staffing levels.

Minimum staffing is considered a mandatory business constraint.

---

# 18. Future Business Rules

Future releases will include

## Skill-Based Assignment

Employees may possess different skill sets.

Roster generation will consider skills when assigning queues.

---

## Holiday Calendar

National and regional holidays will influence scheduling.

---

## Fair Rotation

The scheduling engine will prevent repeated assignment of undesirable shifts.

---

## Maximum Consecutive Working Days

The engine will prevent excessive consecutive working days.

---

## Preferred Shift Requests

Employees may submit preferred shifts.

The engine should attempt to satisfy preferences while maintaining operational requirements.

---

# 19. Current Implementation Status

Implemented

- Employee management
- Employee retrieval
- Employee creation
- Duplicate employee prevention
- Employee validation
- Soft archive strategy
- Active employee concept

Planned

- Queue assignment
- Leave management
- Monthly roster generation
- Daily regeneration
- Shift balancing
- Fair rotation
- Skill-based scheduling

---

# 20. Business Rule Ownership

Business rules belong exclusively to the Service Layer.

Repositories perform database operations only.

Routers receive HTTP requests only.

This separation ensures business logic remains independent of frameworks and persistence technologies.

---

# 21. Guiding Principle

Every feature implemented in the application must satisfy the business rules defined in this document.

If implementation details conflict with business requirements, the business rules take precedence.