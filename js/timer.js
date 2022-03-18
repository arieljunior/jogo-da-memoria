const minuteElement = document.getElementById("minute");
const secondElement = document.getElementById("second");
const millisecondElement = document.getElementById("millisecond");

let minute = 0;
let second = 0;
let millisecond = 0;

let cron;

function startTimer() {
  pauseTimer();
  cron = setInterval(() => {
    timer();
  }, 10);
}

function pauseTimer() {
  clearInterval(cron);
}

function resetTimer() {
  minute = 0;
  second = 0;
  millisecond = 0;
  minuteElement.innerText = "00:";
  secondElement.innerText = "00:";
  millisecondElement.innerText = "00";
}

function timer() {
  if ((millisecond += 1) == 100) {
    millisecond = 0;
    second++;
  }
  if (second == 60) {
    second = 0;
    minute++;
  }
  if (minute == 60) {
    minute = 0;
  }
  minuteElement.innerText = returnData(minute);
  secondElement.innerText = returnData(second);
  millisecondElement.innerText = returnData(millisecond);
}

function returnData(input) {
  return input >= 10 ? input : `0${input}`;
}
