<!--  -->
<template>
  <div class="title">
    <div class="title-text" :class="{ title_b: isClass }">
      {{ itemTitle }}
      <div v-if="isClass" class="arror-box">
        <i
          class="el-icon-arrow-right item"
          :class="{ 'is-active': show }"
          style="cursor: pointer; margin-left: 20px"
          @click="showBox"
        ></i>
      </div>
    </div>
  </div>
  <div>
    <el-collapse-transition>
      <div v-show="show && isClass" class="title-container">
        <slot></slot>
      </div>
    </el-collapse-transition>
  </div>
  <div v-if="!isClass" class="title-container">
    <slot></slot>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onBeforeMount, onMounted } from 'vue'
  export default defineComponent({
    name: 'EvsTitle',
    props: {
      itemTitle: {
        type: String,
        default: '',
      },
      isClass: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['showActive'],
    setup(props: any, { emit, attrs }: any) {
      const show = ref(true)
      onBeforeMount(() => {})
      onMounted(() => {})
      const showBox = () => {
        show.value = !show.value
        emit('showActive', show.value)
      }
      return {
        showBox,
        show,
      }
    },
  })
</script>
<style scoped lang="less">
  .title {
    .title-text {
      height: 40px;
      background: rgba(85, 135, 240, 0.1);
      font-size: 14px;
      padding-left: 10px;
      border-radius: 3px;
      line-height: 40px;
      margin: 0 0 10px;
      color: #4a4a4a;
      text-align: left;
      border-left: 2px solid #5587f0;
    }
    .arror-box {
      float: right;
    }
    .item {
      transition: transform 0.3s;
      font-weight: 300;
    }
    .title_b {
      // display: flex;
      // justify-content: space-between;
      padding-right: 10px;
    }
    .is-active {
      transform: rotate(90deg);
    }
  }
  .title-container {
    padding: 10px 0 10px 0;
  }
</style>
