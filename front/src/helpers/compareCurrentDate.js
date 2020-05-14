export const compareCurrentDate = (date) => {
  const DATE = Date.now();
  // if (new Date(date).getTime() > new Date(DATE).getTime()) return true;
  // return false;
  return new Date(date).getTime() > new Date(DATE).getTime();
};
