NestJS Final Test Project
This repository houses a robust and intuitive NestJS application tailored specifically for the meticulous testing using a Postgres database. The personalized touch in the configurations and rigorous testing paradigms allow for a reliable development environment.

Author
Romain Martinez - A passionate developer dedicated to creating efficient and scalable systems.

Prerequisites
Node.js (recommended version 1.18.x or higher for optimal performance)
Docker (for containerization and consistent development environments)
Docker Compose (for defining and running multi-container Docker applications)
Installation
Get started by cloning the project repository:
bash
Copy code

git clone https://github.com/romaintinez/nestjs-final-test.git
cd nestjs-final-test
Set up the project foundation including dependencies and database:
bash
Copy code

npm run setup
Running the Application
Using Postgres
Ignite the application powered by Postgres:
bash
Copy code

npm run start:postgres
Conducting End-to-End Tests
Using Postgres
Engage the robust end-to-end tests set up with Postgres:
bash
Copy code

npm run test:e2e:postgres
Configuration and Environment Variables
Don't forget to tailor your .env file to march to the beat of your database settings and other necessary environmental configurations.

Project Structure Overview
docker/ # Docker Compose configurations live here
prisma/
migrations/ # Home to all your database's evolutionary journeys
schema.prisma # The grand blueprint of your database schema
src/
main.ts # The gateway file to embark upon your NestJS adventure
helpers/ # The supporting cast of utility functions
infrastructure/ # The bedrock of core infrastructure components
modules/ # Your feature-packed playground: Application modules
test/ # The crucible for your end-to-end tests
<div align="center"> <sub>Crafted with heart by <a href="https://github.com/romaintinez">Romain Martinez</a></sub> </div>
