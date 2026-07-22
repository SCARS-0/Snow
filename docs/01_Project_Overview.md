# 01 - Project Overview

Version: 2.0
Status: Active
Last Updated: July 2026

---

# Project Name

Operations Workforce Management System

---

# Executive Summary

The Operations Workforce Management System is an enterprise application designed to replace spreadsheet-based workforce planning and daily operational allocation with a centralized, configurable, and maintainable platform.

The system enables supervisors to manage employee availability, plan monthly work schedules, generate daily operational allocations, supervise queue coverage, and maintain historical operational records.

The application is designed around real operational workflows rather than generic rostering concepts, allowing workforce planning and daily operations to remain independent while working together through clearly defined business boundaries.

---

# Vision

To provide a modern enterprise platform that simplifies workforce planning and operational execution while improving consistency, transparency, scalability, and reporting.

The application should reduce manual effort, minimize spreadsheet dependency, improve operational visibility, and provide a foundation for future automation and intelligent workload balancing.

---

# Business Problem

The existing operational process relies heavily on spreadsheets and manual coordination.

This creates several challenges:

- Manual monthly roster preparation
- Manual daily queue allocation
- Difficult workload balancing
- Limited operational visibility
- High dependence on supervisor knowledge
- Lack of centralized historical records
- Limited reporting capabilities
- Increased operational risk during staffing changes

The system addresses these issues by introducing structured planning, configurable operational rules, and centralized data management.

---

# Project Objectives

The primary objectives of the system are:

- Centralize workforce planning
- Simplify monthly roster management
- Automate daily operational allocation
- Support supervisor review and manual adjustments
- Improve workload distribution
- Preserve historical operational data
- Provide reliable reporting
- Support future operational growth

The application should assist supervisors rather than replace operational decision making.

---

# Core Business Domains

The application consists of two independent but connected business domains.

## Workforce Planning

Purpose:

Determine employee availability.

Responsibilities include:

- Employee Management
- Shift Planning
- Monthly Rosters
- Leave Management
- Week Off Planning
- Workforce Availability

Output:

A list of employees available for work on a given day.

---

## Operations Execution

Purpose:

Transform workforce availability into operational work assignments.

Responsibilities include:

- Queue Management
- Time Block Management
- Daily Allocation
- Supervisor Allocation
- Operational Reporting

Output:

A published Daily Operational Plan.

---

# Business Workflow

The overall operational workflow follows a consistent sequence.

```text
Employee Management
        │
        ▼
Monthly Workforce Planning
        │
        ▼
Employee Availability
        │
        ▼
Daily Allocation Generation
        │
        ▼
Supervisor Review
        │
        ▼
Manual Adjustments
        │
        ▼
Published Daily Operational Plan
        │
        ▼
Operational Execution
```

Each module contributes to a specific stage of this workflow.

---

# Functional Modules

The system is organized into several major functional modules.

## Employee Management

Maintains employee information.

Responsibilities include:

- Employee profiles
- Employment status
- Skill level
- Employee archival

---

## Workforce Planning

Responsible for monthly scheduling.

Includes:

- Shift Assignment
- Week Off Planning
- Leave Recording
- Monthly Rosters

---

## Queue Management

Maintains operational queues.

Responsibilities include:

- Queue configuration
- Queue activation
- Queue priority
- Queue criticality
- Display configuration

---

## Daily Allocation

Generates operational assignments for each working day.

Responsibilities include:

- Queue allocation
- Supervisor allocation
- Draft generation
- Manual adjustments
- Publication

---

## Reporting

Provides historical and operational reporting.

Future reports may include:

- Staffing utilization
- Queue coverage
- Allocation history
- Productivity metrics
- Operational dashboards

---

# Key Features

The initial release includes:

- Employee Management
- Monthly Workforce Planning
- Queue Master
- Daily Allocation
- Supervisor Allocation
- Historical Record Management
- REST API
- Modern React Frontend

Future releases may introduce:

- AI-assisted allocation
- Historical workload balancing
- Real-time operational dashboards
- Multi-department support
- Multi-site deployment
- Advanced analytics

---

# Design Philosophy

The project follows several guiding principles.

## Business First

The software models real operational processes rather than adapting business processes to software limitations.

---

## Separation of Responsibilities

Planning and execution are independent business domains.

---

## Configurable Operations

Operational settings should be configurable rather than hardcoded.

Examples include:

- Queues
- Staffing requirements
- Time blocks
- Queue priorities

---

## Supervisor Authority

Automation assists supervisors.

Operational decisions always remain under supervisor control.

---

## Historical Integrity

Historical operational data is preserved.

Employees are archived rather than deleted.

Historical allocations remain available for reporting and auditing.

---

# Technology Stack

## Backend

- Python
- FastAPI
- SQLAlchemy
- PostgreSQL

---

## Frontend

- React
- Next.js
- TypeScript

---

## Infrastructure

- Docker
- Docker Compose

---

# Architectural Principles

The application follows Clean Architecture.

Backend

```text
Router
    ↓
Service
    ↓
Repository
    ↓
Database
```

Frontend

```text
Page
    ↓
Component
    ↓
Service
    ↓
ApiClient
    ↓
FastAPI
```

Business logic is isolated from presentation and persistence.

---

# Scope

The current project focuses on operational workforce management.

Included:

- Employee Management
- Workforce Planning
- Daily Operational Planning
- Queue Management
- Reporting Foundation

Excluded from the initial release:

- Payroll
- Attendance Tracking
- HR Administration
- Performance Reviews
- Recruitment
- Employee Self-Service

These areas may integrate with the system in the future but are outside the current project scope.

---

# Success Criteria

The project will be considered successful when it can:

- Manage employee information
- Produce monthly workforce plans
- Generate daily operational allocations
- Support supervisor review and manual reassignment
- Publish operational plans
- Preserve historical operational records
- Support future business growth without significant architectural redesign

---

# Related Documentation

This document should be read together with:

- 02_System_Architecture.md
- 03_Database_Design.md
- 05_Business_Rules.md
- 09_Domain_Model.md

The Domain Model provides the detailed business architecture upon which this overview is based.

---

**End of Document**