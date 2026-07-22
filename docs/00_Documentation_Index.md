# 00 - Documentation Index

Version: 2.0  
Status: Active  
Last Updated: July 2026

---

# Overview

This directory contains the official project documentation for the **Operations Workforce Management System**.

The documentation is intended to serve as the primary source of truth for the project's architecture, business domain, implementation strategy, and development history.

Each document has a clearly defined purpose and should be updated whenever significant architectural or functional changes occur.

The documentation is designed to allow a new developer to understand the project without first reading the source code.

---

# Documentation Structure

| Document | Purpose |
|----------|---------|
| **00_Documentation_Index.md** | Provides an overview of the documentation set and explains the purpose of each document. |
| **01_Project_Overview.md** | Describes the project's vision, objectives, scope, functional modules, and overall business purpose. |
| **02_System_Architecture.md** | Documents the software architecture, Clean Architecture layers, module responsibilities, application structure, and technical design principles. |
| **03_Database_Design.md** | Defines the database architecture, entity relationships, schema design, naming conventions, constraints, and implementation strategy. |
| **04_API_Design.md** | Documents REST API endpoints, request and response models, DTOs, validation rules, and API conventions. |
| **05_Business_Rules.md** | Defines the business rules governing Workforce Planning, Operations Execution, queue allocation, staffing, validation, and operational constraints. |
| **06_Development_Log.md** | Records major development milestones, completed features, architectural changes, and implementation progress. |
| **07_Decision_Log.md** | Documents important architectural and technical decisions together with the reasoning behind each decision. |
| **08_Handover.md** | Provides the current project status, implementation summary, pending work, and guidance for future development. |
| **09_Domain_Model.md** | Defines the business domain, bounded contexts, workflows, entities, relationships, aggregate boundaries, domain services, business invariants, and architectural principles of the Operations Workforce Management System. |

---

# Reading Order

New developers should read the documentation in the following order.

## 1. Business Understanding

1. 01_Project_Overview.md
2. 09_Domain_Model.md
3. 05_Business_Rules.md

These documents explain **why** the application exists and how the business operates.

---

## 2. Technical Architecture

4. 02_System_Architecture.md
5. 03_Database_Design.md
6. 04_API_Design.md

These documents explain **how** the application is implemented.

---

## 3. Project History

7. 06_Development_Log.md
8. 07_Decision_Log.md
9. 08_Handover.md

These documents describe how the project has evolved and provide context for future development.

---

# Documentation Principles

The documentation follows several principles.

## Single Source of Truth

Each topic is documented in one location only.

For example:

- Database design belongs in **03_Database_Design.md**
- Business rules belong in **05_Business_Rules.md**
- Architectural decisions belong in **07_Decision_Log.md**

Documentation should avoid duplication wherever practical.

---

## Living Documentation

The documentation evolves alongside the application.

Whenever a significant architectural decision or implementation milestone occurs, the relevant documents should be updated.

Documentation should always reflect the current state of the application.

---

## Business Before Technology

Business concepts should be understood before implementation details.

For this reason, the recommended reading order begins with the Project Overview and Domain Model before moving into architecture and implementation.

---

## Architectural Consistency

All documents should use consistent terminology.

The application is referred to as the **Operations Workforce Management System**.

The business domain is divided into two bounded contexts:

- Workforce Planning
- Operations Execution

All future documentation should maintain this terminology unless a deliberate architectural decision changes it.