export const formatDuration = (timer: number) => {
  const minutes = Math.floor(timer / 60).toString();
  const seconds = (timer % 60).toString().padStart(2, "0");

  return `${minutes}:${seconds}`;
};
