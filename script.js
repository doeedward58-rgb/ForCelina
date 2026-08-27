/* =========================================================
   FOR CELINA
   MAIN WEBSITE JAVASCRIPT
   DHYNE ❤️ CELINA
   WITH BACKGROUND MUSIC
========================================================= */


/* =========================================================
   FIREBASE IMPORTS
========================================================= */

import {
    initializeApp
} from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";

import {
    getFirestore,
    collection,
    addDoc,
    serverTimestamp
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

const db =
    getFirestore(app);


/* =========================================================
   MUSIC
========================================================= */

const backgroundMusic =
    document.getElementById(
        "backgroundMusic"
    );

const musicButton =
    document.getElementById(
        "musicButton"
    );


/* =========================================================
   MUSIC SETTINGS
========================================================= */

if (backgroundMusic) {

    backgroundMusic.volume = 0.35;

}


/* =========================================================
   UPDATE MUSIC BUTTON
========================================================= */

function updateMusicButton() {

    if (!musicButton) {
        return;
    }


    if (
        backgroundMusic &&
        !backgroundMusic.paused
    ) {

        musicButton.textContent =
            "🔊";

        musicButton.setAttribute(
            "aria-label",
            "Mute music"
        );

    }

    else {

        musicButton.textContent =
            "🎵";

        musicButton.setAttribute(
            "aria-label",
            "Play music"
        );

    }

}


/* =========================================================
   PLAY MUSIC
========================================================= */

async function playMusic() {

    if (!backgroundMusic) {
        return;
    }


    try {

        await backgroundMusic.play();


        console.log(
            "Background music started 🎵"
        );


        updateMusicButton();


    } catch (error) {

        console.log(
            "Music autoplay was blocked by the browser.",
            error
        );


        updateMusicButton();

    }

}


/* =========================================================
   PAUSE MUSIC
========================================================= */

function pauseMusic() {

    if (!backgroundMusic) {
        return;
    }


    backgroundMusic.pause();


    updateMusicButton();

}


/* =========================================================
   MUSIC BUTTON
========================================================= */

if (musicButton) {

    musicButton.addEventListener(
        "click",
        async () => {

            if (!backgroundMusic) {
                return;
            }


            if (
                backgroundMusic.paused
            ) {

                await playMusic();

            }

            else {

                pauseMusic();

            }

        }
    );

}


/* =========================================================
   PAGE NAVIGATION
========================================================= */

function goToPage(pageId) {

    const currentPage =
        document.querySelector(
            ".page.active"
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


    if (
        currentPage === nextPage
    ) {

        return;

    }


    if (currentPage) {

        currentPage.classList.remove(
            "active"
        );

    }


    nextPage.classList.add(
        "active"
    );


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   OPEN MY HEART
========================================================= */

const openHeartButton =
    document.getElementById(
        "openHeartButton"
    );


if (openHeartButton) {

    openHeartButton.addEventListener(
        "click",
        async () => {

            /*
             * The user has interacted with the page,
             * so mobile browsers are more likely to
             * allow the music to start here.
             */

            await playMusic();


            goToPage(
                "page2"
            );

        }
    );

}


/* =========================================================
   NEXT BUTTONS
========================================================= */

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
                        "Missing data-next:",
                        button
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


/* =========================================================
   RESPONSE ELEMENTS
========================================================= */

const yesButton =
    document.getElementById(
        "yesButton"
    );


const timeButton =
    document.getElementById(
        "timeButton"
    );


const responseStatus =
    document.getElementById(
        "responseStatus"
    );


const finalMessage =
    document.getElementById(
        "finalMessage"
    );


/* =========================================================
   BUTTON STATE
========================================================= */

function setResponseButtonsDisabled(
    disabled
) {

    if (yesButton) {

        yesButton.disabled =
            disabled;

    }


    if (timeButton) {

        timeButton.disabled =
            disabled;

    }

}


/* =========================================================
   STATUS MESSAGE
========================================================= */

function showStatus(
    message
) {

    if (!responseStatus) {
        return;
    }


    responseStatus.textContent =
        message;

}


/* =========================================================
   SAVE RESPONSE
========================================================= */

async function saveResponse(
    choice
) {

    showStatus(
        "Saving your answer... ❤️"
    );


    setResponseButtonsDisabled(
        true
    );


    try {

        const responseData = {

            name:
                "Celina",

            choice:
                choice,

            createdAt:
                serverTimestamp(),

            source:
                "ForCelina Website"

        };


        const documentReference =
            await addDoc(

                collection(
                    db,
                    "responses"
                ),

                responseData

            );


        console.log(
            "Response saved successfully:",
            documentReference.id
        );


        return true;


    } catch (error) {

        console.error(
            "Error saving response:",
            error
        );


        showStatus(
            "We couldn't save your answer. Please try again."
        );


        setResponseButtonsDisabled(
            false
        );


        return false;

    }

}


/* =========================================================
   SHOW FINAL MESSAGE
========================================================= */

function showFinalMessage(
    choice
) {

    if (!finalMessage) {
        return;
    }


    showStatus(
        ""
    );


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
                You said YES.
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


/* =========================================================
   YES BUTTON
========================================================= */

if (yesButton) {

    yesButton.addEventListener(
        "click",
        async () => {

            console.log(
                "Celina selected YES ❤️"
            );


            const saved =
                await saveResponse(
                    "yes"
                );


            if (!saved) {
                return;
            }


            showFinalMessage(
                "yes"
            );

        }
    );

}


/* =========================================================
   NEED SOME TIME BUTTON
========================================================= */

if (timeButton) {

    timeButton.addEventListener(
        "click",
        async () => {

            console.log(
                "Celina selected NEED SOME TIME 🤍"
            );


            const saved =
                await saveResponse(
                    "needs_time"
                );


            if (!saved) {
                return;
            }


            showFinalMessage(
                "needs_time"
            );

        }
    );

}


/* =========================================================
   FLOATING HEART
========================================================= */

function createFloatingHeart() {

    const heartsContainer =
        document.getElementById(
            "hearts"
        );


    if (!heartsContainer) {
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


    heartsContainer.appendChild(
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
   START FLOATING HEARTS
========================================================= */

setInterval(
    createFloatingHeart,
    1000
);


/* =========================================================
   HEART BURST
========================================================= */

function createHeartBurst() {

    const heartsContainer =
        document.getElementById(
            "hearts"
        );


    if (!heartsContainer) {
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


        heartsContainer.appendChild(
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
   MUSIC EVENTS
========================================================= */

if (backgroundMusic) {

    backgroundMusic.addEventListener(
        "play",
        () => {

            updateMusicButton();

        }
    );


    backgroundMusic.addEventListener(
        "pause",
        () => {

            updateMusicButton();

        }
    );

}


/* =========================================================
   INITIAL MUSIC BUTTON STATE
========================================================= */

updateMusicButton();


/* =========================================================
   READY
========================================================= */

console.log(
    "========================================"
);

console.log(
    "ForCelina website loaded ❤️"
);

console.log(
    "Firebase Project:",
    firebaseConfig.projectId
);

console.log(
    "Background music:",
    backgroundMusic
        ? "Loaded"
        : "Not found"
);

console.log(
    "========================================"
);
