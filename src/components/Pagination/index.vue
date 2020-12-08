<!-- 分页查询
<evs-pagination v-model=[pager] @query=[列表查询方法] />
:pager = {
  page: 'page',   // 第几页
  rows: 'rows',   // 显示条数
  total: 'total', // 总记录条数
}
-->

<template>
  <div class="mt10">
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      background
      :pager-count="7"
      :total="pager[props.total]"
      :current-page.sync="pager[props.page]"
      :page-size="pager[props.rows]"
      :page-sizes="[5, 10, 15, 30, 50]"
      @size-change="onChangeSize"
      @current-change="onChangePage"
    ></el-pagination>
  </div>
</template>

<script lang="ts">
import { computed, watch } from '@vue/composition-api'
export default {
  name: 'evs-paging',
  props: {
    pager: {
      type: Object,
      required: true,
      default: () => ({
        page: 1,
        rows: 10,
        total: 20
      })
    },
    props: {
      type: Object,
      required: false,
      default: () => ({
        page: 'page',
        rows: 'rows',
        total: 'total'
      })
    }
  },
  model: {
    prop: 'pager',
    event: 'setPager'
  },
  setup(props: any, ctx: any) {
    const total = computed(() => props.pager[props.props.total] || 0)

    const isEmptyList = computed(() => {
      return (
        Math.ceil(props.pager[props.props.total] / props.pager[props.props.rows]) <
        props.pager[props.props.page]
      )
    })

     // 每页条数
    function onChangeSize(rows: any) {
      const temp = {
        [props.props.rows]: rows,
        // 当显示条数小于或等于总条数时，重置页数
        [props.props.page]: rows <= props.total ? 1 : props.pager[props.props.page]
      }

      ctx.emit('setPager', Object.assign(props.pager, temp))
      ctx.emit('query', Object.assign(props.pager, temp))
    }

    // 翻页
    function onChangePage(page: number) {
      ctx.emit(
        'setPager',
        Object.assign(props.pager, { [props.props.page]: page })
      )
      ctx.emit(
        'query',
        Object.assign(props.pager, { [props.props.page]: page })
      )
    }

    /**
     * 存在记录但未获取到数据时, 重新请求
     * 注意第一个参数 应该是方法
     */
    watch(() => { return total }, () => {
      if (props.pager[props.props.page] > 1 && isEmptyList) {
        ctx.emit(
          'setPager',
          Object.assign(props.pager, {
            [props.props.page]: props.pager[props.props.page] - 1
          })
        )
        ctx.emit('query')
      }
    })

    return {
      total,
      isEmptyList,
      onChangeSize,
      onChangePage
    }
  }
}
</script>
<style lang="scss" scoped>
  .mt10 {
    margin-top: 10px;
  }
</style>
