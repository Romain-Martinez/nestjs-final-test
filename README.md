# NestJS Final Test Project

This repository houses a robust and intuitive NestJS application tailored specifically for meticulous testing using a Postgres database. The personalized touch in the configurations and rigorous testing paradigms allow for a reliable development environment.

### Authors
Romain Martinez - A passionate developer dedicated to creating efficient and scalable systems.

## Prerequisites

- Node.js: recommended version 1.18.x or higher for optimal performance.
- Docker: for containerization and consistent development environments.
- Docker Compose: for defining and running multi-container Docker applications.

## Installation

1 - Get started by cloning the project repository:

```bash
git clone https://github.com/Romain-Martinez/nestjs-final-test.git
cd nestjs-final-test
```

2. Set up the project foundation including dependencies and database:

```bash
npm run setup
```

## Running the Application

### Using Postgres


1. Ignite the application powered by Postgres:

```bash
npm run start:postgres
```

## Conducting End-to-End Tests

### Using Postgres

1. Engage the robust end-to-end tests set up with Postgres:

```bash
npm run test:e2e:postgres
```

## Configuration and Environment Variables

Don't forget to tailor your .env file to march to the beat of your database settings and other necessary environmental configurations.

## Project Structure Overview

- docker/         # Contains the Docker Compose configuration
- prisma/
    - migrations/         # Contains all database migrations
    - schema.prisma       # Defines the database schema
- src/
    - main.ts             # Entry point of the application
    - helpers/            # Utility functions and helpers
    - infrastructure/     # Core infrastructure components and configurations
    - modules/            # Application modules, each encapsulating specific functionality
- test/             # Contains all tests end-to-end 

---

<div align="center"> <sub>Crafted with heart by <a href="https://github.com/Romain-Martinez">Romain Martinez</a></sub> </div>
