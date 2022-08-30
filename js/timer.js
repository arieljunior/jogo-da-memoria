const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");

let minute = 0;
let second = 0;

let cron;

function startTimer() {
  pauseTimer();
  cron = setInterval(() => {
    timer();
  }, 1000);
}

function pauseTimer() {
  clearInterval(cron);
}

function resetTimer() {
  minute = 0;
  second = 0;
  minuteElement.innerText = "00";
  secondElement.innerText = "00";
}

function timer() {
  if ((second += 1) == 60) {
    second = 0;
    minute++;
  }
  minuteElement.innerText = returnData(minute);
  secondElement.innerText = returnData(second);
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`;
}
