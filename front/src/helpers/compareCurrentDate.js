export const compareCurrentDate = (date) => {
  const DATE = Date.now();
  // if (new Date(date).getTime() > new Date(DATE).getTime()) return true;
  // return false;
  return new Date(date).getTime() > new Date(DATE).getTime();
};

export const compareDateForUpdateBooking = (date) => {
  const TODAY = new Date();
  TODAY.setDate(TODAY.getDate() + 1);
  return new Date(date).getTime() > TODAY.getTime();
};

export const displayCallButton = (date) => {
  const DATE = Date.now();
  // return new Date(date).getTime() === new Date(DATE).getTime();

  /*
    var today = new Date();
    var Christmas = new Date("2012-12-25");
    var diffMs = (Christmas - today); // milliseconds between now & Christmas
    var diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000); // minutes
  */
  return true;
};
