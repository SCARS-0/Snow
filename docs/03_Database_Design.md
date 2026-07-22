# 03 - Database Design

Version: 2.0
Status: Active
Last Updated: July 2026

---

# Purpose

This document defines the database architecture of the Operations Workforce Management System.

It describes:

- Database philosophy
- Naming conventions
- Entity relationships
- Table responsibilities
- Constraints
- Data ownership
- Implementation strategy

The database has been designed around the business domain rather than the user interface.

Each table represents a single business concept and has one clearly defined responsibility.

---

# Design Principles

The database follows several architectural principles.

## Normalization

Business data is stored in normalized form.

The database never stores multiple business concepts inside a single field.

Example

Incorrect

```
Queues

"B2C, FD"
```

Correct

```
Queue Assignment

Employee
Queue
Time Block

Employee
Queue
Time Block
```

---

## Single Responsibility

Each table represents one business concept.

Examples

Employee

Queue

Monthly Roster

Daily Allocation

Queue Assignment

Supervisor Assignment

---

## Single Source of Truth

Each business concept has one owner.

Employee information belongs only to Employee.

Queue information belongs only to Queue.

Availability belongs only to Monthly Roster.

Assignments belong only to Daily Allocation.

---

## Historical Integrity

Historical information is preserved.

Employees are archived.

Queues are archived.

Daily allocations remain immutable after archival.

---

# Database Modules

The database consists of two business domains.

```
Workforce Planning

Operations Execution
```

---

# Workforce Planning Tables

Employee

Shift

Leave

MonthlyRoster

MonthlyRosterEntry

---

# Operations Execution Tables

Queue

TimeBlock

DailyAllocation

QueueAssignment

SupervisorAssignment

StaffingRequirement

---

# Table Responsibilities

## Employee

Stores employee master data.

Owns:

- Name
- Employee Code
- Level
- Status

---

## Shift

Defines working shifts.

Example

First

Second

---

## Leave

Stores employee leave information.

---

## MonthlyRoster

Represents one monthly planning cycle.

---

## MonthlyRosterEntry

Represents one employee's workforce status for one calendar day.

---

## Queue

Stores operational queues.

Examples

B2C

FD

Communication

Pennant

---

## TimeBlock

Defines configurable operational periods.

Morning

Afternoon

Evening

---

## DailyAllocation

Represents one operational plan for one calendar day.

---

## QueueAssignment

Represents one queue monitored by one employee during one time block.

---

## SupervisorAssignment

Represents L2 supervision during one operational period.

---

## StaffingRequirement

Stores configurable staffing requirements.

Example

Morning

Minimum L1

Minimum L2

---

# Relationships

```
Employee
    │
    ▼
MonthlyRosterEntry

MonthlyRoster
    │
    ▼
MonthlyRosterEntry

DailyAllocation
    │
    ├──────────────┐
    ▼              ▼
QueueAssignment  SupervisorAssignment

QueueAssignment
        │
        ├──────────┐
        ▼          ▼
Employee      Queue
        │
        ▼
TimeBlock
```

---

# Naming Conventions

Primary Keys

id

Foreign Keys

employee_id

queue_id

time_block_id

daily_allocation_id

Snake case is used throughout the database.

---

# Constraints

The database enforces:

Primary Keys

Foreign Keys

Unique Constraints where appropriate

Indexes

Referential Integrity

Business rules remain inside the Service Layer.

---

# Soft Delete Policy

Employees are archived.

Queues are archived.

Historical operational data is never removed.

---

# Future Expansion

The schema supports future additions including:

Multiple Departments

Multiple Locations

Historical Rotation

Queue Skills

Forecasting

AI Allocation

No major redesign should be required.

---

# Database Implementation Order

Phase 1

Queue

TimeBlock

---

Phase 2

DailyAllocation

QueueAssignment

SupervisorAssignment

---

Phase 3

StaffingRequirement

---

Phase 4

Allocation Engine

---

# Related Documentation

01_Project_Overview.md

02_System_Architecture.md

04_API_Design.md

05_Business_Rules.md

09_Domain_Model.md

---

End of Document