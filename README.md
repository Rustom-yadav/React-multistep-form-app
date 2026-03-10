# 📋 Multi-Step Form Application

 A React-based multi-step form with validation, progress indicator, and localStorage persistence. Built with Vite and React 19.

**🌐 Live:** [View here](https://react-multistep-form-app-eight.vercel.app/)  
**📂 GitHub:** [Rustom-yadav/React-multistep-form-app](https://github.com/Rustom-yadav/React-multistep-form-app)

## Features

- **5-step form flow**: Personal Info → Professional Info → Education → Preferences → Review & Submit
- **Per-step validation** with inline error messages (required fields, email/phone format, min length)
- **Custom hook** (`useMultiStepForm`) for state, validation, and navigation
- **Progress bar & stepper** – visual progress and clickable steps (back only)
- **LocalStorage** – form data is saved as you type; survives page refresh
- **Review step** with “Edit” buttons to jump back to any previous step
- **Success screen** with animated checkmark and option to submit again
- **Responsive layout** – works on mobile and desktop
- **No extra form libraries** – pure React and CSS

## Tech Stack

- **React** 19
- **Vite** 7
- **ESLint** (React hooks + refresh)

## Project Structure

```
src/
├── main.jsx                 # Entry point, mounts App
├── App.jsx                  # Main UI: stepper, progress bar, form, buttons
├── App.css                  # Component styles
├── index.css                # Global styles, CSS variables
├── hooks/
│   └── useMultiStepForm.js   # Form state, validation, next/prev/submit, localStorage
├── components/
│   ├── Stepper.jsx           # Step indicators (Personal, Professional, …)
│   ├── FormWrapper.jsx       # Reusable step layout (title, description, children)
│   ├── SuccessScreen.jsx     # Post-submit screen with reset
│   └── steps/
│       ├── PersonalInfo.jsx      # Step 1: name, email, phone, DOB
│       ├── ProfessionalInfo.jsx  # Step 2: company, role, experience, skills
│       ├── Education.jsx          # Step 3: degree, university, year, GPA
│       ├── Preferences.jsx       # Step 4: theme, communication, newsletter, bio
│       └── ReviewSubmit.jsx      # Step 5: review all data, edit links, submit
```

## Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- npm (or yarn/pnpm)

### Install

```bash
npm install
```

### Development

```bash
npm run dev
```

Opens the app at `http://localhost:5173` (or next available port).

### Build

```bash
npm run build
```

Output is in the `dist/` folder.

### Preview production build

```bash
npm run preview
```

### Lint

```bash
npm run lint
```

## Form Steps Overview

| Step | Screen           | Main fields / actions                                      |
|------|------------------|-------------------------------------------------------------|
| 1    | Personal Info    | First name, last name, email, phone, date of birth        |
| 2    | Professional     | Company, role, experience (dropdown), skills (multi-select) |
| 3    | Education        | Degree, university, graduation year, GPA (optional)         |
| 4    | Preferences       | Theme, communication, newsletter, short bio (min 20 chars) |
| 5    | Review & Submit  | Read-only summary + Edit per section, Submit button         |

After submit, a success screen is shown with an option to start over (“Submit Another Response”).

## How It Works (High Level)

1. **App.jsx** uses the `useMultiStepForm(5)` hook and gets `currentStep`, `formData`, `errors`, `nextStep`, `prevStep`, `submitForm`, etc.
2. **Stepper** shows the 5 steps; completed steps are clickable to go back.
3. **Current step** is rendered by a `switch` on `currentStep` (PersonalInfo, ProfessionalInfo, … ReviewSubmit).
4. **Continue** runs validation for the current step; if valid, it moves to the next step.
5. **Submit** (on step 5) validates again, sets submitted state, and shows **SuccessScreen**.
6. **Form data** is updated via `updateField` and synced to localStorage in the hook.

## License

MIT License. See [LICENSE](LICENSE) for details.
