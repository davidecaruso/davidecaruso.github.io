---
title: Hello World
tags:
  - hexo
  - bio
  - static-site-generator
subtitle: Create a blog with Hexo
date: 2018-02-15 12:47:44
---
Could my first post's title ever be something different to "Hello World"? Obviously, not.
First of all, if you don't yet, let's know [who I am](/about), and then you can read here what is this blog.

## The idea
The main reason which guided me to squander bunch of bytes writing this things is that my memory is very unreliable. I'm going to write here stuff that could be usefull in the future, because could be a very practical thing or because could be an ispiration idea. 

Many profitable thoughts are made every single day in mind of everyone, things which will probably lost or maybe remembered with a lot of effort: one of the oldest things in the world, and also one of the oldest need of humanity, is writing, so WRITE.

## Hexo makes it real
It is made through [Hexo](https://hexo.io), a powerful static-site generator written in NodeJS. Obviously, as each choice regarding which technology to use, the choice was been difficult: I was uncertain among it and [Hugo](https://gohugo.io/), written in Go with a increasing trend and a large community support; I also found other two valid frameworks - both two sexy - doing the same (almost) things: [Nuxt](https://nuxtjs.org/) - of which father is VueJS - and [Gatsby](https://www.gatsbyjs.org/) - of which father is ReactJS.

So the question is: Why Hexo?
- Is not coupled with an existing standalone framework - as Gatsby with React.
- Has a great integration with GitHub Pages.
- Has the markdown support for post creation but you can choose a lot of template engines.
- Provide by itself a cache system.
- Is fast, yes it is.

## Hexo's features
I use it since a ridiculous time, but I already like many features. First of all is themes: Hexo has hundreds of free [themes](https://hexo.io/themes/) you can use, but you can obviuously create your own. 

In the other side has a great command-line integration, infact you can create drafts and articles, pages and layouts, publish article or deploy your blog and may other things by terminal.

## How to install Hexo
Install it is very easily:

```bash
yarn global add hexo-cli
hexo init blog && cd blog
yarn install
hexo server
```

Now if you visit *http://localhost:4000/* you can see a running Hexo blog.
If you want to know more things about Hexo visit its [documentation page](https://hexo.io/docs/).
<br><br>Bye.