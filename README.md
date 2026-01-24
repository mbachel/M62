# ITIS 5166 - Backend Application Development

## Final Project - Matthew Bachelder - M62

Final project website built with React, MongoDB, Python, JWT, and others. The site is a culmination of everything I have learned this semester in this course.

### Table of Contents

- [What this project is](#what-this-project-is)
- [Project Overview](#project-overview)
- [Project Details](#project-details)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Usage](#usage)

### What this project is

This repository contains the source for Matthew Bachelder's final project for ITIS 5166, Backend Application Development.

### Project Overview

This project is built using MongoDB as the database, Python for the backend, React for the frontend, is about "Recent Innovations in Generative AI." This project also uses JWT for authentication, a charting library, and NGINX or Apache to serve frontend.

### Project Details

#### Technology Stack

*   **Frontend**: Built with React and React Router. Styling is handled by Tailwind CSS, and data visualizations are powered by D3.js.
*   **Backend**: A Python FastAPI application serving as the API layer.
*   **Database**: Uses MongoDB for data storage.
*   **Authentication**: Implements secure user authentication using OAuth2 and JSON Web Tokens (JWT) via the `python-jose` library.
*   **Infrastructure**: Docker & Docker Compose for orchestration. Nginx serves the frontend and handles SSL/Reverse Proxying.
*   **Tooling & CI**: ESLint/Prettier for frontend lint/format, Ruff for backend lint/format, Pytest for backend tests, Make for task automation, and a GitHub Actions pipeline for CI + deploy.

#### Features & Data

The application provides insights into the rapidly evolving landscape of Generative AI:

*   **Model Performance**: Compares top-tier models (e.g., Gemini 3 Pro, Claude Sonnet 4.5) across benchmarks like *Humanity's Last Exam*, *GPQA Diamond*, and *LiveCodeBench*.
*   **Release Timeline**: Tracks key model releases and their specific technological innovations.

### Project Structure

Below is an overview of the project's file organization:

```
.
├── .env.example            # Example environment variables
├── .github/workflows/      # CI + deploy pipeline
│   └── ci-deploy.yml        # GitHub Actions workflow
├── backend/                # FastAPI backend source
│   ├── Dockerfile          # Backend container definition 
│   ├── config/             # Configuration (Database connection)
│   ├── auth.py             # Authentication logic (JWT generation & validation)
│   ├── main.py             # Main application entry point & API routes
│   └── requirements.txt    # Python dependencies
│   ├── requirements-dev.txt # Dev/test dependencies (ruff, pytest)
│   ├── pyproject.toml       # Ruff configuration
│   └── tests/               # Backend tests
├── frontend/               # React frontend source
│   ├── Dockerfile          # Frontend container definition (Nginx image)
│   ├── nginx.conf          # Nginx configuration (SSL, Proxy settings)
│   ├── eslint.config.js      # ESLint configuration
│   ├── .prettierignore       # Prettier ignore rules
│   ├── .prettierrc.json      # Prettier configuration
│   ├── app/                # Main application code
│   │   ├── components/     # Reusable UI components (Charts, ThemeToggle, etc.)
│   │   ├── routes/         # Application pages (Dashboard, Login, Summary, Reports)
│   │   ├── routes.ts       # Route definitions
│   │   └── utils/          # Utility functions (Auth helpers)
│   ├── package.json        # Node.js dependencies and scripts
│   ├── react-router.config.ts # React Router configuration
│   └── ...config files     # Vite, Tailwind configurations
├── mongo-init/             # Database initialization
│   └── seed.sh             # Data seeding script
├── docker-compose.yml      # Container orchestration service definition
├── Makefile                # Task automation commands
├── rollback.sh             # Rollback script
├── *.json                  # Data source files (Adoption, Performance, Releases)
└── README.md               # Project documentation
```

### Installation & Usage

#### Option 1: Docker (using Makefile)

1.  **Prerequisites**: Ensure you have Docker, Docker Compose, and Make installed (optional, commands can be run manually).
2.  **Environment Setup**: Create a `.env` file in the root directory (copy from `.env.example`).
    *   *Note: For Docker, the MongoDB host must be `mongodb` (the service name), not localhost.*
    ```env
    MONGODB_URL=mongodb://mongodb:27017/m62
    JWT_SECRET=your_jwt_secret_key
    ACCESS_TOKEN_EXPIRE_MINUTES=30
    ```
3.  **Run the Application**:
    ```bash
    make up
    # or manual equivalent: docker compose up -d --build
    ```
    This command will:
    *   Start MongoDB and verify/seed initial data using `mongo-init/seed.sh`.
    *   Start the Python Backend (exposed on port 3000).
    *   Build the Frontend and serve it via Nginx (exposed on ports 80 and 443).

4.  **Access**:
    *   Open your browser to `http://localhost` (or `https://localhost`).
    *   Log in with `matthew` / `matthew`.
    *   View logs with `make logs`.
    *   Stop services with `make down`.

#### Option 2: Local Development

To set up this project locally without Docker:

1.  **Prerequisites**: Ensure you have Python, Node.js, and MongoDB installed and running.
2.  **Environment Variables**: Create a `.env` file in the root directory:
    ```env
    MONGODB_URL=mongodb://localhost:27017/m62
    JWT_SECRET=your_jwt_secret_key
    ACCESS_TOKEN_EXPIRE_MINUTES=30
    ```
3.  **Backend Dependencies**:
    ```bash
    cd backend
    pip install -r requirements.txt
    ```
4.  **Frontend Dependencies**:
    ```bash
    cd ../frontend
    npm install
    ```
5.  **Running the Application**:
    Navigate to the `frontend` directory and run:
    ```bash
    npm run dev
    ```
    *   The backend will start on `http://localhost:3000`.
    *   The frontend will be available at `http://localhost:5173`.
    *   *Note: Local development uses `concurrently` to run both services.*

#### Quality & CI

*   **Frontend**: `npm run lint`, `npm run format`, `npm run typecheck`
*   **Backend**: `ruff check backend`, `ruff format --check backend`, `pytest backend`
*   **CI + Deploy**: GitHub Actions runs lint/format/typecheck/tests on push to `main`, then deploys via SSH and `docker compose up -d --build`.