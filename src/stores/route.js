import { defineStore } from 'pinia';

/**
 * 路由列表
 * @methods setRoutesList 设置路由数据
 * @methods setColumnsMenuHover 设置分栏布局菜单鼠标移入 boolean
 * @methods setColumnsNavHover 设置分栏布局最左侧导航鼠标移入 boolean
 */
export const useRouteStore = defineStore('routeStore', {
	state: () => ({
    // 所有的路由地址
		routesList: null,
    // 一级路由的key
    key: 0,
    // keep-alive的缓存
    caches: new Set(),
	}),
  getters: {
    key: (state) => state.key,
    caches: state => state.caches
  },
	actions: {
		async setRoutes(data) {
			this.routesList = data;
		},
    refresh() {
      this.key = this.key + 1;
    },
    addCaches(routeName){
      this.caches.add(routeName)
    },
    removeCaches(routeName){
      this.caches.delete(routeName)
    },
    cleanCaches(){
      this.caches.clear()
    }
	},
});