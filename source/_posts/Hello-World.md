---
title: Hello World
date: 2021-09-06 12:00:00
updated:
top_img: /img/PKU_peach_blossom.jpg
tags: 博客
categories: 博客
description: 搭建 GitHub Pages + Hexo + Butterfly 博客的笔记
cover: /img/PKU_peach_blossom.jpg
katex: true
disableNunjucks: true
---

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=22636684&auto=1&height=66"></iframe>

### **申请 GitHub Pages**

新建一个 GitHub 仓库，命名为 `(user_name).github.io`，隐私设置为 Public

这就可以获得一个网站 `https://(user_name).github.io`

可以选择再建一个 GitHub 仓库用来存放博客的源代码

### **申请域名**

这里选择的是阿里云，在[万网](https://wanwang.aliyun.com/)输入自己想要的域名并购买

一般来讲 `.top` 最便宜，`.xyz` 次之

假设域名为 `example.top`，根据网站提示做好域名实名制认证等流程

在[域名控制台](https://dc.console.aliyun.com/next/#/domain/list/all-domain)中选择：

域名 >> 操作 >> 解析

解析中添加一条记录：

- 记录类型：CNAME
- 主机记录自选
- 解析线路选择“默认”
- 记录值选择 `(user_name).github.io`
- TTL选择“10分钟”

在名为 `(user_name).github.io` 的仓库，新建一个文件，文件名为 `CNAME`，填入 `blog.example.top` ，通过 GitHub 的网络检测后就可以使用

此时可以分别在浏览器中输入 `(user_name).github.io` 和 `blog.example.top`，如果能显示 `README.md` 中的内容则设置成功

### **Hexo 搭建**

[Hexo](https://hexo.io/zh-cn/index.html) 是一个快速、简洁且高效的博客框架，建议在 Linux 上搭建

首先下载 Node-js 和 npm：

```bash
sudo pacman -S nodejs npm
```

之后在 npm 中下载 Hexo 框架：

```bash
npm install hexo
```

在 `~/.bashrc` 中加入一行：

```bash
PATH=~/node_modules/.bin:$PATH
```

执行 `source ~/.bashrc` 更新环境变量

创建博客文件夹 `(blog_folder)`，运行：

```bash
hexo init (blog_folder)
```

这一步必须要求 `(blog_folder)` 为空文件夹

之后运行：

```bash
cd (blog_folder)
npm install
```

按照 [Hexo 文档](https://hexo.io/zh-cn/docs/)进行网站全局配置，在 `(blog_folder)/_config.yml` 下修改：

```yaml
url: https://blog.example.top
permalink: :title/
```

**所有的 npm 和 hexo 命令都要在 `(blog_folder)` 下执行**

### **全局配置**

添加文章：

```bash
hexo new post hello
```

这会生成 `blog.example.top/hello`

在子文件夹下添加文章：

```bash
hexo new post --path hello/world
```

这生成 `blog.example.top/hello/world`

### **调试并预览网站**

在博客目录运行：

```bash
hexo clean && hexo s --debug
```

之后可以在 http://localhost:4000/ 查看网站预览

### **部署到 GitHub**

安装 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)：

```bash
npm install hexo-deployer-git
```

修改配置 `_config.yml`：（不要忘记设置更新分支 `branch` 的值）

```yaml
deploy:
  type: git
  repo: https://oauth2:(user_token)@github.com/(user_name)/(user_name).github.io
  branch: (branch_name)
```

从2021年8月13日起，GitHub 不再支持通过邮箱和密码校验身份，需要使用 [Personal Access Token](https://github.com/settings/tokens) 或者用 [SSH](https://github.com/settings/ssh/new) 密钥登陆 GitHub 才能向仓库上传代码

申请 Personal Access Token 时记得勾选 `repo` 部分的权限

如果使用 SSH 密钥，`repo` 一栏填写 `git@github.com:(user_name)/(user_name).github.io`

之后在博客目录运行：

```bash
hexo clean && hexo deploy
```

即可部署到 GitHub

查看 `(user_name).github.io` 和 `blog.example.top` 上的网页是否部署成功

注意此时原有的自定义域名会被覆盖掉，如果 GitHub Pages 需要使用 CNAME 文件自定义域名，则创建文本文件，文件名为 `CNAME`，文件中只需要写一行自定义域名 `blog.example.top` 即可

将 CNAME 文件置于 `(blog_folder)/source/` 文件夹，此时 `hexo deploy` 会一并推送至部署分支

若要在 GitHub 的 `(user_name).github.io` 仓库中创建 `README.md` 文件，也需将其置于 `(blog_folder)/source/` 文件夹中

之后需要在 `(blog_folder)/_config.yml` 中配置 `skip_render: README.md`，否则会被渲染为 HTML 文件

### **Butterfly 主题**

我选择的是 [Butterfly](https://butterfly.js.org/) 主题，安装方法：

```bash
npm install hexo-theme-butterfly
```

这样的话它会保存在 `(blog_folder)/node_modules/hexo-theme-butterfly`，更新主题需要在 `(blog_folder)` 下执行 `npm update hexo-theme-butterfly`

可以在 `(blog_folder)/themes` 中创建软链接：

```bash
ln -s ../node_modules/hexo-theme-butterfly/
```

这样主题目录就是 `(blog_folder)/theme/hexo-theme-butterfly`

可以卸载自带的默认主题 Landscape：

```bash
npm uninstall hexo-theme-landscape
```

在 `(blog_folder)/_config.yml` 下修改：`theme:butterfly`

在博客目录下创建 `_config.butterfly.yml` 文件，并复制主题目录下 `_config.yml` 的内容

以后如果修改任何主题配置，都只需修改 `_config.butterfly.yml` 的配置即可，其优先级比主题目录下的 `_config.yml` 高，但不要删除主题目录下的 `_config.yml`，Hexo 会自动合并自定义设置和默认设置

按照 [Butterfly 文档](https://butterfly.js.org)进行网站全局配置，在 `(blog_folder)/_config.butterfly.yml` 下修改如下：

[_config.butterfly.yml -- Blog-source](https://github.com/Firestar-Reimu/Blog-source/blob/main/_config.butterfly.yml)

### **自定义字体**

本站的主题字体设置如下：

```yaml
font:
  font-family: Noto Sans SC, PingFang SC, Microsoft Yahei, sans-serif
  code-font-family: JetBrains Mono, Roboto Mono, Hack, Menlo, Consolas, monospace
```

可以在 `_config.butterfly.yml` 中找到 `Inject` 一节，这里可以插入自定义的 CSS 文件，编辑如下：

```yaml
inject:
  head:
    - <link rel="preconnect" href="https://fonts.googleapis.com">
    - <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    - <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+SC:wght@400;700&family=JetBrains+Mono&family=Roboto+Mono&&display=swap" rel="stylesheet">
    - <link rel="stylesheet" href="/css/font.css">
```

其中前三个是从 [Google Font](https://fonts.google.com/) 中引入备用的字体文件

最后一个为新创建的 `(blog_folder)/source/css/font.css`，其中写入：

```css
b,
strong {
    font-weight: bold;
}

#article-container pre,
#article-container code {
    font-variant-ligatures: none;
}
```

第一段是防止网页的粗体过粗，第二段是禁用代码块中字体的连字属性

### **数学公式显示**

按照 [Butterfly 文档](https://butterfly.js.org/posts/ceeb73f)的指南配置即可，这里选择的是更快更轻量的 [KaTeX](https://katex.org/)

首先修改 `.config.butterfly.yml`，启用 KaTeX：

```yaml
katex:
  enable: true
  per_page: false
  hide_scrollbar: false
```

之后将渲染器改为 `hexo-renderer-markdown-it` 并安装相应插件：

```bash
npm uninstall hexo-renderer-marked
npm install hexo-renderer-markdown-it
npm install katex @renbaoshuo/markdown-it-katex
```

最后在博客目录的 `.config.yml` 中加入：

```yaml
markdown:
    plugins:
      - '@renbaoshuo/markdown-it-katex'
```

### **配置本地搜索**

下载插件 `hexo-generator-search`：

```bash
npm install hexo-generator-search
```

之后修改 `.config.butterfly.yml`，启用本地搜索：

```yaml
local_search:
  enable: true
  preload: false
```

### **显示复选框**

下载插件 `markdown-it-task-lists`：（也可以换成其它相同功能的插件）

```bash
npm install markdown-it-task-lists
```

之后在博客目录的 `.config.yml` 中加入：

```yaml
markdown:
    plugins:
      - markdown-it-task-lists
```

### **禁用 Nunjucks 标签**

Hexo 使用 [Nunjucks](https://mozilla.github.io/nunjucks/) 来解析文章，内容若包含 `{{`、`}}`、`{%`、`%}`、`{#`、`#}` 会无法渲染，可以用以下两种方法禁用 Nunjucks 标签：

第一种是在文章的 [front-matter](https://hexo.io/zh-cn/docs/front-matter) 中写入 `disableNunjucks:true`

第二种是用 `{% raw %}` 和 `{% endraw %}` 包裹无法渲染的部分，例如 `{% raw %} {% %} {% endraw %}`

### **在导航菜单创建一个 GitHub 链接**

修改 `.config.butterfly.yml` 中 `menu` 一栏，其格式为 `(name): (url) || (icon)`：

```yaml
menu:
  源码: https://github.com/Firestar-Reimu/firestar-reimu.github.io || fab fa-github
```

其中图标 `icon` 可以在 [FontAwesome](https://fontawesome.com/) 中找到

### **插入图片**

图片放在博客目录的 `(blog_folder)/source/img/` 下，插入图片的标准的格式为：

```markdown
![(name)](../img/(your_picture))
```

但是这样无法自定义图片大小，也可以使用 HTML 语法，例如：

```html
<img src="../img/(your_picture)" width="50%" height="50%">
```

### **插入网易云音乐**

在网易云音乐的网页版上选择一首音乐（不能是 VIP 音乐），点进页面 `https://music.163.com/#/song?id=(music_id)` 后选择“生成外链播放器”，“自动播放”一栏自选，再复制 HTML 代码：

```html
<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=(music_id)&auto=1&height=66"></iframe>
```

直接粘贴到 Markdown 文件内即可

### **数学公式测试**

$\lim\limits_{n\to\infty}\left(1+\dfrac{1}{n}\right)^n=\mathrm{e}$

$\sum\limits_{n=0}^{\infty}\dfrac{x^n}{n!}=\mathrm{e}^x$

$$
\dfrac{\mathrm{d}}{\mathrm{d}t}\left(\dfrac{\partial L'}{\partial \dot{p}}\right) - \dfrac{\partial L'}{\partial p} = 0
$$

$$
f(x) = x + \left(\frac{1}{x} + 3x\right)^2
$$

$$
f(x)=
\begin{cases}
x, & x<0 \\
1, & x>0
\end{cases}
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
    &= \frac{Dp_x^2 + Ap_\theta^2 - (B+C)p_x p_\theta}{2(AD - BC)} + mg(ax^2 - l\cos\theta) \\
    &= \frac{[p_\theta,\ p_x]\begin{bmatrix}A & B \\ C & D\end{bmatrix}\begin{bmatrix}p_\theta \\ p_x\end{bmatrix}}{2\begin{vmatrix}A & B \\ C & D\end{vmatrix}} + mg(ax^2 - l\cos\theta)
\end{align*}
$$

### **图片测试**

<img src="../img/hello_world_reimu.jpg" width="50%" height="50%">

### **代码高亮测试**

```javascript
function time_now() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  m = check_time(m);
  s = check_time(s);
  document.getElementById("clock").innerHTML = h + ":" + m + ":" + s;
  t = setTimeout(function () {
    time_now();
  }, 100);
}
```

```python
def Chebyshev(func, n, x_array):
    x = np.array([np.cos(np.pi * (m + 0.5) / n) for m in range(n)])
    y = func(x)
    c = np.zeros(n)
    for k in range(n):
        for m in range(n):
            c[k] += (2 / n) * y[m] * np.cos(np.pi * k * (m + 0.5) / n)
    print(c)
    y_array = np.zeros(len(x_array))
    for i in range(1, len(c)):
        y_array += c[i] * np.cos(i * np.arccos(x_array))
    y_array += 1 / 2 * c[0]
    return y_array
```

```c++
V3 GetPoCAPoint(V3 const& p1, V3 const& p2, V3 const& p3, V3 const& p4) {
    V3 v_in = p2 - p1;
    V3 v_out = p4 - p3;
    V3 v_n = v_in.cross(v_out);
    v_n = v_n.normalize();
    double d = (p3 - p2).dot(v_n);
    double t_i = (v_out.x * (d * v_n.y + p2.y - p3.y) - v_out.y * (d * v_n.x + p2.x - p3.x)) / (v_out.x * v_in.y - v_in.x * v_out.y);
    return p2 - (t_i * v_in) + (0.5 * d * v_n);
}
```

```latex
\begin{align*}
    \partial_i r
    &= \partial_i \sqrt{(x-x')^2 + (y-y')^2 + (z-z')^2} \\
    &= \frac{2(x-x')}{2\sqrt{(x-x')^2 + (y-y')^2 + (z-z')^2}} \\
    &= \frac{x-x'}{r}
\end{align*}
```

### **表格测试**

| **A1** | **A2** | **A3** | **A4** |
| :----: | :----: | :----: | :----: |
|   B1   |   B2   |   B3   |   B4   |
|   C1   |   C2   |   C3   |   C4   |
|   D1   |   D2   |   D3   |   D4   |

### **复选框测试**

- [x] 🥰
- [ ] 😀
