const convertTime = (unix) => {
  // Convert timestamp to milliseconds
  var date = new Date(unix * 1000);

  // Year
  var year = date.getFullYear();

  // Month
  var month = date.getMonth();

  // Day
  var day = date.getDate();

  // Hours
  var hours = date.getHours();

  // Minutes
  var minutes = "0" + date.getMinutes();

  // Display date time in MM-dd-yyyy h:m:s format
  var convdataTime =
    day + "-" + month + "-" + year + " " + hours + ":" + minutes.substr(-2);
  return convdataTime;
};

export default convertTime;
