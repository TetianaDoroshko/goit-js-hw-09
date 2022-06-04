import { Notify } from 'notiflix/build/notiflix-notify-aio';

refs = {
  form: document.querySelector('.form'),
  delayInput: document.querySelector('[name="delay"]'),
  stepInput: document.querySelector('[name="step"]'),
  amountInput: document.querySelector('[name="amount"]'),
  submitBtn: document.querySelector('[type="submit"]'),
};

refs.form.addEventListener('submit', onSubmitClick);
function onSubmitClick(event) {
  event.preventDefault();

  let promiseCounter = 0;
  setTimeout(() => {
    promiseCounter += 1;

    let delay = Number(refs.delayInput.value);
    createPromise(promiseCounter, delay)
      .then(({ position, delay }) =>
        Notify.success(`✔️ Fulfilled promise ${position} in ${delay}ms`)
      )
      .catch(({ position, delay }) =>
        Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
      );
    const intervalID = setInterval(() => {
      if (promiseCounter === Number(refs.amountInput.value)) {
        clearInterval(intervalID);
        return;
      }
      promiseCounter += 1;
      delay += Number(refs.stepInput.value);
      createPromise(promiseCounter, delay)
        .then(({ position, delay }) =>
          Notify.success(`✔️ Fulfilled promise ${position} in ${delay}ms`)
        )
        .catch(({ position, delay }) =>
          Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`)
        );
    }, refs.stepInput.value);
  }, refs.delayInput.value);
}
function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });
}
