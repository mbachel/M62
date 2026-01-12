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

*   **Frontend**: Built with **React 19** and **React Router v7**. Styling is handled by **Tailwind CSS**, and data visualizations are powered by **D3.js**.
*   **Backend**: A **Python FastAPI** application serving as the API layer.
*   **Database**: Uses **MongoDB** for data persistence, interacting asynchronously via the **Motor** driver.
*   **Authentication**: Implements secure user authentication using **OAuth2** and **JSON Web Tokens (JWT)** via the `python-jose` library.

#### Features & Data

The application provides insights into the rapidly evolving landscape of Generative AI:

*   **Adoption Metrics**: Visualizes workforce and general public adoption trends over time.
*   **Model Performance**: Compares top-tier models (e.g., Gemini 3 Pro, Claude Sonnet 4.5) across benchmarks like *Humanity's Last Exam*, *GPQA Diamond*, and *LiveCodeBench*.
*   **Release Timeline**: Tracks key model releases and their specific technological innovations.

### Project Structure

Below is an overview of the project's file organization:

```
.
├── backend/                # FastAPI backend source
│   ├── config/             # Configuration (Database connection)
│   ├── auth.py             # Authentication logic (JWT generation & validation)
│   ├── main.py             # Main application entry point & API routes
│   └── requirements.txt    # Python dependencies
├── frontend/               # React frontend source
│   ├── app/                # Main application code
│   │   ├── components/     # Reusable UI components (Charts, ThemeToggle, etc.)
│   │   ├── routes/         # Application pages (Dashboard, Login, Summary, Reports)
│   │   └── utils/          # Utility functions (Auth helpers)
│   ├── package.json        # Node.js dependencies and scripts
│   └── ...config files     # Vite, Tailwind, React Router configurations
├── *.json                  # Data source files (Adoption, Performance, Releases)
└── README.md               # Project documentation
```

### Installation

To set up this project locally, follow these steps:

1.  **Prerequisites**: Ensure you have Python (v3.10+), Node.js (v20+), and MongoDB installed and running.
2.  **Environment Variables**: Create a `.env` file in the root directory with the following variables:
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

### Usage

#### Running the Application

This project uses `concurrently` to run both the FastAPI backend and React frontend with a single command.

1.  Navigate to the `frontend` directory:
    ```bash
    cd frontend
    ```
2.  Start the development servers:
    ```bash
    npm run dev
    ```
    *   The backend will start on `http://localhost:3000`.
    *   The frontend will be available at `http://localhost:5173` (or the port specified by Vite).

#### Logging In

When you access the application, you will be prompted to log in. This project uses a hardcoded demonstration user for simplicity.

*   **Username**: `matthew`
*   **Password**: `matthew`

Once authenticated, you will be redirected to the dashboard where you can explore the adoption metrics, model performance charts, and release timelines.