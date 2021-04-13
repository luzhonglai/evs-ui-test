<template>
  <el-table
    ref="table"
    v-loading="loading"
    element-loading-text="Loading"
    :data="tableData"
    fit highlight-current-row
    tooltip-effect="dark"
    style="width:100%"
    :border="border"
    @sort-change="handleSortChange"
    @selection-change="handleSelectionChange">
    <el-table-column v-if="multiple" type="selection" width="55"></el-table-column>
    <el-table-column v-if="number" label="序号" type="index" width="80" align="center" fixed></el-table-column>
    <el-table-column v-for="(item,index) in tableLabel" :width="item.width ? item.width : ''" :min-width="item.minWidth ? item.minWidth : ''" :key="index" :align="item.align" :fixed="item.fixed" :label="item.label" :prop="item.param" :sortable="typeof item.sortable === 'boolean' ? item.sortable : 'custom'" show-overflow-tooltip>
      <template slot-scope="scope">
        <ct-table-render v-if="item.render" :render="item.render" :row="scope.row" :index="scope.$index" :column="item"></ct-table-render>
        <el-button v-else-if="item.option" :type="item.option.type" :icon="item.option.icon" :style="`color: ${item.option.color}`" @click="handleButton(item.option.method, scope.row, index)" size="mini">
          {{scope.row[item.param]}}
        </el-button>
        <span v-else :style="`color: ${item.color}`">{{scope.row[item.param]}}</span>
      </template>
    </el-table-column>
    <el-table-column v-if="tableOption.label" :fixed="tableOption.fixed" :width="tableOption.width" :min-width="tableOption.minWidth ? tableOption.minWidth : ''" :label="tableOption.label" align="center" class-name="small-padding fixed-width">
      <template slot-scope="scope">
        <el-button v-for="(item,index) in tableOption.options" :key="index" 
            :disabled="scope.row.disabled && scope.row.disabled.indexOf(index) !== -1" :type="item.type" :icon="item.icon" :style="`color: ${item.color}`" 
            @click="handleButton(item.method, scope.row, index)" size="mini">
            <ct-table-render v-if="item.render" :render="item.render" :row="scope.row" :index="scope.$index" :column="item"></ct-table-render>
            <span v-else>{{item.label}}</span>
        </el-button>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
import { computed } from '@vue/composition-api'
import CtTableRender from '@/components/utils/TableRender.js'

export default {
  components: { CtTableRender },
  props: {
    multiple: { type: Boolean, default: false },
    number: { type: Boolean, default: false },
    loading: { type: Boolean, default: false },
    tableData: { type: Array, default: () => []},
    tableLabel: { type: Array, default: () => [] },
    tableOption: { type: Object, default: () => { return {} } },
    border: { type: Boolean, default: true }
  },
  setup(props: any , ctx: any) {
    const tableOptionOptions = computed(() => {
      return function(options: any, row: any) {
        return options.map((option: any) => {
          if (option.render) {
            return option.render(row)
          } else {
            return option
          }
        })
      }
    })

    // 按钮事件
    function handleButton(method: string, row: any, index: number) {
      ctx.emit('handleButton', method, row, index)
    }

    // 排序
    function handleSortChange(val: any) {
      ctx.emit('handleSortChange', val)
    }

    // 多选
    function handleSelectionChange(val: any) {
      ctx.emit('handleSelectionChange', val)
    }

    return {
      tableOptionOptions,
      handleButton,
      handleSortChange,
      handleSelectionChange
    }
  }
}
</script>

<style lang="scss" scoped>
::v-deep .el-table__row {
  td:not(.is-hidden):first-child {
    border-left: 0.01rem solid #EBEEF5;
  }
}
::v-deep .el-table_1_column_1 {
  border-left: 0.01rem solid #EBEEF5;
}
.el-table--border {
  border-left: none;
}
</style>