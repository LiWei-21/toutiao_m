<template>
  <div class="search-suggestion">
    <van-cell
      v-for="(item, index) in searchSuggenestionList"
      :key="index"
      icon="search"
      @click="$emit('search', item.q)"
    >
      <!-- 双花括号绑定会直接输出纯文本内容 -->
      <!-- <div>{{ htmlStr }}</div> -->

      <!-- 使用 v-html 指令可以绑定渲染带有 HTML 标签的字符串 -->
      <!-- <div v-html="htmlStr"></div> -->
      <div slot="title" v-html="highlight(item.q)"></div>
    </van-cell>
  </div>
</template>

<script>
import { getSearchSuggenestions } from '@/api/search'
import { debounce } from 'loadsh'
export default {
  name: 'SearchSuggestion',
  components: {},
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      searchSuggenestionList: []
    }
  },
  computed: {},
  watch: {
    searchText: {
      // 当 searchText 发生改变的时候就会调用 handler 函数
      // 注意：handler 函数名称是固定的
      // handler (value) {
      //   console.log(value)
      // },

      // debounce 函数
      // 参数1：一个函数
      // 参数2：延迟时间，单位是毫秒
      // 返回值：防抖之后的函数
      handler: debounce(function(value) {
        this.getSearchSuggenestionList(value)
      }, 200),
      // handler (value) {
      //   this.loadSearchSuggestions(value)
      // },
      immediate: true // 该回调将会在侦听开始之后被立即调用
    }
  },
  created() {},
  mounted() {},
  methods: {
    async getSearchSuggenestionList(value) {
      try {
        const { data } = await getSearchSuggenestions({
          q: value
        })
        let arry = []
        data.data.options.forEach(item => {
          arry.push(JSON.parse(item))
        })
        this.searchSuggenestionList = arry
      } catch (err) {
        this.$toast('获取数据失败')
      }
    },
    highlight(text) {
      const htmlStr = `<span class="active">'${this.searchText}'</span>`
      // 正则表达式 // 中间的内容都会当作匹配字符来使用，而不是数据变量
      // 如果需要根据数据变量动态的创建正则表达式，则手动 new RegExp
      // RegExp 正则表达式构造函数
      //    参数1：匹配模式字符串，它会根据这个字符串创建正则对象
      //    参数2：匹配模式，要写到字符串中
      const val = new RegExp(this.searchText, 'gi')
      return text.replace(val, htmlStr)
    }
  }
}
</script>

<style lang="less" scoped>
.search-suggestion {
  /deep/ span.active {
    color: #3296fa;
  }
}
</style>
