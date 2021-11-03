---
title: 时间计算器
date: 2021-11-03 00:00:00
category:
  - 工具
tag:
  - Calculator
index_img: /img/OrionStreams.jpg
banner_img: /img/OrionStreams.jpg
---
<script src="../../js/time-calculator.js"></script>

<div align="center">
<form>
    <select name="timezone" id="timezone">
        <option value="0">UTC</option>
        <option value="1">UTC+1</option>
        <option value="2">UTC+2</option>
        <option value="3">UTC+3</option>
        <option value="4">UTC+4</option>
        <option value="5">UTC+5</option>
        <option value="6">UTC+6</option>
        <option value="7">UTC+7</option>
        <option value="8">UTC+8</option>
        <option value="9">UTC+9</option>
        <option value="10">UTC+10</option>
        <option value="11">UTC+11</option>
        <option value="12">UTC+12</option>
        <option value="-1">UTC-1</option>
        <option value="-2">UTC-2</option>
        <option value="-3">UTC-3</option>
        <option value="-4">UTC-4</option>
        <option value="-5">UTC-5</option>
        <option value="-6">UTC-6</option>
        <option value="-7">UTC-7</option>
        <option value="-8">UTC-8</option>
        <option value="-9">UTC-9</option>
        <option value="-10">UTC-10</option>
        <option value="-11">UTC-11</option>
        <option value="-12">UTC-12</option>
    </select>
</form>
</div>

|               年                |                月                 |                日                 |
| :-----------------------------: | :-------------------------------: | :-------------------------------: |
| <input type="text" id="year" /> | <input type="text" id="month" />  |  <input type="text" id="day" />   |
|             **时**              |              **分**               |              **秒**               |
| <input type="text" id="hour" /> | <input type="text" id="minute" /> | <input type="text" id="second" /> |

<div align="center">
<button value="submit" onclick="time_to_JD()">Convert to JD</button>

<input id="JD" />

<body onload="time_now()">
<div align="center" id="clock"></div>
</body>

<button value="submit" onclick="time_now_to_JD()">Convert current time to JD</button>

<input id="JD_now" />
</div>
