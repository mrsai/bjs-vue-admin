import { defineStore } from 'pinia'
import { Theme, Profix } from './constants'
export const useAppStore = defineStore('AppStore', {
  state: () => ({
    // 锁定窗口滚动
    lockScroll: false,
    // 白天还是夜晚的模式
    theme: Theme.Light,
    // 唯一标识的前缀
    profix: Profix
  }),
  getters: {
    lockScroll: (state) => state.lockScroll,
    theme: (state) => state.theme,
    profix: (state) => state.Profix
  },
  actions: {
    setLockScroll(val) {
      this.lockScroll = val
    },
    switchTheme() {
      if (this.theme === Theme.Light) {
        this.theme = Theme.Dark
      } else {
        this.theme = Theme.Light
      }
    }
  }
})
