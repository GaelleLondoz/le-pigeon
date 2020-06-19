import moment from "moment";

export const formatDate = (str) => moment(str).format("DD/MM/YYYY");

export const formatDateWithHour = (str) =>
  moment(str).format("DD/MM/YYYY à HH:MM");

export const formatEnglishDateWithHour = (str) =>
  moment(str).format("YYYY-MM-DDTHH:MM");
