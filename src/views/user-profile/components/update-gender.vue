<template>
  <div class="update-gender">
    <van-picker
      title="标题"
      show-toolbar
      :default-index="value"
      :columns="columns"
      @confirm="onConfirm"
      @cancel="$emit('close')"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/User'
export default {
  name: 'UpdateGender',
  components: {},
  props: {
    value: {
      type: [Number, String],
      required: true
    }
  },
  data() {
    return {
      columns: ['男', '女']
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm(value, index) {
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        await updateUserProfile({
          gender: index
        })
        // console.log(data)
        this.$emit('input', index)
        this.$emit('close')

        this.$toast.success('修改性别成功')
      } catch (err) {
        this.$toast.fail('修改性别失败')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
