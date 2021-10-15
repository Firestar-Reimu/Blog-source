---
title: 时间计算器
date: 2021-09-13 16:00:00
banner_img: /img/OrionStreams.jpg
---

https://www.aavso.org/computing-jd

https://docs.astropy.org/en/stable/time/index.html

https://cheeseburgerim.space/2021/02/12/BUPWBP/

<html>
    <head>
    <meta charset="utf-8" />
    <title>Date Calculator</title>
    </head>
    <body{text-align:center}>
    
    <table align="center">
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

    <table align="center">
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

    {% raw %}
    <script src="./app.js"></script>
    {% endraw %}

    <button value="submit" onclick="showTime()">Click Me!</button><br />
    <input id="Time" /><br />

  </body>
</html>
