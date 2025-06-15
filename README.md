# 🐞 Smart Bug Tracker (Next.js + Redux Toolkit + Tailwind CSS)
# Deployed Link: https://fealty-x-task-bug-assignment.vercel.app/login


A modern and role-based Bug Tracking & Task Management application built using **Next.js 13**, **Redux Toolkit**, **Redux Persist**, **Tailwind CSS**, and **React Charts**.

> 💡 Designed for Developers & Managers to collaboratively manage, track, and analyze project bugs & tasks effectively.

---

## 🔧 Features

### ✅ 1. Authentication & Role Management
- Simple login with mock authentication (hardcoded credentials or local JSON).
- Two roles supported:
  - 👨‍💻 **Developer**
  - 👩‍💼 **Manager**
- Role-based dashboard routing.

### 🖥️ 2. Dashboard
- Developer Dashboard:
  - View assigned tasks/bugs with full details.
  - Track bug/task status updates.
- Manager Dashboard:
  - View all bugs (open, closed, and pending approval).
  - Trend line showing concurrent tasks per day using **React Charts**.
  - Time tracking summary for all developers.

### 🐛 3. Task/Bug Creation
- Developers can create new bugs/tasks with:
  - Title
  - Description
  - Priority
  - Status
  - Assignee
  - Due Date
  - Time Logs
  - Special case: when category is **Annual Forecast Revenue**, the user must enter a Year.

### 🔄 4. Task/Bug Management
- Developers:
  - Edit, update, or delete tasks.
  - Mark bugs as closed (requires manager verification).
- Managers:
  - Review bug closures.
  - Approve or reopen bugs.
- Task Filtering/Sorting:
  - Filter by priority, status, and more.

### ⏱️ 5. Time Tracker
- Developers can log time against each task.
- Track time spent per task.
- Managers can monitor time logs for all developers.

### 💅 6. UI/UX & Responsiveness
- Clean, responsive, and mobile-friendly design using **Tailwind CSS**.
- Dashboard, Modals, Forms, Charts and Notifications provide a smooth user experience.

---

## ⚙️ Tech Stack

| Layer        | Technology                     |
|--------------|---------------------------------|
| Framework    | [Next.js 13+](https://nextjs.org/) |
| Styling      | [Tailwind CSS](https://tailwindcss.com/) |
| State Mgmt   | [Redux Toolkit](https://redux-toolkit.js.org/) + [Redux Persist](https://github.com/rt2zz/redux-persist) |
| Charting     | [Recharts](https://recharts.org/) |
| Notifications| [React Toastify](https://fkhadra.github.io/react-toastify/) |
| Persistence  | LocalStorage via Redux Persist |

---

🔐 Mock Credentials

Manager:    { username: 'mgr1', password: 'mgrpass'}
Developer:  { username: 'dev1', password: 'devpass'}


