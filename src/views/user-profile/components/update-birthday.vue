<template>
  <div class="update-birthday">
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="选择年月日"
      :min-date="minDate"
      :max-date="maxDate"
      @cancel="$emit('close')"
      @confirm="onConfirm"
    />
  </div>
</template>

<script>
import { updateUserProfile } from '@/api/User'
import dayjs from 'dayjs'
export default {
  name: 'UpdateBirthday',
  components: {},
  props: {
    value: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      minDate: new Date(1970, 0, 1),
      maxDate: new Date(),
      currentDate: new Date(this.value)
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    async onConfirm(value) {
      const currentDate = dayjs(value).format('YYYY-MM-DD')
      console.log(currentDate)
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true
      })
      try {
        await updateUserProfile({
          birthday: currentDate
        })
        // console.log(data)
        this.$emit('input', currentDate)
        this.$emit('close')

        this.$toast.success('修改生日成功')
      } catch (err) {
        this.$toast.fail('修改生日失败')
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
