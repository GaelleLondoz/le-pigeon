export const changeStatusToFrench = (string) => {
  if (string === "PENDING") {
    return "En cours";
  } else if (string === "ACCEPTED") {
    return "Acceptée";
  } else {
    return "Annulée";
  }
};
