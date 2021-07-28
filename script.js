const PianoAll = document.querySelectorAll(".piano-key");
const Piano = document.getElementById("piano");
const Sound = new Audio();
let prevElement;
const keyToSound = {
  D: "c",
  F: "d",
  G: "e",
  H: "f",
  J: "g",
  K: "a",
  L: "b",
  R: "c♯",
  T: "d♯",
  U: "f♯",
  I: "g♯",
  O: "a♯",
};

function playSoundByEvent(event) {
  let eventOffsetHeight = event.offsetY;
  if (eventOffsetHeight >= 0 && eventOffsetHeight <= PianoAll[0].offsetHeight) {
    Sound.preload = "auto";
    Sound.src = `assets/audio/${event.target.dataset.note}.mp3`;
    Sound.currentTime = 0;
    Sound.play();
  }
}

function playSoundByMp3File(key) {
  Sound.preload = "auto";
  Sound.src = `assets/audio/${key}.mp3`;
  Sound.currentTime = 0;
  Sound.play();
}

PianoAll.forEach((elem) => {
  elem.addEventListener("mousedown", (event) => {
    event.target.classList.add("active");
    prevElement = event.target;
  });
  elem.addEventListener("mousedown", playSoundByEvent, false);
  elem.addEventListener("mouseover", (event) => {
    if (prevElement) {
      prevElement.classList.remove("active");
      playSoundByEvent(event);
    }
  });
  elem.addEventListener("mouseup", (event) => {
    event.target.classList.remove("active");
  });
});

document.body.addEventListener("mouseup", (event) => {
  if (prevElement) {
    prevElement.classList.remove("active");
    prevElement = null;
  }
});

document.addEventListener("keypress", function (e) {
  const keyCode = e.code.slice(3);
  const mp3File = keyToSound[keyCode];
  if (mp3File) {
    let currentKey = "";
    for (let i = 0; i < PianoAll.length; i++) {
      if (PianoAll[i].dataset.letter === keyCode) {
        currentKey = PianoAll[i];
        currentKey.classList.add("active");
        currentKey.style.backgroundColor = "#440FD3";
        currentKey.classList.add("piano-key-active");
        break;
      }
    }
    if (!e.repeat) {
      playSoundByMp3File(mp3File);
    }
  }
});

document.addEventListener("keyup", function (e) {
  const keyCode = e.code.slice(3);
  const mp3File = keyToSound[keyCode];
  if (mp3File) {
    let currentKey = "";
    let i = 0;
    for (i = 0; i < PianoAll.length; i++) {
      if (PianoAll[i].dataset.letter === keyCode) {
        currentKey = PianoAll[i];
        break;
      }
    }
    currentKey.classList.remove("active");
    currentKey.classList.remove("piano-key-active");
    currentKey.style.backgroundColor = "";
  }
});

const btnNotes = document.querySelector(".btn-notes");
const btnLetters = document.querySelector(".btn-letters");

btnNotes.addEventListener("click", () => {
  btnLetters.classList.remove("btn-active");
  btnNotes.classList.add("btn-active");
  PianoAll.forEach((key) => key.classList.remove("letter"));
});

btnLetters.addEventListener("click", () => {
  btnNotes.classList.remove("btn-active");
  btnLetters.classList.add("btn-active");
  PianoAll.forEach((key) => key.classList.add("letter"));
});

document.querySelector(".fullscreen").addEventListener("click", () => {
  if (!document.fullscreenElement) {
    document.documentElement.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
});
