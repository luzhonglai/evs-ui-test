<!--
 * @Descripttion:
 * @Author: Haozhixiong
-->
## 模态框
## modelIsFlag  关闭显示
## title   模态框标题
## width  模态框宽度
## actionBtnText 开启模态框的按钮文字
## destrorOnClose 是否销毁模态框内的元素  
## titleAlign 标题对齐方式
## titleCssText 标题问题css 自定义
## titleComponent = [  使用 模态框内标题组件 
##      {
##        slot: 'item', 外部是用自定义 slot 传入
##        title:'item' Evs 标题组件 所显示的文字
##      },
##      {
##        slot: 'item1', 
##        title:'item1',
##        isClass:true 是否开启显示隐藏 标下的slot 
##      },
##    ]
<template>
  <div class="home">
    <EVSeModel
      :model-is-flag="modelIsFlag"
      :titleComponent="titleComponent"
      actionBtnText="新增"
      @handleShowModel="showModel"
      @handleCloseModel="closeModel"
    >
      <template #item>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary">查询</el-button>
          </el-form-item>
        </el-form>
      </template>
      <template #item1>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input v-model="formInline.user" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="活动区域">
            <el-select v-model="formInline.region" placeholder="活动区域">
              <el-option label="区域一" value="shanghai"></el-option>
              <el-option label="区域二" value="beijing"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </template>
      <template #footer>
        <div>
          <el-button plain @click="closeModel">取 消</el-button>
          <el-button type="primary">确 定</el-button>
        </div>
      </template>
    </EVSeModel>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, reactive, } from 'vue'
import EVSeModel from '@/components/Dialog/model.vue'
export default defineComponent({
  name: 'Home',
  components: {
    // HelloWorld
    EVSeModel,
  },
  setup() {
    const modelIsFlag = ref(false)
    const formInline = reactive({
      user: '',
      region: '',
    })
    const titleComponent = [ // 开启title item
      {
        slot: 'item',
        title:'item'
      },
      {
        slot: 'item1',
        title:'item1',
        isClass:true
      },
    ]
    const closeModel = () => {
      modelIsFlag.value = false
    }
    const showModel = () => {
      modelIsFlag.value = true
    }
    return {
      modelIsFlag,
      formInline,
      titleComponent,
      closeModel,
      showModel,
    }
  },
})
</script>
