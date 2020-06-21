export const changeStatusBookingToFrench = (status) => {
  if (status === "PENDING") {
    return "En cours";
  } else if (status === "ACCEPTED") {
    return "Acceptée";
  } else {
    return "Refusée";
  }
};

export const changeStatusMessageToFrench = (status) => {
  if (status === "READ") {
    return "Lu";
  } else if (status === "ANSWERED") {
    return "Répondu";
  } else {
    return "Non-lu";
  }
};
