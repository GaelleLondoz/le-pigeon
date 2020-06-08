export const changeStatusBookingToFrench = (status) => {
  if (status === "PENDING") {
    return "En cours";
  } else if (status === "ACCEPTED") {
    return "Acceptée";
  } else {
    return "Annulée";
  }
};

export const changeStatusMessageToFrench = (status) => {
  if (status === "READ") {
    return "Lu";
  } else {
    return "Non-lu";
  }
};
