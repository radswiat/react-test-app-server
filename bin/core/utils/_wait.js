export default function wait(ms) {
  return new Promise((resolve) => {
    setImmediate(() => {
      resolve();
    }, ms);
  });
}
