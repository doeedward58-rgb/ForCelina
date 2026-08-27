/* =========================================================
   DHYNE'S PRIVATE DASHBOARD
   ADMIN JAVASCRIPT
   Firebase Authentication + Firestore
========================================================= */


/* =========================================================
   FIREBASE IMPORTS
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getAuth,
    signInWithEmailAndPassword,
    onAuthStateChanged,
    signOut
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";

import {
    getFirestore,
    collection,
    query,
    orderBy,
    limit,
    getDocs
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


/* =========================================================
   FIREBASE CONFIG
========================================================= */

const firebaseConfig = {
    apiKey: "AIzaSyAq_r5vBpkGSWSqT-wa3CxJhm1V5IiqG5c",
    authDomain: "forcelina-f0ff4.firebaseapp.com",
    projectId: "forcelina-f0ff4",
    storageBucket: "forcelina-f0ff4.firebasestorage.app",
    messagingSenderId: "28022508231",
    appId: "1:28022508231:web:2c674b62e553ef6204cce2",
    measurementId: "G-XEBLMVB780"
};


/* =========================================================
   INITIALIZE FIREBASE
========================================================= */

const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const db =
    getFirestore(app);


/* =========================================================
   GET HTML ELEMENTS
========================================================= */

const loginSection =
    document.getElementById(
        "loginSection"
    );


const dashboardSection =
    document.getElementById(
        "dashboardSection"
    );


const loginForm =
    document.getElementById(
        "loginForm"
    );


const emailInput =
    document.getElementById(
        "email"
    );


const passwordInput =
    document.getElementById(
        "password"
    );


const loginButton =
    document.getElementById(
        "loginButton"
    );


const loginError =
    document.getElementById(
        "loginError"
    );


const loading =
    document.getElementById(
        "loading"
    );


const answerArea =
    document.getElementById(
        "answerArea"
    );


const refreshButton =
    document.getElementById(
        "refreshButton"
    );


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


/* =========================================================
   SHOW LOGIN
========================================================= */

function showLogin() {

    if (loginSection) {

        loginSection.classList.add(
            "active"
        );

    }


    if (dashboardSection) {

        dashboardSection.classList.remove(
            "active"
        );

    }

}


/* =========================================================
   SHOW DASHBOARD
========================================================= */

function showDashboard() {

    if (loginSection) {

        loginSection.classList.remove(
            "active"
        );

    }


    if (dashboardSection) {

        dashboardSection.classList.add(
            "active"
        );

    }

}


/* =========================================================
   LOGIN ERROR MESSAGE
========================================================= */

function showLoginError(
    message
) {

    if (!loginError) {
        return;
    }


    loginError.textContent =
        message;

}


/* =========================================================
   FIREBASE AUTH ERROR
========================================================= */

function getFriendlyAuthError(
    error
) {

    if (!error) {

        return "Something went wrong.";

    }


    console.error(
        "Firebase Authentication Error:",
        error
    );


    switch (error.code) {

        case "auth/invalid-credential":

            return "Invalid email or password.";


        case "auth/invalid-email":

            return "Please enter a valid email address.";


        case "auth/user-not-found":

            return "No account was found with this email.";


        case "auth/wrong-password":

            return "Incorrect password.";


        case "auth/too-many-requests":

            return "Too many login attempts. Please try again later.";


        case "auth/network-request-failed":

            return "Network error. Please check your internet connection.";


        case "auth/api-key-not-valid":

            return "Firebase API key is not valid. Check your Firebase Web App configuration.";


        case "auth/operation-not-allowed":

            return "Email/Password Authentication is not enabled in Firebase.";


        default:

            return (
                error.message ||
                "Unable to login."
            );

    }

}


/* =========================================================
   LOGIN
========================================================= */

if (loginForm) {

    loginForm.addEventListener(
        "submit",
        async (event) => {

            event.preventDefault();


            const email =
                emailInput
                    ? emailInput.value.trim()
                    : "";


            const password =
                passwordInput
                    ? passwordInput.value
                    : "";


            if (!email || !password) {

                showLoginError(
                    "Please enter your email and password."
                );

                return;

            }


            if (loginButton) {

                loginButton.disabled =
                    true;

                loginButton.innerHTML =
                    "Logging in...";

            }


            showLoginError("");


            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                console.log(
                    "Login successful."
                );


            } catch (error) {

                showLoginError(
                    getFriendlyAuthError(
                        error
                    )
                );


                if (loginButton) {

                    loginButton.disabled =
                        false;

                    loginButton.innerHTML =
                        'Enter Dashboard <span>→</span>';

                }

            }

        }
    );

}


/* =========================================================
   AUTH STATE LISTENER
========================================================= */

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            console.log(
                "Authenticated user:",
                user.uid
            );


            showDashboard();


            loadLatestResponse();

        }

        else {

            console.log(
                "No authenticated user."
            );


            showLogin();

        }

    }
);


/* =========================================================
   LOAD LATEST RESPONSE
========================================================= */

async function loadLatestResponse() {

    if (loading) {

        loading.style.display =
            "flex";

        loading.innerHTML = `

            <div class="loading-heart">
                ♥
            </div>

            <p>
                Checking for Celina's answer...
            </p>

        `;

    }


    if (answerArea) {

        answerArea.innerHTML =
            "";

    }


    try {

        const responsesCollection =
            collection(
                db,
                "responses"
            );


        const responseQuery =
            query(

                responsesCollection,

                orderBy(
                    "createdAt",
                    "desc"
                ),

                limit(1)

            );


        const snapshot =
            await getDocs(
                responseQuery
            );


        if (loading) {

            loading.style.display =
                "none";

        }


        if (snapshot.empty) {

            showNoResponse();

            return;

        }


        const latestDocument =
            snapshot.docs[0];


        const latestResponse =
            latestDocument.data();


        console.log(
            "Latest response:",
            latestResponse
        );


        showResponse(
            latestResponse
        );


    } catch (error) {

        console.error(
            "Firestore error:",
            error
        );


        if (loading) {

            loading.style.display =
                "none";

        }


        showFirestoreError(
            error
        );

    }

}


/* =========================================================
   NO RESPONSE YET
========================================================= */

function showNoResponse() {

    if (!answerArea) {
        return;
    }


    answerArea.innerHTML = `

        <div class="answer-box">

            <div class="answer-icon">
                💌
            </div>

            <h2>
                Not Yet...
            </h2>

            <p>
                Celina hasn't answered yet.
            </p>

            <p>
                Be patient, Dhyne.
                Your story is still being written. ❤️
            </p>

        </div>

    `;

}


/* =========================================================
   SHOW CELINA'S RESPONSE
========================================================= */

function showResponse(
    data
) {

    if (!answerArea) {
        return;
    }


    const choice =
        data.choice;


    const isYes =
        choice === "yes";


    const isNeedsTime =
        choice === "needs_time";


    let title =
        "Response Received";


    let icon =
        "💌";


    let message =
        "Celina has sent a response.";


    if (isYes) {

        title =
            "She Said YES! ❤️";


        icon =
            "❤️";


        message =
            "Celina gave you a chance. This is the beginning of something beautiful.";

    }


    else if (isNeedsTime) {

        title =
            "She Needs Some Time 🤍";


        icon =
            "🤍";


        message =
            "Celina needs some time. Respect her feelings and give her the space she needs.";

    }


    else {

        title =
            "Response Received";


        icon =
            "💌";

    }


    const responseDate =
        formatTimestamp(
            data.createdAt
        );


    answerArea.innerHTML = `

        <div
            class="answer-box ${
                isYes
                    ? "yes-answer"
                    : ""
            }"
        >

            <div class="answer-icon">
                ${icon}
            </div>

            <h2>
                ${title}
            </h2>

            <p>
                ${message}
            </p>

            <div class="answer-date">

                Response received:

                <br>

                ${escapeHtml(
                    responseDate
                )}

            </div>

        </div>

    `;


    if (isYes) {

        createAdminHeartBurst();

    }

}


/* =========================================================
   FORMAT FIREBASE TIMESTAMP
========================================================= */

function formatTimestamp(
    timestamp
) {

    if (!timestamp) {

        return "Date unavailable";

    }


    try {

        if (
            typeof timestamp.toDate ===
            "function"
        ) {

            return timestamp
                .toDate()
                .toLocaleString();

        }


        if (
            timestamp.seconds
        ) {

            const milliseconds =
                timestamp.seconds *
                1000;


            return new Date(
                milliseconds
            ).toLocaleString();

        }


    } catch (error) {

        console.error(
            "Timestamp formatting error:",
            error
        );

    }


    return "Date unavailable";

}


/* =========================================================
   FIRESTORE ERROR
========================================================= */

function showFirestoreError(
    error
) {

    if (!answerArea) {
        return;
    }


    let message =
        "Unable to load Celina's response.";


    if (
        error &&
        error.code ===
            "permission-denied"
    ) {

        message =
            "Firestore permission denied. Check your Firestore Security Rules.";

    }


    else if (
        error &&
        error.code ===
            "failed-precondition"
    ) {

        message =
            "Firestore needs an index for this query.";

    }


    else if (
        error &&
        error.code ===
            "unavailable"
    ) {

        message =
            "Firebase is temporarily unavailable. Please try again.";

    }


    answerArea.innerHTML = `

        <div class="answer-box">

            <div class="answer-icon">
                ⚠️
            </div>

            <h2>
                Something Went Wrong
            </h2>

            <p>
                ${escapeHtml(
                    message
                )}
            </p>

            <p>
                Open the browser console
                for the technical error.
            </p>

        </div>

    `;

}


/* =========================================================
   REFRESH BUTTON
========================================================= */

if (refreshButton) {

    refreshButton.addEventListener(
        "click",
        () => {

            loadLatestResponse();

        }
    );

}


/* =========================================================
   LOGOUT BUTTON
========================================================= */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            try {

                await signOut(
                    auth
                );


                console.log(
                    "Logged out."
                );


            } catch (error) {

                console.error(
                    "Logout error:",
                    error
                );

            }

        }
    );

}


/* =========================================================
   ADMIN FLOATING HEART
========================================================= */

function createAdminFloatingHeart() {

    const container =
        document.getElementById(
            "adminHearts"
        );


    if (!container) {
        return;
    }


    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "admin-floating-heart";


    heart.textContent =
        "♥";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (
            10 +
            Math.random() * 15
        ) + "px";


    heart.style.animationDuration =
        (
            5 +
            Math.random() * 5
        ) + "s";


    container.appendChild(
        heart
    );


    setTimeout(
        () => {

            heart.remove();

        },
        11000
    );

}


/* =========================================================
   ADMIN HEART BURST
========================================================= */

function createAdminHeartBurst() {

    const container =
        document.getElementById(
            "adminHearts"
        );


    if (!container) {
        return;
    }


    for (
        let i = 0;
        i < 25;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.className =
            "admin-floating-heart";


        heart.textContent =
            "♥";


        heart.style.left =
            (
                25 +
                Math.random() * 50
            ) + "%";


        heart.style.bottom =
            (
                15 +
                Math.random() * 30
            ) + "%";


        heart.style.fontSize =
            (
                12 +
                Math.random() * 20
            ) + "px";


        heart.style.animationDuration =
            (
                2 +
                Math.random() * 3
            ) + "s";


        container.appendChild(
            heart
        );


        setTimeout(
            () => {

                heart.remove();

            },
            6000
        );

    }

}


/* =========================================================
   START ADMIN HEARTS
========================================================= */

setInterval(
    createAdminFloatingHeart,
    1200
);


/* =========================================================
   HTML ESCAPE
========================================================= */

function escapeHtml(
    value
) {

    return String(
        value
    )

        .replaceAll(
            "&",
            "&amp;"
        )

        .replaceAll(
            "<",
            "&lt;"
        )

        .replaceAll(
            ">",
            "&gt;"
        )

        .replaceAll(
            '"',
            "&quot;"
        )

        .replaceAll(
            "'",
            "&#039;"
        );

}


/* =========================================================
   READY
========================================================= */

console.log(
    "========================================"
);

console.log(
    "Dhyne's Private Dashboard loaded ❤️"
);

console.log(
    "Firebase Project:",
    firebaseConfig.projectId
);

console.log(
    "Firestore Collection:",
    "responses"
);

console.log(
    "========================================"
);