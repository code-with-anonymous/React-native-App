# 🎉 Event Hub – Event Management Platform

Event Hub is a **full-stack event management platform** built with **React Native, Node.js, Express, and MongoDB**. It provides a seamless experience for users to discover and enroll in events while giving administrators powerful tools to create, manage, and organize events.

The platform supports **authentication, event enrollment, feedback, advanced filtering, user profiles, media uploads, and complete event CRUD operations**.

---

## 🚀 Features

### 👤 User Features

* 🔐 **User Authentication**

  * Secure Login & Signup
  * JWT-based authentication
  * Protected routes and API endpoints

* 🎟️ **Event Enrollment**

  * Browse available events
  * Enroll in events
  * View enrolled events from the user profile

* 🔎 **Advanced Event Filtering**

  * Filter events by category
  * Filter events by date
  * View:

    * Past Events
    * Today's Events
    * Upcoming Events

* ⭐ **Feedback System**

  * Submit feedback for events
  * Share event experiences

* 👤 **User Profile**

  * View and manage personal information
  * Track enrolled events

---

## 🛠️ Admin Features

Administrators have complete control over event management.

### 📅 Event Management

* Create new events
* Update existing events
* Delete events
* View and manage all events
* Filter events by category and date

### 🖼️ Media Management

* Upload event images
* Image processing using **Multer**
* Cloud-based image storage using **Cloudinary**

---

## 📱 Tech Stack

### Frontend

* **React Native**
* JavaScript
* REST APIs
* Cross-platform mobile development

### Backend

* **Node.js**
* **Express.js**
* RESTful APIs
* JWT Authentication

### Database

* **MongoDB**
* MongoDB/Mongoose for data management

### Media Storage

* **Cloudinary**
* **Multer**

---

## 🏗️ Project Architecture

```text
Event Hub
│
├── 📱 Mobile App
│   └── React Native
│
├── 🖥️ Backend API
│   ├── Node.js
│   ├── Express.js
│   ├── JWT Authentication
│   └── REST APIs
│
├── 🗄️ Database
│   └── MongoDB
│
└── ☁️ Media Storage
    ├── Cloudinary
    └── Multer
```

---

## 🔐 Authentication

Event Hub uses **JWT (JSON Web Token)** authentication to securely manage user sessions.

Authentication includes:

* User registration
* User login
* Token-based authentication
* Protected API endpoints
* Role-based access for administrative operations

---

## 🔄 Core Functionality

### User Flow

```text
Signup / Login
      ↓
Browse Events
      ↓
Filter Events
      ↓
View Event Details
      ↓
Enroll in Event
      ↓
Attend Event
      ↓
Submit Feedback
```

### Admin Flow

```text
Admin Login
     ↓
Admin Dashboard
     ↓
Create / Manage Events
     ↓
Upload Event Image
     ↓
Cloudinary Storage
     ↓
Update / Delete Events
```

---

## 🖼️ Media Upload Flow

Event images are uploaded through the backend using **Multer** and stored on **Cloudinary**.

```text
React Native App
       ↓
Image Selection
       ↓
Multer
       ↓
Backend API
       ↓
Cloudinary
       ↓
Image URL
       ↓
MongoDB
```

---

## 📂 Suggested Project Structure

```text
Event-Hub/
│
├── mobile/
│   ├── src/
│   │   ├── components/
│   │   ├── screens/
│   │   ├── navigation/
│   │   ├── services/
│   │   └── utils/
│   │
│   ├── App.js
│   └── package.json
│
├── backend/
│   ├── controllers/
│   ├── models/
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── uploads/
│   ├── server.js
│   └── package.json
│
└── README.md
```

---

## ⚙️ Installation & Setup

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/event-hub.git

cd event-hub
```

---

### 2. Setup Backend

```bash
cd backend
npm install
```

Create a `.env` file:

```env
PORT=5000

MONGO_URI=your_mongodb_connection_string

JWT_SECRET=your_jwt_secret

CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
CLOUDINARY_API_KEY=your_cloudinary_api_key
CLOUDINARY_API_SECRET=your_cloudinary_api_secret
```

Start the backend server:

```bash
npm run dev
```

or:

```bash
npm start
```

---

### 3. Setup React Native Application

Open a new terminal:

```bash
cd mobile
npm install
```

Start the React Native application:

```bash
npx react-native start
```

Then run the application on Android:

```bash
npx react-native run-android
```

For iOS:

```bash
npx react-native run-ios
```

> Make sure your React Native development environment is properly configured before running the application.

---

## 🌐 API Overview

The backend provides RESTful APIs for managing authentication, events, users, enrollment, and feedback.

### Authentication

```text
POST   /api/auth/register
POST   /api/auth/login
```

### Events

```text
GET    /api/events
GET    /api/events/:id
POST   /api/events
PUT    /api/events/:id
DELETE /api/events/:id
```

### Enrollment

```text
POST   /api/events/:id/enroll
GET    /api/users/enrolled-events
```

### Feedback

```text
POST   /api/events/:id/feedback
GET    /api/events/:id/feedback
```

> API routes may vary depending on the final backend implementation.

---

## 🔎 Event Filtering

Users can efficiently discover events using multiple filtering options.

### Category Filtering

Examples:

* Technology
* Business
* Sports
* Education
* Entertainment
* Workshops

### Date Filtering

```text
Past Events
     ↓
Today's Events
     ↓
Upcoming Events
```

This makes it easier for users to find relevant events based on their interests and availability.

---

## 🔒 Security

Event Hub implements several security mechanisms, including:

* JWT-based authentication
* Protected API routes
* Role-based authorization
* Environment variables for sensitive credentials
* Secure cloud media storage

Sensitive credentials should **never be committed to GitHub**.

---

## 📸 Screenshots

Add screenshots of your React Native application here:

```text
screenshots/
├── login.png
├── signup.png
├── home.png
├── event-details.png
├── enrolled-events.png
├── profile.png
└── admin-events.png
```

Example:

```markdown
![Home Screen](screenshots/home.png)
```

---

## 🎯 Project Goals

The main goal of Event Hub is to simplify event discovery and management by providing:

* A user-friendly mobile experience
* Efficient event discovery
* Simple event enrollment
* Secure authentication
* Centralized event management
* Cloud-based media management
* Scalable REST APIs

---

## 🔮 Future Improvements

Potential future enhancements include:

* 🔔 Push notifications for upcoming events
* 📍 Location-based event discovery
* 🗺️ Google Maps integration
* 💳 Online event ticketing and payments
* 📅 Calendar integration
* 💬 Real-time event discussions
* ❤️ Favorite/bookmark events
* 📊 Advanced admin analytics
* ⭐ Event ratings and reviews
* 🔎 Search with keyword support

---

## 👨‍💻 Developer

**Muhammad Rayyan**

Full-Stack / React Native Developer

---

## ⭐ Support

If you find this project useful, consider giving it a ⭐ on GitHub.

---

## 📄 License

This project is developed for educational and portfolio purposes.
