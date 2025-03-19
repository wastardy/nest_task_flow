<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="120" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg" alt="Donate us"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow" alt="Follow us on Twitter"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

# TaskFlow

## Overview

This is a **Task Management System** built with **NestJS & Typescript**. It provides a simple and scalable approach to task management with basic functionality including user authentication, task creation, status updates, and more.

The system follows a modular architecture with two main modules:

- **TasksModule**: Handles the core task management functionalities.
- **AuthModule**: Handles user authentication and authorization.

The application is structured to ensure long-term scalability, making it easy to extend with additional features or integrations.

## Features

- **Authentication**: Users can sign up and sign in using JWT tokens for secure access.
- **Task Management**: Users can create, retrieve, delete, and update tasks.
- **Task Status**: Users can update the status of their tasks.

## Architecture

The application follows the **NestJS** modular structure.

### Main Modules:

1. **AppModule** (Root)

   - The root module that imports and connects other modules.

2. **TasksModule**

   - `TasksController`: Responsible for handling task-related HTTP requests.
   - `TasksService`: Contains the business logic related to task operations.
   - `TaskRepository`: Handles data operations for tasks.
   - `TaskEntity`: Represents the task model.
   - `StatusValidationPipe`: Validates task status updates.

3. **AuthModule**
   - `AuthController`: Handles user authentication requests.
   - `AuthService`: Responsible for user authentication logic.
   - `JwtStrategy`: Provides JWT-based authentication.
   - `UserRepository`: Handles database operations related to user management.
   - `UserEntity`: Represents the user model.

## API Endpoints

### Tasks

| Endpoint             | Method | Description                  |
| -------------------- | ------ | ---------------------------- |
| `/tasks/`            | GET    | Get all tasks (with filters) |
| `/tasks/:id/`        | GET    | Get a specific task          |
| `/tasks/`            | POST   | Create a new task            |
| `/tasks/:id/`        | DELETE | Delete a task                |
| `/tasks/:id/status/` | PATCH  | Update the status of a task  |

### Auth

| Endpoint        | Method | Description              |
| --------------- | ------ | ------------------------ |
| `/auth/signup/` | POST   | Sign up a new user       |
| `/auth/signin/` | POST   | Sign in an existing user |

## Objectives

The project aims to achieve the following key objectives:

### NestJS Objectives:

- Understand and implement **NestJS Modules**, **Controllers**, and **Services**.
- Learn **Controller-to-Service** communication.
- Use **NestJS Pipes** for validation.

### Back-end & Architecture Objectives:

- Develop production-ready **REST APIs**.
- Implement **CRUD** operations for tasks.
- Handle **errors** gracefully.
- Use **Data Transfer Objects (DTO)** for data validation.
- Build a modular system for scalable applications.

### Persistence Objectives:

- Connect the application to a **relational database** using **TypeORM**.
- Write **simple and complex queries** with **QueryBuilder**.
- Ensure good **performance** when working with databases.

### Authorization/Authentication Objectives:

- Implement **user sign-up** and **sign-in** functionality.
- Manage **authentication** and **authorization**.
- Use **JWT tokens** for secure API access.
- Implement **password hashing** and **salting**.

### Deployment Objectives:

- Prepare the application for **production** use.
- Deploy the **NestJS app** to **AWS** (Amazon Web Services).
- Deploy the **front-end** to **Amazon S3**.
- Wire up the **front-end** and **back-end** services.

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-repository/task-management-system.git
   ```

2. Install dependencies:

   ```bash
   cd task-management-system
   npm install
   ```

3. Set up the database connection and environment variables:

   Create a `.env` file and add the necessary environment variables:

   ```
   DATABASE_URL=your_database_connection_url
   JWT_SECRET=your_jwt_secret_key
   ```

4. Run the application:

   ```bash
   npm run start
   ```

5. The application will be running at `http://localhost:3000`.

## Technologies Used:

- **NestJS**: A framework for building efficient and scalable server-side applications.
- **TypeORM**: An ORM for connecting to relational databases.
- **JWT**: JSON Web Tokens for secure authentication.
- **PostgreSQL/MySQL**: Relational database for storing tasks and users.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
