<!--
 * @Descripttion:
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-04-01 16:37:56
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-04-06 15:10:49
-->

# EvsTablePag

表格组件和分页组件容器组件，便操作表格数据列表、分页等。

## 属性说明

| 参数        | 说明         | 类型    | 可选值 | 默认值         |
| ----------- | ------------ | ------- | ------ | -------------- |
| data        | 配置 table   | object  | —      | —              |
| loading     | 显示 loading | boolean | —      | false          |
| border      | 显示边框     | boolean | —      | true           |
| pagination  | 配置分页     | object  | —      | —              |
| loadingText | loading 文案 | string  | —      | 数据加载中.... |

## 基本使用

:::demo 当`EvsTablepage`注入`pagination`对象后, 该对象对分页配置进行操控。

```html
<template>
  <EvsTablePage :pagination="pagination" @size-change="handleSizeChange" @current-change="handleCurrentChange">
    <template #table>
      <el-table :data="tableData" style="width: 100%">
        <el-table-column prop="date" label="日期" width="180"></el-table-column>
        <el-table-column prop="name" label="姓名" width="180"></el-table-column>
        <el-table-column prop="address" label="地址"></el-table-column>
      </el-table>
    </template>
  </EvsTablePage>
</template>

<script>
  import { defineComponent, reactive, toRefs } from 'vue'
  import { EvsTablePage } from 'evs-pc-components'

  export default defineComponent({
    components: {
      EvsTablePage
    }
    data() {
      return {
        pagination: {
          currentPage: 1,
          pageSizes: [10, 20, 30],
          pageSize: 10,
          total: 0
        },
        tableData: [
          {
            date: '2016-05-02',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1518 弄'
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1517 弄'
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1519 弄'
          },
          {
            date: '2016-05-03',
            name: '王小虎',
            address: '上海市普陀区金沙江路 1516 弄'
          }
        ]
      }
    }
  })
</script>
```

## 树据结构使用

:::demo 当`EvsTablepage`注入`data`数组对象数据结构、循环配置树形成`table`列表，注入`pagination`对象后, 该对象对分页配置进行操控。

```html
<template>
  <EvsTablepage
    :data="tableData"
    :pagination="pagination"
    @size-change="handleSizeChange"
    @current-change="handleCurrentChange"
  />
</template>

<script>
  import { defineComponent, reactive, toRefs } from 'vue'
  import { EvsTablePage } from 'evs-pc-components'

  export default defineComponent({
    components: {
      EvsTablePage
    },
    data() {
      return {
        pagination: {
          currentPage: 1,
          pageSize: 10,
          total: 0
        },
        tableData: {
          tableColumn: [
            {
              width: '120',
              label: '名称',
              prop: 'name'
            },
            {
              label: '日期',
              prop: 'date'
            },
            {
              label: '地址',
              prop: 'address'
            }
          ],
          data: [
            {
              date: '2016-05-02',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1518 弄'
            },
            {
              date: '2016-05-04',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1517 弄'
            },
            {
              date: '2016-05-01',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1519 弄'
            },
            {
              date: '2016-05-03',
              name: '王小虎',
              address: '上海市普陀区金沙江路 1516 弄'
            }
          ]
        }
      }
    }
  })
</script>
```
