function showTime() {
    var year = document.getElementById("year").value;
    var month = document.getElementById("month").value;
    var day = document.getElementById("day").value;
    var hour = document.getElementById("hour").value;
    var minute = document.getElementById("minute").value;
    var second = document.getElementById("second").value;
    var Time = document.getElementById("Time");
    Time.value = year + "/" + month + "/" + day + " " + hour + ":" + minute + ":" + second;
  }