<template>
  <div class="article-list">
    <van-pull-refresh
      v-model="refreshing"
      :success-text="refreshSuccessText"
      @refresh="onRefresh"
    >
      <van-list
        v-model="loading"
        :finished="finished"
        finished-text="没有更多了"
        :error.sync="error"
        error-text="请求失败，点击重新加载"
        @load="onLoad"
      >
        <article-item
          :key="index"
          v-for="(article, index) in articleList"
          ref="aritcle-item"
          :article="article"
        />
        <!-- <van-cell
          v-for="(item, i) in articleList"
          :key="i"
          :title="item.title"
        /> -->
      </van-list>
    </van-pull-refresh>
  </div>
</template>

<script>
import { getArticleList } from '@/api/article.js'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    channel: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      articleList: [],
      loading: false,
      finished: false,
      timestamp: null,
      error: false,
      refreshing: false,
      refreshSuccessText: ''
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id, // 频道ID
          // 你可以把 timestamp 理解为页码
          // 如果请求第1页数据：当前最新时间戳 Date.now
          // 如果请求之后的数据，使用本次接口返回的数据中的 pre_timestamp
          timestamp: this.timestamp || Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // // 模拟随机失败的情况
        // if (Math.random() > 0.1) {
        //   JSON.parse('dsnajndjsa')
        // }
        const { results } = data.data
        this.articleList.push(...results)

        this.loading = false
        // 4. 判断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.pre_timestamp
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        this.error = true
        this.loading = false
      }
      // // 加载状态结束
    },
    async onRefresh() {
      try {
        const { data } = await getArticleList({
          channel_id: this.channel.id, // 频道ID
          // 你可以把 timestamp 理解为页码
          // 如果请求第1页数据：当前最新时间戳 Date.now
          // 如果请求之后的数据，使用本次接口返回的数据中的 pre_timestamp
          timestamp: Date.now(), // 时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳
          with_top: 1 // 是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
        })
        // // 模拟随机失败的情况
        // if (Math.random() > 0.1) {
        //   JSON.parse('dsnajndjsa')
        // }
        const { results } = data.data
        this.articleList.unshift(...results)
        this.refreshing = false
        this.refreshSuccessText = '刷新成功'
      } catch (err) {
        this.refreshing = false
        this.refreshSuccessText = '刷新失败'
      }
    }
  }
}
</script>

<style scoped lang="less">
.article-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
