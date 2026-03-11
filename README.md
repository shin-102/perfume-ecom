# 🏺 PerfumeEcom

A modern, full-stack E-commerce platform for perfumes built with **React 19**, **Vite**, and **Firebase**. This project features a high-performance frontend, integrated Cloud Functions for secure admin authentication, and Firestore for data management.

## 🚀 Tech Stack

* **Frontend:** React 19 (Hooks, Router v7), Tailwind CSS 4, Lucide Icons.
* **Backend:** Firebase Cloud Functions (v2), Firebase Auth, Firestore.
* **Build Tool:** Vite.
* **Package Manager:** pnpm.

---

## 📂 Project Structure



* `/src`: React application logic, components, and hooks.
* `/functions`: Node.js environment for Firebase Cloud Functions (Admin API).
* `/public`: Static assets.
* `/dist`: Production build output.

---

## 🛠️ Getting Started

### 1. Prerequisites
Ensure you have the following installed:
* Node.js (v20+)
* pnpm (`npm install -g pnpm`)
* Firebase CLI (`npm install -g firebase-tools`)

### 2. Environment Setup
You need to configure environment variables for both the frontend and the backend.

**Root Directory (`/.env`):**
```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
```

**Functions Directory (`/functions/.env`):**

```env
ADMIN_PASSWORD=your_secure_admin_password
```

### 3. Installation

Install dependencies for both the root and the functions folder:

```bash
pnpm install
cd functions && pnpm install
cd ..
```

### 4. Development

Run both the Vite dev server and the Firebase Emulators concurrently:

```bash
pnpm run dev
```

* **Frontend:** `http://localhost:5173`
* **Functions Emulator:** `http://localhost:5001`

---

## 🔐 Admin Features

The project includes a protected admin panel.

* **Authentication:** Handled via a secure Cloud Function (`adminLogin`) that checks against the server-side environment variable.
* **Route Protection:** Implemented via the `ProtectedRoute.jsx` component to prevent unauthorized access to the dashboard.

---

## 📦 Deployment

1. **Build the frontend:**
```bash
pnpm run build
```


2. **Deploy to Firebase:**
```bash
firebase deploy
```
