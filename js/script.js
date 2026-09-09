// =========================================================
// NAFEESA JASNA & ASAIN
// WEDDING INVITATION INTERACTIONS
// =========================================================


// ---------------------------------------------------------
// ELEMENTS
// ---------------------------------------------------------

const hero = document.getElementById("hero");
const envelopeWrapper = document.getElementById("envelopeWrapper");
const openPrompt = document.getElementById("openPrompt");
const scrollIndicator = document.getElementById("scrollIndicator");
const storySection = document.getElementById("story");
const dateReveal = document.getElementById("dateReveal");
const rsvpForm = document.getElementById("rsvpForm");
const musicControl = document.getElementById("musicControl");
const weddingMusic = document.getElementById("weddingMusic");

// ---------------------------------------------------------
// CUSTOM SMOOTH SCROLL
// ---------------------------------------------------------

function smoothScrollToElement(element, duration = 1700) {

  if (!element) return;

  const startY = window.scrollY;
  const elementRect = element.getBoundingClientRect();

  const targetY =
    window.scrollY +
    elementRect.top -
    (window.innerHeight / 2) +
    (elementRect.height / 2);

  const distance = targetY - startY;

  let startTime = null;

  function animation(currentTime) {

    if (!startTime) {
      startTime = currentTime;
    }

    const elapsed = currentTime - startTime;

    const progress = Math.min(
      elapsed / duration,
      1
    );

    const ease =
      1 - Math.pow(1 - progress, 4);

    window.scrollTo(
      0,
      startY + distance * ease
    );

    if (progress < 1) {
      requestAnimationFrame(animation);
    }
  }

  requestAnimationFrame(animation);
}


// ---------------------------------------------------------
// ENVELOPE OPENING
// ---------------------------------------------------------

let invitationOpened = false;

function openInvitation() {

  if (invitationOpened || !hero) {
    return;
  }

  invitationOpened = true;

weddingMusic.currentTime = 0;
weddingMusic.volume = 0.3;

weddingMusic.play()
  .then(() => {
    console.log("Music started");
  })
  .catch(error => {
    console.error("Music error:", error);
  });

  hero.classList.add("opening");

  setTimeout(() => {

    smoothScrollToElement(
      envelopeWrapper,
      1900
    );

  }, 650);


  setTimeout(() => {

    hero.classList.add("revealed");

  }, 1150);


  setTimeout(() => {

    hero.classList.add("focused");

  }, 2550);
}


if (envelopeWrapper) {
  envelopeWrapper.addEventListener(
    "click",
    openInvitation
  );
}

if (openPrompt) {
  openPrompt.addEventListener(
    "click",
    openInvitation
  );
}


// ---------------------------------------------------------
// SCROLL TO STORY
// ---------------------------------------------------------

if (scrollIndicator && storySection) {

  scrollIndicator.addEventListener(
    "click",
    () => {

      smoothScrollToElement(
        storySection,
        1500
      );

    }
  );
}


// ---------------------------------------------------------
// DATE REVEAL
// ---------------------------------------------------------

if (dateReveal) {

  dateReveal.addEventListener(
    "click",
    () => {

      if (
        dateReveal.classList.contains(
          "is-revealed"
        )
      ) {
        return;
      }

      dateReveal.classList.add(
        "is-revealed"
      );

    }
  );
}


// ---------------------------------------------------------
// COUNTDOWN
// ---------------------------------------------------------

const daysElement =
  document.getElementById("days");

const hoursElement =
  document.getElementById("hours");

const minutesElement =
  document.getElementById("minutes");

const secondsElement =
  document.getElementById("seconds");


const weddingDate = new Date("2026-10-18T11:30:00");


function updateCountdown() {

  if (
    !daysElement ||
    !hoursElement ||
    !minutesElement ||
    !secondsElement
  ) {
    return;
  }

  const now = new Date();

  const difference =
    weddingDate - now;


  if (difference <= 0) {

    daysElement.textContent = "00";
    hoursElement.textContent = "00";
    minutesElement.textContent = "00";
    secondsElement.textContent = "00";

    return;
  }


  const days =
    Math.floor(
      difference /
      (1000 * 60 * 60 * 24)
    );


  const hours =
    Math.floor(
      (
        difference %
        (1000 * 60 * 60 * 24)
      ) /
      (1000 * 60 * 60)
    );


  const minutes =
    Math.floor(
      (
        difference %
        (1000 * 60 * 60)
      ) /
      (1000 * 60)
    );


  const seconds =
    Math.floor(
      (
        difference %
        (1000 * 60)
      ) /
      1000
    );


  daysElement.textContent =
    String(days).padStart(2, "0");

  hoursElement.textContent =
    String(hours).padStart(2, "0");

  minutesElement.textContent =
    String(minutes).padStart(2, "0");

  secondsElement.textContent =
    String(seconds).padStart(2, "0");
}


updateCountdown();

setInterval(
  updateCountdown,
  1000
);


// ---------------------------------------------------------
// RSVP
// ---------------------------------------------------------

const RSVP_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxaRQ_m6DkPGdbLy354-LM_s3Dres0-a83NtryZ4qpNYi13dpVR_gKjxEyBFpmylT0pOw/exec";


if (rsvpForm) {

  rsvpForm.addEventListener(
    "submit",
    async (event) => {

      event.preventDefault();


      if (!rsvpForm.checkValidity()) {

        rsvpForm.reportValidity();

        return;
      }


      const submitButton =
        rsvpForm.querySelector(
          'button[type="submit"]'
        );


      const formData =
        new FormData(rsvpForm);


      const attendanceValue =
        formData.get("attendance");


      const rsvpData = {

        name:
          formData
            .get("guestName")
            .trim(),

        attendance:
          attendanceValue === "yes"
            ? "Joyfully attending"
            : "Unable to attend",

        members:
          formData.get("guestCount"),

        message:
          formData
            .get("message")
            ?.trim() || ""
      };


      submitButton.disabled = true;

      submitButton.textContent =
        "Sending...";


      try {

        const request =
          fetch(
            RSVP_WEB_APP_URL,
            {
              method: "POST",

              mode: "no-cors",

              headers: {
                "Content-Type":
                  "text/plain;charset=utf-8"
              },

              body:
                JSON.stringify(
                  rsvpData
                )
            }
          );


        // Don't make the guest stare at
        // "Sending..." for ages.
        await Promise.race([
          request,
          new Promise(resolve =>
            setTimeout(resolve, 800)
          )
        ]);


        rsvpForm.reset();


const rsvpSuccess = document.getElementById("rsvpSuccess");
const rsvpSection = document.getElementById("rsvp");
const rsvpContent = rsvpSection.querySelector(".section-content");

const rsvpEyebrow = rsvpContent.querySelector(".section-eyebrow");
const rsvpTitle = rsvpContent.querySelector("h2");
const rsvpIntro = rsvpContent.querySelector(".rsvp-intro");

rsvpEyebrow.style.display = "none";
rsvpTitle.style.display = "none";
rsvpIntro.style.display = "none";

rsvpForm.style.display = "none";

rsvpContent.style.maxWidth = "420px";
rsvpContent.style.width = "100%";
rsvpContent.style.margin = "0 auto";
rsvpContent.style.textAlign = "center";

rsvpSuccess.style.display = "block";
        }


       catch (error) {

        console.error(
          "RSVP submission error:",
          error
        );


        submitButton.textContent =
          "Please try again";


        submitButton.disabled =
          false;
      }

    }
  );
}


// ---------------------------------------------------------
// SECTION REVEALS
// ---------------------------------------------------------

const animatedElements =
  document.querySelectorAll(
    ".section-content, .letter-card"
  );


const observer =
  new IntersectionObserver(
    entries => {

      entries.forEach(
        entry => {

          if (entry.isIntersecting) {

            entry.target
              .classList
              .add(
                "section-visible"
              );
          }

        }
      );

    },
    {
      threshold: 0.18
    }
  );


animatedElements.forEach(
  element => {

    observer.observe(element);

  }
);


// ---------------------------------------------------------
// MUSIC BUTTON
// ---------------------------------------------------------

if (musicControl) {

  musicControl.addEventListener(
    "click",
    () => {

      musicControl.classList.toggle(
        "music-selected"
      );

    }
  );
}