export const changeStatusToFrench = (string) => {
  if (string === "PENDING") {
    return "En cours";
  } else if (string === "ACCELTED") {
    return "Acceptée";
  } else {
    return "Annulée";
  }
};
