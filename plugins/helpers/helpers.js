export const debounce = (delay = 1000, callback) => {
  let timerId;
  return function () {
    clearTimeout(timerId);
    timerId = setTimeout(() => callback.apply(this, arguments), delay);
  };
};
