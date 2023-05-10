export function getNowFormatDate(dateStr) {
  let date = new Date(dateStr);
  let seperator1 = "-";
  let year = date.getFullYear();
  let month = date.getMonth() + 1;
  let strDate = date.getDate();
  if (month >= 1 && month <= 9) {
    month = "0" + month;
  }
  if (strDate >= 0 && strDate <= 9) {
    strDate = "0" + strDate;
  }
  let currentDate = year + seperator1 + month + seperator1 + strDate;
  return currentDate;
}