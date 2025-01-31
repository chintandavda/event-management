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

## Features

1 **Event Management (CRUD)**  
2 **User Authentication (JWT)**  
3 **File Uploads (Multer for images & Excel files)**  
4 **Search, Pagination & Filtering**  
5 **Secure API with Encryption**  
6 **Swagger API Documentation**

---

## Contact

For any questions, feel free to reach out:

-   **Email:** davdachintan97@gmail.com

---
