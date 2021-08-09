<template>
  <div class="update-name">
    <!-- 导航栏 -->
    <van-nav-bar
      title="编辑昵称"
      left-text="取消"
      right-text="完成"
      @click-left="$emit('close')"
      @click-right="onComfig"
    />
    <div class="nameFiled">
      <van-field
        v-model.trim="localName"
        rows="2"
        autosize
        type="textarea"
        maxlength="7"
        placeholder="请输入留言"
        show-word-limit
      />
    </div>
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/User'
export default {
  name: 'UpdateName',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      localName: this.value
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onComfig() {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      if (!this.localName) {
        this.$toast('名称不能为空')
        return
      }
      try {
        await updateUserProfile({ name: this.localName })
        this.$emit('input', this.localName)
        this.$emit('close')
        // console.log(data)
        this.$toast.success('修改名称成功')
      } catch (err) {
        this.$toast.fail('修改名称失败')
      }
    }
  }
}
</script>

<style scoped lang="less">
.update-name {
  .nameFiled {
    padding: 20px;
  }
}
</style>
