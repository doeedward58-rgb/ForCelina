/* =====================================================
   FOR CELINA
   MAIN SCRIPT
===================================================== */


/* =====================================================
   FIREBASE IMPORTS
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


/* =====================================================
   FIREBASE CONFIG
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


/* =====================================================
   INITIALIZE FIREBASE
===================================================== */

const app =
    initializeApp(
        firebaseConfig
    );


const db =
    getFirestore(
        app
    );


/* =====================================================
   BACKGROUND MUSIC
===================================================== */

const backgroundMusic =
    document.getElementById(
        "backgroundMusic"
    );


if (backgroundMusic) {

    backgroundMusic.volume =
        0.35;

}


/* =====================================================
   START MUSIC
===================================================== */

function startMusic() {

    if (!backgroundMusic) {

        console.error(
            "Background music element not found."
        );

        return;

    }


    backgroundMusic.volume =
        0.35;


    const playPromise =
        backgroundMusic.play();


    if (playPromise !== undefined) {

        playPromise
            .then(() => {

                console.log(
                    "Background music started successfully."
                );

            })
            .catch((error) => {

                console.log(
                    "Browser blocked music:",
                    error
                );

            });

    }

}


/* =====================================================
   TRY AUTOPLAY
===================================================== */

if (backgroundMusic) {

    backgroundMusic
        .play()
        .then(() => {

            console.log(
                "Autoplay started."
            );

        })
        .catch(() => {

            console.log(
                "Autoplay blocked. Waiting for user interaction."
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
             * This click is the important part.
             * Mobile browsers allow audio after
             * a direct user interaction.
             */

            startMusic();


            goToPage(
                "page2"
            );

        }
    );

}


/* =====================================================
   CONTINUE BUTTONS
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

                /*
                 * Also try music whenever
                 * the user interacts.
                 */

                startMusic();


                const nextPage =
                    button.dataset.next;


                if (!nextPage) {

                    console.error(
                        "Missing data-next on button."
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
   SAVE RESPONSE TO FIRESTORE
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


        console.log(
            "Response saved:",
            choice
        );


        return true;


    } catch (error) {

        console.error(
            "Firebase error:",
            error
        );


        if (status) {

            status.textContent =
                "We couldn't save your answer. Please try again.";

        }


        return false;

    }

}


/* =====================================================
   SHOW FINAL MESSAGE
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

        status.textContent =
            "";

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
                I promise to take this one step
                at a time and make every moment count.
            </p>

            <p>
                This is only the beginning
                of our story. ❤️
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
                Whatever you decide,
                I'll respect your feelings, Celina.
            </p>

            <p>
                Thank you for hearing me out.
            </p>

        `;

    }

}


/* =====================================================
   YES BUTTON
===================================================== */

const yesButton =
    document.getElementById(
        "yesButton"
    );


if (yesButton) {

    yesButton.addEventListener(
        "click",
        async () => {

            startMusic();


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
   NEED SOME TIME BUTTON
===================================================== */

const timeButton =
    document.getElementById(
        "timeButton"
    );


if (timeButton) {

    timeButton.addEventListener(
        "click",
        async () => {

            startMusic();


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
   FLOATING HEARTS
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
   DEBUG INFORMATION
===================================================== */

console.log(
    "ForCelina website loaded successfully ❤️"
);

console.log(
    "Firebase project:",
    firebaseConfig.projectId
);

console.log(
    "Background music:",
    backgroundMusic
        ? "Found"
        : "NOT FOUND"
);
