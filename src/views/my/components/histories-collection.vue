<template>
  <div class="his-coll">
    <!-- 导航栏 -->
    <van-nav-bar
      class="page-nav-bar"
      left-arrow
      :title="type"
      @click-left="$router.back()"
      fixed
    ></van-nav-bar>
    <!-- /导航栏 -->
    <article-list ref="article-list" :type="t" />
  </div>
</template>

<script>
import ArticleList from './article-list'
export default {
  name: 'HisColl',
  props: {
    userId: {
      type: [String, Number],
      required: true
    },
    t: {
      type: String,
      required: true
    }
  },
  components: { ArticleList },
  data() {
    return {
      channel: {},
      type: ''
    }
  },
  methods: {},
  created() {
    if (this.t === 'coll') {
      this.type = '收藏文章'
    } else if (this.t === 'his') {
      this.type = '历史记录'
    }
  }
}
</script>

<style lang="less" scoped>
.grid-nav {
  .grid-item {
    height: 141px;
    i.toutian {
      font-size: 45px;
    }
    .toutiao-shoucang {
      color: #eb5253;
    }
    .toutiao-lishi {
      color: #ff9d1d;
    }
    span.text {
      font-size: 28px;
    }
  }
}
</style>
