/* =====================================================
   FOR CELINA — ADMIN
===================================================== */

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


/* =====================================================
   FIREBASE
===================================================== */

const firebaseConfig = {

    apiKey:
        "AIzaSyAq_r5vBpkGSWSqT-wa3CxJhm1V5IiqG5c",

    authDomain:
        "forcelina-f0ff4.firebaseapp.com",

    projectId:
        "forcelina-f0ff4",

    storageBucket:
        "forcelina-f0ff4.firebasestorage.app",

    messagingSenderId:
        "28022508231",

    appId:
        "1:28022508231:web:2c674b62e553ef6204cce2",

    measurementId:
        "G-XEBLMVB780"
};


const app =
    initializeApp(firebaseConfig);


const auth =
    getAuth(app);


const db =
    getFirestore(app);


/* =====================================================
   ELEMENTS
===================================================== */

const loginSection =
    document.getElementById(
        "loginSection"
    );


const dashboardSection =
    document.getElementById(
        "dashboardSection"
    );


const emailInput =
    document.getElementById(
        "emailInput"
    );


const passwordInput =
    document.getElementById(
        "passwordInput"
    );


const loginButton =
    document.getElementById(
        "loginButton"
    );


const loginStatus =
    document.getElementById(
        "loginStatus"
    );


const answerTitle =
    document.getElementById(
        "answerTitle"
    );


const answerText =
    document.getElementById(
        "answerText"
    );


const responseTime =
    document.getElementById(
        "responseTime"
    );


const refreshButton =
    document.getElementById(
        "refreshButton"
    );


const logoutButton =
    document.getElementById(
        "logoutButton"
    );


const dashboardStatus =
    document.getElementById(
        "dashboardStatus"
    );


/* =====================================================
   LOGIN
===================================================== */

if (loginButton) {

    loginButton.addEventListener(
        "click",
        async () => {

            const email =
                emailInput.value.trim();


            const password =
                passwordInput.value;


            if (!email || !password) {

                loginStatus.textContent =
                    "Please enter your email and password.";

                return;

            }


            loginStatus.textContent =
                "Logging in...";


            try {

                await signInWithEmailAndPassword(
                    auth,
                    email,
                    password
                );


                loginStatus.textContent =
                    "";

            } catch (error) {

                console.error(
                    error
                );


                loginStatus.textContent =
                    "Invalid email or password.";

            }

        }
    );

}


/* =====================================================
   AUTH STATE
===================================================== */

onAuthStateChanged(
    auth,
    (user) => {

        if (user) {

            loginSection.style.display =
                "none";


            dashboardSection.style.display =
                "block";


            loadLatestResponse();

        }

        else {

            loginSection.style.display =
                "flex";


            dashboardSection.style.display =
                "none";

        }

    }
);


/* =====================================================
   LOAD RESPONSE
===================================================== */

async function loadLatestResponse() {

    if (dashboardStatus) {

        dashboardStatus.textContent =
            "Checking for her answer... ❤️";

    }


    try {

        const responsesQuery =
            query(

                collection(
                    db,
                    "responses"
                ),

                orderBy(
                    "createdAt",
                    "desc"
                ),

                limit(1)

            );


        const snapshot =
            await getDocs(
                responsesQuery
            );


        if (
            snapshot.empty
        ) {

            answerTitle.textContent =
                "No answer yet... ❤️";


            answerText.textContent =
                "Waiting for Celina's response.";


            responseTime.textContent =
                "—";


            dashboardStatus.textContent =
                "";

            return;

        }


        const response =
            snapshot.docs[0].data();


        const choice =
            response.choice;


        if (
            choice === "yes"
        ) {

            answerTitle.textContent =
                "She Said YES! 💗";


            answerText.textContent =
                "Celina gave you a chance. This is the beginning of something beautiful.";

        }

        else {

            answerTitle.textContent =
                "She Needs Some Time 🤍";


            answerText.textContent =
                "Celina asked for some time. Respect her answer and give her the space she needs.";

        }


        if (
            response.createdAt
        ) {

            responseTime.textContent =
                response.createdAt
                    .toDate()
                    .toLocaleString();

        }

        else {

            responseTime.textContent =
                "Just now";

        }


        dashboardStatus.textContent =
            "";

    } catch (error) {

        console.error(
            "Error loading response:",
            error
        );


        dashboardStatus.textContent =
            "Unable to load response. Check Firestore rules.";

    }

}


/* =====================================================
   REFRESH
===================================================== */

if (refreshButton) {

    refreshButton.addEventListener(
        "click",
        () => {

            loadLatestResponse();

        }
    );

}


/* =====================================================
   LOGOUT
===================================================== */

if (logoutButton) {

    logoutButton.addEventListener(
        "click",
        async () => {

            try {

                await signOut(
                    auth
                );

            } catch (error) {

                console.error(
                    error
                );

            }

        }
    );

}
