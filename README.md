# dob-nuxt-koa2-element

> nuxt + koa2 + element-ui

> 本项目采用NUXT基础框架，融合koa2，element-ui；采用JWT权限认证。

## 版本纠错
>> npm install 后 npm run dev 报错：『HTMLElement is not defined』，这个问题是由于目前element-ui 版本和nuxt版本导致，解决方案有：
>> 1.降低element-ui版本
>> 2.删除element-ui中『HTMLElement』，本人习惯使用该方案，如下：
```
打开：node_modules/element-ui/lib/element-ui.common.js
搜索：HTMLElement （约36822行）
修改为：scrollContainer: [String]

```

## 获取资源
$ git clone git@github.com:dobweb/dob-nuxt-koa2-element.git

## Build Setup

``` bash
# install dependencies
$ npm install

# serve with hot reload at localhost:3000
$ npm run dev

# build for production and launch server
$ npm run build
$ npm start

# generate static project
$ npm run generate
```
