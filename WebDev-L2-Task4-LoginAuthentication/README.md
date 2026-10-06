# SECURESPACE — Login Authentication System

A modern client-side login authentication system developed as part of the **Oasis Infobyte Web Development and Designing Internship — Level 2 Task 4**.

SECURESPACE provides user registration, password validation, password hashing, login authentication, protected dashboard access, and logout functionality through a responsive Aurora Glass interface.

## 🚀 Features

- User registration
- Username and email validation
- Password minimum of 8 characters
- Password requires at least 1 number
- Password confirmation
- Duplicate username detection
- Duplicate email detection
- SHA-256 password hashing using the Web Crypto API
- Login using username or email
- Generic error message for invalid credentials
- Session-based authentication
- Protected dashboard
- Automatic redirect to login when no active session exists
- Display of logged-in username and email
- Logout functionality
- Session clearing after logout
- Responsive design
- Aurora Glass / glassmorphism interface

## 🛠️ Technologies Used

- HTML5
- CSS3
- JavaScript
- Web Crypto API
- Local Storage API
- Session Storage API
- CSS Flexbox
- CSS Grid

## 📂 Project Structure

```text
WebDev-L2-Task4-LoginAuthentication/
│
├── index.html
├── register.html
├── dashboard.html
├── style.css
├── script.js
├── README.md
│
└── assets/
    └── images/
        └── aurora.jpg
🔐 Authentication Flow
1. Registration

Users provide:

Username
Email address
Password
Confirm password

The password must contain at least 8 characters and at least one number.

The application also checks whether the username or email is already registered.

2. Password Hashing

Before storing an account, the entered password is processed using SHA-256 through the browser's Web Crypto API.

Only the generated password hash is stored in the account data rather than the original password.

3. Login

Users can log in using either:

Username
Email address

The entered password is hashed and compared with the stored password hash.

Invalid credentials produce a generic authentication error without identifying whether the username/email or password was incorrect.

4. Protected Dashboard

After successful authentication, a session is created using sessionStorage.

The dashboard reads the active session and displays the authenticated user's username and email.

If a user attempts to access the dashboard without an active session, the application redirects them to the login page.

5. Logout

Clicking the Logout button removes the active authentication session and redirects the user to the login page.

💾 Browser Storage

The project uses two browser storage mechanisms:

localStorage

Registered account information is stored in the browser's local storage so the account remains available after page reloads and browser restarts.

sessionStorage

The active login session is stored in session storage.

This allows the dashboard to remain accessible during the current page session while preventing access after the session has been cleared.

The Web Storage API provides separate localStorage and sessionStorage mechanisms, with localStorage persisting across browser sessions and sessionStorage being associated with the current page session.
Reference: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API

🎨 Design

The application uses an Aurora Glass visual style featuring:

Full-screen aurora background
Dark teal atmosphere
Glassmorphism cards
Frosted-glass blur
Green/cyan accent lighting
Rounded input fields
Minimal modern typography
Responsive layouts
Subtle hover effects

The same visual identity is maintained across the Login, Registration, and Dashboard pages.

📱 Responsive Design

The interface adapts to:

Desktop
Laptop
Tablet
Mobile devices

The dashboard cards automatically switch to a single-column layout on smaller screens.

🧪 Authentication Testing

The following authentication scenarios were tested:

Registration with valid details
Password validation
Duplicate username validation
Duplicate email validation
Login with username
Login with email
Incorrect password
Incorrect username/email
Successful dashboard redirect
Dashboard username display
Dashboard email display
Page refresh while logged in
Logout
Direct dashboard access without authentication
⚠️ Security Note

This project is a client-side authentication demonstration created for educational and internship purposes.

Although SHA-256 hashing is used instead of storing the original password, browser-based authentication with localStorage and sessionStorage is not suitable for production authentication systems.

A production application should use a trusted backend, secure password hashing such as bcrypt, scrypt, or Argon2, and server-managed authentication sessions.

🎯 Internship Details

Internship: Oasis Infobyte
Track: Web Development and Designing
Level: Level 2
Task: Task 4 — Login Authentication System

📚 Learning Outcomes

Through this project, I practiced:

Creating registration and login forms
Client-side form validation
DOM manipulation
Event handling
Password hashing
Browser Web Storage APIs
Session management
Protected-page logic
Authentication flow design
Responsive UI development
Glassmorphism and modern interface design
👨‍💻 Author

Oleti Abijna Narasimha Dev Varma

GitHub: https://github.com/OletiAbhi