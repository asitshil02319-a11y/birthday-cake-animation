
const intro = document.getElementById("intro");
const celebration = document.getElementById("celebration");
const startBtn = document.getElementById("startBtn");
const blowBtn = document.getElementById("blowBtn");
const replayBtn = document.getElementById("replayBtn");
const cakeArea = document.querySelector(".cake-area");
const birthdayTitle = document.getElementById("birthdayTitle");
const birthdayMessage = document.querySelector(".birthday-message");
const confetti = document.getElementById("confetti");

// Customize the birthday name here
const birthdayName = "Golu bubu";

let timers = [];

function later(callback, delay) {
  const timer = setTimeout(callback, delay);
  timers.push(timer);
}

// Create sparkling stars
const stars = document.getElementById("stars");

for (let i = 0; i < 45; i++) {
  const star = document.createElement("span");
  star.className = "star";
  star.textContent = "✦";
  star.style.left = Math.random() * 100 + "%";
  star.style.top = Math.random() * 100 + "%";
  star.style.fontSize = (8 + Math.random() * 12) + "px";
  star.style.animationDelay = Math.random() * 2 + "s";
  stars.appendChild(star);
}

// Create confetti
function createConfetti() {
  confetti.innerHTML = "";

  const colors = [
    "#ff8db7", "#fff0a8", "#d9a8ff",
    "#ffffff", "#ffb8ce", "#ffc77d"
  ];

  for (let i = 0; i < 100; i++) {
    const piece = document.createElement("div");
    piece.className = "confetti-piece";
    piece.style.left = Math.random() * 100 + "%";
    piece.style.background =
      colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDelay = Math.random() * 2 + "s";
    piece.style.borderRadius = Math.random() > 0.5 ? "50%" : "2px";
    confetti.appendChild(piece);
  }
}

// Start the birthday animation
function startAnimation() {
  timers.forEach(clearTimeout);
  timers = [];

  // Reset animation
  document.querySelectorAll(".flame").forEach(flame => {
    flame.classList.remove("off");
  });

  cakeArea.classList.remove("show-cake");
  birthdayTitle.classList.remove("show-title");
  birthdayMessage.classList.remove("show-title");
  birthdayTitle.style.opacity = "0";
  birthdayMessage.style.opacity = "0";
  confetti.innerHTML = "";
  blowBtn.disabled = false;

  blowBtn.style.opacity = "1";
  blowBtn.style.cursor = "pointer";

  birthdayTitle.textContent = birthdayName.trim()
    ? `Happy Birthday, ${birthdayName.trim()}!`
    : "Happy Birthday!";

  intro.classList.add("hide");

  later(() => {
    intro.style.display = "none";
    celebration.style.display = "flex";
  }, 800);

  // 3 seconds: Cake rises
  later(() => {
    cakeArea.classList.add("show-cake");
  }, 1000);

  // 6 seconds: Candle flames glow
  later(() => {
    document.querySelectorAll(".flame").forEach(flame => {
      flame.style.animationPlayState = "running";
    });
  }, 6000);

  // 9 seconds: Birthday message appears
  later(() => {
    birthdayTitle.classList.add("show-title");
    birthdayMessage.classList.add("show-title");
  }, 9000);

  // 11 seconds: Confetti celebration
  later(() => {
    createConfetti();
  }, 11000);
}

// Blow out the candles
blowBtn.addEventListener("click", () => {
  document.querySelectorAll(".flame").forEach(flame => {
    flame.classList.add("off");
  });

  blowBtn.textContent = "✨ Wish made!";
  blowBtn.disabled = true;
  blowBtn.style.opacity = ".6";
});

// Replay animation
replayBtn.addEventListener("click", () => {
  intro.style.display = "block";
  intro.classList.remove("hide");
  celebration.style.display = "none";

  startBtn.textContent = "Watch again 💗";
});

startBtn.addEventListener("click", startAnimation);
