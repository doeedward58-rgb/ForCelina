/* =====================================================
   FOR CELINA
   MAIN JAVASCRIPT
===================================================== */


/* =====================================================
   FIREBASE
===================================================== */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";


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


const db =
    getFirestore(app);


/* =====================================================
   MUSIC
===================================================== */

const backgroundMusic =
    document.getElementById(
        "backgroundMusic"
    );


if (backgroundMusic) {

    backgroundMusic.volume = 0.35;


    /*
     * Try autoplay first.
     */

    backgroundMusic
        .play()
        .then(() => {

            console.log(
                "Music started automatically 🎵"
            );

        })
        .catch(() => {

            console.log(
                "Browser blocked autoplay."
            );

        });

}


/* =====================================================
   START MUSIC
===================================================== */

function startMusic() {

    if (!backgroundMusic) {
        return;
    }


    backgroundMusic
        .play()
        .then(() => {

            console.log(
                "Background music started ❤️"
            );

        })
        .catch((error) => {

            console.log(
                "Music could not start:",
                error
            );

        });

}


/* =====================================================
   PAGE NAVIGATION
===================================================== */

function goToPage(
    pageId
) {

    const pages =
        document.querySelectorAll(
            ".page"
        );


    pages.forEach(
        (page) => {

            page.classList.remove(
                "active"
            );

        }
    );


    const nextPage =
        document.getElementById(
            pageId
        );


    if (!nextPage) {

        console.error(
            "Page not found:",
            pageId
        );

        return;

    }


    nextPage.classList.add(
        "active"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =====================================================
   OPEN MY HEART
===================================================== */

const openHeartButton =
    document.getElementById(
        "openHeartButton"
    );


if (openHeartButton) {

    openHeartButton.addEventListener(
        "click",
        () => {

            /*
             * User interaction allows
             * mobile browsers to start audio.
             */

            startMusic();


            goToPage(
                "page2"
            );

        }
    );

}


/* =====================================================
   NEXT BUTTONS
===================================================== */

const nextButtons =
    document.querySelectorAll(
        ".next-button"
    );


nextButtons.forEach(
    (button) => {

        button.addEventListener(
            "click",
            () => {

                const nextPage =
                    button.dataset.next;


                if (!nextPage) {

                    console.error(
                        "Missing data-next"
                    );

                    return;

                }


                goToPage(
                    nextPage
                );

            }
        );

    }
);


/* =====================================================
   SAVE RESPONSE
===================================================== */

async function saveResponse(
    choice
) {

    const status =
        document.getElementById(
            "responseStatus"
        );


    if (status) {

        status.textContent =
            "Saving your answer... ❤️";

    }


    try {

        await addDoc(

            collection(
                db,
                "responses"
            ),

            {

                name:
                    "Celina",

                choice:
                    choice,

                createdAt:
                    serverTimestamp(),

                source:
                    "ForCelina Website"

            }

        );


        return true;


    } catch (error) {

        console.error(
            "Firebase error:",
            error
        );


        if (status) {

            status.textContent =
                "Something went wrong. Please try again.";

        }


        return false;

    }

}


/* =====================================================
   FINAL MESSAGE
===================================================== */

function showFinalMessage(
    choice
) {

    const finalMessage =
        document.getElementById(
            "finalMessage"
        );


    const status =
        document.getElementById(
            "responseStatus"
        );


    if (!finalMessage) {
        return;
    }


    if (status) {
        status.textContent = "";
    }


    finalMessage.classList.add(
        "show"
    );


    if (
        choice === "yes"
    ) {

        finalMessage.innerHTML = `

            <div class="final-heart">
                ❤️
            </div>

            <h3>
                You said yes.
            </h3>

            <p>
                I don't think you know how happy
                those words just made me.
            </p>

            <p>
                Thank you for giving me a chance,
                Celina.
            </p>

            <p>
                I'll do my best to make this
                journey worth it. ❤️
            </p>

        `;


        createHeartBurst();

    }

    else {

        finalMessage.innerHTML = `

            <div class="final-heart">
                🤍
            </div>

            <h3>
                Take all the time you need.
            </h3>

            <p>
                I don't want you to feel pressured
                to give me an answer.
            </p>

            <p>
                I'll respect whatever you feel,
                Celina.
            </p>

            <p>
                Thank you for being honest with me. 🤍
            </p>

        `;

    }

}


/* =====================================================
   YES
===================================================== */

const yesButton =
    document.getElementById(
        "yesButton"
    );


if (yesButton) {

    yesButton.addEventListener(
        "click",
        async () => {

            yesButton.disabled =
                true;


            const saved =
                await saveResponse(
                    "yes"
                );


            if (saved) {

                showFinalMessage(
                    "yes"
                );

            }


            yesButton.disabled =
                false;

        }
    );

}


/* =====================================================
   NEED SOME TIME
===================================================== */

const timeButton =
    document.getElementById(
        "timeButton"
    );


if (timeButton) {

    timeButton.addEventListener(
        "click",
        async () => {

            timeButton.disabled =
                true;


            const saved =
                await saveResponse(
                    "needs_time"
                );


            if (saved) {

                showFinalMessage(
                    "needs_time"
                );

            }


            timeButton.disabled =
                false;

        }
    );

}


/* =====================================================
   FLOATING HEART
===================================================== */

function createFloatingHeart() {

    const container =
        document.getElementById(
            "hearts"
        );


    if (!container) {
        return;
    }


    const heart =
        document.createElement(
            "div"
        );


    heart.className =
        "floating-heart";


    heart.textContent =
        "♥";


    heart.style.left =
        Math.random() * 100 + "%";


    heart.style.fontSize =
        (
            10 +
            Math.random() * 18
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


setInterval(
    createFloatingHeart,
    1200
);


/* =====================================================
   HEART BURST
===================================================== */

function createHeartBurst() {

    const container =
        document.getElementById(
            "hearts"
        );


    if (!container) {
        return;
    }


    for (
        let i = 0;
        i < 35;
        i++
    ) {

        const heart =
            document.createElement(
                "div"
            );


        heart.className =
            "floating-heart";


        heart.textContent =
            "♥";


        heart.style.left =
            (
                20 +
                Math.random() * 60
            ) + "%";


        heart.style.bottom =
            (
                15 +
                Math.random() * 25
            ) + "%";


        heart.style.fontSize =
            (
                12 +
                Math.random() * 22
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


/* =====================================================
   CONSOLE
===================================================== */

console.log(
    "ForCelina loaded successfully ❤️"
);

console.log(
    "Firebase project:",
    firebaseConfig.projectId
);

console.log(
    "Music:",
    backgroundMusic
        ? "background-music.mp3 loaded"
        : "Music element missing"
);
