<template>
  <div
    :class="{
      'has-logo': showLogo,
    }"
    class="sidebar-container"
  >
    <el-scrollbar>
      <div class="collapse" @click="triggerCollapsed">
        <i :class="collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></i>
      </div>
      <el-menu
        :default-active="activeMenu"
        :collapse="collapsed"
        :unique-opened="true"
        :mode="mode"
        @select="selectMenu"
      >
        <sider-item v-for="route in routers" :key="route.path" :item="route" :base-path="route.path" />
      </el-menu>
    </el-scrollbar>
  </div>
</template>

<script lang="ts">
  import { defineComponent, computed, PropType, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import SiderItem from './SiderItem.vue'
  import { isExternal } from '@/utils/validate'
  import { RouteRecordRaw } from 'vue-router'

  export default defineComponent({
    name: 'Sider',
    components: { SiderItem },
    props: {
      mode: {
        type: String as PropType<'horizontal' | 'vertical'>,
        default: 'vertical',
      },
      layoutCollapsed: {
        type: Boolean as PropType<boolean>,
        default: true,
      },
      propRouters: {
        type: Array as PropType<RouteRecordRaw[]>,
        default: null,
      },
    },
    emits: ['update:layoutCollapsed'],
    setup(props, { emit }) {
      const { currentRoute, push } = useRouter()
      const routers = computed((): RouteRecordRaw[] => {
        return props.propRouters
      })
      const activeMenu = computed(() => {
        const { meta, path } = currentRoute.value
        // if set path, the sidebar will highlight the path you set
        if (meta.activeMenu) {
          return meta.activeMenu
        }
        return path
      })

      const collapsed = ref(true)
      const showLogo = true

      function selectMenu(path: string) {
        if (isExternal(path)) {
          window.open(path)
        } else {
          push(path)
        }
      }

      const triggerCollapsed = () => {
        emit('update:layoutCollapsed', !collapsed.value)
        collapsed.value = !collapsed.value
      }

      return {
        routers,
        activeMenu,
        collapsed,
        showLogo,
        selectMenu,
        triggerCollapsed,
      }
    },
  })
</script>

<style lang="less" scoped>
  .sidebar-container {
    height: 100%;
    :deep(.svg-icon) {
      margin-right: 16px;
    }
    :deep(.el-scrollbar) {
      width: 100%;
      height: 100%;
      .el-scrollbar__wrap {
        overflow: scroll;
        overflow-x: hidden;
        .el-menu {
          width: 100%;
          border: none;
        }
      }
    }
  }

  .collapse {
    height: 60px;
    line-height: 60px;
    border-bottom: 1px solid rgba(221, 221, 221, 0.2);
    font-size: 22px;
    text-align: right;
    padding-right: 18px;

    i {
      color: #dddddd;
    }
  }
</style>
