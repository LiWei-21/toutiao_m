<template>
  <van-button
    :icon="value ? 'star' : 'star-o'"
    :class="{ collectd: value }"
    @click="onCollect"
    :loading="loading"
  ></van-button>
  <!-- <van-icon
    v-if="!value"
    color="#777"
    name="star-o"
    @click="onCollect"
    :loading="loading"
  />
  <van-icon v-else color="#ffa500" name="star" @click="onCollect" /> -->
</template>

<script>
import { addCollect, deleteCollect } from '@/api/User'
export default {
  name: 'CollectArticle',
  props: {
    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [Number, String, Object],
      required: true
    }
  },
  data() {
    return {
      loading: false
    }
  },
  methods: {
    async onCollect() {
      this.loading = true
      if (!this.value) {
        try {
          await addCollect(this.articleId)
          this.$toast.success('收藏成功')
        } catch (err) {
          this.$toast.fail('收藏失败', err)
        }
      } else {
        try {
          await deleteCollect(this.articleId)
          this.$toast.success('取消收藏成功')
        } catch (err) {
          this.$toast.fail('取消收藏失败', err)
        }
      }
      this.loading = false
      this.$emit('input', !this.value)
    }
  }
}
</script>

<style lang="less" scoped>
.collectd {
  .van-icon {
    color: #ffa500;
  }
}
.van-button--default {
  border: 0.02667rem solid #fff;
}
</style>
