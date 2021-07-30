<template>
  <van-button
    v-if="!isFollowed"
    type="info"
    color="#3296fa"
    round
    size="small"
    icon="plus"
    @click="onFollow"
    :loading="loading"
    >关注</van-button
  >
  <van-button v-else round size="small" @click="onFollow">已关注</van-button>
</template>

<script>
import { addFollowed, deleteFollowed } from '@/api/User'
export default {
  name: 'FollowUser',
  data() {
    return {
      loading: false
    }
  },
  model: {
    prop: 'isFollowed',
    event: 'followed'
  },
  props: {
    isFollowed: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  methods: {
    async onFollow() {
      this.loading = true
      if (!this.isFollowed) {
        try {
          const { data } = await addFollowed(this.articleId)
          this.$toast.success('关注成功')
          console.log(data)
        } catch (err) {
          let message = '关注失败'
          if (err.response.status === 400) {
            message = '不能关注自己'
          }
          this.$toast.fail(message, err)
        }
      } else {
        try {
          const { data } = await await deleteFollowed(this.articleId)
          this.$toast.success('取消关注成功')
          console.log(data)
        } catch (err) {
          this.$toast.fail('取消关注失败', err)
        }
      }
      this.$emit('followed', !this.isFollowed)
      this.loading = false
    }
  }
}
</script>

<style lang="less" scoped></style>
