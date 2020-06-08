export const changeColorIconStatus = (status) => {
  if (status === "Acceptée" || status === "ACCEPTED" || status === "READ") {
    return "green";
  }
  if (status === "En cours" || status === "PENDING") {
    return "orange";
  }
  if (status === "Annulée" || status === "CANCELLED" || status === "NO-READ") {
    return "red";
  }
  //return "red";
};
