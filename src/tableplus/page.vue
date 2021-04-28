<!--  -->
<template>
  <div>
    <div class="pagination">
      <div v-if="pageOtions.btnType">
        <el-button
          v-if="pageOtions.homePage ? pageOtions.homePage : false"
          :type="pageOtions.btnType"
          class="page-btn page-left"
          size="mini"
          @click="indexPage"
          >首页</el-button
        >
      </div>
      <div v-else>
        <el-button
          v-if="pageOtions.homePage ? pageOtions.homePage : false"
          class="page-btn page-left"
          size="mini"
          plain
          @click="indexPage"
          >首页</el-button
        >
      </div>
      <div v-if="pageOtions.btnType">
        <el-button
          v-if="pageOtions.homePage ? pageOtions.homePage : false"
          :type="pageOtions.btnType"
          class="page-btn page-right"
          size="mini"
          @click="lastPage"
          >尾页</el-button
        >
      </div>
      <div v-else>
        <el-button
          v-if="pageOtions.homePage ? pageOtions.homePage : false"
          class="page-btn page-right"
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
        :hide-on-single-page="pageOtions.hidePage ? pageOtions.hidePage : false"
      >
      </el-pagination>
    </div>
  </div>
</template>

<script lang="ts">
import {
  defineComponent,
  reactive,
  toRefs,
  onBeforeMount,
  onMounted
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
          sizes: [10, 20, 30, 40, 50],
          layout: ['sizes', 'prev', 'pager', 'next', 'jumper'],
          isColor: true,
          btnType: 'primary',
          hidePage: false,
          prevText: '上一页',
          nextText: '下一页',
          homePage: true
        }
      }
    }
  },
  emits: ['handelUpdataPage'],
  setup(props: any, { emit }: any) {
    // 返回首页
    const indexPage = () => {
      console.log(props.pageOtions.page, 'children--table')
      emit('handelUpdataPage', {
        value: 'index',
        page: 1
      })
    }
    // 返回尾页
    const lastPage = () => {
      let pageIndex = Math.ceil(props.pageOtions.total / props.pageOtions.size)
      console.log(pageIndex, 'children--table')
      emit('handelUpdataPage', {
        value: 'last',
        page: pageIndex
      })
    }
    // 点击上下切换
    const handleCurrentChange = (val: Val) => {
      emit('handelUpdataPage', {
        value: 'about',
        page: val
      })
    }
    //点击页数也换
    const handleSizeChange = (val: Val) => {
      emit('handelUpdataPage', {
        value: 'size',
        page: val
      })
    }
    return {
      indexPage,
      lastPage,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>
<style scoped lang="less">
.pagination {
  position: relative;
  width: 738px;
  margin: 15px auto;
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
  }

  .page-left {
    left: 0;
  }

  .page-right {
    right: 0;
  }
  /deep/.el-pagination .el-select .el-input {
    width: 88px;
  }
}

.el-pagination {
  text-align: center;
}
</style>
