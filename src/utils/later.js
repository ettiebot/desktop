export const later = (delay, value) =>
  new Promise((resolve) => setTimeout(resolve, delay, value));
