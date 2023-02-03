---
title: Hello World
date: 2023-02-03 12:00:00
updated:
top_img: /img/PKU_peach_blossom.jpg
tags: 博客
categories: 博客
description: 搭建 GitHub Pages + Hexo + Butterfly 博客的笔记
cover: /img/PKU_peach_blossom.jpg
katex: true
---

<iframe frameborder="no" border="0" marginwidth="0" marginheight="0" width=330 height=86 src="//music.163.com/outchain/player?type=2&id=22636684&auto=1&height=66"></iframe>

### 申请 GitHub Pages

新建一个 GitHub 仓库，命名为 `(user_name).github.io`，隐私设置为 Public，再建一个 GitHub 仓库用来存放博客的源代码（可选）

### 申请域名

我选择的是阿里云，在[万网](https://wanwang.aliyun.com/)输入自己想要的域名并购买。一般来讲 `.top` 最便宜，`.xyz` 次之。 假设域名为 `example.top` 根据网站提示做好域名实名制认证等流程。在[域名控制台](https://dc.console.aliyun.com/next/#/domain/list/all-domain)中选择：域名 >> 操作 >> 解析

解析中添加一条记录：

```
记录类型：CNAME；
主机记录自选（我这里选择的是 blog，因为 www 经常无法与 GitHub Pages 连接）；
解析线路选择默认；
记录值选择 `(user_name).github.io`；
TTL选择“10分钟”
```

再去名为 `(user_name).github.io` 的仓库，新建一个文件，文件名为 `CNAME`，填入 `blog.example.top` ，通过 GitHub 的网络检测后就可以使用。

此时可以分别在浏览器中输入 `(user_name).github.io` 和 `blog.example.top` 试一试，如果能显示`README.md` 中的内容则设置成功。

### Hexo 搭建并添加文章

我选择用 [Hexo](https://hexo.io/zh-cn/index.html)

建议在 Linux 上搭建，而不用 Windows

下载 Node-js 和 npm：`sudo pacman -S nodejs npm`

下载 Hexo 的方法如下：

```bash
npm install hexo
```

之后在 `~/.bashrc` 中加入一行：

```
PATH=~/node_modules/.bin:$PATH
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

添加文章：

```bash
npx hexo new post hello
```

这会生成 `blog.example.top/hello`

在子文件夹下添加文章：

```bash
npx hexo new post --path hello/world
```

这生成 `blog.example.top/hello/world`

### 调试并部署到 GitHub

安装 [hexo-deployer-git](https://github.com/hexojs/hexo-deployer-git)。

```bash
npm install hexo-deployer-git
```

修改配置 `_config.yml`：

```yaml
deploy:
  type: git
  repo: https://oauth2:(user_token)@github.com/(user_name)/(user_name).github.io
  branch: (branch_name) # default is "main"
```

从2021年8月13日起，GitHub 不再支持通过邮箱和密码校验身份，需要使用 [Personal Access Token](https://github.com/settings/tokens) 或者用 [SSH](https://github.com/settings/ssh/new) 密钥登陆 GitHub 才能向仓库上传代码

申请 Personal Access Token 时记得勾选全部权限

如果使用 SSH，`repo` 一栏填写 `git@github.com:(user_name)/(user_name).github.io`

调试：

```bash
npx hexo clean && npx hexo s --debug
```

部署：

```bash
npx hexo clean && npx hexo deploy
```

查看 `(user_name).github.io` 和 `blog.example.top` 上的网页是否部署成功

注意此时原有的自定义域名会被覆盖掉，如果 GitHub Pages 需要使用 CNAME 文件自定义域名，请将 CNAME 文件置于博客目录下的 `source` 文件夹，只有这样 `npx hexo deploy` 才能将 CNAME 文件一并推送至部署分支

CNAME 文件中只需要写一行自定义域名即可：

```
blog.example.top
```

### Butterfly 主题

我选择的是 [Butterfly](https://butterfly.js.org/) 主题，安装方法：

```bash
npm install hexo-theme-butterfly
```

这样的话它会保存在`(hexo_folder)/node_modules/hexo-theme-butterfly`（下文称为“**主题目录**”），更新主题需要在`(hexo_folder)`下执行`npm update hexo-theme-butterfly`

可以在 `(hexo_folder)/themes` 中创建软链接：

```bash
ln -s ../node_modules/hexo-theme-butterfly/
```

可以卸载自带的默认主题 Landscape：

```bash
npm uninstall hexo-theme-landscape
```

Butterfly 配置的官方指南在 https://butterfly.js.org/v5/getting-started/

在`(hexo_folder)/_config.yml`下修改：`theme:butterfly`

在博客目录下创建 `_config.butterfly.yml` 文件，以后如果修改任何主题配置，都只需修改 `_config.butterfly.yml` 的配置即可，其优先级比主题目录下的 `_config.yml`高

本站的主题字体设置：

```yaml
font:
  global-font-size:
  code-font-size:
  font-family: Noto Sans CJK SC, PingFang SC, Microsoft Yahei, sans-serif
  code-font-family: JetBrains Mono NL, Noto Sans Mono CJK SC, Menlo, Consolas, monospace
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

### LaTeX 测试

行内公式： $\lim\limits_{n\to\infty}\left(1+\dfrac{1}{n}\right)^n=\mathrm{e}$

另一个行内公式: $\sum\limits_{n=0}^{\infty}\dfrac{x^n}{n!}=\mathrm{e}^x$

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
    &= \frac{A}{2}\cdot\left(\frac{Dp_x - Bp_\theta}{AD - BC}\right)^2 + \frac{D}{2}\cdot\left(\frac{Ap_\theta - Cp_x}{AD - BC}\right)^2 + \frac{B}{(AD - BC)^2}(Dp_x - Bp_\theta)(Ap_\theta - Cp_x) + mg(ax^2 - l\cos\theta) \\
    &= \frac{Dp_x^2 + Ap_\theta^2 - (B+C)p_x p_\theta}{2(AD - BC)} \\
    &= \frac{[p_\theta,\ p_x]\begin{bmatrix}A & B \\ C & D\end{bmatrix}\begin{bmatrix}p_\theta \\ p_x\end{bmatrix}}{2\begin{vmatrix}A & B \\ C & D\end{vmatrix}} + mg(ax^2 - l\cos\theta)
\end{align*}
$$

### 代码高亮测试

```python
def fib(n):
    a, b = 0, 1
    while a < n:
        print(a, end=' ')
        a, b = b, a+b
    print()
fib(1000)
```

### 图片测试

格式：`![](../img/(your_picture)`，图片放在博客目录的 `/source/img/` 下

![](../img/hello_world_reimu.jpg)