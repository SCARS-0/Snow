# Team Rostering & Queue Management System

## Project Overview

The Team Rostering & Queue Management System is an internal web application designed to replace the team's existing Excel-based monthly rostering process.

The application automates roster generation, employee shift allocation, queue assignments, leave management, and daily roster modifications while ensuring operational business rules are followed.

The primary objective of this project is to eliminate manual roster creation, reduce scheduling errors, improve operational efficiency, and provide a scalable foundation for future workforce planning.

---

# Project Status

**Current Stage:** Backend Infrastructure Complete

Completed:

- Docker Environment
- PostgreSQL Database
- FastAPI Backend
- SQLAlchemy ORM
- Alembic Migration System
- Configuration Management
- Employee Database Model
- Initial Database Migration

Next Milestone:

- Repository Layer
- Service Layer
- Employee CRUD APIs
- Queue Management
- Roster Generation Engine

---

# Features

## Current Features

- Dockerized Development Environment
- PostgreSQL Database
- FastAPI REST Backend
- Alembic Database Versioning
- SQLAlchemy 2.0 ORM
- Centralized Application Configuration
- Employee Master Table

## Planned Features

- Employee Management
- Monthly Roster Generation
- Queue Assignment Engine
- Leave Management
- Daily Roster Regeneration
- Drag & Drop Roster Editing
- Shift Rotation
- Dashboard & Reports
- Authentication & Authorization

---

# Technology Stack

## Backend

- Python 3.12
- FastAPI
- SQLAlchemy 2.0
- Alembic
- Pydantic v2
- PostgreSQL
- Uvicorn

## Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- dnd-kit

## Database

- PostgreSQL 16

## Infrastructure

- Docker
- Docker Compose

---

# Architecture

The application follows a layered architecture.

```
Browser
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
SQLAlchemy
    │
    ▼
PostgreSQL
```

### Architectural Principles

- Layered Architecture
- Repository Pattern
- Service Layer
- Dependency Injection
- SQLAlchemy ORM
- Single Source of Truth Configuration
- Separation of Concerns
- Clean Code Principles

---

# Project Structure

```
Roster_App/

├── backend/
│   ├── app/
│   │   ├── api/
│   │   ├── core/
│   │   ├── db/
│   │   ├── engines/
│   │   ├── models/
│   │   ├── repositories/
│   │   ├── schemas/
│   │   ├── services/
│   │   ├── utils/
│   │   └── main.py
│   │
│   ├── alembic/
│   ├── requirements.txt
│   ├── Dockerfile
│   └── .env
│
├── frontend/
│
├── docs/
│
└── docker-compose.yml
```

---

# Getting Started

## Prerequisites

- Docker Desktop
- Git
- Visual Studio Code (Recommended)

---

## Clone Repository

```bash
git clone <repository-url>

cd Roster_App
```

---

## Start Application

```bash
docker compose up --build
```

Backend API

```
http://localhost:8000
```

Swagger Documentation

```
http://localhost:8000/docs
```

---

# Database Migrations

Generate Migration

```bash
docker compose exec backend alembic revision --autogenerate -m "migration_name"
```

Apply Migration

```bash
docker compose exec backend alembic upgrade head
```

View Current Version

```bash
docker compose exec backend alembic current
```

Migration History

```bash
docker compose exec backend alembic history
```

---

# Docker Commands

Start Containers

```bash
docker compose up --build
```

Stop Containers

```bash
docker compose down
```

Stop & Remove Volumes

```bash
docker compose down -v
```

View Running Containers

```bash
docker ps
```

---

# Documentation

Detailed project documentation is available inside the `docs` directory.

| Document | Description |
|-----------|-------------|
| 01_Project_Overview.md | Project scope and objectives |
| 02_System_Architecture.md | Complete system architecture |
| 03_Database_Design.md | Database schema and relationships |
| 04_API_Design.md | REST API specifications |
| 05_Business_Rules.md | Business rules and scheduling logic |
| 06_Development_Log.md | Development progress log |
| 07_Decision_Log.md | Architectural decisions |
| 08_Handover.md | Current project status |
| 09_Troubleshooting.md | Common issues and solutions |
| 10_Development_Guidelines.md | Coding standards and conventions |

---

# Development Workflow

For every feature:

1. Design
2. Implement
3. Test
4. Document
5. Review
6. Commit

No feature is considered complete until both the implementation and documentation are updated.

---

# Future Roadmap

## Phase 1
- ✅ Infrastructure Setup

## Phase 2
- Employee Module
- Repository Layer
- Service Layer
- CRUD APIs

## Phase 3
- Queue Management

## Phase 4
- Roster Generation Engine

## Phase 5
- Leave Management

## Phase 6
- Frontend Development

## Phase 7
- Authentication & Authorization

## Phase 8
- Reporting & Dashboard

---

# License

This project is being developed as an internal operations tool and learning project for backend engineering and software architecture.

---

# Author

**Sherzaman Khan**

Backend Engineering Learning Project

Built using FastAPI, PostgreSQL, SQLAlchemy, Docker, and Next.js.