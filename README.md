# WorkLink 🚀 - AI-Powered Local Workforce Hiring Platform

WorkLink is an AI-powered local workforce hiring platform designed to connect businesses (restaurants, banquet/function halls, hotels, supermarkets, event organizers, and local enterprises) with verified skilled workers quickly and reliably.

---

## 🌟 Key Platform Features

1. **Intelligent AI Worker-Job Matching Engine**:
   - Multi-factor heuristic ranking: calculates match scores (up to 99%) based on required skills overlap, geographic proximity, years of experience, availability status, and verified ratings.

2. **Emergency Staff SOS Requirements (Urgent Hiring Beacon)**:
   - Businesses can broadcast urgent requirements (shifts starting in < 2 hours) with automated 1.5x surge pay multipliers to verified workers within a 5 km perimeter.

3. **Automatic Staff Replacement Mechanism for Cancellations**:
   - One-click instant standby matching: when a confirmed worker cancels at the last minute, WorkLink AI immediately identifies the top available backup candidate and auto-offers or assigns the replacement.

4. **Touchless QR Attendance & Geo-Verification**:
   - Digital clock-in and clock-out with QR codes and simulated GPS geo-fencing to prevent proxy attendance and accurately calculate daily wages.

5. **Instant Payment Tracking & Wage Settlements**:
   - Verified work hours automatically populate the payment settlement ledger with instant simulated UPI / Bank Transfer payouts and zero hidden deductions.

6. **Voice-Based Profile Creation**:
   - Built-in Web Speech Recognition API allowing local workers to speak (in English, Telugu, or Hindi) to autofill their profile fields (Name, Skills, Experience, Location) without typing barriers.

7. **Multi-Language Support**:
   - Instant language switching across **English**, **తెలుగు (Telugu)**, and **हिंदी (Hindi)** for high accessibility among local Indian workforces.

8. **Verified Trust & Safety (KYC)**:
   - Worker Aadhaar/Government ID verification badges and Business GSTIN/Trade license badges with bi-directional 5-star ratings and reviews.

9. **In-App Messaging & Communication**:
   - Direct encrypted real-time chat between employers and workers to coordinate dress codes, venue directions, and shift timings.

---

## 🏗️ Technology Stack

- **Frontend**: React 19, Vite, React Router 7, Lucide Icons, QRCode.React, Web Speech API
- **Backend**: Java 21 / 24, Spring Boot, Spring Data JPA, Spring Security Crypto, MySQL Connector, Eclipse Temurin Docker Container
- **Database**: MySQL / H2 In-Memory / PostgreSQL compatible JPA schema
- **Deployment**: Vercel (Frontend SPA) + Render (Spring Boot Dockerized Web Service)

---

## 🚀 Running Locally

### 1. Frontend Setup
```bash
cd frontend (or repo root)
npm install
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 2. Backend Setup
```bash
cd backend
./mvnw clean package -DskipTests
java -jar target/Worklink1-0.0.1-SNAPSHOT.jar
```
The Spring Boot REST API will be active on [http://localhost:8080](http://localhost:8080).

---

## ☁️ Deployment Guide

### Deploying Frontend to Vercel
1. Import repository `polepakamanideep2-cpu/WorkLink` into [Vercel](https://vercel.com).
2. Framework Preset: **Vite**.
3. Build Command: `npm run build`.
4. Output Directory: `dist`.
5. Environment Variable:
   - `VITE_API_URL`: URL of your deployed backend on Render (e.g. `https://worklink-backend.onrender.com/api`).
6. Deploy! The included `vercel.json` automatically handles all SPA route rewrites.

### Deploying Backend to Render
1. Go to [Render Dashboard](https://dashboard.render.com).
2. Click **New +** -> **Web Service** (or use the Blueprint from `render.yaml`).
3. Connect repository `polepakamanideep2-cpu/WorkLink`.
4. Select Environment: **Docker**.
5. Dockerfile Path: `backend/Dockerfile` (or `Dockerfile` if deploying backend folder directly).
6. Set Environment Variables:
   - `SPRING_DATASOURCE_URL`: `jdbc:mysql://<host>:<port>/<dbname>`
   - `SPRING_DATASOURCE_USERNAME`: `<username>`
   - `SPRING_DATASOURCE_PASSWORD`: `<password>`
7. Deploy! Render will build the Temurin JDK container and expose the API with automatic health checks.

---

## 👨‍💻 Author
- GitHub: [polepakamanideep2-cpu](https://github.com/polepakamanideep2-cpu)
