// ========================================
// SHA-256 PASSWORD HASHING
// ========================================

async function hashPassword(password) {

    const encoder = new TextEncoder();

    const data = encoder.encode(password);

    const hashBuffer = await crypto.subtle.digest(
        "SHA-256",
        data
    );

    const hashArray = Array.from(
        new Uint8Array(hashBuffer)
    );

    const hashHex = hashArray
        .map(byte => byte.toString(16).padStart(2, "0"))
        .join("");

    return hashHex;
}


// ========================================
// GET STORED USERS
// ========================================

function getUsers() {

    const users =
        localStorage.getItem("secureSpaceUsers");

    return users ? JSON.parse(users) : [];
}


// ========================================
// SAVE USERS
// ========================================

function saveUsers(users) {

    localStorage.setItem(
        "secureSpaceUsers",
        JSON.stringify(users)
    );
}


// ========================================
// REGISTRATION PAGE
// ========================================

const registerForm =
    document.getElementById("register-form");


if (registerForm) {

    const usernameInput =
        document.getElementById("register-username");

    const emailInput =
        document.getElementById("register-email");

    const passwordInput =
        document.getElementById("register-password");

    const confirmPasswordInput =
        document.getElementById("confirm-password");

    const lengthRequirement =
        document.getElementById("length-requirement");

    const numberRequirement =
        document.getElementById("number-requirement");

    const message =
        document.getElementById("register-message");


    // ========================================
    // PASSWORD REQUIREMENTS
    // ========================================

    passwordInput.addEventListener("input", function () {

        const password = passwordInput.value;


        if (password.length >= 8) {

            lengthRequirement.classList.add("valid");

        } else {

            lengthRequirement.classList.remove("valid");

        }


        if (/\d/.test(password)) {

            numberRequirement.classList.add("valid");

        } else {

            numberRequirement.classList.remove("valid");

        }

    });


    // ========================================
    // SHOW / HIDE PASSWORD
    // ========================================

    const registerPasswordToggle =
        document.getElementById(
            "register-password-toggle"
        );


    registerPasswordToggle.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

            } else {

                passwordInput.type = "password";

            }

        }
    );


    // ========================================
    // SHOW / HIDE CONFIRM PASSWORD
    // ========================================

    const confirmPasswordToggle =
        document.getElementById(
            "confirm-password-toggle"
        );


    confirmPasswordToggle.addEventListener(
        "click",
        function () {

            if (
                confirmPasswordInput.type ===
                "password"
            ) {

                confirmPasswordInput.type = "text";

            } else {

                confirmPasswordInput.type = "password";

            }

        }
    );


    // ========================================
    // REGISTRATION
    // ========================================

    registerForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const username =
                usernameInput.value.trim();

            const email =
                emailInput.value.trim().toLowerCase();

            const password =
                passwordInput.value;

            const confirmPassword =
                confirmPasswordInput.value;


            // Clear previous message

            message.textContent = "";

            message.className =
                "form-message";


            // ====================================
            // BASIC VALIDATION
            // ====================================

            if (!username) {

                showRegisterError(
                    "Please enter a username."
                );

                return;
            }


            if (!email) {

                showRegisterError(
                    "Please enter an email address."
                );

                return;
            }


            if (password.length < 8) {

                showRegisterError(
                    "Password must contain at least 8 characters."
                );

                return;
            }


            if (!/\d/.test(password)) {

                showRegisterError(
                    "Password must contain at least one number."
                );

                return;
            }


            if (password !== confirmPassword) {

                showRegisterError(
                    "Passwords do not match."
                );

                return;
            }


            // ====================================
            // GET EXISTING USERS
            // ====================================

            const users = getUsers();


            // ====================================
            // DUPLICATE USERNAME
            // ====================================

            const usernameExists =
                users.some(
                    user =>
                        user.username.toLowerCase() ===
                        username.toLowerCase()
                );


            if (usernameExists) {

                showRegisterError(
                    "This username is already registered."
                );

                return;
            }


            // ====================================
            // DUPLICATE EMAIL
            // ====================================

            const emailExists =
                users.some(
                    user =>
                        user.email.toLowerCase() ===
                        email
                );


            if (emailExists) {

                showRegisterError(
                    "This email is already registered."
                );

                return;
            }


            // ====================================
            // HASH PASSWORD
            // ====================================

            const passwordHash =
                await hashPassword(password);


            // ====================================
            // CREATE USER
            // ====================================

            const newUser = {

                id: Date.now(),

                username: username,

                email: email,

                passwordHash: passwordHash

            };


            // ====================================
            // SAVE USER
            // ====================================

            users.push(newUser);

            saveUsers(users);


            // ====================================
            // SUCCESS
            // ====================================

            message.textContent =
                "Account created successfully!";

            message.classList.add("success");


            // Clear form

            registerForm.reset();

            lengthRequirement.classList.remove(
                "valid"
            );

            numberRequirement.classList.remove(
                "valid"
            );


            // Redirect after short delay

            setTimeout(function () {

                window.location.href =
                    "index.html";

            }, 1200);

        }
    );


    // ========================================
    // ERROR HELPER
    // ========================================

    function showRegisterError(text) {

        message.textContent = text;

        message.className =
            "form-message error";

    }

}
// ========================================
// LOGIN PAGE
// ========================================

const loginForm =
    document.getElementById("login-form");


if (loginForm) {

    const usernameInput =
        document.getElementById("login-username");

    const passwordInput =
        document.getElementById("login-password");

    const message =
        document.getElementById("login-message");


    // ====================================
    // PASSWORD VISIBILITY
    // ====================================

    const passwordToggle =
        document.getElementById("password-toggle");


    passwordToggle.addEventListener(
        "click",
        function () {

            if (passwordInput.type === "password") {

                passwordInput.type = "text";

            } else {

                passwordInput.type = "password";

            }

        }
    );


    // ====================================
    // LOGIN
    // ====================================

    loginForm.addEventListener(
        "submit",
        async function (event) {

            event.preventDefault();


            const usernameOrEmail =
                usernameInput.value.trim();

            const password =
                passwordInput.value;


            // Clear previous message

            message.textContent = "";

            message.className =
                "form-message";


            // ====================================
            // BASIC VALIDATION
            // ====================================

            if (!usernameOrEmail || !password) {

                showLoginError(
                    "Please enter your username and password."
                );

                return;
            }


            // ====================================
            // GET USERS
            // ====================================

            const users = getUsers();


            // ====================================
            // FIND USER
            // ====================================

            const user =
                users.find(function (user) {

                    return (
                        user.username.toLowerCase() ===
                        usernameOrEmail.toLowerCase()
                    )
                    ||
                    (
                        user.email.toLowerCase() ===
                        usernameOrEmail.toLowerCase()
                    );

                });


            // ====================================
            // GENERIC ERROR
            // ====================================

            if (!user) {

                showLoginError(
                    "Invalid username/email or password."
                );

                return;
            }


            // ====================================
            // HASH ENTERED PASSWORD
            // ====================================

            const enteredPasswordHash =
                await hashPassword(password);


            // ====================================
            // COMPARE PASSWORD
            // ====================================

            if (
                enteredPasswordHash !==
                user.passwordHash
            ) {

                showLoginError(
                    "Invalid username/email or password."
                );

                return;
            }


            // ====================================
            // LOGIN SUCCESS
            // ====================================

            const sessionUser = {

                id: user.id,

                username: user.username,

                email: user.email

            };


            sessionStorage.setItem(
                "secureSpaceSession",
                JSON.stringify(sessionUser)
            );


            // ====================================
            // SUCCESS MESSAGE
            // ====================================

            message.textContent =
                "Login successful!";

            message.classList.add("success");


            // ====================================
            // REDIRECT
            // ====================================

            setTimeout(function () {

                window.location.href =
                    "dashboard.html";

            }, 700);

        }
    );


    // ====================================
    // ERROR HELPER
    // ====================================

    function showLoginError(text) {

        message.textContent = text;

        message.className =
            "form-message error";

    }

}

/* =========================================
   DASHBOARD AUTHENTICATION
========================================= */

const dashboardUsername = document.getElementById("dashboard-username");
const userUsername = document.getElementById("user-username");
const userEmail = document.getElementById("user-email");
const logoutButton = document.getElementById("logout-button");

if (dashboardUsername && userUsername && userEmail) {

    const sessionData = sessionStorage.getItem("secureSpaceSession");

    if (!sessionData) {

        window.location.href = "index.html";

    } else {

        const currentUser = JSON.parse(sessionData);

        dashboardUsername.textContent = currentUser.username;
        userUsername.textContent = currentUser.username;
        userEmail.textContent = currentUser.email;
    }
}


if (logoutButton) {

    logoutButton.addEventListener("click", function () {

        sessionStorage.removeItem("secureSpaceSession");

        window.location.href = "index.html";
    });
}