# Event Management System

An event management platform built with the **MERN stack** that allows users to create, edit, delete, and search for events.

---

## Tech Stack

-   **Frontend:** React.js, Material UI, Axios
-   **Backend:** Node.js, Express.js, MongoDB
-   **Authentication:** JWT (JSON Web Tokens)
-   **Storage:** Multer for file uploads (Event images & attendee lists)
-   **Security:** bcrypt for password hashing, AES for encryption
-   **API Documentation:** Swagger
-   **Deployment:** Vercel (Frontend), Render (Backend)

---

## Setup & Installation

### 1 Clone the Repository

```sh
git clone https://github.com/your-username/event-management.git
cd event-management
```

### 2 Install Dependencies

#### Backend

```sh
cd backend
npm install
```

#### Frontend

```sh
cd ../frontend
npm install
```

---

### 3 Configure Environment Variables

Create a **`.env`** file in the **backend** folder:

```
MONGO_URI=mongodb+srv://your-mongo-db-url
JWT_SECRET=your-jwt-secret
ENCRYPTION_KEY=your-32-character-encryption-key
```

---

### 4 Start the Development Servers

#### Backend (Port: `5000`)

```sh
cd backend
npm run dev
```

#### Frontend (Port: `3000`)

```sh
cd frontend
npm start
```

---

## API Endpoints

### Authentication

| Method | Endpoint             | Description         |
| ------ | -------------------- | ------------------- |
| POST   | `/api/auth/register` | Register a new user |
| POST   | `/api/auth/login`    | Login user          |

### Events

| Method | Endpoint          | Description        |
| ------ | ----------------- | ------------------ |
| GET    | `/api/events`     | Get all events     |
| POST   | `/api/events`     | Create a new event |
| GET    | `/api/events/:id` | Get an event by ID |
| PUT    | `/api/events/:id` | Update an event    |
| DELETE | `/api/events/:id` | Delete an event    |

For detailed API documentation, visit **`http://localhost:5000/api-docs`** (Swagger UI).

---

## Deployment Guide

### Backend (Render)

1. Go to [Render](https://render.com/) and create a new service.
2. Select **Node.js** as the runtime.
3. Set **Environment Variables** (`MONGO_URI`, `JWT_SECRET`, `ENCRYPTION_KEY`).
4. Deploy your backend.

### Frontend (Vercel)

1. Go to [Vercel](https://vercel.com/) and create a new project.
2. Select your frontend repository.
3. Deploy the frontend.

Once deployed, **update the API base URL** in `frontend/src/api/api.js`:

```js
const API = axios.create({ baseURL: "https://your-backend-url.com/api" });
```

---

## Features

✅ **Event Management (CRUD)**  
✅ **User Authentication (JWT)**  
✅ **File Uploads (Multer for images & Excel files)**  
✅ **Search, Pagination & Filtering**  
✅ **Secure API with Encryption**  
✅ **Swagger API Documentation**

---

## Contact

For any questions, feel free to reach out:

-   **Email:** your-email@example.com
-   **GitHub:** [your-username](https://github.com/your-username)

---

## Final Steps

1️ **Push the latest code to GitHub**

```sh
git add .
git commit -m "Finalized project"
git push origin main
```

2️ **Deploy Backend & Frontend**  
3️ **Test Everything on the Live URL**

---

## 🎉 Congratulations!

Your **Event Management System** is now ready! 🚀
