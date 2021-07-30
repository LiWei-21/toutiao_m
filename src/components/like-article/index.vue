<template>
  <van-button
    :icon="value === -1 ? 'good-job-o' : 'good-job'"
    :class="{ liked: value === 1 }"
    @click="onCollect"
    :loading="loading"
  ></van-button>
  <!-- <van-icon
    v-if="value === -1"
    color="#777"
    name="good-job-o"
    @click="onCollect"
    :loading="loading"
  />
  <van-icon v-else color="#ffa500" name="good-job" @click="onCollect" /> -->
</template>

<script>
import { addLike, deleteLike } from '@/api/User'
export default {
  name: 'LikeArticle',
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return { loading: false }
  },
  methods: {
    async onCollect() {
      this.loading = true
      let status = -1
      if (this.value === 1) {
        try {
          await deleteLike(this.articleId)
          this.$toast.success('取消点赞成功')
        } catch (err) {
          this.$toast.fail('取消点赞失败', err)
        }
      } else {
        try {
          await addLike(this.articleId)
          this.$toast.success('点赞成功')
          status = 1
        } catch (err) {
          this.$toast.fail('点赞失败', err)
        }
      }
      this.loading = false
      this.$emit('input', status)
    }
  }
}
</script>

<style lang="less" scoped>
.liked {
  .van-icon {
    color: #ffa500;
  }
}
.van-button--default {
  border: 0.02667rem solid #fff;
}
</style>
