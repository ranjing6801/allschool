# allschool

> 整校扫码加班
> a vue project with webpack and vuex



## 技术栈

vue2 + vuex + vue-router + mint-ui + webpack + ES6/7 + axios + sass + flex + jquery


## 项目运行

## Build Setup


``` bash
# 第一次拉取代码后 先依赖安装
# install dependencies

cd allschool && npm install

# localhost
npm start
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report
```


# 项目布局

```
.
├── build                                       // webpack配置文件
├── config                                      // 项目打包路径
├── src                                         // 源码目录
│   ├── components                              // 组件 页面
│   ├── api                                     // 接口封装
│   ├── router
│   │   └── router.js                           // 路由配置
│   ├── store                                   // vuex的状态管理
│   │   ├── action.js                           // 配置actions
│   │   ├── getters.js                          // 配置getters
│   │   ├── index.js                            // 引用vuex，创建store
│   │   ├── mutation-types.js                   // 定义常量muations名
│   │   └── mutations.js                        // 配置mutations
│   └── style
│   ├── App.vue                                 // 页面入口文件
│   ├── main.js                                 // 程序入口文件，加载各种公共组件
├── index.html                                  // 入口html文件

