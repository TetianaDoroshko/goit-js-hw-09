import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import '../css/02-timer.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const refs = {
  startBtn: document.querySelector('[data-start]'),
  daysSpan: document.querySelector('[data-days]'),
  hoursSpan: document.querySelector('[data-hours'),
  minutesSpan: document.querySelector('[data-minutes]'),
  secondsSpan: document.querySelector('[data-seconds]'),
};

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    selecteTargetDate(selectedDates[0]);
  },
};

const flatpickr = flatpickr('#datetime-picker', options);

refs.startBtn.disabled = true;

function selecteTargetDate(date) {
  if (new Date() > date) {
    Notify.failure('Please choose a date in the future');
    return;
  }
  refs.startBtn.disabled = false;
  refs.startBtn.addEventListener('click', startCountdown);
  function startCountdown() {
    const timeDiff = date - new Date();
    renderCountdown(addLeadingZero(convertMs(timeDiff)));
    setInterval(() => {
      const timeDiff = date - new Date();
      if (timeDiff <= 0) {
        return;
      }
      renderCountdown(addLeadingZero(convertMs(timeDiff)));
    }, 1000);
  }
}

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}

function addLeadingZero({ days, hours, minutes, seconds }) {
  const daysDouble = String(days).padStart(2, 0);
  const hoursDouble = String(hours).padStart(2, 0);
  const minutesDouble = String(minutes).padStart(2, 0);
  const secondsDouble = String(seconds).padStart(2, 0);
  return { daysDouble, hoursDouble, minutesDouble, secondsDouble };
}

function renderCountdown({
  daysDouble,
  hoursDouble,
  minutesDouble,
  secondsDouble,
}) {
  refs.daysSpan.textContent = daysDouble;
  refs.hoursSpan.textContent = hoursDouble;
  refs.minutesSpan.textContent = minutesDouble;
  refs.secondsSpan.textContent = secondsDouble;
}
