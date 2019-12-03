var minOffset = 0, maxOffset = 60; // Change to whatever you want
var thisYear = (new Date()).getFullYear();

const years = [];

for (var i = minOffset; i <= maxOffset; i++) {
  var year = thisYear - i;

  var obj = { value: year, label: year };
  years.push(obj);
}

export default years;