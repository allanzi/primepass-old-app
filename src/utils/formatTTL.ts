export const formatTTL = (ttlValue: number):string => {
  const secNum = ttlValue;
  const hours = Math.floor(secNum / 3600);
  const minutes = Math.floor((secNum - (hours * 3600)) / 60);
  const seconds = secNum - (hours * 3600) - (minutes * 60);
  const hourMinutes = (hours * 60) + minutes;

  // Sample: 00:56, 10:56 or 120:56 (convert hour into minutes when necessary)
  return `${hourMinutes < 10 ? `0${hourMinutes}` : hourMinutes.toString()
  }:${seconds < 10 ? `0${seconds}` : seconds.toString()}`;
};

export const secondsToHours = (seconds: string) => {
  const d = Number(seconds);

  if (d <= 0) {
    return '00:00:00';
  }
  const h = Math.floor(d / 3600);
  // eslint-disable-next-line no-mixed-operators
  const m = Math.floor(d % 3600 / 60);
  const s = Math.floor(d % 3600 % 60);

  const hDisplay = h <= 9 ? `0${h}:` : `${h}:`;
  const mDisplay = m <= 9 ? `0${m}:` : `${m}:`;
  const sDisplay = s <= 9 ? `0${s}` : s;

  return hDisplay + mDisplay + sDisplay;
};

export default formatTTL;
