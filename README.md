# uniapp + Vue3 + TS 微信小程序开发模板

## 特点

- 使用最新的 uniapp, Vue3, TypeScript, Pinia 等主流技术开发
- uni-ui，unocss
- 代码规范，ESLint + Prettier + StyleLint
- 请求处理，包括异常、中断请求、凭证失效处理
- Mockjs，模拟接口返回数据

## 使用

```
# CLI 工具安装
npm install -g @vue/cli

# clone 项目
git clone https://github.com/zhuanglong/uni-weapp-template.git

# 切换到项目
cd uni-weapp-template

安装依赖
# pnpm install

# 运行
pnpm dev:mp-weixi

# 打包
pnpm build:mp-weixi

# 预览
下载并打开[微信开发者工具](https://developers.weixin.qq.com/miniprogram/dev/devtools/download.html)，然后选择 taro-weapp-template 项目根目录进行预览。
```

## VSCode 插件

为了更好的开发体验，建议安装推荐的插件 `.vscode/extensions.json`。

## 常见问题

1、MAC M1(ARM芯片)
```
**MAC M1(ARM芯片)，其它操作系统无需关注**

手动安装: 
`pnpm add @esbuild/darwin-x64@0.18.20 -D`
安装的版本或者指令可以运行下面这个脚本获取 `node arm-esbuild-version.js`

自动安装：
`pnpm mac:m1:esbuild`
```

## 其他限制

*   小程序不支持 tsx

    [JSX/TSX 支持 | uni-app官网](https://uniapp.dcloud.net.cn/tutorial/syntax-jsx.html#jsx-tsx-%E6%94%AF%E6%8C%81)

    [建议新增小程序jsx的支持 · Issue #4683 · dcloudio/uni-app · GitHub](https://github.com/dcloudio/uni-app/issues/4683)

*   \:title="true" 组件属性要写完整，简写会编译到class中
*   不支持`index.ts export { default } from './EmptyStatus.vue';`
*   uni里面的内置组件(view text)不能使用ref，如果是自定义组件可以用ref获取到，但是循环创建的自定义组件的话ref也不能用了。 这里可以推荐一个万金油方法标签上id然后\
    `const query=uni.createSelectorQuery().in(this).select("#id")._component.$children`
