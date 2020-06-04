export const changeColorIconStatus = (status) => {
  if (status === "Acceptée" || status === "ACCEPTED") {
    return "green";
  }
  if (status === "En cours" || status === "PENDING") {
    return "orange";
  }
  if (status === "Annulée" || status === "CANCELLED") {
    return "red";
  }
  //return "red";
};
