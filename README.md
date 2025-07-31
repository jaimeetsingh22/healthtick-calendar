# HealthTick Calendar App
This project is a custom calendar system built with React, TypeScript, and Tailwind CSS. It allows coaches to view and book onboarding and follow-up calls with clients. The project integrates Firebase Firestore for data storage and includes logic to handle recurring calls and prevent scheduling conflicts.

## Tech Stack
- React + TypeScript

- Tailwind CSS

- Firebase Firestore

- Framer Motion (animations)

- Vite (build tool)

### How to Run the App
1. Clone the repository
```bash 
git clone https://github.com/your-username/healthtick-calendar.git
cd healthtick-calendar
```
2. Install dependencies
```bash
npm install 
```
3. Set up Firebase

### Create a Firebase project.

Enable Firestore Database.

Create two collections: clients and bookings.

Add your Firebase configuration in src/firebase.ts:

```ts
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "YOUR_KEY",
  authDomain: "YOUR_DOMAIN",
  projectId: "YOUR_ID",
  storageBucket: "YOUR_BUCKET",
  messagingSenderId: "YOUR_SENDER_ID",
  appId: "YOUR_APP_ID",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
```
4. Run the development server
```bash
npm run dev
The app will be available at http://localhost:5173.
```
## Firebase Schema

### clients Collection
Stores client details (static list of 20 dummy clients).
```json
{
  "name": "Alice",
  "phone": "9876543210"
}
```
### bookings Collection
Stores booking information for onboarding and follow-up calls.

```json
{
  "clientId": "abc123",
  "clientName": "Alice",
  "callType": "onboarding" | "follow-up",
  "date": "2025-07-31",
  "time": "11:10",
  "duration": 40,
  "recurring": true
}
```
### Features
- Daily calendar view with 20-minute slots (10:30 AM – 7:30 PM)

- Search and select clients for booking

- Book either onboarding (40 min) or follow-up (20 min) calls

- Automatically repeats follow-up calls weekly

- Displays both one-time and recurring calls for a selected day

- Prevents overlapping call bookings

- Option to delete booked calls

 Assumptions
~ Follow-up calls recur weekly on the same weekday and time.

~ Calls can only be booked in predefined 20-minute slots.

~ All times are considered in the local timezone.

~ Single-coach usage is assumed; multi-user scheduling is not implemented.
 
Deployment
~ Deployed using Vercel or Netlify.

To deploy manually:

~ Push the repository to GitHub.

~ Connect it to your Vercel or Netlify account.

~ Set the build command to npm run build and the output directory to dist.