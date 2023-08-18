export const debounce = (callback, delay = 1000) => {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback.apply(this, arguments), delay);
  };
};