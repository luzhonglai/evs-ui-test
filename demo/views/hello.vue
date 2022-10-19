<!--
 * @Description: 测试组件
 * @Author: luzhonglai
 * @Date: 2022-10-16 14:10:24
 * @LastEditors: luzhonglai
 * @LastEditTime: 2022-10-20 01:07:16
 * @FilePath: \github\evs-ui-test\demo\views\hello.vue
-->
<template>

</template>

<script setup lang="ts">
import { reactive, getCurrentInstance, toRefs, onMounted } from 'vue'
const { ctx }: any = getCurrentInstance() // 获取全局方法

const state = reactive({
  pagination: {
    currentPage: 1,
    pageSizes: [10, 20, 30],
    pageSize: 10,
    total: 0,
  },
  tableData: [
    {
      date: '2016-05-02',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1518 弄',
    },
    {
      date: '2016-05-04',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1517 弄',
    },
    {
      date: '2016-05-01',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1519 弄',
    },
    {
      date: '2016-05-03',
      name: '王小虎',
      address: '上海市普陀区金沙江路 1516 弄',
    },
  ],
})

const { tableData, pagination } = toRefs(state)

onMounted(() => {
  
})
</script>

<style lang="less" scoped></style>
