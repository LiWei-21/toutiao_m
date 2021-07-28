<template>
  <div class="search-result">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      :error.sync="error"
      error-text="请求失败，点击重新加载"
      @load="onLoad"
    >
      <!-- <van-cell
        v-for="(item, index) in list"
        :key="index"
        :title="item.title"
      /> -->
      <article-item
        :key="index"
        v-for="(article, index) in list"
        ref="aritcle-item"
        :article="article"
      />
    </van-list>
  </div>
</template>

<script>
import ArticleItem from '@/components/article-item'
import { getSearchResults } from '@/api/search'
export default {
  name: 'SearchResult',
  components: {
    ArticleItem
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      error: false,
      page: 1
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      try {
        // 1. 请求获取数据
        const { data } = await getSearchResults({
          page: this.page,
          per_page: 20,
          q: this.searchText
        })
        const { results } = data.data
        // 2. 将数据添加到数组列表中
        this.list.push(...results)
        // 3. 将本次加载中的 loading 关闭
        this.loading = false
        // 4. 判断是否还有数据
        if (results.length) {
          // 如果有，则更新获取下一个数据的页码
          this.page++
        } else {
          // 如果没有，则将加载状态 finished 设置为结束
          this.loading = false
          this.finished = false
        }
      } catch (err) {
        this.error = true
        // 展示加载失败的提示状态
        this.loading = false
        // 加载失败了 loading 也要关闭}
      }
    }
  }
}
</script>

<style lang="less" scoped></style>
