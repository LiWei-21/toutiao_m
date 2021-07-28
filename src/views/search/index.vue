<template>
  <div class="search-container">
    <form action="/">
      <van-search
        class="search-form"
        v-model="searchText"
        background="#3296fa"
        show-action
        placeholder="请输入搜索关键词"
        @search="onSearch"
        @cancel="onCancel"
        @focus="isResultShow = false"
      />
      <!-- 搜索结果 -->
      <search-result
        v-if="isResultShow"
        :searchText="searchText"
      ></search-result>
      <!-- 联想搜索 -->
      <search-suggestion
        v-else-if="searchText"
        :searchText="searchText"
        @search="onSearch"
      ></search-suggestion>
      <!-- 搜索历史 -->
      <search-history
        v-else
        :search-histories="searchHistories"
        @clear-search-histories="searchHistories = []"
        @search="onSearch"
      ></search-history>
    </form>
  </div>
</template>

<script>
import SearchHistory from './components/search-history.vue'
import SearchSuggestion from './components/search-suggestion.vue'
import SearchResult from './components/search-result.vue'
import { getItem, setItem } from '@/utils/storage.js'
export default {
  name: 'SearchPage',
  components: {
    SearchHistory,
    SearchSuggestion,
    SearchResult
  },
  props: {},
  data() {
    return {
      searchText: '',
      isResultShow: false,
      searchHistories: getItem('TOUTIAO_SEARCH_HISTORIES') || []
    }
  },
  computed: {},
  watch: {
    searchHistories(value) {
      setItem('TOUTIAO_SEARCH_HISTORIES', value)
    }
    // searchHistories: {
    //   handler () {}
    // }},
  },
  created() {},
  methods: {
    onSearch(val) {
      this.searchText = val
      // 存储搜索历史记录
      // 要求：不要有重复历史记录、最新的排在最前面
      const index = this.searchHistories.indexOf(val)
      if (index !== -1) {
        this.searchHistories.splice(index, 1)
      }
      this.searchHistories.unshift(val)
      console.log(this.searchHistories)
      this.isResultShow = true
    },
    onCancel() {
      this.$router.back()
    }
  }
}
</script>

<style lang="less" scoped>
.search-container {
  padding-top: 108px;
  .van-search__action {
    color: #fff;
  }
  .search-form {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 1;
  }
}
</style>
