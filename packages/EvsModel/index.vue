<!--  -->
<template>
  <div class="model">
    <el-button v-if="actionBtnText" type="primary" plain @click="showModel">{{ actionBtnText }}</el-button>
    <el-dialog
      :model-value="modelIsFlag"
      :width="propsWidth"
      v-bind="attrs"
      :show-close="showCloseIcon"
      :destroy-on-close="destrorOnClose"
      @close="closeModel"
    >
      <template #title>
        <div class="model-title" :style="[titleAlignActive, titleCssTextActive]">
          {{ title }}
        </div>
      </template>
      <template v-if="titleComponent">
        <div v-for="item in titleComponent" :key="item" class="vfor-title">
          <EvsTitle
            :item-title="item.title"
            :is-class="item.isClass"
            :is-active="item.isActive"
            :btn-name="item.btnName"
            @showActive="showTitleIsClass"
          >
            <slot :name="item.slot"></slot>
          </EvsTitle>
        </div>
      </template>
      <slot></slot>
      <slot name="footer">
        <div :style="btnAlignAction">
          <slot name="custom"></slot>
          <el-button
            v-for="(item, index) in btnOptions"
            :key="index"
            :type="item.type"
            :plain="item.plain"
            @click="btnModelAction(item)"
            >{{ item.text }}</el-button
          >
        </div>
      </slot>
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
      default: '684',
    },
    actionBtnText: {
      // 是否显示按钮如果要显示就要传入按钮
      type: String,
      default: '',
    },
    destrorOnClose: {
      type: Boolean,
      default: true,
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
    btnAlign: {
      type: [String],
      default: 'right',
    },
    btnOptions: {
      type: [Object, Array],
      default: () => {
        return [
          {
            type: 'default',
            text: '取消',
            plain: true,
            method: 'cancel',
          },
          {
            type: 'primary',
            text: '确认',
            method: 'action',
          },
        ]
      },
    },
  },
  emits: ['handleComfirm', 'handleShowModel', 'handleCloseModel', 'handleTitleIsClass'],
  setup(props: any, { emit, attrs }: any) {
    /* eslint-disable vue/no-setup-props-destructure */
    const titleAlign = props.titleAlign // 标题对齐方式
    const titleCssTextActive = props.titleCssText // 标题文字css 自定义
    const btnAlignAction = computed(() => {
      return 'text-align:' + props.btnAlign
    })
    const propsWidth = computed(() => {
      // model width 只能能设置 如下 3个 宽度
      if (['456', '684', '1140'].indexOf(props.width) != -1) {
        return `${props.width}px`
      } else {
        let err = new Error('model  width is 456,684,1140')
        console.error(err)
        return '684px'
      }
    })
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
    const showModel = () => {
      // 显示
      emit('handleShowModel', true)
    }
    const closeModel = () => {
      // 关闭
      emit('handleCloseModel', false)
    }
    const btnModelAction = (item: any) => {
      let code: string = item.method
      // switch (code) {
      //   case 'cancel':
      //     emit('handleCloseModel', false)
      //     break
      //   case 'action':
      //     emit('handleComfirm')
      //     break
      //   default:
      //     console.error('参数传入有误')
      // }
      if (code == 'cancel') {
        emit('handleCloseModel', false)
      } else if (code == 'action') {
        emit('handleComfirm')
      } else {
        emit(`${code}`, item)
      }
    }
    const showTitleIsClass = (val: any) => {
      emit('handleTitleIsClass', val)
    }
    return {
      propsWidth,
      attrs,
      showModel,
      closeModel,
      btnAlignAction,
      titleAlignActive,
      showCloseIcon,
      titleCssTextActive,
      btnModelAction,
      showTitleIsClass,
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
  .btn {
    display: inline-block;
  }
  ::v-deep {
    @buttonColor: #5587f0;
    .el-button {
      min-height: 36px !important;
      line-height: 0 !important;
      height: 36px !important;
    }
    .el-button + .el-button {
      margin-left: 16px;
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
