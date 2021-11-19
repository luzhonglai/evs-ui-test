<!--
 * @Descripttion: 
 * @repository: https://github.com/luzhonglai
 * @Author: ZhongLai Lu
 * @Date: 2021-05-08 10:41:31
 * @LastEditors: Zhonglai Lu
 * @LastEditTime: 2021-11-08 17:31:57
-->
<template>
  <div class="content">
    <el-button icon="Search" circle></el-button>
    <el-button type="primary" icon="Edit" circle></el-button>
    <el-button type="success" icon="Check" circle></el-button>
    <el-button type="info" icon="Message" circle></el-button>
    <el-button type="warning" icon="Star" circle></el-button>
    <el-button type="danger" icon="Delete" circle></el-button>
    <!-- {{ findListParams }} -->
    <!-- 搜索top -->
    <EvsSearchArea
      :form-model="formInline"
      :init-data="initData"
      :has-fold="true"
      @search="fromSubmit"
      @resetForm="resetSubmit"
    >
      <template #seniorSearch>
        <el-button icon="Search"></el-button>
      </template>
      <template #selectStation>
        <SelectStation ref="resetName" style="width:100%" @EventChangeStation="changeStation"></SelectStation>
      </template>
    </EvsSearchArea>
  </div>
</template>
<script lang="ts">
import { defineComponent, ref, Ref, onBeforeMount } from 'vue'
import { Search, Edit, Check, Message, Star, Delete } from '@element-plus/icons'
// import { setStoreState } from '@/store/utils'
// import { formatDate } from '@/utils/utils'
// import { findBelongOrganizationList } from '@/api/whiteList'
// import store from '@/store'
// import wsCache from '@/utils/cache'
// import { findByPage, overTimeFeeModel, queryStaReacord, findByIdDetail } from '../service'
// import cityJson from '@/utils/pca-code'
export default defineComponent({
  name: 'RoleList',
  setup(props, ctx) {
    // 运营态 状态
    const status = [
      { label: '待投运', value: 2 },
      { label: '运行', value: 3 },
      { label: '停运', value: 10 },
      { label: '退运', value: 11 },
    ]
    const formInline = ref([
      {
        name: 'seniorSearch',
        readonly: true,
        span: 20,
        iconSlot: true,
        label: '高级筛选',
        type: 'input',
        placeholder: '请输入站编码、站名称',
      },
      { name: 'address', label: '站地址', type: 'input', readonly: true, placeholder: '请输入站地址' },
      { name: 'administrative', label: '行政单位', type: 'cascader', placeholder: '请选择', options: [] },
      {
        name: 'operateState',
        label: '运营态',
        type: 'select',
        placeholder: '请选择',
        options: [
          { label: '待投运', value: 2 },
          { label: '运行', value: 3 },
          { label: '停运', value: 10 },
          { label: '退运', value: 11 },
          { label: '维修', value: 8 },
        ],
      },
      {
        name: 'manageOrganization',
        label: '管理单位',
        type: 'cascader',
        placeholder: '请选择',
        options: [],
      },
      {
        name: 'enableStatus',
        label: '开启状态',
        type: 'select',
        placeholder: '请选择',
        options: [
          {
            label: '启用',
            value: 1,
          },
          {
            label: '禁用',
            value: 0,
          },
        ],
      },
      {
        name: 'time',
        label: '创建时间',
        type: 'daterange',
        span: 20,
        rangeSeparator: '~',
        startPlaceholder: '时间范围起',
        endPlaceholder: '时间范围止',
        defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)],
      },
    ])
    const tableData: Ref<object> = ref({
      tableColumn: [
        {
          type: 'selection',
          width: '55',
        },
        { type: 'index', label: '序号' },
        {
          label: '站编码',
          prop: 'stationNo',
          width: '150',
        },
        {
          label: '站名称',
          prop: 'stationName',
          width: '200',
        },
        {
          label: '运营态',
          prop: 'operateState',
          formatter(row, colimn) {
            const value = status.filter(result => result.value == row.operateState)[0]
            if (value && value.label != undefined) {
              return value.label
            }
          },
        },
        {
          label: '站地址',
          prop: 'address',
          width: 150,
        },
        {
          label: '超时占位费状态',
          prop: 'enableStatus',
          formatter(row) {
            if (row.validStatus == 'VALID') {
              return '启用'
            } else {
              return '禁用'
            }
          },
        },
        {
          label: '所属模型',
          prop: 'modelName',
          width: 150,
        },
        {
          label: '管理单位',
          prop: 'manageOrganization',
          width: '300',
        },
        {
          label: '超时占位费单价（元/分钟）',
          prop: 'price',
          width: 150,
        },
        {
          label: '减免时长',
          prop: 'reduceTime',
        },
        {
          label: '减免次数',
          prop: 'reduceTimes',
        },
        {
          label: '封顶条件',
          prop: 'limit',
        },
        {
          label: '省',
          prop: 'province',
          width: 60,
        },
        {
          label: '区',
          prop: 'area',
        },
        {
          label: '市',
          prop: 'city',
        },
        {
          label: '创建时间',
          prop: 'createdAt',
          formatter(row, colimn) {
            return formatDate(row.createdAt, 'Y/M/D')
          },
          width: '100',
        },
        {
          label: '操作',
          fixed: 'right',
          scope: true,
          width: 192,
        },
      ],
      data: [],
    })
    const tableLogData: Ref<object> = ref({
      tableColumn: [
        {
          label: '操作帐号',
          prop: 'operatorAccount',
        },
        {
          label: '操作时间',
          prop: 'createdAt',
          formatter(row, colimn) {
            return formatDate(row.createdAt, 'Y/M/D h:m')
          },
        },
        {
          label: '操作项',
          prop: 'operatorType',
          align: 'left',
        },
      ],
      data: [],
    })
    const resetName: Ref<null> = ref(null)
    const tableConfig: Ref<object> = ref({
      currentPage: 1,
      pageSizes: [10, 20, 30],
      pageSize: 10,
      total: 0,
    })
    const drawer: Ref<boolean> = ref(false)
    const dialogVisible: Ref<boolean> = ref(false)
    const tableLoading: Ref<boolean> = ref(false)
    const findListParams: any = {
      bean: {},
      page: 1,
      pageSize: 10,
      sorts: {
        additionalProp1: '',
        additionalProp2: '',
        additionalProp3: '',
      },
    }
    // 批量开启禁用接口 入参数
    const batchParasm: any = {
      idList: [],
      validState: false,
      isBatch: true,
    }
    const detailsData: Ref<object> = ref({})
    // 全部表头
    const allTable: any = ref([
      {
        type: 'selection',
        width: '55',
        fixed: 'left',
      },
      {
        type: 'index',
        label: '序号',
        fixed: 'left',
      },
      {
        label: '站编码',
        prop: 'stationNo',
        width: '150',
        fixed: 'left',
      },
      {
        label: '站名称',
        prop: 'stationName',
        width: '200',
      },
      {
        label: '运营态',
        prop: 'operateState',
        formatter(row, colimn) {
          const value = status.filter(result => result.value == row.operateState)[0]
          if (value && value.label != undefined) {
            return value.label
          }
        },
      },
      {
        label: '站地址',
        prop: 'address',
        width: 150,
      },
      {
        label: '超时占位费状态',
        prop: 'enableStatus',
        width: 150,
        formatter(row) {
          if (row.validStatus == 'VALID') {
            return '启用'
          } else {
            return '禁用'
          }
        },
      },
      {
        label: '所属模型',
        prop: 'modelName',
        width: 150,
      },
      {
        label: '管理单位',
        prop: 'manageOrganization',
        width: '150',
      },
      {
        label: '超时占位费单价（元/分钟）',
        prop: 'price',
        width: 200,
      },
      {
        label: '减免时长',
        prop: 'reduceTime',
      },
      {
        label: '减免次数',
        prop: 'reduceTimes',
      },
      {
        label: '封顶条件',
        prop: 'limit',
      },
      {
        label: '省',
        prop: 'province',
        width: 60,
      },
      {
        label: '区',
        prop: 'area',
      },
      {
        label: '市',
        prop: 'city',
      },
      {
        label: '创建时间',
        prop: 'createdAt',
        formatter(row, colimn) {
          return formatDate(row.createdAt, 'Y/M/D')
        },
        width: '100',
      },
      {
        label: '操作',
        fixed: 'right',
        scope: true,
        width: 192,
      },
    ])

    return {
      allTable,
      tableLoading,
      detailsData,
      tableLogData,
      dialogVisible,
      drawer,
      resetName,
      tableConfig,
      formInline,
      tableData,
      findListParams,
    }
  },
})
</script>
<style lang="less" scoped>
.input-with-select .el-input-group__prepend {
  background-color: #fff;
}
.content {
  padding: 0 24px;
  box-sizing: border-box;
  display: block;
  .list-switch {
    margin-top: 24px;
    margin-bottom: 12px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  :deep(.el-table) {
    .cell {
      padding-right: 10px;
    }
    .el-table__row {
      .el-table_1_column_3 {
        color: #487ef0;
        font-weight: 400;
        font-size: 12;
      }
    }
  }
  :deep(.el-drawer__header) {
    height: 60px;
    padding: 24px 24px;
    box-sizing: border-box;
    font-weight: 400;
    font-size: 16px;
    margin-bottom: 0;
    color: #333333;
  }
  :deep(.el-dialog__body) {
    width: 456px;
    border-radius: 1px;
    box-sizing: border-box;
    background: #ffffff;
    border: 1px solid #dddddd;
    padding: 0 20px;
    padding-bottom: 40px;
    overflow-y: scroll;
  }
  :deep(.el-descriptions) {
    padding: 24px 0;
    box-sizing: border-box;
    border-top: 1px solid #e8e8e8;
    display: block;
    .el-descriptions__label {
      font-weight: 400;
      color: rgba(0, 0, 0, 0.65);
      font-size: 14px;
    }
    .el-descriptions__content {
      font-size: 14px;
      color: rgba(0, 0, 0, 0.65);
    }
  }
  :deep(.cell) {
    width: 100%;
    display: flex;
    justify-content: space-between;
    .el-button--small {
      margin: 0;
    }
  }
}
</style>
