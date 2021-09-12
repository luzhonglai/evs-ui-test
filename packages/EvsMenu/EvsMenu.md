### 菜单组件

```js
npm i evs-pc-component -D

在src/components/index.ts中 加入 app.component('EvsMenu', EvsMenu)
```

使用方式：
```js
<evs-menu mode="vertical" v-model:layoutCollapsed="collapsed" :propRouters="routers" />
```

参数说明：

参数名 | 参数值 | 说明 
---|---|-----
mode | vertical | 横版、 竖版。  写上面默认就行
layoutCollapsed | 布尔值 | 菜单收起还是展开， 下面有具体使用栗子
propRouters | | 传参是 权限接口 返回 通过转化得来的 路由列表，参考mvp

```js
setup() {
    const collapsed = ref(true)
    const routers = computed((): RouteRecordRaw[] => {
      return store.state.permission.routers
    })
}
```css
// Silder  导航 css 自定义变量  文件名称variables.less
@menuText: #ccc;
@menuActiveText: #fff;
@menuActiveBg: #5587f0;

@menuBg: #252a2f;

@subMenuBg: #000000;
@subMenuHover: #5587f0;
@subMenuActiveText: #fff;

@menuWidth: 200px;
@menuMinWidth: 60px;
@menuUpDownSize: 18px;

@topSiderHeight: 60px;

@topMenuText: #303133;
@topMenuActiveText: #2d8cf0;
@topMenuActiveBg: #fff;

@topMenuBg: #fff;

@topSubMenuBg: #1f2d3d;
@topSMenuHover: #2d8cf0;
@topSMenuActiveText: #2d8cf0;




