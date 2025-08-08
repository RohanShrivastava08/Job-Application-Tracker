# 📋 Job Application Tracker


- A polished, interactive, and intuitive job application tracking tool built using React, Vite + TypeScript, Tailwind CSS, and Framer Motion.

- This project demonstrates a beautiful, real-world utility interface with delightful animations and smooth drag-and-drop interactions to manage your job hunt like a pro.

![Screenshot (98)](https://github.com/user-attachments/assets/56ce28c1-981c-41ab-8abb-66e0648838b5)

![Screenshot (97)](https://github.com/user-attachments/assets/7d6b66bd-b4bf-407a-b375-d514744fc95f)

![Screenshot (99)](https://github.com/user-attachments/assets/90561312-8389-4a9d-8387-f7ee00014dd5)




## 📋 Table of Contents
- Introduction
- Features
- Project Implementation Process
- File Structure
- Technology Stack
- Installation
- Usage
- Screenshots
- Contributing
- License
- Contact


## 📘 Introduction

- This project presents a sleek Job Application Tracker that allows users to organize and track job applications across different stages such as Wishlist, Applied, Interview, and Offer.

- It features a drag-and-drop interface, beautiful animations, and responsive design — all aimed at making the job search process less overwhelming and more empowering.

- Ideal for job seekers who want to stay on top of their progress with a modern and engaging dashboard.


## ✨ Features

✅ Drag-and-Drop Kanban UI – Organize applications visually using react-beautiful-dnd

🎨 Tailwind Styling – Utility-first CSS for rapid, responsive design

⚛️ React + TypeScript – Strongly typed functional components

🎥 Framer Motion Animations – Smooth transitions and entry effects

📅 Timeline View Support – Optional vertical timeline for progress overview

🔥 Toasts & Notifications – Feedback using react-hot-toast

📄 Export Feature – Generate PDFs using html2pdf.js

🔐 Firebase Integration – Easily extendable for auth/storage (optional)

📱 Fully Responsive – Optimized for desktop, tablet, and mobile views



## 🛠 Project Implementation Process

#### 1. Setup & Environment
- Bootstrapped using Vite with TypeScript template
- Tailwind CSS and Framer Motion configured for styling and animations
- Firebase-ready structure included for optional authentication and data sync

#### 2. Core Functionality
- Job entries managed in stages using React state and data structures
- Drag-and-drop interactions handled via react-beautiful-dnd
- Smooth animations and conditional rendering for user feedback

#### 3. UX & Animations
- Layout and element transitions powered by framer-motion
- Micro-interactions on hover, click, and state changes
- Toast notifications integrated for key actions

#### 4. Final Touches
- Responsive grid layout for various screen sizes
- PDF export capability for reports
- Accessibility considerations added

## 📁 File Structure

```bash
job-application-tracker/
├── public/                 # Static assets
├── src/
│   ├── components/         # TrackerBoard, Card, Navbar, etc.
│   ├── pages/              # Page components
│   ├── App.tsx             # Root component
│   ├── index.css           # Tailwind CSS entry
│   ├── main.tsx            # App entry via Vite
├── tailwind.config.js
├── tsconfig.json
├── vite.config.ts
├── package.json
```

## 💻 Technology Stack

Category	Technology

⚛️ Framework	React + TypeScript

🎨 Styling	Tailwind CSS

🎥 Animations	Framer Motion, React Spring

📦 Features	React DnD, Toasts, Firebase Ready

⚡ Tooling	Vite


## 🛠 Installation

Follow these steps to set up and run the Techny project locally:

#### 1. Clone the repository
```bash
git clone https://github.com/YourUsername/job-application-tracker.git
cd job-application-tracker
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Run the frontend

```bash
npm run dev
```

## 🚀 Usage
- Add new job applications under the Wishlist column

- Move them across stages (Applied → Interview → Offer) using drag-and-drop

- Click job cards for details, and export timelines as PDFs

- Smooth animations and responsive layout enhance the experience


## 📸 Screenshots

![Screenshot (105)](https://github.com/user-attachments/assets/4271025b-0276-487a-a8a5-37be37206a53)

![Screenshot (104)](https://github.com/user-attachments/assets/b1b6cd0b-4079-4c87-a175-9362a16bb383)

![Screenshot (103)](https://github.com/user-attachments/assets/9e4187f3-ce0f-441d-a6ab-34e285e3a304)

![Screenshot (102)](https://github.com/user-attachments/assets/1c44bbc8-ba1b-442b-a1fe-11375099b773)

![Screenshot (101)](https://github.com/user-attachments/assets/af926fad-fa70-4794-8642-7c0f5f48fa18)

![Screenshot (100)](https://github.com/user-attachments/assets/653fca41-b90c-4004-99e9-817e1573d891)

![Screenshot (99)](https://github.com/user-attachments/assets/90561312-8389-4a9d-8387-f7ee00014dd5)

![Screenshot (98)](https://github.com/user-attachments/assets/56ce28c1-981c-41ab-8abb-66e0648838b5)

![Screenshot (97)](https://github.com/user-attachments/assets/7d6b66bd-b4bf-407a-b375-d514744fc95f)

![Screenshot (109)](https://github.com/user-attachments/assets/8df0f393-8150-4bf7-80e2-dd7ecc294861)

![Screenshot (108)](https://github.com/user-attachments/assets/f073beb4-7b7f-4eed-8100-bc75b6de2a9e)

![Screenshot (107)](https://github.com/user-attachments/assets/64e00deb-dc85-4975-9ba3-d97f4755d65b)

![Screenshot (106)](https://github.com/user-attachments/assets/1e200ead-37a0-4f9f-85ec-8d9d7aa668c9)



## 🤝 Contributing
We welcome community contributions! Follow the steps below to contribute:

#### Fork the repository
- Create a new branch:
```bash
git checkout -b feature/YourFeature
```

- Commit your changes:
```bash
git commit -m 'Add your feature'
```

- Push to the branch:
```bash
git push origin feature/YourFeature
```

- Open a pull request with detailed explanations of your changes.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 📞 Contact
For any questions or suggestions, feel free to reach out:

- Email: rohansh0808@gmail.com
- GitHub: Rohansh0808
