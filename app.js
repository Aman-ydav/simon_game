let gameSeq = [];
let userSeq = [];

let btns = ["yellow", "red", "purple", "green"];

let level = 0;
let started = false;
let highScore = 0; // Variable to store the highest score

let h2 = document.querySelector("h2");
let h3 = document.querySelector("h3");

document.addEventListener("keypress", function () {
  if (!started) {
    console.log("game started");
    started = true;
    levelUp();
  }
});

function gameFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function userFlash(btn) {
  btn.classList.add("flash");
  setTimeout(function () {
    btn.classList.remove("flash");
  }, 200);
}

function levelUp() {
  userSeq = [];
  level++;
  h2.innerText = `Level ${level}`;

  let randIdx = Math.floor(Math.random() * 4); // Fixed: 4 instead of 3 to include all colors
  let randColor = btns[randIdx];

  let randbtn = document.querySelector(`#${randColor}`);

  gameSeq.push(randColor);
  console.log(gameSeq);
  gameFlash(randbtn);
}

function checkAns(idx) {
  if (userSeq[idx] === gameSeq[idx]) {
    if (userSeq.length === gameSeq.length) {
      setTimeout(levelUp, 500);
    }
  } else {
    h2.innerHTML = `Game over! Your score was <b>${level}.</b><br>Press any key to start`;

    if (level > highScore) {
      highScore = level; // Update high score
      h3.innerText = `High score = ${highScore}`;
    }

    document.body.classList.add("game-over");
    setTimeout(() => document.body.classList.remove("game-over"), 150);
    reset();
  }
}

function btnPress() {
  let btn = this;
  userFlash(btn);

  userColor = btn.getAttribute("id");
  userSeq.push(userColor);

  checkAns(userSeq.length - 1);
}

let allbtns = document.querySelectorAll(".btn");

for (let btn of allbtns) {
  btn.addEventListener("click", btnPress);
}

function reset() {
  started = false;
  gameSeq = [];
  userSeq = [];
  level = 0;
}
