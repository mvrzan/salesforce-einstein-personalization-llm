export const getCurrentTimestamp = () => {
  const now = new Date();
  const day = now.getDate();
  const month = now.getMonth() + 1;
  const year = now.getFullYear();
  const hours = now.getHours();
  const minutes = now.getMinutes();
  const seconds = now.getSeconds();
  const milliseconds = now.getMilliseconds();
  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}:${milliseconds}`;
};
