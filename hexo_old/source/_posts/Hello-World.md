---
title: Hello World
date: 2021-09-06 12:00:00
math: true
category:
  - 教程
tag:
  - Hello World
  - Blog
index_img: /img/Purple_Flower.jpg
banner_img: /img/Purple_Flower.jpg
---

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=22636684&auto=1&height=66"></iframe>

### 申请 GitHub Pages

新建一个 repository，命名为 `(user_name).github.io`，隐私设置为 Public，再建一个 GitHub 仓库用来存放博客的源代码（可选）

### 申请域名

我选择的是阿里云，在[万网](https://wanwang.aliyun.com/)输入自己想要的域名并购买。一般来讲 `.top` 最便宜，`.xyz` 次之。 假设域名为 `example.top` 根据网站提示做好域名实名制认证等流程。在[域名控制台](https://dc.console.aliyun.com/next/#/domain/list/all-domain)中选择：域名 >> 操作 >> 解析

解析中添加一条记录：

```
记录类型：CNAME；
主机记录自选（我这里选择的是 blog，因为 www 经常无法与 GitHub Pages 连接）；
解析线路选择默认；
记录值选择(user_name).github.io；
TTL选择“10分钟”
```

再去名为 `(user_name).github.io` 的 repository，新建一个文件，文件名为 `CNAME`，填入 `blog.example.top` ，通过 GitHub 的网络检测后就可以使用。

此时可以分别在浏览器中输入 `(user_name).github.io` 和 `blog.example.top` 试一试，如果能显示`README.md` 中的内容则设置成功。

### Hexo 搭建并添加文章

我选择用 [Hexo](https://hexo.io/zh-cn/index.html)

建议在 Linux 上搭建，而不用 Windows

下载 Node-js 和 npm：`sudo pacman -S nodejs npm`

下载 Hexo 的方法如下：（推荐如下的全局下载方案）

```bash
mkdir ~/.npm-global
npm config set prefix '~/.npm-global'
```

然后在 `~/.profile` 中加入一行：`export PATH=~/.npm-global/bin:$PATH`

最后输入：（npm 5.0.0 开始，默认安装不需要 `–-save` 选项，已经可以自动执行）

```bash
source ~/.profile
npm install -g hexo-cli
```

找一个空文件夹 `(hexo_folder)`，运行：

```bash
npx hexo init (hexo_folder)
cd (hexo_folder)
npm install
```

所有的 npm 和 hexo 命令都要在`(hexo_folder)`（下文称为“**博客目录**”）下执行

全局配置的官方指南在[这里](https://hexo.io/zh-cn/docs/)，在 `(hexo_folder)/_config.yml` 下修改：

```yaml
url: https://blog.example.top
permalink: :title/
permalink_defaults:
pretty_urls:
  trailing_index: false
  trailing_html: false
```

添加文章：`npx hexo new post hello`，这生成 `blog.example.top/hello`

在子文件夹下添加文章：`npx hexo new post --path hello/me`，这生成 `blog.example.top/hello/me`

每篇文章的 Markdown 文件内一开始有用 `---` 分隔的部分，下文称为 **Front-matter**，例如：

```
title: Hello World
date: 2021-09-06 12:00:00
math: true
category:
- 教程
tag:
- Hello World
- Blog
index_img: /img/Purple_Flower.jpg
banner_img: /img/Purple_Flower.jpg
```

### Fluid 主题

我选择的是 [Fluid](https://hexo.fluid-dev.com/) 主题，安装方法：

```bash
npm install hexo-theme-fluid
```

这样的话它会保存在`(hexo_folder)/node_modules/hexo-theme-fluid`（下文称为“**主题目录**”），更新主题需要在`(hexo_folder)`下执行`npm update hexo-theme-fluid`

可以在 `(hexo_folder)/themes` 中创建软链接：

```bash
ln -s ../node_modules/hexo-theme-fluid/
```

Fluid 配置的官方指南在 https://hexo.fluid-dev.com/docs/guide/

在`(hexo_folder)/_config.yml`下修改：`theme:fluid`

在博客目录下创建 `_config.fluid.yml` 文件，将主题目录下的 `_config.yml`复制过去，以后如果修改任何主题配置，都只需修改 `_config.fluid.yml` 的配置即可，其优先级比主题目录下的 `_config.yml`高。

- 更改用于浏览器标签的图标：`favicon: /img/favicon.png`，`apple_touch_icon`同步修改

- `force_https: true`

- 代码高亮：`highlightjs: style: "Vs"`

- 打字机打印速度：`typespeed: 64`，不开启循环播放

- 为文章内容中的标题添加锚图标：`icon: "§"`

- 主题字体配置：

```yaml
font:
    font_size: 16px
    font_family: Noto Sans CJK SC, sans-serif
    code_font_size: 100%
```

- 导航栏左侧的标题：`blog_title: "Home"`

- 关于页中 `icons` 一项只保留 GitHub

- 每个页面的 Banner 头图：`banner_img` ，自选

- 首页副标题（slogan）的独立设置：`slogan: text: ` 自选

- 自动截取文章摘要：`auto_excerpt: enable: false`

- 隐藏版权声明：`copyright: enable: false`

- MathJax 渲染（虽然慢但是支持比 Katex 多而且字体更美观）：严格按照[官方文档](https://hexo.fluid-dev.com/docs/guide/##latex-数学公式)，记得更改渲染引擎为`hexo-renderer-kramed` 并删掉原有的 `hexo-renderer-marked` ，书写格式见下方 **LaTeX Test** 一节，如需使用，需在 Front-matter 中指定 `math: true`，支持行内公式（和行间公式）。但是这样会修改丢失对 Markdown 复选框的支持，开启则需要将如下代码加入到本地的`(hexo_folder)/node_modules/hexo-renderer-kramed/lib/renderer.js`的第19行中（参考[这里](https://corecabin.cn/2021/08/14/solve-some-problems-of-hexo-renderer-kramed-rendering-conflicts/)），行内公式和行内代码冲突也可以参考[这里](https://corecabin.cn/2021/08/14/solve-some-problems-of-hexo-renderer-kramed-rendering-conflicts/)

```js
// Support To-Do List
Renderer.prototype.listitem = function(text) {
  if (/^\s*\[[x ]\]\s*/.test(text)) {
    text = text.replace(/^\s*\[ \]\s*/, '<input type="checkbox"></input> ').replace(/^\s*\[x\]\s*/, '<input type="checkbox" checked></input> ');
    return '<li style="list-style: none">' + text + '</li>\n';
  } else {
    return '<li>' + text + '</li>\n';
  }
};
```

### 如何用“友链”页的模板创建一个“工具”页

首先新建一个页面：`npx hexo new page tools`，注意发表文章要将模板 `page` 改为 `post`

这样就有了 `example.top/tools/` 的页面

再找到 `icon-tools` 的图标：https://blog.csdn.net/Xiaoming782893687/article/details/90744911

实际操作是：在 `custom_css` 一栏中加入 `- //at.alicdn.com/t/font_2794470_ewg5czgn3cd.css`，然后就可以在导航栏菜单 `menu:` 一栏中加入 `- { key: "tools", link: "/tools/", icon: "iconfont icon-tools" }`

在博客目录内的 `/source/tools/index.md` 的 Front-matter 加入 `layout: links`，这会引入主题目录中的模板：`/layout/links.ejs`

于是开始设置 `_config.fluid.yml`：

```yaml
links:
  enable: true
  banner_img: (your_picture)
  banner_img_height: 60
  banner_mask_alpha: 0.3
  subtitle:
  # 友链的成员项
  # Member item of page
  items:
    - {
      title: "(your_title)",
      intro: "(your_intro)",
      link: "(your_link)",
      avatar: "(your_avatar)"
    }
```

并修改主题目录下`/languages/`中的所有`.yml`文件，例如`en.yml`中改为：

```yaml
links:
  title: Tools
  subtitle: Tools
```

### 如何在导航栏菜单创建一个 GitHub 链接

和创建“工具”方法类似，这次需要找到 `icon-github`（自带图标太小了）的图标

实际操作是：在 `custom_css` 一栏中加入 `- //at.alicdn.com/t/font_2794470_brhhjh3wx87.css`，然后就可以在导航栏菜单 `menu:` 一栏中加入 `- { key: "GitHub", link: "https://github.com/(user_name)", icon: "iconfont icon-github" }` 即可

### 加入特效：鼠标点击有小红心

在主题目录下的 `/source/js` 文件夹中新建文件 `love.js`，在 `love.js` 文件中添加以下代码：（修改过，更新了已经弃用的部分，原始代码参见[这里](https://segmentfault.com/a/1190000007215988)）

```js
!(function (e, t, a) {
  function n() {
    c(
      ".heart{width: 10px;height: 10px;position: fixed;background: #f00;transform: rotate(45deg);-webkit-transform: rotate(45deg);-moz-transform: rotate(45deg);}.heart:after,.heart:before{content: '';width: inherit;height: inherit;background: inherit;border-radius: 50%;-webkit-border-radius: 50%;-moz-border-radius: 50%;position: fixed;}.heart:after{top: -5px;}.heart:before{left: -5px;}"
    ),
      o(),
      r();
  }
  function r() {
    for (var e = 0; e < d.length; e++)
      d[e].alpha <= 0
        ? (t.body.removeChild(d[e].el), d.splice(e, 1))
        : (d[e].y--,
          (d[e].scale += 0.004),
          (d[e].alpha -= 0.013),
          (d[e].el.style.cssText =
            "left:" +
            d[e].x +
            "px;top:" +
            d[e].y +
            "px;opacity:" +
            d[e].alpha +
            ";transform:scale(" +
            d[e].scale +
            "," +
            d[e].scale +
            ") rotate(45deg);background:" +
            d[e].color +
            ";z-index:99999"));
    requestAnimationFrame(r);
  }
  function o() {
    var t = "function" == typeof e.onclick && e.onclick;
    e.onclick = function (e) {
      t && t(), i(e);
    };
  }
  function i(e) {
    var a = t.createElement("div");
    (a.className = "heart"),
      d.push({
        el: a,
        x: e.clientX - 5,
        y: e.clientY - 5,
        scale: 1,
        alpha: 1,
        color: s(),
      }),
      t.body.appendChild(a);
  }
  function c(e) {
    var a = t.createElement("style");
    try {
      a.appendChild(t.createTextNode(e));
    } catch (t) {
      a.styleSheet.cssText = e;
    }
    t.getElementsByTagName("head")[0].appendChild(a);
  }
  function s() {
    return (
      "rgb(" +
      ~~(255 * Math.random()) +
      "," +
      ~~(255 * Math.random()) +
      "," +
      ~~(255 * Math.random()) +
      ")"
    );
  }
  var d = [];
  (e.requestAnimationFrame = (function () {
    return (
      e.requestAnimationFrame ||
      e.webkitRequestAnimationFrame ||
      e.mozRequestAnimationFrame ||
      e.oRequestAnimationFrame ||
      e.msRequestAnimationFrame ||
      function (e) {
        setTimeout(e, 1e3 / 60);
      }
    );
  })()),
    n();
})(window, document);
```

在主题目录下的 `\layout\layout.ejs` 文件末尾 `<!-- SCRIPTS -->` 一段中添加以下代码：

```ejs
<script type="text/javascript" src="/js/love.js"></script>
```

### 插入网易云音乐

在网易云音乐的网页版上选择一首音乐（不能是 VIP 音乐），点进页面 `https://music.163.com/#/song?id=(music_id)` 后选择“生成外链播放器”，“自动播放”一栏自选，再复制 HTML 代码：

```html
<iframe
  frameborder="no"
  border="0"
  marginwidth="0"
  marginheight="0"
  width="330"
  height="86"
  src="//music.163.com/outchain/player?type=2&id=(music_id)&auto=0&height=66"
></iframe>
```

直接粘贴到 Markdown 文件内即可

### 调试并部署到 GitHub

安装 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)。

```bash
npm install hexo-deployer-git
```

修改配置 `_config.yml`：

```yaml
deploy:
  type: git
  repo: <repository url> # https://github.com/(user_name)/(user_name).github.io
  branch: (branch_name) # default is "main"
```

调试：

```bash
npx hexo s --debug
```

部署：

```bash
npx hexo clean && npx hexo deploy
```

查看 `(user_name).github.io` 和 `blog.example.top` 上的网页是否部署成功

注意此时原有的自定义域名会被覆盖掉，如果 GitHub Pages 需要使用 CNAME 文件自定义域名，请将 CNAME 文件置于博客目录下的 `source` 文件夹，只有这样 `npx hexo deploy` 才能将 CNAME 文件一并推送至部署分支

### LaTeX Test

This is an equation: $\lim\limits_{n\to\infty}\left(1+\dfrac{1}{n}\right)^n=\mathrm{e}$.

Another Example: $\sum\limits_{n=0}^{\infty}\dfrac{x^n}{n!}=\mathrm{e}^x$

$$
\dfrac{\mathrm{d}}{\mathrm{d}t}\left(\dfrac{\partial L'}{\partial \dot{p}}\right) - \dfrac{\partial L'}{\partial p} = 0
$$

$$
\lim_{n\to+\infty}a^n = \left\{
    \begin{aligned}
        &0,\quad &|a|<1 \\
        &N/A,\quad &|a|>1 \\
        &1\quad &a=1 \\
        &N/A,\quad &a=-1
    \end{aligned}
\right.
$$

$$
\boldsymbol{a}\cdot(\boldsymbol{b}\times\boldsymbol{c}) = \boldsymbol{b}\cdot(\boldsymbol{c}\times\boldsymbol{a}) = \boldsymbol{c}\cdot(\boldsymbol{a}\times\boldsymbol{b})
$$

$$
\begin{align*}
    \partial_i r
    &= \partial_i \sqrt{(x-x')^2 + (y-y')^2 + (z-z')^2} \\
    &= \frac{2(x-x')}{2\sqrt{(x-x')^2 + (y-y')^2 + (z-z')^2}} \\
    &= \frac{x-x'}{r}
\end{align*}
$$

$$
I_r = \frac{1}{2\pi}\oint p_r \,\mathrm{d}r = \frac{1}{2\pi}\int_0^{2\pi} p_r \frac{\mathrm{d}r}{\mathrm{d}\theta}\,\mathrm{d}\theta = \frac{\lambda}{\omega} + \sqrt{2m\kappa}
$$

$$
\begin{align*}
    H
    &= T+V \\
    &= \frac{1}{2}m(\dot{x} + \dot{\theta}l\cos\theta)^2 + \frac{1}{2}m(2ax\dot{x} + \dot{\theta}l\sin\theta)^2 + mg(ax^2 - l\cos\theta) \\
    &= \frac{1}{2}m(1+4a^2x^2)\dot{x}^2 - \frac{1}{2}ml^2\dot{\theta}^2 + ml(\cos\theta + 2ax\sin\theta)\dot{x}\dot{\theta} + mg(ax^2 - l\cos\theta) \\
    &= \frac{A}{2}\cdot\left(\frac{Dp_x - Bp_\theta}{AD - BC}\right)^2 + \frac{D}{2}\cdot\left(\frac{Ap_\theta - Cp_x}{AD - BC}\right)^2 + \frac{B(Dp_x - Bp_\theta)(Ap_\theta - Cp_x)}{(AD - BC)^2} + mg(ax^2 - l\cos\theta) \\
    &= \frac{Dp_x^2 + Ap_\theta^2 - (B+C)p_x p_\theta}{2(AD - BC)} \\
    &= \frac{[p_\theta,\ p_x]\begin{bmatrix}A & B \\ C & D\end{bmatrix}\begin{bmatrix}p_\theta \\ p_x\end{bmatrix}}{2\begin{vmatrix}A & B \\ C & D\end{vmatrix}} + mg(ax^2 - l\cos\theta)
\end{align*}
$$

### Code Test

```python
def fib(n):
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()
fib(1000)
```

```bash
iconv -f (from_encoding) -t (to_encoding) (from_file_name) -o (to_file_name)
```

### Picture Test

格式：`![](../images/(your_picture.jpg)`，图片默认放在博客目录的 `/source/images/` 下

![](../images/hello_world_reimu.jpg)

### 进阶功能

- [ ] Aplayer
- [ ] 樱花特效
- [ ] 点赞功能
