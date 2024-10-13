// Format time to a two-digit string
const formatTime = (time: number): string => {
  return String(Math.floor(time)).padStart(2, "0");
};

// Display the time in hours, minutes, and seconds
export const displayFormattedTime = (milliseconds: number): string => {
  let hours = formatTime(milliseconds / (1000 * 60 * 60));
  let minutes = formatTime((milliseconds / (1000 * 60)) % 60);
  let seconds = formatTime((milliseconds / 1000) % 60);

  if (hours === "00") {
    return `${minutes}:${seconds}`;
  }

  return `${hours}:${minutes}:${seconds}`;
};
