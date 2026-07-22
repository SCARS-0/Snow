# 05 - Business Rules

Version: 2.0
Status: Active
Last Updated: July 2026

---

# Purpose

This document defines the business rules that govern the Operations Workforce Management System.

It documents the operational policies, validation rules, constraints, and expected system behavior for both Workforce Planning and Operations Execution.

Business rules are implemented in the Service Layer and should never be enforced solely by the database or user interface.

---

# Business Domains

The application consists of two independent business domains.

## Workforce Planning

Responsible for determining employee availability.

Includes:

- Employee Management
- Shift Planning
- Leave Management
- Monthly Roster Planning

Output:

Employee Availability

---

## Operations Execution

Responsible for assigning available employees to operational work.

Includes:

- Queue Management
- Time Blocks
- Daily Allocation
- Supervisor Allocation

Output:

Daily Operational Plan

---

# Workforce Planning Rules

## Employee Management

### BR-001

Employee Codes must be unique.

---

### BR-002

Employees are archived instead of deleted.

Historical records must always remain intact.

---

### BR-003

Archived employees cannot appear in newly created Monthly Rosters.

---

### BR-004

Employee Level determines operational responsibilities.

Example:

- L1
- L2

---

# Monthly Workforce Planning

### BR-005

Each employee has at most one workforce status per calendar day.

Examples:

- First Shift
- Second Shift
- Leave
- Week Off

---

### BR-006

A Monthly Roster represents a single planning month.

---

### BR-007

Monthly Rosters may be edited until operational planning begins.

---

### BR-008

Leave overrides scheduled shifts.

---

### BR-009

Week Off represents employee unavailability.

---

### BR-010

Monthly Workforce Planning determines only employee availability.

It never assigns operational work.

---

# Queue Management Rules

### BR-011

Queues are configurable.

Queues may be activated or archived without changing application code.

---

### BR-012

Queue priority is configurable.

Priority should never be hardcoded.

---

### BR-013

Archived queues cannot receive new assignments.

Historical assignments remain available.

---

# Time Block Rules

### BR-014

Operational work is divided into configurable Time Blocks.

Examples:

Morning

Afternoon

Evening

---

### BR-015

Time Blocks may be modified without changing application code.

---

# Daily Allocation Rules

### BR-016

Daily Allocation consumes employee availability produced by Workforce Planning.

---

### BR-017

Daily Allocation never modifies Monthly Rosters.

---

### BR-018

Each Daily Allocation represents one operational day.

---

### BR-019

Daily Allocation begins as a Draft.

---

### BR-020

Draft allocations may be edited.

---

### BR-021

Published allocations become read-only.

Future versions may support explicit reopening if required.

---

# Queue Assignment Rules

### BR-022

An employee may monitor multiple queues during the same Time Block.

---

### BR-023

A queue may have multiple assigned employees.

---

### BR-024

Each Queue Assignment represents exactly one:

- Employee
- Queue
- Time Block

---

### BR-025

Queue assignments are stored individually.

Multiple queue names must never be stored in a single database field.

---

### BR-026

Queue Assignment records belong to a Daily Allocation.

---

# Supervisor Assignment Rules

### BR-027

Supervisor Assignment is independent from Queue Assignment.

---

### BR-028

Supervisors monitor operational work rather than replacing Queue Assignments.

---

### BR-029

Only employees eligible for supervisory duties may receive Supervisor Assignments.

---

# Staffing Rules

### BR-030

Minimum staffing requirements are configurable.

---

### BR-031

Staffing requirements may differ by Time Block.

Example:

Morning

- Minimum L1
- Minimum L2

Afternoon

- Minimum L1
- Minimum L2

Evening

- Minimum L1
- Minimum L2

---

### BR-032

The Allocation Engine should attempt to satisfy staffing requirements before publishing.

---

# Allocation Engine Rules

### BR-033

Allocation generation is based only on available employees.

---

### BR-034

Employees on Leave are unavailable.

---

### BR-035

Employees on Week Off are unavailable.

---

### BR-036

Archived employees are unavailable.

---

### BR-037

Manual supervisor adjustments always take precedence over automatically generated assignments.

---

### BR-038

Allocation generation should be repeatable.

Generating a Draft should not modify historical allocations.

---

# Historical Data Rules

### BR-039

Historical Monthly Rosters remain unchanged.

---

### BR-040

Historical Daily Allocations remain unchanged after archival.

---

### BR-041

Historical Queue Assignments remain available for reporting.

---

# Validation Rules

The Service Layer validates:

- Duplicate Employee Codes
- Invalid Queue Assignments
- Archived entities
- Invalid Time Blocks
- Invalid Staffing Requirements
- Invalid Allocation Status Transitions

---

# Future Business Rules

Future releases may introduce:

- Queue Skills
- Preferred Queue Rotation
- Historical Workload Balancing
- Department Separation
- Multi-Site Operations
- AI-Assisted Allocation

These features should integrate without changing existing business rules wherever possible.

---

# Related Documentation

- 01_Project_Overview.md
- 02_System_Architecture.md
- 03_Database_Design.md
- 04_API_Design.md
- 09_Domain_Model.md

---

**End of Document**