export const changeColorIconStatus = (status) => {
  if (
    status === "Acceptée" ||
    status === "ACCEPTED" ||
    status === "READ" ||
    status === "ANSWERED"
  ) {
    return "green";
  }
  if (status === "En cours" || status === "PENDING") {
    return "orange";
  }
  if (status === "Annulée" || status === "CANCELLED" || status === "NO-READ") {
    return "red";
  }
};
