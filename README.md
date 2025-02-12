# App
Do-It Planner - it's an application for goal management with possibility to add different type of management system (Kanban, Eisenhower matrix) to your goals and subtasks.
Also priority system and progress bar for more easily understanding, planning and comparing.
### Clone and Deploy

```bash
git clone https://github.com/vercel/examples/tree/main/solutions/express
```

# 🔗 [DEMO](https://do-it-planner.vercel.app)  

## ⚙️ How to install

### 🔧 Backend
1. Go to /backend - "cd backend"
2. Install dependencies - npm install
3. Create .env or use .env.example and add value
    - PORT=3000
    - MONGO_URI=mongodb+srv://your-db-url
4. npm run dev

### 🎨 Frontend 
1. Go to /frontend - "cd frontend"
2. Install dependencies - npm install
3. Create .env or use .env.example and add values
  - VITE_DOMAIN="your.auth0.com"
  - VITE_CLIENT_ID="your client id"
  - VITE_BACKEND_URL="your backend url if u have one"
  - VITE_BACKEND_LOCAL_URL="http://localhost:3000" or port which you added to backend
4. npm run dev 

## 🛠 Technical stack

### 🎨 Frontend
- React + Vite

### 🔧 Backend
- Node.js + Express
- MongoDB + Mongoose
- JSON Web Token (JWT)
- CORS, dotenv


