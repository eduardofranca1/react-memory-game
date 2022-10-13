export const formatTimeElapsed = (seconds: number) => {
  let minutes = Math.floor(seconds / 60);
  seconds = seconds - minutes * 60;

  let secondSeconds = `${seconds < 10 ? "0" + seconds : seconds}`;
  let secondMinute = `${minutes < 10 ? "0" + minutes : minutes}`;

  return `${secondMinute}:${secondSeconds}`;
};
