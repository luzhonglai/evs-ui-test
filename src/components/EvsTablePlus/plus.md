<!--  -->
<template>
  <div>
    <table-plus
      :isLoading="loading"
      :tableData="data"
      :tableLabel="tableColumns"
      :tableOptions="actionOptions"
      :paginations="paginations"
      @handleButton="clickAction"
      @handleChangePage="updataPage"
      @handleRadioChange="radioChange"
      @handleSortChange="sortChange"
      @handleSelectionChange="selectChange"
    >
    </table-plus>
    <EvsModel
      :model-is-flag="modelIsFlag"
      :titleComponent="titleComponent"
      @handleShowModel="showModel"
      @handleCloseModel="closeModel"
    >
    </EvsModel>
  </div>
</template>
<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  ref,
  onBeforeMount,
  onMounted,
  toRef
} from 'vue'
import {
  tableColumns,
  tableOptions,
  pagination,
  tableData
} from './table.config'
export default defineComponent({
  name: 'TableDemo',
  components: {},
  setup() {
    const paginations = reactive(pagination)
    const data = reactive(tableData.data)
    const actionOptions = reactive(tableOptions)
    const loading = ref(false)
    const modelIsFlag = ref(false)
    const titleComponent = [
      {
        slot: 'item',
        title: 'item'
      },
      {
        slot: 'item1',
        title: 'item1',
        isClass: true
      },
      {
        slot: 'item2',
        title: 'item2',
        isClass: true
      }
    ]
    const closeModel = () => {
      // 关闭弹框
      modelIsFlag.value = false
    }
    const showModel = () => {
      // 显示弹框
      modelIsFlag.value = true
    }
    //更新分页
    const updataPage = (val: number) => {
      console.log(val)
    }
    // 单选返回数据
    const radioChange = (val: any, model: any) => {
      console.log(val, '---radio')
    }
    //多选返回
    const selectChange = (val: any) => {
      console.log(val)
    }
    // 操作按钮
    const clickAction = (method: string, row: any, index: number) => {
      console.log(method, row.name, index)
      if (method == 'showDetail') { // 按钮大于3个 使用 switch 更好一些
        modelIsFlag.value = true
      }
    }
    const sortChange = (val: any) => {
      console.log(val)
    }
    return {
      data,
      tableColumns,
      actionOptions,
      paginations,
      updataPage,
      radioChange,
      selectChange,
      clickAction,
      sortChange,
      loading,
      modelIsFlag,
      titleComponent,
      closeModel,
      showModel
    }
  }
})
</script>
<style scoped lang="less"></style>


##config
export const tableColumns: any = [
  {
    prop: 'name',
    label: '姓名',
    width: 150,
    align: 'center',
    sortable: false
  },
  {
    prop: 'age',
    label: '年龄',
    width: 150,
    sortable: false
  },
  {
    // 图片预览
    prop: 'avatar',
    label: '头像',
    width: 150,
    sortable: false,
    image: true
  },
  {
    prop: 'sex',
    label: '性别',
    width: 150,
    sortable: false
  },
  {
    prop: 'born',
    label: '出生日期',
    width: 150,
    sortable: false
  },
  {
    prop: 'phone',
    label: '电话',
    width: 150,
    sortable: false
  },
  {
    prop: 'zip',
    label: '邮编',
    width: 150,
    sortable: false
  },
  {
    prop: 'province',
    label: '省份',
    width: 150,
    sortable: false
  },
  {
    prop: 'city',
    label: '市区',
    width: 150,
    sortable: false
  },
  {
    prop: 'address',
    label: '地址',
    width: 100,
    sortable: false
  },
  {
    prop: 'loc',
    label: '工位',
    width: 150,
    sortable: false
  },
  {
    prop: 'createUser',
    label: '创建人',
    width: 150,
    sortable: false
  },
  {
    prop: 'auditUser',
    label: '审核人',
    width: 150,
    sortable: false
  },
  {
    prop: 'order',
    label: '订单号',
    width: 150,
    sortable: false
  },
  {
    // 场景： 后端字段是json字符串，需要前端解析其中某个字段
    prop: 'jsonStr',
    label: 'json解析',
    width: 150,
    sortable: false,
    render: (scope: any) => {
      if (JSON.stringify(scope.row) !== '{}') {
        return (
          JSON.parse(scope.row.jsonStr).json + JSON.parse(scope.row.jsonStr).ext
        )
      }
      return '--'
    }
  },
  {
    // 场景： 后端字段是数字0或1, 前端需要自己将数字转成汉字 比如0 待审核 1 已审核
    prop: 'status',
    label: '状态（0 1）',
    width: 150,
    sortable: false,
    render: (scope: any) => {
      let status = scope.row.status
      if (status === 0) {
        return '待审核'
      } else if (status === 1) {
        return '已审核'
      }
      return '--'
    }
  }
]
export const tableOptions: any = {
  radioFixed: true, // 开启单选列固定
  radioCheck: true, // 显示单选
  radioLabel: '选择', // 单选列标题
  checkFixed: true, //开启多选列固定
  canCheck: true, //
  indexFixed: true, //序号列固定
  hasIndex: true, //显示序号
  isAction: true, //开启操作按钮
  label: '操作', // 操作按钮列标题
  actionfixed: 'right', // 是否固定操作列
  width: '150', // 宽度
  minWidth: '50', // 最小宽度
  align: 'center', // 对齐方式
  headerAlign: '', // 表头对齐 不设置 默认使用表格的 align
  btnOptions: [
    // 操作按钮组
    { label: '预览', type: 'text', icon: 'el-icon-view', method: 'showDetail' },
    { label: '审核', type: 'text', color: 'red', icon: '', method: 'verify' }
  ]
}
// 模拟的表格数据
export const tableData: any = {
  code: 0,
  data: [
    {
      name: 'Kristy Emard',
      age: 18,
      sex: '女',
      born: '1995-08-02',
      phone: '1-562-942-3595 x034',
      zip: '46678',
      province: 'West Aronfurt',
      city: 'Lake',
      address: '22450 Daugherty Forest',
      loc: 'A098',
      createUser: 'tianleilei',
      auditUser: 'tianleilei',
      order: 32494,
      avatar:
        'https://dss0.bdstatic.com/70cFuHSh_Q1YnxGkpoWK1HF6hhy/it/u=3166639134,1440270722&fm=26&gp=0.jpg',
      jsonStr: `{"json":"这是json字符串", "ext": "滴滴滴多"}`,
      status: 1
    }
  ]
}
export const pagination: any = {
  page: 1,
  size: 1,
  total: 1,
  sizes: [1, 10, 20, 30],
  layout: ['sizes', 'prev', 'pager', 'next', 'jumper'],
  isColor: false,
  btnType: '', // 首页尾页按钮type 类型参考 element button type 默认 primary
  hidePage: false, // total === 1  时 是否显示分页
  prevText: '', // 左右切换按钮文字 可以为空
  nextText: '下一页', //
  homePage: true // 是否开启首页 和尾页 按钮显示
}
