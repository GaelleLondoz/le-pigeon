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
  // return new Date(date) === new Date(DATE);

  // ajouter heure, mois, année, minutes
  let today = new Date();
  let booking = new Date(date);
  const todayMinutes = today.getMinutes();
  const todayHour = today.getHours();
  const todayDay = today.getDay();
  const todayMonth = today.getDate();
  const todayYear = today.getFullYear();
  const bookingMinutes = booking.getMinutes();
  const bookingHour = booking.getHours();
  const bookingDay = booking.getDay();
  const bookingMonth = booking.getDate();
  const bookingYear = booking.getFullYear();

  if (
    todayDay === bookingDay &&
    todayMonth === bookingMonth &&
    todayYear === bookingYear &&
    todayHour === bookingHour &&
    todayMinutes + 10 >= bookingMinutes &&
    bookingMinutes + 30 >= todayMinutes
  ) {
    return true;
  }
  return false;
};
