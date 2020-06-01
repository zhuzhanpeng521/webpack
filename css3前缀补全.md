---
title: 1.1 css3前缀补全
tags: webpack
notebook: webpack
---


``` 
  //添加需要的插件和loader
  npm i postcss-loader autoprefixer -D

  {
    test: /\.less$/,
    use: [
      MiniCssExtractPlugin.loader,
      'css-loader',
      'less-loader',
      {
        loader: 'postcss-loader',
        options: {
          plugins: () => [
            require("autoprefixer")({
              browsers: ['last 2 version', '> 1%', 'ios 7']
            })
          ]
        }
      }
    ]
  }
```
