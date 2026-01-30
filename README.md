# Mandarin Learning App

## Overview  
A web-based application for learning Mandarin vocabulary. Users can practice words, test themselves, and track progress. The app features a clean interface, randomized quizzes, and persistent tracking of correct answers.  

The backend uses **MySQL indexing** on the `vocab.id` column to make random word lookups fast, even with large datasets.

---

## Table of Contents  
1. [Technologies Used](#technologies-used)  
2. [Features](#features)  
3. [Project Structure](#project-structure)  
4. [Database Setup](#database-setup)  
5. [Installation & Running](#installation--running)  
6. [How It Works](#how-it-works)  
7. [Future Improvements](#future-improvements)  
8. [Screenshots](#screenshots)  

---

## Technologies Used  
- **Frontend:** Next.js, React, TypeScript, CSS Modules  
- **Backend:** Node.js, Express.js, TypeScript, Axios  
- **Database:** MySQL with **indexed `id` column** for faster random word queries  
- **Other Tools:** Git, GitHub, VS Code  

---

## Features  
- Randomized Mandarin vocabulary quizzes  
- Real-time answer checking with immediate feedback  
- Tracks user progress (correct/attempted answers)  
- Auto-loads new question after each attempt  
- Indexed database ensures fast random word lookups  
- Simple, responsive, and intuitive interface  
- Persistent storage using MySQL  

---

## Project Structure  
```
mandarin-learning-app/
│
├─ backend/
│   ├─ db.ts           # Database connection
│   ├─ server.ts       # API endpoints
│   ├─ package.json
│   └─ tsconfig.json
│
├─ frontend/
│   ├─ app/
│   │   └─ page.tsx    # Main quiz page
│   ├─ page.module.css # Styling
│   ├─ package.json
│   └─ tsconfig.json
│
├─ mandarin_learning_app.sql  # Database dump with vocab & progress tables
└─ README.md
```

---

## Database Setup  
1. Import the SQL file into MySQL:  
   ```bash
   mysql -u <username> -p < mandarin_learning_app.sql
   ```

2. Configure backend database connection (`backend/db.ts`):  
   ```typescript
   export const pool = mysql.createPool({
     host: "localhost",
     user: "<username>",
     password: "<password>",
     database: "mandarin_learning_app",
   });
   ```

3. **Database tables:**  
   - `vocab`: stores Mandarin words, pinyin, and English meanings  
     - *Indexed on `id` for faster random selection*  
   - `progress`: tracks user quiz attempts  

4. **Why indexing?**  
   The `id` column in `vocab` is indexed. This makes queries like:  
   ```sql
   SELECT * FROM vocab WHERE id >= ? ORDER BY id LIMIT 1
   ```
   much faster than scanning every row, especially as the table grows. This ensures random quizzes load instantly.

---

## Installation & Running  

### Backend  
```bash
cd backend
npm install
npm run dev
```

### Frontend  
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to use the app.  
Backend API runs on [http://localhost:5000](http://localhost:5000).

---

## How It Works  
1. Frontend automatically loads a random word from the backend.  
2. User types the English meaning and clicks **Check Answer**.  
3. Feedback is displayed immediately (Correct / Wrong).  
4. User progress is stored in MySQL.  
5. Click **Next Question** to load a new word.  
6. **Optimized for performance:** thanks to the indexed `id` column, fetching random words remains fast.

---

## Future Improvements  
- Add multiple difficulty levels  
- Implement user authentication  
- Leaderboard for top scores  
- Audio pronunciation for words  
- Mobile-friendly responsive design  

---

## Screenshots  
<img width="1009" height="769" alt="Screenshot_1" src="https://github.com/user-attachments/assets/28eecb8a-685d-438e-b4e1-1ee7999c9374" />
<img width="1008" height="799" alt="Screenshot_2" src="https://github.com/user-attachments/assets/8638133e-a90c-4ccb-9398-a9677e568ef5" />

