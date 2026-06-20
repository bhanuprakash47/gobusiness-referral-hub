# GoBusiness Referral Hub

GoBusiness Referral Hub is a React-based referral dashboard application with a simple login flow, protected routes, and referral management screens.

It lets a user sign in, view dashboard metrics, search and sort referrals, open referral details, and log out securely using a JWT stored in cookies.

## Features

- Email and password login
- JWT-based authentication using cookies
- Protected dashboard and referral details pages
- Referral overview cards and service summary section
- Search, sort, and pagination in the referrals table
- Individual referral detail view
- Loading and error states
- Not Found page for invalid routes
- Logout support from the header

## Tech stack

- React
- React Router DOM
- Axios
- js-cookie
- React Icons
- Create React App
- CSS

## Project structure

```bash
src/
├── App.js
├── App.css
├── App.test.js
├── index.js
├── index.css
├── reportWebVitals.js
├── setupTests.js
└── components/
    ├── Dashboard/
    │   ├── index.jsx
    │   └── index.css
    ├── Header/
    │   ├── index.jsx
    │   └── index.css
    ├── Login/
    │   ├── index.jsx
    │   └── index.css
    ├── NotFound/
    │   ├── index.jsx
    │   └── index.css
    ├── Overview/
    │   ├── index.jsx
    │   └── index.css
    ├── Referral/
    │   ├── index.jsx
    │   └── index.css
    ├── ReferralDetails/
    │   ├── index.jsx
    │   └── index.css
    ├── ReferralsTable/
    │   ├── index.jsx
    │   └── index.css
    ├── ServiceSummary/
    │   ├── index.jsx
    │   └── index.css
    ├── LoadingView/
    │   ├── index.jsx
    │   └── index.css
    └── FailureView/
        ├── index.jsx
        └── index.css
```

## How it works

### Login
The login page accepts an email and password, calls the sign-in API, and stores the returned JWT token in a cookie for 7 days. If the user is already logged in, the app redirects them to the dashboard.

### Protected routes
The dashboard and referral details pages are protected. If the `jwt_token` cookie is missing, the app redirects the user back to `/login`.

### Dashboard
The dashboard fetches referral data from the API and displays:
- overview metrics
- service summary
- referral link and code
- referrals table

The table supports:
- search
- sort by date
- pagination
- navigation to referral details

### Referral details
Each referral can be opened using its ID from the URL. The page shows the selected partner’s full details in a clean card layout.

### Header
The header contains the Go Business brand, a “Try for free” button, and a logout button that clears the cookie and sends the user back to the login page.

## API endpoints used

- `POST /api/auth/signin`
- `GET /api/referrals`
- `GET /api/referrals?id=:id`
- `GET /api/referrals?search=:query&sort=:order`

## Installation

```bash
git clone https://github.com/bhanuprakash47/gobusiness-referral-hub.git
cd gobusiness-referral-hub
npm install
```

## Run the project

```bash
npm start
```

This runs the app in development mode, usually at `http://localhost:3000`.

## Run tests

```bash
npm test
```

## Build for production

```bash
npm run build
```

## Notes

- The app uses client-side routing with React Router DOM.
- Authentication is handled through cookies, not local storage.
- The default test file is still present and can be expanded later.
- The UI is split into small reusable components, which makes the code easy to maintain.

## Future improvements

- Add copy-to-clipboard for referral link and code
- Improve the test coverage
- Add better empty state handling
- Add charts for referral performance
- Add mobile-friendly refinements
- Move API base URLs into environment variables

---

Built to keep referral tracking simple, organized, and easy to use.
