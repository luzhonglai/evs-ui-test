<!--  -->
<template>
  <div class="table-plus">
    <el-table
      ref="tableRef"
      v-bind="attrs"
      v-loading="isLoading"
      :element-loading-text="loadingText"
      :element-loading-spinner="loadingIcon"
      :element-loading-background="loadingColor"
      :data="tableData"
      fit
      highlight-current-row
      tooltip-effect="dark"
      :border="border"
      style="width: 100%"
      height="600px"
      @sort-change="handleSortChange"
      @selection-change="handleSelectionChange"
    >
      <!--多选-->
      <el-table-column
        v-if="tableOptions.canCheck"
        :fixed="tableOptions.checkFixed"
        align="center"
        type="selection"
        width="55"
      ></el-table-column>
      <!--单选-->
      <el-table-column
        v-if="tableOptions.radioCheck"
        :fixed="tableOptions.radioFixed"
        :label="tableOptions.radioLabel"
        align="center"
        width="55"
      >
        <template #default="scope">
          <el-radio v-model="radioModel" :label="scope.$index" @change="handleRadioChange(scope.row, radioModel)">
            <div style="display: none">{{ scope.row.casherName }}</div>
          </el-radio>
        </template>
      </el-table-column>
      <!--序号-->
      <el-table-column
        v-if="tableOptions.hasIndex"
        :fixed="tableOptions.indexFixed"
        align="center"
        type="index"
        width="50"
        label="序号"
      ></el-table-column>
      <!--数据table-->
      <el-table-column
        v-for="(item, index) in tableLabel"
        :key="index"
        :width="item.width ? item.width : ''"
        :min-width="item.minWidth ? item.minWidth : ''"
        :align="item.align"
        :fixed="item.fixed"
        :label="item.label"
        :prop="item.prop"
        :header-align="item.headerAlign ? item.headerAlign : ''"
        :formatter="
          typeof item.formatter === 'function'
            ? item.formatter()
            : () => {
                return ''
              }
        "
        :class-name="item.className ? item.className : ''"
        :label-class-name="item.lableClassName ? item.labelClassName : ''"
        :sortable="typeof item.sortable === 'boolean' ? item.sortable : 'custom'"
        show-overflow-tooltip
      >
        <template #default="scope">
          <span v-if="item.render" :style="`color: ${item.color}`" v-html="item.render(scope)"></span>
          <span v-else-if="item.image">
            <!--加入图片预览-->
            <el-tooltip placement="right">
              <template #content>
                <img
                  referrerpolicy="no-referrer"
                  :src="scope.row[item.prop]"
                  :width="item.imageWidth || 300"
                  class="img-height"
                  alt="此图不存在，请检查url"
                />
              </template>
              <el-button type="primary" size="mini">预览</el-button>
            </el-tooltip>
          </span>
          <span v-else :style="`color: ${item.color}`">{{ scope.row[item.prop] }}</span>
        </template>
      </el-table-column>
      <!--操作按钮-->
      <el-table-column
        v-if="tableOptions.isAction"
        :fixed="tableOptions.actionfixed"
        :width="btnWidthComputed"
        :min-width="tableOptions.minWidth ? tableOptions.minWidth : ''"
        :label="tableOptions.label"
        :align="tableOptions.align"
        class-name="small-padding fixed-width"
        :header-align="tableOptions.headerAlign"
      >
        <template #default="scope">
          <div
            v-for="(item, index) in tableOptions.btnOptions"
            :key="index"
            style="display: inline-block; margin-left: 5px"
          >
            <el-button
              v-if="
                item.switchRender
                  ? item.switchRender(scope.row)
                  : '' || item.status?.show === scope.row[item.status?.key]
              "
              :disabled="!!item.status?.disabledVal === scope.row[item.status?.disabledKey]"
              :type="item.type ? item.type : 'primary'"
              :icon="item.icon ? item.icon : ''"
              :style="`color: ${item.color}`"
              size="mini"
              @click="handleButton(item.method, scope.row, scope.$index)"
            >
              <span v-if="item.render" v-html="item.render(scope, item)"> </span>
              <span v-else>{{ item.label }}</span>
            </el-button>
          </div>
        </template>
      </el-table-column>
    </el-table>
    <div class="pagination">
      <Page :page-otions="pageinations" @handelUpdataPage="updataPage"></Page>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, toRefs, onBeforeMount, onMounted, computed } from 'vue'
import Page from './page.vue'
export default defineComponent({
  name: 'EvsTablePlus',
  components: {
    Page,
  },
  props: {
    number: { type: Boolean, default: true },
    isLoading: { type: Boolean, default: false },
    loadingText: { type: String, default: '加载中...' },
    loadingIcon: { type: String, default: 'el-icon-loading' },
    loadingColor: { type: String, default: '' },
    tableData: { type: Array, default: () => [] },
    tableLabel: { type: Array, default: () => [] },
    tableOptions: {
      type: Object,
      default: () => {
        return {}
      },
    },
    paginations: {
      type: Object,
      default: () => {
        return {
          page: 1,
          size: 10,
          total: 10,
          sizes: [10, 20, 30, 40, 50],
          layout: ['sizes', 'prev', 'pager', 'next', 'jumper'],
          isColor: true,
          btnType: 'primary',
          hidePage: false,
          prevText: '上一页',
          nextText: '下一页',
          homePage: true,
        }
      },
    },
    border: { type: Boolean, default: false },
  },
  emits: ['handleButton', 'handleSortChange', 'handleChangePage', 'handleSelectionChange', 'handleRadioChange'],
  setup(props: any, ctx: any) {
    const radioModel = ref(1)
    const { emit, attrs } = ctx // 获取context 解构
    //返回新的分页信息
    // console.log(props.paginations)
    const pageinations = computed(() => {
      // 使用计算属性 监听动态的 page options
      return {
        page: props.paginations.page,
        size: props.paginations.size,
        total: props.paginations.total,
        sizes: props.paginations.sizes,
        layout: props.paginations.layout,
        isColor: props.paginations.isColor,
        btnType: props.paginations.btnType,
        hidePage: props.paginations.hidePage,
        prevText: props.paginations.prevText,
        nextText: props.paginations.nextText,
        homePage: props.paginations.homePage,
      }
    })
    const btnWidthComputed = computed(() => {
      let btnsArr = { ...props.tableOptions }
      let wordsWidth = 0
      let lengths = btnsArr.btnOptions.length
      btnsArr.btnOptions.map((item: any) => {
        if (item.label.length == 2) {
          wordsWidth = 60
        } else if (item.label.length == 3) {
          wordsWidth = 90
        } else if (item.label.length == 4) {
          item['width'] = 120
        } else if (item.label.length == 5) {
          wordsWidth = 150
        }
      })
      return Number(wordsWidth) * lengths
    })
    // console.log(pageinations, 'computed---pages')
    // 更新分页
    const updataPage = (val: object) => {
      emit('handleChangePage', val)
    }
    //操作按钮
    const handleButton = (method: string, row: any, index: number) => {
      emit('handleButton', method, row, index)
    }
    // 排序
    const handleSortChange = (val: any) => {
      emit('handleSortChange', val)
    }
    // 多选
    const handleSelectionChange = (val: any) => {
      emit('handleSelectionChange', val)
    }
    //单选事件
    const handleRadioChange = (val: any, model: any) => {
      // console.log(radioModel)
      emit('handleRadioChange', val, model)
    }
    return {
      attrs, // property
      radioModel, // raido v-model
      handleButton, // 操作按钮
      handleSortChange, // 排序
      handleSelectionChange, // 多选
      pageinations, // page
      handleRadioChange, // 单选
      updataPage, // 分页
      btnWidthComputed,
    }
  },
})
</script>

<style lang="less" scoped>
.table-plus {
  ::-webkit-scrollbar-track-piece {
    background-color: #fff;
    -webkit-border-radius: 0;
  }
  ::-webkit-scrollbar {
    width: 10px;
    height: 10px;
  }
  ::-webkit-scrollbar-thumb {
    height: 50px;
    background-color: #b8b8b8;
    -webkit-border-radius: 6px;
    outline: 2px solid #fff;
    outline-offset: -2px;
    border: 2px solid #fff;
    // filter: alpha(opacity = 50);
    -moz-opacity: 0.5;
    -khtml-opacity: 0.5;
    opacity: 0.5;
  }
  ::-webkit-scrollbar-thumb:hover {
    height: 50px;
    background-color: #878987;
    -webkit-border-radius: 6px;
  }
}
</style>
