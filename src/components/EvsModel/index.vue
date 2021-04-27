<!--  -->
<template>
  <div class="model">
    <el-button v-if="actionBtnText" type="primary" plain @click="showModel">{{ actionBtnText }}</el-button>
    <el-dialog
      :model-value="modelIsFlag"
      :width="width"
      v-bind="attrs"
      :show-close="showCloseIcon"
      :destroy-on-close="destrorOnClose"
      :append-to-body="appendToBody"
      @close="closeModel"
    >
      <template #title>
        <div class="model-title" :style="[titleAlignActive, titleCssTextActive]">
          {{ title }}
        </div>
      </template>
      <template v-if="titleComponent">
        <div v-for="item in titleComponent" :key="item" class="vfor-title">
          <EvsTitle :item-title="item.title" :is-class="item.isClass">
            <slot :name="item.slot"></slot>
          </EvsTitle>
        </div>
      </template>
      <slot></slot>
      <slot name="footer"></slot>
    </el-dialog>
  </div>
</template>

<script lang="ts">
  import EvsTitle from './title.vue'
  import { defineComponent, onBeforeMount, onMounted, computed } from 'vue'
  export default defineComponent({
    name: 'EvsModel',
    components: {
      EvsTitle,
    },
    props: {
      modelIsFlag: {
        type: Boolean,
        default: false,
      },
      title: {
        type: [String, Number],
        default: '提示',
      },
      width: {
        type: [String, Number],
        default: () => {
          return '50%'
        },
      },
      actionBtnText: {
        type: String,
        default: '',
      },
      destrorOnClose: {
        type: Boolean,
        default: true,
      },
      appendToBody: {
        type: Boolean,
        default: false,
      },
      titleAlign: {
        type: String,
        default: 'left',
      },
      titleCssText: {
        //  模态框标题 自定义颜色大小对齐方式
        type: [Object, Array],
        default: () => {
          return {}
        },
      },
      titleComponent: {
        type: [Object, Array],
        default: () => {
          return []
        },
      },
    },
    emits: ['handleComfirm', 'handleShowModel', 'handleCloseModel'],
    setup(props: any, { emit, attrs }: any) {
      const titleAlign = props.titleAlign // 标题对齐方式
      const titleCssTextActive = props.titleCssText // 标题文字css 自定义
      const titleAlignActive = computed(() => {
        // title 文字 对齐方式
        return 'text-align:' + props.titleAlign
      })
      const showCloseIcon = computed(() => {
        // 按钮右对齐 ，隐藏关闭按钮
        if (titleAlign == 'right') {
          return false
        } else {
          return true
        }
      })
      onBeforeMount(() => {})
      onMounted(() => {})
      const showModel = () => {
        // 显示
        emit('handleShowModel', true)
      }
      const closeModel = () => {
        // 关闭
        emit('handleCloseModel', false)
      }
      const handleAction = () => {
        emit('handleComfirm')
      }
      return {
        attrs,
        showModel,
        closeModel,
        titleAlignActive,
        showCloseIcon,
        titleCssTextActive,
        handleAction,
      }
    },
  })
</script>
<style scoped lang="less">
  .model {
    .model-title {
      height: 56px;
      text-align: left;
      border-bottom: 1px solid #dcdcdc;
    }
    v-deep {
      @buttonColor: #5587f0;
      .el-button {
        min-height: 36px !important;
        line-height: 0 !important;
        height: 36px !important;
      }
      .el-button--primary {
        color: #fff !important;
        border-radius: 2px;
        background-color: @buttonColor !important;
        border-color: @buttonColor !important;
        &:hover {
          background-color: @buttonColor !important;
        }
        .is-plain {
          background: @buttonColor !important;
          border-color: @buttonColor !important;
          &:hover {
            background-color: @buttonColor !important;
          }
          &:focus {
            background-color: @buttonColor !important;
          }
        }
      }
      .el-button--default {
        color: @buttonColor;
        border-radius: 2px;
        border: 1px solid;
        border-color: @buttonColor;
      }
    }
  }
</style>
