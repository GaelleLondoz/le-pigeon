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
  // let diffMs = (booking - today);
  // let diffMins = Math.round(((diffMs % 86400000) % 3600000) / 60000);
  // console.log({ diffMins })


  // var tenMinutes = 10 * 60 * 1000; /* ms */
  // console.log({ calcul: today - booking })
  // console.log({ diff: ((today - booking) < tenMinutes) })



  // return diffMins <= 10 ? true : false
};
