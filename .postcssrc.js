// PostCss 配置文件

module.exports = {
  // 配置要使用的 PostCss 插件
  plugins: {
    // 配置使用 autoprefixer 插件
    // 作用：生产浏览器css样式规则前缀
    // VueCLI 内部已经部署了autoprefixer 插件
    // 所以又配置了一次，产生了冲突 ，所以要注释掉
    // 'autoprefixer': {
    //   // autoprefixer 操作的配置
    //   // 配置要兼容到的环境信息
    //   browsers: ['Android >= 4.0', 'iOS >= 8']
    // },

    // 配置使用 postcss-pxtorem 插件
    // 作用： 把px 转换为 rem
    'postcss-pxtorem': {
      // lib_filexble 的 REM 适配方案: 把一行分为十份，每份就是十分之一
      // 所以 rootValue 应该设置为你的设计稿宽度的十分之一
      // 我们的设计稿普遍为 750px, 所以应该设置为 750 /10 = 75
      // 都是 Vant 建议设置为 37.5，因为Vant 是基于 375 写的
      // 所以必须设置为 37.5， 位于的缺点就是我们使用我们的设计稿的尺寸的必须 / 2
      // 那有什么更好跟方便的发方法呢？
      //   如果是Vant 的样式，就按照 37.5 来转换
      //   如果是我们自己的样式，就按照 75 来转换
      // 通过查阅 PostCSS 文档我们发现 rootValue 支持两种类型：
      //   数字：固定的数值
      //   函数：可以动态的处理返回
      //         postcss-pxtorem 处理每个 css 文件时都会调用这个函数
      //         它会把被处理的 css 文件的相关信息通过参数传递给该函数
      rootValue({ file }) {
        return file.indexOf('vant') !== -1 ? 37.5 : 75
      },
      // 配置要转换的 css 属性
      // * 表示所有属性
      propList: ['*']
    }
  }
}
