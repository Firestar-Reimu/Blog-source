---
title: 时间计算器
date: 2021-10-15 22:00:00
banner_img: /img/OrionStreams.jpg
---



## 本页面功能未完成！

-   [x] 未完成
-   [ ] 未完善
-   [ ] 小修小补（卷/美化）

### 参考：

https://www.aavso.org/computing-jd/

https://docs.astropy.org/en/stable/time/index.html/

Update: 2021-10-16 11:24:00

<html>

<head>
    <meta charset="utf-8" />
    <title>Date Calculator</title>
</head>
<body{text-align:center}>

    <table align="center" width="40%">
        <tr>
            <th>年</td>
            <th>月</td>
            <th>日</td>
        </tr>
        <tr>
            <td><input type="text" id="year" /></td>
            <td><input type="text" id="month" /></td>
            <td><input type="text" id="day" /></td>
        </tr>
    </table>
    
    <table align="center" width="40%">
        <tr>
            <th>时</td>
            <th>分</td>
            <th>秒</td>
        </tr>
        <tr>
            <td><input type="text" id="hour" /></td>
            <td><input type="text" id="minute" /></td>
            <td><input type="text" id="second" /></td>
        </tr>
    </table>
    
    <script function showTime() { var year=document.getElementById("year").value; var
        month=document.getElementById("month").value; var day=document.getElementById("day").value; var
        hour=document.getElementById("hour").value; var minute=document.getElementById("minute").value; var
        second=document.getElementById("second").value; var Time=document.getElementById("Time"); Time.value=year + "/"
        + month + "/" + day + " " + hour + ":" + minute + ":" + second; }></script>
    
    <button value="submit" onclick="showTime()">Click Me!</button><br />
    <input id="Time" /><br />
    
    <script>
        function startTime() {
            var today = new Date();
            var h = today.getHours();
            var m = today.getMinutes();
            var s = today.getSeconds();
            m = checkTime(m);
            s = checkTime(s);
            document.getElementById('clock').innerHTML = h + ":" + m + ":" + s;
            t = setTimeout(function () { startTime() }, 500);
        }
        function checkTime(i) {
            if (i < 10) {
                i = "0" + i;
            }
            return i;
        }
    </script>
    
    </head>
    
    <body onload="startTime()">
    
        <div align="center" id="clock"></div>
    
    </body>

</html>
