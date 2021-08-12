<template>
  <div class="article-list">
    <van-pull-refresh v-model="refreshing" :success-text="refreshSuccessText">
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
import { getUserCollections, getUserHistories } from '@/api/article.js'
import ArticleItem from '@/components/article-item'
export default {
  name: 'ArticleList',
  components: {
    ArticleItem
  },
  props: {
    type: {
      type: String,
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
      refreshSuccessText: '',
      page: 1
    }
  },
  computed: {},
  watch: {},
  created() {
    console.log(this.type)
  },
  mounted() {},
  methods: {
    async onLoad() {
      // 异步更新数据
      // setTimeout 仅做示例，真实场景中一般为 ajax 请求
      try {
        // 用户个人界面获取文章列表
        var data = null
        if (this.type === 'his') {
          data = await getUserHistories({
            page: this.page,
            per_page: 10
          })
          this.page++
        } else if (this.type === 'coll') {
          // 首页获取列表
          data = await getUserCollections({
            page: this.page,
            per_page: 10
          })
        }

        // // 模拟随机失败的情况
        // if (Math.random() > 0.1) {
        //   JSON.parse('dsnajndjsa')
        // }
        const { results } = data.data.data
        this.articleList.push(...results)

        this.loading = false
        // 4. 判断数据是否加载结束
        if (results.length) {
          // 更新获取下一页数据的时间戳
          this.timestamp = data.data.pre_timestamp
          this.page++
        } else {
          // 没有数据了，设置加载状态结束，不再触发上拉加载更多了
          this.finished = true
        }
      } catch (err) {
        // if (err.response.status === 401) {
        //   this.$toast('登入验证过期，请重新登入')
        // }
        this.error = true
        this.loading = false
      }
      // // 加载状态结束
    }
  }
}
</script>

<style scoped lang="less">
.crticle-list {
  height: 79vh;
  overflow-y: auto;
}
</style>
