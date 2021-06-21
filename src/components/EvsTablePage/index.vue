<!--
 * @Descripttion: 表单分页组件
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-03-31 17:18:17
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-06-21 15:12:09
-->

<template>
  <div>
    <!-- 表格 -->
    <el-table
      v-if="data"
      ref="tableRef"
      v-loading="loading"
      :data="data.data"
      :border="border"
      :height="height"
      highlight-current-row
      tooltip-effect="dark"
      :element-loading-text="loadingText"
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange"
      @cell-click="handleClickChange"
    >
      <el-table-column
        v-for="(item, index) in data.tableColumn"
        :key="index"
        :prop="item.prop || ''"
        :label="item.label || ''"
        :width="item.width || ''"
        :type="item.type || ''"
        :fixed="item.fixed || null"
        :align="item.align || 'left'"
        :formatter="item.formatter || ''"
      >
        <template v-if="item.scope || false" #default="scope"> <slot name="scope" :scope="scope" /> </template>
      </el-table-column>
    </el-table>

    <!-- 自定义item -->
    <slot name="column"></slot>

    <!-- 自定义table-list -->
    <slot name="table"></slot>

    <!-- 分页控件 -->
    <el-pagination
      v-if="pagination"
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="pagination.currentPage"
      :page-sizes="pagination.pageSizes || [5, 10, 15, 30, 50]"
      :page-size="pagination.pageSize"
      :total="pagination.total"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'EvsTablePage',
    props: {
      data: { type: [Object, Boolean], default: false },
      pagination: { type: [Object, Boolean], default: false },
      loading: { type: Boolean, default: false },
      border: { type: Boolean, default: true },
      loadingText: { type: String, default: '数据加载中...' },
      height: { type: String, default: '600' },
    },

    setup(props, { emit }) {
      const methods: any = {
        /* pageSize 改变时会触发	每页条数 */
        handleSizeChange(Option: object) {
          emit('size-change', Option)
        },

        /* currentPage 改变时会触发 回调参数当前页 */
        handleCurrentChange(Option: object) {
          emit('current-change', Option)
        },

        /* 排序 当表格的排序条件发生变化的时候会触发该事件	{ column, prop, order } */
        handleSortChange(val: any) {
          emit('sort-change', val)
        },

        /* 多选 当选择项发生变化时会触发该事件 selection*/
        handleSelectionChange(val: any) {
          emit('selection-change', val)
        },
        // cell-click
        handleClickChange(row: any, column: any, cell: any, event: any) {
          emit('cell-click', row, column, cell, event)
        },
        clearSelection() {
          this.$refs.tableRef.clearSelection()
        },
      }

      return {
        ...methods,
      }
    },
  })
</script>

<style lang="less" scoped>
  :deep(.el-pagination) {
    margin-top: 24px;
    white-space: nowrap;
    color: #303133;
    font-weight: 700;
    display: flex;
    justify-content: flex-end;
  }
</style>
