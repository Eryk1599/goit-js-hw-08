import throttle from 'lodash.throttle';

const form = document.querySelector('.feedback-form');
const localStorageKey = 'feedback-form-state';

const emailInput = form.querySelector("input[name='email']");
const messageInput = form.querySelector("textarea[name='message']");

try {
  const toStringMessage = throttle(() => {
    const messageObject = {
      email: emailInput.value.trim(),
      message: messageInput.value.trim(),
    };
    localStorage.setItem(localStorageKey, JSON.stringify(messageObject));
  }, 500);
  form.addEventListener('input', toStringMessage);
} catch (error) {
  console.log('error with toStringMessage' + error);
}

function storedMessage() {
  const data = localStorage.getItem(localStorageKey);
  if (data) {
    try {
      const parsed = JSON.parse(data);
      emailInput.value = parsed.email;
      messageInput.value = parsed.message;
    } catch (error) {
      console.log('error with parse');
    }
  }
}

storedMessage();

form.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log({
    email: emailInput.value,
    message: messageInput.value,
  });
  localStorage.removeItem(localStorageKey);
  form.reset();
});
