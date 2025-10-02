# NoteStack 📝  
**Effortless Note-Taking, Perfectly Organized**  

![React](https://img.shields.io/badge/Frontend-React-blue?logo=react)  
![Vite](https://img.shields.io/badge/Build-Vite-orange?logo=vite)  
![TailwindCSS](https://img.shields.io/badge/Styling-TailwindCSS-06B6D4?logo=tailwindcss)  
![Node.js](https://img.shields.io/badge/Backend-Node.js-green?logo=node.js)  
![Express.js](https://img.shields.io/badge/Framework-Express-black?logo=express)  
![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)  
![JWT](https://img.shields.io/badge/Auth-JWT-yellow?logo=jsonwebtokens)  
![Vercel](https://img.shields.io/badge/Deploy-Frontend-black?logo=vercel)  
![Render](https://img.shields.io/badge/Deploy-Backend-46E3B7?logo=render)  
![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)  

---

NoteStack is a modern, full-stack note-taking application designed for simplicity and efficiency. Capture your ideas on the fly, organize them with tags, and access them from anywhere.  

Built with the **MERN stack (MongoDB, Express.js, React, Node.js)** and styled with **Tailwind CSS** for a clean, responsive interface.  

---

## 🚀 Live Demo
- **Frontend (Vercel):** [note-stack-nu.vercel.app](https://note-stack-nu.vercel.app)  
- **Backend (Render):** *(Add your backend URL here once deployed, e.g., https://notestack-backend.onrender.com)*  

---

## ✨ Features
- 🔑 **User Authentication**: Secure JWT-based registration and login.  
  <img width="1919" height="862" alt="Login" src="https://github.com/user-attachments/assets/5cb505a3-f738-4e3f-990f-66bb5865d815" />
  <img width="1917" height="881" alt="image" src="https://github.com/user-attachments/assets/6b1e4b83-5964-4e11-9e5f-a432d0402481" />

- 📝 **CRUD Operations**: Create, Read, Update, Delete notes seamlessly.  
  <img width="1919" height="899" alt="Dashboard" src="https://github.com/user-attachments/assets/7b517e32-77ff-469e-b571-6eea0095192c" />
  <img width="1907" height="893" alt="image" src="https://github.com/user-attachments/assets/5e84039c-25e5-4462-9e5c-62f7442628a1" />

- 🎨 **Rich Text Content**: A clean interface for detailed notes with formatting options.  
  <img width="1912" height="893" alt="Editor" src="https://github.com/user-attachments/assets/cda4f1fe-aa34-4eb3-9ba5-6bde1120a72e" />  

- 🏷 **Tagging System**: Organize notes with multiple tags for easy filtering.  

- 📌 **Pinning Notes**: Pin important notes to the top of your dashboard.  

- 🔍 **Dynamic Search**: Instantly search notes by title or content.  

- 📱 **Responsive Design**: Works beautifully across desktop, tablet, and mobile.  
  <img width="1917" height="885" alt="Mobile View" src="https://github.com/user-attachments/assets/42394666-775c-41e6-9002-a3966234f9bf" />  

- 🌐 **Dynamic Routing**: Each note has its own unique, shareable URL.  

- ✨ **Animated UI**: Smooth animations for landing, login, and signup pages.  

- 💡 **Empty State UI**: Helpful, visually appealing message when no notes exist.  

- 🪟 **Custom Modals**: Clean modals for adding, editing, and viewing notes.  

---

## 🛠️ Tech Stack  

### Backend
- Node.js  
- Express.js  
- MongoDB  
- Mongoose  
- JSON Web Token (JWT)  
- CORS  

### Frontend
- React.js  
- Vite  
- React Router  
- Tailwind CSS  
- Axios  
- React Modal  
- Moment.js  

### Deployment
- Backend: **Render**  
- Frontend: **Vercel**  

---

## ⚙️ Getting Started  

Follow these steps to run the project locally.  

### Prerequisites
- Node.js (v18 or later)  
- npm  
- MongoDB Atlas account (or local MongoDB instance)  
- Git  

---

### 🔧 Installation & Setup  

#### 1. Clone the repository
```bash
git clone https://github.com/padmanjani-Gorrela/NoteStack.git
cd NoteStack
```
#### 2. Backend Setup
```bash
cd backend
npm install
```
#### 3.Create .env in the backend folder:
```bash
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET_KEY=your_super_secret_key
PORT=8000
```
#### 4.Run backend:
```bash
node index.js
```

## 🌍 Deployment

### Backend (Render)

1. Push your backend to GitHub.
2. Create a Web Service on [Render](https://render.com/) and connect your repository.
3. Configure settings:
   - **Root Directory:** `backend`
   - **Build Command:** `npm install`
   - **Start Command:** `node index.js`
4. Add environment variables in Render dashboard:
   - `MONGODB_URI`
   - `JWT_SECRET_KEY`
   - `PORT`
5. Deploy your backend.

### Frontend (Vercel)

1. Push your frontend to GitHub.
2. Create a Project on [Vercel](https://vercel.com/) and connect your repository.
3. Configure settings:
   - **Root Directory:** `frontend/notes-app`
   - Add environment variable:
     ```bash
     VITE_APP_BASE_URL=https://your-backend-url.onrender.com
     ```
4. Deploy your frontend.

---

## 📬 Contact

👩‍💻 **Sri Padmanjani**  
📧 Email: [padmanjanigorrela55@gmail.com](mailto:padmanjanigorrela55@gmail.com)  
🔗 GitHub: [padmanjani-Gorrela](https://github.com/padmanjani-Gorrela)  
🔗 Project Repo: [NoteStack](https://github.com/padmanjani-Gorrela/NoteStack)

---

## 📌 License

This project is open-source and available under the [MIT License](LICENSE).
