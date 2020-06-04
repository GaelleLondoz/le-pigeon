export const changeColorIconStatus = (status) => {
  if (status === "Acceptée" || status === "ACCEPT") {
    return "green";
  }
  if (status === "En cours" || status === "READ") {
    return "orange";
  }
  if (status === "Annulée" || status === "CANCELLED") {
    return "red";
  }
  //return "red";
};
