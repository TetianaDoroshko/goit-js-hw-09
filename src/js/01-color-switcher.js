const refs = {
  startBtn: document.querySelector('[data-start]'),
  stopBtn: document.querySelector('[data-stop]'),
};
let intervalID;

refs.startBtn.addEventListener('click', onStartBtnClick);
refs.stopBtn.addEventListener('click', onStopBtnClick);
refs.stopBtn.disabled = true;

function onStartBtnClick(event) {
  if (intervalID) {
    return;
  }
  refs.startBtn.disabled = true;
  refs.stopBtn.disabled = false;
  document.body.style.backgroundColor = getRandomHexColor();
  intervalID = setInterval(() => {
    document.body.style.backgroundColor = getRandomHexColor();
  }, 1000);
}

function onStopBtnClick() {
  clearInterval(intervalID);
  intervalID = null;
  refs.startBtn.disabled = false;
  refs.stopBtn.disabled = true;
}

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
