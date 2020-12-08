<template>
  <div class="ct-query-area">
    <div class="ct-query-input">
      <el-form :model="formData" :inline="true" label-width="80px" size="medium">
        <el-form-item v-for="(item) in formModel" :key="item.name" :label="item.label">
          <el-input v-if="item.type === 'input'" v-model="formData[item.name]" :placeholder="item.placeholder"></el-input>
          <el-select
            v-if="item.type === 'select'"
            v-model="formData[item.name]"
            clearable
            @change="triggerSelectChild($event, item)"
          >
            <el-option
              v-for="option in selectOptions(item)"
              :key="option.label"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <el-select v-if="item.type === 'select-child'" v-model="formData[item.name]" clearable>
            <el-option
              v-for="option in selectOptions(item)"
              :key="option.label"
              :label="option.label"
              :value="option.value"
            ></el-option>
          </el-select>
          <ct-select-tree
            v-if="item.type === 'selectTree'"
            :style="{width: '100%'}"
            :props="item.areaTreeProps"
            :options="item.options"
            @getValue="setArea($event,item.name,item.areaTreeProps.value)"
          ></ct-select-tree>
          <el-date-picker
            v-if="item.type === 'datetimerange'"
            v-model="formData[item.name]"
            type="datetimerange"
            style="width: 400px;"
            value-format="yyyy-MM-dd HH:mm:ss"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
            :picker-options="item.datePickerOptions"
            @change="setDate(item.params)"
          ></el-date-picker>
          <el-date-picker
            v-if="item.type === 'daterange'"
            v-model="formData[item.name]"
            type="daterange"
            style="width: 4.2rem;"
            value-format="yyyy-MM-dd"
            range-separator="至"
            start-placeholder="开始日期"
            end-placeholder="结束日期"
            align="right"
          ></el-date-picker>
           <el-date-picker
            v-if="item.type === 'date'"
            v-model="formData[item.name]"
            type="date"
            value-format="yyyy-MM"
            align="right"
            placeholder="选择日期"
          ></el-date-picker>
          <el-date-picker
            v-if="item.type === 'month'"
            v-model="formData[item.name]"
            type="month"
            value-format="yyyy-MM"
            align="right"
            placeholder="选择月份"
          ></el-date-picker>
          <el-date-picker
            v-if="item.type === 'year'"
            value-format="yyyy"
            v-model="formData[item.name]"
            type="year"
            placeholder="选择年份"
          ></el-date-picker>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" size="small" icon="el-icon-search" @click="search">查询</el-button>
          <slot />
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { reactive, computed } from "@vue/composition-api"
export default {
  name: 'evs-search-area',
  props: {
    formModel: Array,
    emitName: String,
    defaultProps: Object,
    datePickerOptions: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },
  setup(props: any, ctx: any) {
    const formData: any = reactive({})
    const selectOptions = computed(() => {
      return function(item: any) {
        if (item.defaultProps) {
          item.options.forEach((option: any) => {
            option.label = option[item.defaultProps.label]
            option.value = option[item.defaultProps.value]
          })
        }
        return item.options
      }
    })

    function search() {
      const emitName = props.emitName as string
      ctx.emit(emitName ? emitName : 'search', formData)
    }

    function setDate(params: string[]) {
      const [startTime, endTime] = params
      formData[startTime] = formData.datetimerange[0]
      formData[endTime] = formData.datetimerange[1]
      // delete formData.datetimerange
    }

    function setArea(data: any, name: string, propsName: string) {
      formData[name] = data[propsName]
    }
    function reset(){
      for(const key in formData){
          formData[key] = ''
      }
      search()
    }
    function triggerSelectChild(option: any, item: any) {
      if (item.hasChild) {
        ctx.emit('triggerSelectChild', option)
      }
    }

    return {
      formData,
      selectOptions,
      search,
      setDate,
      setArea,
      reset,
      triggerSelectChild
    }
  }
}
</script>
<style lang="scss" scoped>
.ct-query-input {
  width: 100%;

  .el-button {
    padding: 10px 15px;
  }

  ::v-deep .el-form-item__label {
    line-height: 36px;
  }

  .el-form-item__content {
    min-width: 220px;
    line-height: 3px;
  }

  .el-input,
  .el-select {
    width: 284px !important;
  }

  .el-form-item {
    margin-right: 20px;
    display: inline-block;
  }

  .ct-query-input__button {
    .el-form-item__content {
      width: 120px;
      margin-left: 0px;
    }
  }

  .el-select {
    width: 100%;
  }

  .el-date-editor .el-range-input {
    width: 42%;
  }

  .el-range-separator {
    line-height: 30px;
  }
}

</style>


