const formatTime = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return `${[year, month, day].map(formatNumber).join("/")}`;
};

const formatNumber = (n) => {
  n = n.toString();
  return n[1] ? n : `0${n}`;
};

const formatDate = (date) => {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();

  return month + "月" + day + "日";
};

const handleTimeFn = (day) => {
  const weeks = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  const date = new Date();
  date.setDate(date.getDate() + day);
  const week = date.getDay();

  const time = formatDate(date);
  return time + " " + weeks[week];
};

export { handleTimeFn, formatTime };
