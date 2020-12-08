<template>
  <div>
    <ct-table
      multiple      
      :loading="loading"
      :table-data="tableData"
      :table-label="tableLabel"
      :table-option="tableOption"
      @handleButton="handleButton"
      @handleSortChange="handleSortChange" 
      @handleSelectionChange="handleSelectionChange"
      ></ct-table>
  </div>
</template>

<script>
  import { getTableData } from '@/api/example/index'
  export default {
    data() {
      return {
        loading: false,
        tableData: [],
        tableLabel: [
          { label: '用户名', param: 'usr', align: 'center', sortable: false },
          { label: '公司名称', param: 'company', align: 'center', sortable: false },
          { label: '办公邮箱', param: 'email', align: 'center', width: '200', sortable: false },
          { label: '注册时间', param: 'registTime', align: 'center', minWidth: '200', sortable: false },
          { label: '审核状态', align: 'center', sortable: false,
            render: (row) => {
              if (row.status === 0) {
                return '未审核'
              } else if (row.status === 1) {
                return '审核通过'
              } else if (row.status === 2) {
                return '审核不通过'
              } else {
                return '禁用'
              }
            }
          }
        ],
        tableOption: {
          label: '操作',
          width: '200',
          options: [
            { label: '预览', type: 'text', icon: 'el-icon-view', method: 'showDetail' },
            { label: '审核', type: 'text', color: 'red', icon: '', method: 'verify' }
          ]
        }
      }
    },
    created() {
      this.fetchData()
    },
    methods: {
      async fetchData() {
        this.loading = !this.loading
        const { body } = await getTableData()
        this.loading = !this.loading
        this.tableData = body.records
      }
    }
  }
</script>

<style lang="scss" scoped>

</style>