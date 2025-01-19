const convertTime = (time) => {
  const timeParts = time.split(":");
  let hours = parseInt(timeParts[0]);
  const minute = parseInt(timeParts[1]);

  let meridiam = "am";

  if (hours >= 12) {
    meridiam = "pm";
    if (hours > 12) {
      hours -= 12;
    }
  }
  return (
    hours.toString().padStart(2) +
    ":" +
    minute.toString().padStart(2, "0") +
    " " +
    meridiam
  );
};

export default convertTime;

