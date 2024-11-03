import throttle from 'lodash.throttle';

const formElement = document.querySelector('.feedback-form');
const LOCAL_STORAGE_KEY = 'feedback-form-state';

// initializes form fields with values from local storage
const loadForm = () => {
  const elemLS = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (elemLS) {
    const objLS = JSON.parse(elemLS);

    formElement.elements.email.value = objLS.email || '';
    formElement.elements.message.value = objLS.message || '';
  }
};

loadForm();

// save form to local storage once at 500 ms
// throttledFunction created once before event listener - one instance is reused for each input event
// throttledFunction remains the same for all input events
const throttledFunction = throttle(() => {
  const formObj = {
    email: formElement.elements.email.value,
    message: formElement.elements.message.value,
  };

  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(formObj));
}, 500);

formElement.addEventListener('input', throttledFunction);

formElement.addEventListener('submit', event => {
  event.preventDefault();

  console.log({
    email: formElement.elements.email.value,
    message: formElement.elements.message.value,
  });

  // removes the item from the local storage
  localStorage.removeItem(LOCAL_STORAGE_KEY);

  // reset the form
  //   formElement.reset();
});
