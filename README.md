
# 📚 EZ.Exam Frontend – Interactive Math Learning App

This is the frontend part of the **MathQuest** project — a Duolingo-style interactive math learning platform for teenagers. It is built using **React.js** with a mobile-first responsive design and connects to a FastAPI backend.

---
Live Demo: https://ez-exam.faaadev.cloud
---

## 📦 Tech Stack

* React.js + Vite
* ShadcnUI + TailwindCSS (with CSS variables)
* Axios (for API communication)
* Redux (for state management)
* TypeScript

---

## 🛠️ Getting Started

### 1. Clone the Repo

```bash
git clone https://github.com/FaaaDev/ez.exam.git
cd ez.exam
```

### 2. Install Dependencies

```bash
npm install
# or
yarn
```

### 3. Configure API Endpoint

Create a `.env` file in the root directory:

```
VITE_API_BASE_URL=http://localhost:8000
```

> Replace with your backend base URL if needed.

### 4. Start the App

```bash
npm run dev
```

The app will run at [http://localhost:5173](http://localhost:5173)

---

## 🧪 Development Notes

* The app currently uses a **single demo user (user\_id=1)** – no authentication is implemented.
* All state is fetched and stored per session.
* XP/streak/progress is displayed using live backend data.
* Idempotency is supported by generating a `UUID` on the client for each submission.

---

## 📱 Mobile Preview Checklist

✅ Layout works at **390px width**
✅ All buttons/touch targets are tap-friendly
✅ No horizontal scroll / overflow issues

---

## 📤 Submission Notes

Six hours isn't a lot of time.
In the first three hours, I defined the database design. Then I moved on to creating the API.
After that, I moved on to creating the frontend. It took me an hour to layout and create all the pages.
Then, I spent the remaining two hours integrating, setting up the deployment, and finalizing the project.

In this project, the test results feature is still unfinished, and there are several unfinished pages.

The backend can be seen here (https://github.com/FaaaDev/ez-exam-api)

---

## 📌 To-Do (If More Time)

* Finishing result test features
* Build Easy Deployment (Both Frontend and Backend)
* Improve accessibility & keyboard navigation
* Finalizing UI

---

## 📄 License

MIT

---

