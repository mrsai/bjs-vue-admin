import { defineStore } from 'pinia';

/**
 * 路由列表
 * @methods setRoutesList 设置路由数据
 * @methods setColumnsMenuHover 设置分栏布局菜单鼠标移入 boolean
 * @methods setColumnsNavHover 设置分栏布局最左侧导航鼠标移入 boolean
 */
export const useRouteStore = defineStore('routeStore', {
	state: () => ({
		routesList: null,
    key: 0,
	}),
  getters: {
    $key: (state) => state.key
  },
	actions: {
		async setRoutes(data) {
			this.routesList = data;
		},
    refresh() {
      console.log(this.key);
      this.key = this.key + 1;
    }
	},
});