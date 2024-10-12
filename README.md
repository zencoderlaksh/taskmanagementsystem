**Task Management System**
A simple and efficient task management system that allows users to create, update, delete, and filter tasks. Built with a MERN stack, this application features user authentication and a clean UI for managing tasks.

**Tech Stack**
Backend

Node.js
Express.js
MongoDB
Third-party Libraries:
bcrypt
Joi (for validation)
CORS
dotenv


Frontend

React (with Vite)
Third-party Libraries:
React Hook Form
Zod Resolver
Chakra UI
Redux
Font Awesome
Tailwind CSS

**Features**
Backend

1.REST APIs for managing tasks and user authentication.
2. Postman Testing for API endpoints.
3. Segregated folder structure for better organization (routes, controllers, models, etc.).

Frontend

1.Redux Store for state management and data flow.
2.Protected routes to ensure user authentication.
3.Form validation using Zod with React Hook Form.
4.Chakra UI for displaying toast messages and user notifications.
5.Custom Hook for handling forms.
6.API instance for all API requests, allowing easy management.
7.Identifiers for exporting all constants, improving maintainability.
8.React Router DOM for navigation between pages.
9.Dark/Night Mode support for better user experience.

**User Story**
Sign Up: A user can sign up for an account.
Dashboard Access: Upon signing up, the user is taken to the dashboard where they can manage their tasks.
Task Management: Users can create new tasks, update existing tasks, and delete tasks.
Task Filtering: Users can filter tasks based on their status (pending or active).
Session Management: When a user logs out, their session is closed.
Re-login: Users can log in again to see their existing tasks.
Theme Switching: Users can switch between dark and light modes for better visual comfort.

