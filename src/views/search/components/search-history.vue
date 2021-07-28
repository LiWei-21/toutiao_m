<template>
  <div class="search-history">
    <van-cell title="搜索历史">
      <div v-if="isEdit">
        <span @click="$emit('clear-search-histories')">全部删除</span>
        &nbsp;&nbsp;<span @click="isEdit = false">完成</span>
      </div>

      <van-icon name="delete" @click="isEdit = true" />
    </van-cell>
    <van-cell
      :title="text"
      :key="index"
      v-for="(text, index) in searchHistories"
      @click="onSearchItemClick(text, index)"
    >
      <van-icon v-if="isEdit" name="close" />
    </van-cell>
  </div>
</template>

<script>
export default {
  name: 'SearchHistory',
  components: {},
  props: {
    searchHistories: {
      type: Array,
      required: true
    }
  },
  data() {
    return {
      isEdit: false
    }
  },
  computed: {},
  watch: {},
  created() {},
  mounted() {},
  methods: {
    onSearchItemClick(text, index) {
      if (this.isEdit) {
        this.searchHistories.splice(index, 1)
      } else {
        this.$emit('search', text)
      }
    }
  }
}
</script>

<style scoped lang="less"></style>
