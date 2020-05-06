let gameInterval;
let boxLevel;
let level = 1;

const resetBtn = document.querySelector(".reset-button");
const startBtn = document.querySelector(".start-button");
const boxs = document.querySelectorAll(".box");
const title = document.querySelector(".title");

// Play Game
startBtn.addEventListener("click", playGame);
resetBtn.addEventListener("click", resetGame);

function playGame() {
  setTimeout(startGame, 700);
}

function startGame() {
  if (level > 1) {
      console.log(`LEVEL ${level}`);
    } else {
    console.log("START");
    title.textContent = `LEVEL 1`;
  }
  animationAutoClick(level);
  gameInterval = setTimeout(handleInterval, 20000);
}

function handleInterval() {
  console.log("TIMEOUT");
  title.textContent = "TIMEOUT";
  clearTimeout(gameInterval);
}

boxs.forEach((box) =>
box.addEventListener("click", (e) => {
    clickedButton = e.currentTarget;
    clickedButton.classList.add("animation");
    clickedButton.addEventListener(
        "transitionend",
        () => {
            clickedButton.classList.remove("animation");
        },
        { once: true }
        );
        
        if (boxLevel[0] === clickedButton) {
            boxLevel.shift();
            if (boxLevel.length === 0) {
                clearTimeout(gameInterval);
                console.log("Berhasil");
                level += 1;
                title.textContent = `LEVEL ${level}`;
                setTimeout(startGame, 1000);
            }
    } else {
        console.log("Anda kalah");
        title.textContent = "LOSE";
        clearTimeout(gameInterval);
    }
})
);

function randomNumber(limit) {
    return Math.floor(Math.random() * limit) + 1;
}

function animationAutoClick(level) {
  boxLevel = [];
  for (let i = 0; i < level; i++) {
    setTimeout(() => {
      const nowBox = document.querySelector(`.box${randomNumber(4)}`);
      nowBox.classList.add("animation");
      nowBox.addEventListener(
        "transitionend",
        () => {
          nowBox.classList.remove("animation");
        },
        { once: true }
      );
      boxLevel.push(nowBox);
    }, 1000 * i);
  }
}

function resetGame() {
  clearTimeout(gameInterval);
  console.log("reset");
  level = 1;
  boxLevel = [];
  title.textContent = "PRESS START TO PLAY GAME";
}