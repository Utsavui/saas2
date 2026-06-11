# SaaSify - Premium SaaS Company Website & Management Suite

SaaSify is a next-generation cloud database analytics and operations automation platform. This repository contains the complete source code for SaaSify, including a premium, fully responsive, interactive React frontend and a robust Node/Express/MongoDB REST API backend.

## 🚀 Key Features

### Frontend
- **Polished UX/UI**: Designed using a curated, responsive HSL theme system with micro-animations, glassmorphic layouts, and customizable dark/light modes.
- **Form Binding and Validation**: Frontend validation for passwords, registration parameters, and contact fields.
- **Admin Dashboard**: Visual layout showing database stats (Total Users, Inbound Contacts, Unread Messages) with tab selectors, read/unread state updates, and record deletions.
- **SEO Ready**: Tailored Open Graph, Twitter, keywords, and description meta fields included inside `index.html`.

### Backend
- **Express REST API**: Fully modular architecture split into routing logic, middleware verification, and Mongoose model definitions.
- **Secure Authentication**: Hashed credentials using `bcryptjs` and session authentication using signed JSON Web Tokens (`jsonwebtoken`).
- **Protected Auditing**: Custom auth checks (`protect` and `admin` middleware helper blocks) protecting administrative dashboard endpoints.
- **Graceful DB Failures**: The server starts up even if the MongoDB URI is not active, logging warnings rather than crashing to allow frontend UI evaluation.

---

## 📂 Project Structure

```text
├── backend/
│   ├── middleware/
│   │   └── authMiddleware.js      # JWT & Admin validation checks
│   ├── models/
│   │   ├── Contact.js             # Mongoose Schema for submissions
│   │   └── User.js                # Mongoose Schema for users (with hash hook)
│   ├── routes/
│   │   ├── adminRoutes.js         # Protected admin control endpoints
│   │   ├── authRoutes.js          # Authentication routes (login, signup, profile)
│   │   └── contactRoutes.js       # Public contact submission endpoint
│   ├── .env                       # Local environment configurations (ignored in git)
│   ├── .env.example               # Reference environment credentials
│   ├── package.json               # Backend dependencies and nodemon scripts
│   └── server.js                  # App bootstrap and db connection logic
├── frontend/
│   ├── src/
│   │   ├── components/            # Reusable elements (Navbar, Footer, etc.)
│   │   ├── context/               # AuthContext managing global state & storage
│   │   ├── pages/                 # Home, Features, Pricing, About, Contact
│   │   │   ├── Auth/              # Login.jsx and Register.jsx
│   │   │   └── AdminDashboard.jsx # Admin control board
│   │   ├── App.css                # Emptied placeholder stylesheet
│   │   ├── App.jsx                # Main router assembly & theme context
│   │   ├── index.css              # Custom Vanilla CSS HSL Design System
│   │   └── main.jsx               # React virtual DOM renderer
│   ├── index.html                 # HTML shell with SEO meta tags
│   ├── vite.config.js             # Vite compiler definitions
│   └── package.json               # Frontend dependencies and routing scripts
├── package.json                   # Root orchestrator executing concurrent workspaces
└── README.md                      # Setup and deployment guidelines
```

---

## 🛠️ Local Installation & Development

### 1. Prerequisites
- **Node.js** (v18.x or higher recommended)
- **npm** (v9.x or higher)
- **MongoDB** (A local instance running on `mongodb://127.0.0.1:27017` or an active MongoDB Atlas connection URI)

### 2. Configure Environment Variables
Inside the `backend/` folder, copy the example environment template:
```bash
cp backend/.env.example backend/.env
```
Ensure your `backend/.env` file contains valid entries:
```ini
MONGODB_URI=mongodb://127.0.0.1:27017/saas_db
JWT_SECRET=super_secret_jwt_key_123456789_development_only
PORT=5000
```

*Note: If you do not have MongoDB running locally, the server will log a warnings block on launch but will continue to run to allow inspecting the static pages.*

### 3. Install Workspace Dependencies
We have configured a root orchestration file so you can install dependencies for the root, frontend, and backend packages using a single command:
```bash
npm run install-all
```

### 4. Run the Dev Servers
Start both the Express REST API (on Port `5000`) and the Vite React Dev Server (on Port `5173`) concurrently:
```bash
npm run dev
```
Navigate to **`http://localhost:5173`** in your browser to inspect the application!

---

## 🔑 Administrative Dashboard Testing

To test the admin features:
1. Navigate to **`http://localhost:5173/signup`** (or click "Sign Up" on the Navbar).
2. Enter your credentials.
3. Check the **"Register as Admin (For Testing Dashboard)"** checkbox.
4. Click **Sign Up**.
5. You will automatically be authenticated and redirected to the **Admin Dashboard**.
6. While logged in as an Admin, you will see the **Admin** button appear on the navigation bar, allowing you to access the dashboard at any time to delete user accounts or toggle the status of contact submissions.

---

## 📡 API Documentation

All routes are prefixed with `/api`.

### 1. Authentication (`/api/auth`)
- `POST /register`: Registers a new user. Expects `{ name, email, password, isAdmin }`. Returns user schema and token.
- `POST /login`: Logs in existing users. Expects `{ email, password }`. Returns user schema and token.
- `GET /me`: Fetches profile of the active session. Requires header `Authorization: Bearer <TOKEN>`.

### 2. Contact Queries (`/api/contact`)
- `POST /`: Submits a form inquiry. Expects `{ name, email, subject, message }`.

### 3. Admin Operations (`/api/admin`) (Requires active token + `isAdmin: true`)
- `GET /users`: Retrieves all registered users.
- `DELETE /users/:id`: Deletes a user by ID. Prevented from deleting yourself.
- `GET /contacts`: Retrieves all contact inquiries.
- `PUT /contacts/:id/read`: Toggles read status. Expects `{ isRead: boolean }`.
- `DELETE /contacts/:id`: Deletes a submission by ID.

---

## 🌐 Production Deployment

### Frontend (Vercel)
Vite projects are easy to deploy on Vercel:
1. Create a Vercel project pointing to your repository.
2. Set **Framework Preset** to `Vite`.
3. Set **Root Directory** to `frontend`.
4. Set the build command to `npm run build`.
5. Add the environment variable:
   - `VITE_API_URL` = your deployed backend API URL (e.g. `https://saas-backend.onrender.com/api`).
6. Click **Deploy**.

### Backend (Render / Railway)
1. Create a new Web Service on Render or project on Railway.
2. Set the build command to `npm install`.
3. Set the start command to `node server.js`.
4. Add the environment variables:
   - `MONGODB_URI` = your Atlas connection string (ensure IP access rules on Atlas allow incoming requests from all IP addresses `0.0.0.0/0`).
   - `JWT_SECRET` = a strong secure string key.
   - `PORT` = `5000` or let Render inject it automatically.
