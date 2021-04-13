<!--
 * @Descripttion:
 * @Author: Jiang Peng
 * @Date: 2021-03-30 10:44:38
 * @LastEditors: Jiang Peng
 * @LastEditTime: 2021-04-13 17:46:35
-->

## 页面搜索域组件开发规范

### EvsSearchArea 组件包含三部分,form 表单域和操作按钮以及展开收起功能

使用说明 --- 组件使用参考监控告警页面

组件调用参数

> formModel 为渲染 form 表单类型对象
> exportModel 为导出参数
> initData 为设置页面加载后默认显示的数据
> hasFold 是否显示展开收起功能，默认 false 不显示
> isReset 是否显示重置按钮，默认组件显示该按钮
> handleSearch 组件里面查询后回调方法

```html
<EvsSearchArea
  :formModel="formModel"
  :exportModel="exportModel"
  :initData="initData"
  :hasFold="hasFold"
  :isReset="false"
  @search="handleSearch"
>
  <!-- 这里是站列表懒加载组件，如果需要,slot传入 -->
  <template v-slot:selectStation>
    <SelectStation
      style="width:100%"
      :cityCode="formData.cityCode ? formData.cityCode[1] : ''"
      @EventChangeStation="changeStation"
      ref="resetName"
    ></SelectStation>
  </template>
  <!-- 这里可以slot嵌入按钮，组件内部默认有重置、查询、导出按钮 -->
  <template v-slot:new>
    <el-button
      v-permission="['ROLE_CHARGINMODELLIST_ADD']"
      class="add"
      type="primary"
      size="small"
      @click="dialogFormVisible = true"
    >
      新增
    </el-button>
  </template>
</EvsSearchArea>
```

formModel 对象详解

> selName 为时间选择前有下拉选择的组件，值为 select 的数据名称
> name 数据名称
> type 组件渲染类型，目前包含 input、select、daterange（年月日）、datetimerange（年月日时分秒）、 selectStation（封装的站列表组件）cascaderLazy（省市二级联动懒加载组件）cascader（为普通级联选择）
> padding 为设置 label 和表单域之间的间距
> options 为 select 下拉列表数据
> defaultTime 为时分秒组件选定后，默认设置 23:59:59 格式
> shortcuts 为年月日快捷选择配置

```ecmascript 6
<!-- model数据 -->
    const formModel = reactive([
      {
        name: 'stakeNo',
        label: '电桩编号',
        type: 'input',
        placeholder: '请输入'
      },
      {
        name: 'stakeType',
        label: '桩类型',
        type: 'select',
        placeholder: '请选择',
        padding: '25px',
        options: [
          { label: '直流桩', value: 1 },
          { label: '交流桩', value: 2 },
          { label: '交直流混合', value: 3 }
        ]
      },
      {
        name: 'cityCode',
        label: '省市',
        type: 'cascaderLazy', // 省市二级懒加载
        placeholder: '请选择',
        padding: '25px'
      },
      {
        name: 'cityList',
        label: '省市区',
        type: 'cascader', // 普通级联
        placeholder: '请选择',
        options: []
      },
      {
        selName: 'type', // 普通时间组件不需要设置
        name: 'time',
        label: '故障开始时间',
        type: 'datetimerange',
        rangeSeparator: '~',
        startPlaceholder: '时间范围起',
        endPlaceholder: '时间范围止',
        defaultTime: [new Date(2000, 1, 1, 0, 0, 0), new Date(2000, 1, 1, 23, 59, 59)]
      },
      {
        name: 'time',
        label: '创建时间',
        type: 'daterange',
        placeholder: '请选择',
        shortcuts: [
          {
            text: '最近一周',
            value: (() => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 7)
              return [start, end]
            })()
          },
          {
            text: '最近一个月',
            value: (() => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 30)
              return [start, end]
            })()
          },
          {
            text: '最近三个月',
            value: (() => {
              const end = new Date()
              const start = new Date()
              start.setTime(start.getTime() - 3600 * 1000 * 24 * 90)
              return [start, end]
            })()
          }
        ]
      }
    ])



<!-- initdata设置需要默认显示的数据 -->

    const initData = reactive({
      type: 1
    })

<!-- 回调函数获取组件返回的数据 -->

    const handleSearch = obj => {
        Object.assign(requestParams.bean, obj)
        getListData()
      }
```

未完待续。。。期待大家集思广益，拓展更多的组件内容
