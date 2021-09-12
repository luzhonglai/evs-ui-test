<template>
  <el-button type="success" size="small" icon="el-icon-download" @click="exportData">导出</el-button>
</template>

<script>
export default {
  /**
   * tableData:导出的数据
   * tHeader:表头
   * filterVal:导出数据对应的字段名称
   * excelName:导出的exel标题
   */
  props: {
    tableData: [Array, Object],
    tHeader: Array,
    filterVal: Array,
    excelName: {
      type: String,
      default() {
        return '导出明细'
      },
    },
  },
  methods: {
    /* eslint-disable */
      exportData() {
        require.ensure([], () => {
          const { export_json_to_excel } = require('../utils/Export2Excel')
          const list = this.tableData.data || this.tableData //把data里的tableData存到list
          const data = this.formatJson(this.filterVal, list)
          export_json_to_excel(this.tHeader, data, this.excelName)
        })
      },
      /* eslint-disable */
      formatJson(filterVal, jsonData) {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      },
    },
  }
</script>

<style lang="sass" scoped></style>
