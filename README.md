<div align="center">

# 📋 Job Application Tracker

- A polished, interactive, and intuitive job application tracking tool built using React, Vite + TypeScript, Tailwind CSS, and Framer Motion.

- This project demonstrates a beautiful, real-world utility interface with delightful animations and smooth drag-and-drop interactions to manage your job hunt like a pro.


## 📋 Table of Contents

Introduction

Features

Project Implementation Process

File Structure

Technology Stack

Installation

Usage

Screenshots

Contributing

License

Contact



## 📘 Introduction

- This project presents a sleek Job Application Tracker that allows users to organize and track job applications across different stages such as Wishlist, Applied, Interview, and Offer.

- It features a drag-and-drop interface, beautiful animations, and responsive design — all aimed at making the job search process less overwhelming and more empowering.

- Ideal for job seekers who want to stay on top of their progress with a modern and engaging dashboard.



## ✨ Features

### Core Tracking
- **Kanban Board** — Visual columns for Wishlist, Applied, Interview, Offer, and Rejected
- **Timeline View** — Chronological view of all applications sorted by date
- **Dashboard Analytics** — Pie chart + stat cards showing application distribution via Recharts
- **Quick Status Change** — Inline dropdown to move jobs between stages instantly

### Authentication & Storage
- **Google & GitHub Sign-In** — Secure OAuth authentication via Firebase Auth
- **Cloud Firestore** — All job data stored per-user in Firestore with persistent cloud storage
- **Private Routes** — Protected dashboard accessible only to authenticated users

### Search & Filtering
- **Company / Role Search** — Filter applications by company name or job title
- **Location Search** — Filter applications by location
- **Clear Filters** — One-click reset to show all applications

### Job Management
- **Add Jobs** — Form modal with company, role, location, date, status, and notes
- **Edit Jobs** — Update any job application details
- **Delete Jobs** — Remove applications with a single click
- **Job Detail Modal** — Click any card to view full details in a Radix UI dialog
- **Notes Support** — Attach notes to any application with preview on cards

### UI & Experience
- **Dark / Light Mode** — System-aware theme toggle with smooth transitions
- **Framer Motion Animations** — Smooth entry, exit, and layout animations throughout
- **Toast Notifications** — Instant feedback on sign-in, sign-out, and actions
- **PDF Export** — Generate application reports using html2pdf.js
- **Fully Responsive** — Optimized for desktop, tablet, and mobile
- **Glassmorphism Header** — Frosted-glass fixed navbar with backdrop blur

---


## 🛠 Tech Stack

| Category | Technologies |
|---|---|
| **Framework** | React 18, React Router DOM |
| **Build Tool** | Vite |
| **Styling** | Tailwind CSS, CSS Variables (HSL theming) |
| **Animations** | Framer Motion, React Spring |
| **Backend** | Firebase Auth, Cloud Firestore |
| **UI Components** | Radix UI (Dialog, Dropdown, Tabs, Tooltip), Headless UI |
| **Charts** | Recharts (PieChart) |
| **Icons** | Lucide React, React Icons |
| **Utilities** | date-fns, clsx, html2pdf.js, react-hot-toast |
| **Deployment** | Vercel |

---


## 📁 Project Structure

```
src/
├── components/
│   ├── EmptyState.jsx        # Placeholder UI for empty Kanban columns
│   ├── Footer.jsx            # Site footer with social links
│   ├── Header.jsx            # Fixed navbar with auth & theme toggle
│   ├── JobCard.jsx           # Individual job card with actions
│   ├── JobModal.jsx          # Add/Edit job form dialog
│   ├── PrivateRoute.jsx      # Auth-protected route wrapper
│   ├── SignInModal.jsx       # Google/GitHub sign-in modal
│   └── TimelineView.jsx      # Chronological job timeline
├── constants/
│   └── jobStatuses.js        # Status definitions & metadata
├── firebase/
│   └── firebase.js           # Firebase config, auth providers, Firestore
├── lib/
│   └── store.js              # Firestore CRUD operations for jobs
├── pages/
│   ├── Dashboard.jsx         # Analytics dashboard with charts
│   └── Home.jsx              # Landing page with feature showcase
├── App.jsx                   # Root component with routing & state
├── App.css                   # Global styles
├── index.css                 # Tailwind directives & CSS variables
└── main.jsx                  # App entry point
```

---


## ⚡ Getting Started

### Prerequisites

- **Node.js** 18+ and **npm** (or yarn/pnpm)
- A **Firebase project** with Authentication and Firestore enabled

### 1. Clone the Repository

```bash
git clone https://github.com/RohanShrivastava08/Job-Application-Tracker.git
cd Job-Application-Tracker
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file in the project root:

```env
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_project.firebaseapp.com
VITE_FIREBASE_PROJECT_ID=your_project_id
VITE_FIREBASE_STORAGE_BUCKET=your_project.appspot.com
VITE_FIREBASE_MESSAGING_SENDER_ID=your_sender_id
VITE_FIREBASE_APP_ID=your_app_id
VITE_FIREBASE_MEASUREMENT_ID=your_measurement_id
```

### 4. Enable Firebase Services

1. Go to the [Firebase Console](https://console.firebase.google.com/)
2. Enable **Authentication** → Sign-in providers: Google and GitHub
3. Enable **Cloud Firestore** in production or test mode

### 5. Run the Development Server

```bash
npm run dev
```


## 🚀 Usage
- Add new job applications under the Wishlist column

- Move them across stages (Applied → Interview → Offer) using drag-and-drop

- Click job cards for details, and export timelines as PDFs

- Smooth animations and responsive layout enhance the experience



## 📸 Screenshots



## 🤝 Contributing
We welcome community contributions! Follow the steps below to contribute:

#### Fork the repository
- Create a new branch:
```bash
npm run build
npm run preview
```

---


## 🖥 Usage

1. **Sign In** — Click "Get Started" and authenticate with Google or GitHub
2. **Add Applications** — Click "Add Job" to log a new application with details
3. **Track Progress** — Use the status dropdown on each card to move between stages
4. **Switch Views** — Toggle between Kanban board and Timeline view
5. **Search & Filter** — Search by company/role or location to find specific applications
6. **View Analytics** — The Dashboard shows a pie chart and stat cards of your progress
7. **Toggle Theme** — Switch between dark and light mode from the header

---


## 🌐 Deployment

This project is configured for **Vercel** deployment:

```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Deploy
vercel
```

Add your environment variables in the Vercel dashboard under **Settings → Environment Variables**.

---


## 🤝 Contributing

Contributions are welcome! Here's how to get started:

1. **Fork** the repository
2. **Create** a feature branch:
   ```bash
   git checkout -b feature/your-feature
   ```
3. **Commit** your changes:
   ```bash
   git commit -m "Add your feature"
   ```
4. **Push** to the branch:
   ```bash
   git push origin feature/your-feature
   ```
5. **Open** a Pull Request with a clear description

---


## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.



## 📞 Contact
For any questions or suggestions, feel free to reach out:

- Email: rohansh0808@gmail.com
- GitHub: Rohansh0808
