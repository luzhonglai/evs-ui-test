<template>
  <div class="searchCon" :class="{ fold: switchFlag }">
    <div class="searchArea">
      <el-form :model="formData" :rules="rules">
        <el-row :gutter="20">
          <el-col
            :span="item.type == 'datetimerange' ? 16 : 8"
            v-for="item in formModel"
            :key="item.name"
          >
            <!-- 省市选择组件 -->
            <el-form-item
              class="search-item"
              :label="item.label"
              :label-width="item.labelWidth"
              v-if="item.type === 'cascaderLazy'"
            >
              <el-cascader
                clearable
                :props="item.optionProps"
                @change="changeCity"
                v-model="formData[item.name]"
              ></el-cascader>
            </el-form-item>
            <!-- 省市区三级联动 -->
            <el-form-item
              class="search-item"
              :label="item.label"
              :label-width="item.labelWidth"
              v-if="item.type === 'cascader'"
            >
              <el-cascader
                v-model="formData[item.name]"
                clearable
                :options="item.options"
              ></el-cascader>
            </el-form-item>
            <!-- 站列表动态查询组件 -->
            <el-form-item
              class="search-item"
              :label="item.label"
              :prop="item.name"
              :label-width="item.labelWidth"
              v-if="item.type === 'selectStation'"
            >
              <slot name="selectStation"></slot>
            </el-form-item>
            <!-- input组件 -->
            <el-form-item
              class="search-item"
              :label="item.label"
              :label-width="item.labelWidth"
              :prop="item.name"
              v-if="item.type === 'input'"
            >
              <el-input
                style="width:100%"
                v-model="formData[item.name]"
                clearable
                :placeholder="item.placeholder"
              ></el-input>
            </el-form-item>
            <!-- select组件 -->
            <el-form-item
              class="search-item"
              :label="item.label"
              :label-width="item.labelWidth"
              :prop="item.name"
              v-if="item.type === 'select'"
            >
              <el-select
                v-model="formData[item.name]"
                :placeholder="item.placeholder"
                :clearable="true"
                :filterable="item.filterable"
              >
                <el-option
                  v-for="option in selectOptions(item)"
                  :key="option.label"
                  :label="option.label"
                  :value="option.value"
                ></el-option>
              </el-select>
            </el-form-item>
            <!-- 时分秒时间组件 -->
            <el-form-item
              class="search-item"
              :label="item.label"
              :label-width="item.labelWidth"
              :prop="item.name"
              v-if="item.type === 'datetimerange' && !item.selName"
            >
              <el-date-picker
                type="datetimerange"
                v-model="formData[item.name]"
                :range-separator="item.rangeSeparator"
                :start-placeholder="item.startPlaceholder"
                :end-placeholder="item.endPlaceholder"
                style="width:100%"
                :default-time="item.defaultTime"
              ></el-date-picker>
            </el-form-item>
            <!-- 时分秒时间组件前面带选择下拉 selName为前面下拉字段名 -->
            <div
              class="search-item"
              :label="item.label"
              :label-width="item.labelWidth"
              :prop="item.name"
              v-if="item.type === 'datetimerange' && item.selName"
            >
              <div class="label_name" :class="item.selName ? 'group' : ''">
                <el-select
                  v-model="formData[item.selName]"
                  @change="handleToggleDateType(item.name)"
                  placeholder="请选择"
                >
                  <el-option
                    v-for="option in selectOptions(item)"
                    :key="option.label"
                    :label="option.label"
                    :value="option.value"
                  ></el-option>
                </el-select>
              </div>
              <div class="input_item">
                <el-date-picker
                  prefix-icon="el-icon-date"
                  type="datetimerange"
                  v-model="formData[item.name]"
                  :range-separator="item.rangeSeparator"
                  :start-placeholder="item.startPlaceholder"
                  :end-placeholder="item.endPlaceholder"
                  style="width:100%"
                  :default-time="item.defaultTime"
                ></el-date-picker>
              </div>
            </div>
            <!-- 年月日时间组件 -->
            <el-form-item
              class="search-item"
              :label="item.label"
              :label-width="item.labelWidth"
              :prop="item.name"
              v-if="item.type === 'daterange'"
            >
              <el-date-picker
                type="daterange"
                v-model="formData[item.name]"
                :range-separator="item.rangeSeparator"
                :start-placeholder="item.startPlaceholder"
                :end-placeholder="item.endPlaceholder"
                style="width: 100%;"
                :shortcuts="item.shortcuts"
              ></el-date-picker>
            </el-form-item>
          </el-col>
        </el-row>
      </el-form>
    </div>
    <div class="operator">
      <div class="operator_l">
        <el-button
          type="text"
          class="switch_Btn"
          @click="switchFlag = !switchFlag"
          v-if="hasFold"
        >
          {{ !switchFlag ? "收起" : "展开" }}
          <i
            :class="[switchFlag ? 'el-icon-arrow-down' : 'el-icon-arrow-up']"
          ></i>
        </el-button>
      </div>
      <div class="operator_r">
        <el-button v-if="isReset" @click="resetForm">重置</el-button>
        <el-button type="primary" @click="submitForm">查询</el-button>
        <slot name="othersBtn"></slot>
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent, computed, reactive, ref } from "vue";
export default defineComponent({
  name: "mvp-search-area",
  props: {
    hasFold: {
      type: Boolean,
      default: false, // 是否有展开收起功能,默认设置false
    },
    rules: Object,
    formModel: Array, // 需要渲染的form组件集合
    initData: Object, // 初始化需要显示数据的字段
    emitName: {
      type: String,
      default: "",
    }, // emit出去的事件名
    exportModel: Object,
    isReset: {
      // 是否显示重置按钮
      type: Boolean,
      default: true,
    },
  },
  setup(props, ctx) {
    const formData: any = props.initData ? props.initData : reactive({})
    const defaultTime: any = props.initData
      ? JSON.parse(JSON.stringify(props.initData))
      : reactive({})

    const selectOptions = computed(() => {
      return function(item: any) {
        if (item.defaultProps) {
          item.options.forEach((option: any) => {
            option.label = option[item.defaultProps.label]
            option.value = option[item.defaultProps.value]
          })
        }
        return item.options
      };
    });
    const switchFlag = ref(false) // 展开收起开关
    // 省市切换清空站列表
    const changeCity = () => {
      ctx.emit("changeCity", formData)
    };

    const handleToggleDateType = (key: any) => {
      //组件前select切换,清空后面时分秒
      formData[key] = ""
    };
    // 点击查询按钮
    const submitForm = () => {
      const emitName:string = props.emitName as string
      ctx.emit(emitName ? emitName : "search", formData)
    };
    // 重置
    const resetForm = () => {
      for (const key in formData) {
        if (defaultTime && Object.keys(defaultTime).indexOf(key) > -1) {
          if (Array.isArray(defaultTime[key])) {
            formData[key] = defaultTime[key]
          } else {
            formData[key] = defaultTime[key]
          }
        } else {
          formData[key] = ""
        }
      }
      const emitName = props.emitName as string
      ctx.emit(emitName ? emitName : "resetForm", formData)
    };
    return {
      formData,
      selectOptions,
      switchFlag,
      changeCity,
      handleToggleDateType,
      resetForm,
      submitForm,
    };
  },
});
</script>
<style lang="less">
.searchCon {
  .searchArea {
    .el-input__inner,
    .el-input_item_inner,
    .el-input--mini .el-input_item_inner,
    .el-input--small .el-input_item_inner {
      width: 100%;
      border: none;
      height: 32px;
      line-height: 32px;
    }
  }

  .el-cascader {
    width: 100% !important;
  }
  .el-button {
    &:nth-child(1),
    &:nth-child(2) {
      margin-top: 0 !important;
    }
  }
  .el-select--mini {
    width: 100%;
  }
  .group {
    .el-select--mini {
      width: 120px;
      margin-left: 0;
    }
    .el-input__inner {
      padding-left: 12px;
    }
  }
}
</style>
<style lang="less" scoped>
.searchCon {
  display: flex;
  // padding: 24px 24px 0;
  padding-top: 24px;
  background-color: #fff;
  .searchArea {
    flex: 1;
    .search-item {
      height: 32px;
      border-radius: 2px;
      border: 1px solid #dcdcdc;
      display: flex;
      flex-direction: row;
      // align-items: center;
      margin-top: 16px;
      margin-bottom: 0px;
      .label_name {
        line-height: 1;
        padding: 0 12px;
        color: #666;
        font-size: 12px;
        position: relative;
        &::after {
          position: absolute;
          top: -1px;
          right: 0;
          display: block;
          content: "|";
          color: #dcdcdc;
          height: 32px;
          line-height: 32px;
        }
      }
      .group {
        padding: 0;
      }
      .label_ {
        padding-right: 25px;
      }
      .input_item {
        flex: 1;
      }
      :deep(label) {
        min-width: 70px;
        position: relative;
        text-align: left;
        padding-left: 12px;
        box-sizing: border-box;
        font-size: 12px;
        &::after {
          position: absolute;
          top: -1px;
          right: 0;
          display: block;
          content: "|";
          color: #dcdcdc;
          height: 32px;
          line-height: 32px;
        }
        &::before {
          position: absolute;
          left: 4px;
        }
      }
      :deep(.el-form-item__error) {
        padding-top: 2px;
      }
      :deep(.el-form-item__content) {
        margin-left: 0 !important;
        flex: 1;
      }
    }
    .el-col {
      &:nth-child(1),
      &:nth-child(2),
      &:nth-child(3) {
        .search-item {
          margin-top: 0;
        }
      }
    }
  }
}
.fold {
  height: 34px;
  overflow: hidden;
}
</style>
