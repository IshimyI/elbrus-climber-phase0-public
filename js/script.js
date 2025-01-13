let jumpCount = 0;
const climber = document.querySelector(".climber-wrapper");
const input = document.querySelector(".sign");
const toTop = [
  1, 2, 4, 5, 6, 7, 19, 20, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31,
];
const toBottom = [3, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 21];

let startFlag = true;
let finalFlag = false;

document.addEventListener("click", (event) => {
  event.preventDefault();
  input.focus();
});

input.focus();

input.addEventListener("keydown", logKey);

function logKey(e) {
  if (!finalFlag) {
    if (e.key === " " && startFlag) {
      document.querySelector(".sign").classList.add("hidden");
      climber.classList.add("z-index");
      document.querySelector(".climber").classList.remove("dancing");
      startFlag = false;
      jump();
      jumpCount = 1;
    } else if (
      toTop.includes(jumpCount) &&
      (e.key === "z" || e.key === "Z" || e.key === "я" || e.key === "Я") &&
      !startFlag
    ) {
      jump();
    } else if (
      toBottom.includes(jumpCount) &&
      (e.key === "x" || e.key === "X" || e.key === "ч" || e.key === "Ч") &&
      !startFlag
    ) {
      jump();
    } else {
      thatsSad();
    }
  }
}

function jump() {
  jumpCount++;
  const jumpElement = document.querySelector(`.point:nth-child(${jumpCount})`);
  const sign = document.querySelector(".sign");
  sign.classList.add("width-0");
  sign.click();
  const currentLeft = parseInt(getComputedStyle(jumpElement).left, 10) || 0;
  const currentTop = parseInt(getComputedStyle(jumpElement).top, 10) || 0;
  climber.style.left = `${currentLeft - 100}px`;
  climber.style.top = `${currentTop}px`;
  sign.style.left = `${currentLeft + 200}px`;
  sign.style.top = `${currentTop}px`;

  if (jumpCount > 22 && jumpCount < 27) {
    sign.style.left = `${currentLeft}px`;
    sign.style.top = `${currentTop}px`;
  }

  if (jumpCount === 31) {
    document.querySelector(".win-win").classList.remove("hidden");
    climber.classList.remove("z-index");
    climber.classList.add("dancing");
    document.querySelectorAll(".point").forEach((point) => {
      point.classList.add("not-z-index");
    });
    finalFlag = true;
    setTimeout(() => {
      location.reload();
    }, 3000);
  }
}

function thatsSad() {
  climber.classList.add("die");
  setTimeout(() => {
    const sign = document.querySelector(".sign");
    sign.style.left = `0px`;
    sign.style.top = `0px`;
    input.focus();
    sign.click();
    location.reload();
  }, 3000);
}
