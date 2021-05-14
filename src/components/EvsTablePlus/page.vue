<!--  -->
<template>
  <div>
    <div class="pagination" :style="block">
      <div class="page-con">
        <div
          v-if="pageOtions.btnType"
          :style="{ display: pageOtions.homePage ? 'block' : 'none' }"
          class="page-btn page-left"
        >
          <el-button
            v-if="pageOtions.homePage ? pageOtions.homePage : false"
            :type="pageOtions.btnType || 'primary'"
            size="mini"
            @click="indexPage"
            >首页</el-button
          >
        </div>
        <div
          v-else
          class="page-btn page-left"
          :style="{ display: pageOtions.homePage ? 'block' : 'none' }"
        >
          <el-button
            v-if="pageOtions.homePage ? pageOtions.homePage : false"
            size="mini"
            plain
            @click="indexPage"
            >首页</el-button
          >
        </div>
        <div
          v-if="pageOtions.btnType"
          :style="{ display: pageOtions.homePage ? 'block' : 'none' }"
          class="page-btn page-right"
        >
          <el-button
            v-if="pageOtions.homePage ? pageOtions.homePage : false"
            :type="pageOtions.btnType || 'primary'"
            size="mini"
            @click="lastPage"
            >尾页</el-button
          >
        </div>
        <div
          v-else
          class="page-btn page-right"
          :style="{ display: pageOtions.homePage ? 'block' : 'none' }"
        >
          <el-button
            v-if="pageOtions.homePage ? pageOtions.homePage : false"
            size="mini"
            plain
            @click="lastPage"
            >尾页</el-button
          >
        </div>
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :background="pageOtions.isColor"
            :prev-text="pageOtions.prevText"
            :next-text="pageOtions.nextText"
            :current-page="pageOtions.page"
            :page-sizes="pageOtions.sizes"
            :page-size="pageOtions.size"
            :total="pageOtions.total"
            :layout="pageOtions.layout.join()"
            :hide-on-single-page="
              pageOtions.hidePage ? pageOtions.hidePage : false
            "
          >
          </el-pagination>
      </div>
      <span class="page-num" v-if="pageOtions.pageCount">
        第 {{ pageOtions.page }} 页 {{ pageOtions.size }} 条/页
        <b>共 {{ pageOtions.total }} 条</b>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted,
} from 'vue'
interface Val {
  val: number | string
}
export default defineComponent({
  name: 'Page',
  props: {
    pageOtions: {
      type: Object,
      default: () => {
        return {
          page: 1,
          size: 10,
          total: 10,
          pageCount: false,
          sizes: [10, 20, 30, 40, 50],
          layout: ['sizes', 'prev', 'pager', 'next', 'jumper'],
          isColor: true,
          btnType: 'primary',
          hidePage: false,
          prevText: '上一页',
          nextText: '下一页',
          homePage: false,
        }
      },
    },
  },
  emits: ['handelUpdataPage'],
  setup(props: any, { emit }: any) {
    const block = props.pageOtions.homePage
      ? 'display:flex'
      : 'display:block;text-align:right'
    // 返回首页
    const indexPage = () => {
      console.log(props.pageOtions.page, 'children--table')
      emit('handelUpdataPage', {
        value: 'first',
        page: 1,
      })
    }
    // 返回尾页
    const lastPage = () => {
      let pageIndex = Math.ceil(props.pageOtions.total / props.pageOtions.size)
      console.log(pageIndex, 'children--table')
      emit('handelUpdataPage', {
        value: 'last',
        page: pageIndex,
      })
    }
    // 点击上下切换
    const handleCurrentChange = (val: Val) => {
      emit('handelUpdataPage', {
        value: 'about',
        page: val,
      })
    }
    //点击页数也换
    const handleSizeChange = (val: Val) => {
      emit('handelUpdataPage', {
        value: 'size',
        page: val,
      })
    }
    return {
      block,
      indexPage,
      lastPage,
      handleSizeChange,
      handleCurrentChange,
    }
  },
})
</script>
<style scoped lang="less">
.pagination {
  position: relative;
  margin-top: 24px;
  display: flex;
  justify-content: flex-end;
  .page-con {
    position: relative;
    padding-left: 60px;
  }
  .page-num {
    padding-left: 50px;
    line-height: 32px;
    font-size: 14px;
    b {
      font-weight: normal;
      padding-left: 20px;
    }
  }
  .page-btn {
    width: 60px;
    border-radius: 2px;
    padding: 0 4px;
    font-size: 13px;
    height: 28px;
    line-height: 28px;
    box-sizing: border-box;
    text-align: center;
    margin-top: 2px;
    display: inline-block;
    position: absolute;
    // overflow: hidden;
    ::v-deep(.el-button--primary) {
      height: 28px !important;
      min-height: 28px !important;
    }
    ::v-deep(.el-button--default) {
      height: 28px !important;
      min-height: 28px !important;
    }
     ::v-deep(.el-button) {
      height: 28px !important;
      min-height: 28px !important;
    }
  }

  .page-left {
    left: 0;
  }

  .page-right {
    right: 118px;
  }
  /deep/.el-pagination .el-select .el-input {
    width: 88px;
  }
  ::v-deep {
    .el-pagination.is-background .btn-next,
    .el-pagination.is-background .btn-prev,
    .el-pagination.is-background .el-pager li {
      background: none !important;
    }
    .el-pagination.is-background .el-pager li:not(.disabled).active {
      color: #5587f0;
      width: 28px;
      height: 28px;
      background-color: rgba(85, 135, 240, 0.1) !important;
      border-radius: 3px;
    }
   .el-pagination__jump{
      margin-left: 65px;
    }
    .btn-prev,
    .btn-next {
      background: none !important;
    }
  }
}

.el-pagination {
  white-space: nowrap;
  color: #303133;
  font-weight: 700;
}
</style>
