<template>
  <div class="qa-container"></div>
</template>

<script>
// import io from 'socket.io-client'
// import { qa } from '../../api/qa'
export default {
  name: 'QaIndex',
  data() {
    return {}
  },
  created() {
    this.getqa()
  },
  methods: {
    // async getqa() {
    //   // 连接服务器端
    //   let socket = io('http://localhost:3000')
    //   // 连接成功后，回调函数
    //   socket.on('connect', () => {
    //     console.log('connect .....')
    //   })
    //   // 通过emit发送消息给服务端
    //   socket.emit('message', { name: 'xiaoming', age: 18 })
    //   // 通过on监听服务器端返回的数据
    //   socket.on('news', msg => {
    //     console.log(msg) // ok
    //   })
    //   try {
    //     const { data } = await qa({
    //       msg: '你好',
    //       timestamp: Date.now()
    //     })
    //     console.log(data)
    //   } catch (error) {
    //     this.$toast.fail('获取回答错误')
    //   }
    // }
  }
}
</script>

<style lang="less" scoped></style>
