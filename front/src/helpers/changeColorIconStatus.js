export const changeColorIconStatus = (status) => {
  if (status === "SEND") {
    return "green";
  }
  if (status === "ACCEPT") {
    return "blue";
  }
  if (status === "READ") {
    return "green";
  }
  return "red";
};
