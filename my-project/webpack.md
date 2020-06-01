---
title: 0.0 webpack 笔记
tags: webpack
notebook:webpack
---

### 最近用公司的企业权益，在极客时间兑换了webpack的课程。之前对webpack的了解非常有限制，前学习了第一章和第二章，突然有个想法想把学习的内容记录下来，说干就干。


### 这个项目有测试和生产两套运行环境 （默认你已经安装nodejs）

```
  //启动测试环境只需要以下两个步骤
  npm install 
  npm run dev
  //启动生产环境
  npm install
  npm run build
```


> 该项目dev环境已经配置有热更新、解析css、less、图片、字体等简单配置。

> 该项目的生产环境除了dev环境基础的解析外，还配置有css、html压缩、代码注入、和文件指纹等(chunkhash,contenthash,hash)