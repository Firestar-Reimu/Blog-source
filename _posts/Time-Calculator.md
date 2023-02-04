---
title: 时间计算器
date: 2021-11-03 00:00:00
tags: 天文
category: 工具
top_img: /img/time.jpg
description: 时间计算器
cover: /img/time.jpg
---

<script src="../js/time-calculator.js"></script>

<style>
.button {
    color: #FF5500;
}
</style>

## **设置时间并转化为儒略日**

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
<br>
</div>

<div align="center">
<table>
    <tr>
        <th>年</th>
        <th>月</th>
        <th>日</th>
    </tr>
    <tr>
        <td><input type="text" id="year" size="10em"/></td>
        <td><input type="text" id="month" size="10em"/></td>
        <td><input type="text" id="day" size="10em"/></td>
    </tr>
    <tr>
        <th>时</th>
        <th>分</th>
        <th>秒</th>
    </tr>
    <tr>
        <td><input type="text" id="hour" size="10em"/></td>
        <td><input type="text" id="minute" size="10em"/></td>
        <td><input type="text" id="second" size="10em"/></td>
    </tr>
</table>
</div>

<div align="center">
<button value="submit" onclick="time_to_JD()" class="button">Convert to JD</button>

<input id="JD" size="25em"/>
</div>

---

## **将当前时间转化为儒略日**

<body onload="time_now()">
<div align="center" id="clock"></div>
</body>

<div align="center">
<button value="submit" onclick="time_now_to_JD()" class="button">Convert current time to JD</button>

<input id="JD_now" size="25em"/>
</div>