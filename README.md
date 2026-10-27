# EventTalentBridge — Frontend Web Application

Frontend requirement-posting flow for **EventTalentBridge**, connecting event hosts with planners, performers, and specialized crew.

Built with **Next.js (App Router)**, **JavaScript / JSX**, **Tailwind CSS**, **React Hook Form**, and **Zod**.

---

## 🚀 Features

- **Pure JavaScript & JSX:** 100% TypeScript-free codebase as specified.
- **4-Step Requirement Wizard:**
  1. **Event Fundamentals:** Event name, dynamic types, calendar dates (`YYYY-MM-DD`), location, venue, and interactive service category selection cards.
  2. **Category-Specific Details:** Dynamic inputs tailored to the chosen category (Planner scope & style, Performer genre & minutes, or Crew dynamic role repeater & headcount).
  3. **Logistics & Budget:** Deliverables toggles, audio system responsibility clarity, shift hours, and INR budget ranges / rates.
  4. **Review & Edit:** Comprehensive pre-submission review with direct jump-to-edit actions for any step.
- **Persistent Draft Storage:** Automatically stores unfinished requirements in `localStorage` so refreshing does not wipe progress; includes an explicit "Reset Draft" action.
- **Dual Layer Validation:** Real-time client-side Zod validation with friendly inline error messaging.
- **Centralized API Client:** Isolated fetch requests with consistent error handling and toast notifications via `sonner`.
- **Success Screen:** Displays confirmed backend-issued requirement ID, `OPEN` status badge, and event overview.

---

## 📂 Project Structure

```text
client/
├── src/
│   ├── app/
│   │   ├── globals.css                # Tailwind directives & smooth animations
│   │   ├── layout.jsx                 # App shell, brand header, Sonner Toaster, footer
│   │   └── page.jsx                   # Home landing page with hero header
│   ├── components/
│   │   └── requirement-form/
│   │       ├── requirement-wizard.jsx # Multi-step state, validation & submission orchestrator
│   │       ├── progress-indicator.jsx # 4-step progress stepper with status badges
│   │       ├── event-basics-step.jsx  # Step 1: Shared event inputs & category cards
│   │       ├── planner-details-step.jsx # Step 2 & 3 for Planner category
│   │       ├── performer-details-step.jsx # Step 2 & 3 for Performer category
│   │       ├── crew-details-step.jsx  # Step 2 & 3 for Crew category (dynamic repeater)
│   │       ├── review-step.jsx        # Step 4: Summary breakdown with edit links
│   │       └── success-screen.jsx     # Post-submission confirmation & ID display
│   ├── constants/
│   │   └── form-options.js            # Select options, category metadata, and units
│   └── lib/
│       ├── api.js                     # Centralized API fetcher & payload formatter
│       ├── draft-storage.js           # Safe localStorage draft persistence
│       └── validation.js              # Zod validation schemas per step
├── .env.example
├── .env.local
├── .gitignore
├── jsconfig.json
├── next.config.mjs
├── package.json
├── postcss.config.js
├── tailwind.config.js
└── README.md
```

---

## ⚙️ Environment Variables

Create `.env.local` or copy from `.env.example`:

```bash
cp .env.example .env.local
```

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api
```

---

## 🛠️ Setup & Running

### 1. Install Dependencies
```bash
npm install
```

### 2. Run in Development Mode
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to view the application in the browser.

### 3. Build for Production
```bash
npm run build
npm start
```
