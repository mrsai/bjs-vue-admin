import { ref } from 'vue'
import { defineStore } from 'pinia'
import { storage } from '@/utils/tools/storage'
import { stylesVar } from '@/utils/tools'
import { Theme, Layout } from '@/stores/constants'

const useAppStore = defineStore(
  // 唯一ID
  'appStore',
  () => {
    const settings = ref(
      storage.local.get('settings') || {
        // 主题色
        theme: Theme.lightMode,
        // 布局
        layout: Layout.leftToRigth,
        // 是否开启多标签页
        multiTab: true,
        // 是否展开侧栏
        isCollapse: false,
        // 展开的宽度和收起的宽度
        sidebar: {
          expandedWidth: null,
          collapsedWidth: null
        }
      }
    )
    /**
     * 整体更新设置
     * @param {} data
     */
    function updateSettings(data) {
      settings.value = { ...settings.value, ...data }
      storage.local.set('settings', settings.value)
    }

    /**
     * 切换菜单展开还是收起
     */
    function toggleMenu() {
      const reverse = true
      setMenuCollapse(reverse)
      settings.value.isCollapse = !settings.value.isCollapse
      storage.local.set('settings', settings.value)
    }

    /**
     * 切换模式
     */
    function toggleTheme() {
      settings.value.theme =
        settings.value.theme === Theme.lightMode ? Theme.darkMode : Theme.lightMode
      storage.local.set('settings', settings.value)
    }

    /**
     * 设置菜单展开还是收起的变量，通过修改root元素的css变量--sidebar-width 来时实现的
     * @param {Boolean} reverse
     * 正常状态下，如果 Collapse 则设置为--sidebar-width最小值，反之为最大值
     * 如果传入 reverse ，则证明是用户在进行切换操作，则进行相反的设置
     * 这个封装其实不好，因为它看起来并不那么明确的知道它在干什么
     */

    function setMenuCollapse(reverse) {
      if (!settings.value.sidebar.expandedWidth || !settings.value.sidebar.collapsedWidth) {
        const [expandedWidth, collapsedWidth] = stylesVar.get([
          '--sidebar-expanded-width',
          '--sidebar-collapsed-width'
        ])
        settings.value.sidebar.expandedWidth = expandedWidth
        settings.value.sidebar.collapsedWidth = collapsedWidth
      }

      let sidebarWidth = null
      if (settings.value.isCollapse) {
        reverse
          ? (sidebarWidth = settings.value.sidebar.expandedWidth)
          : (sidebarWidth = settings.value.sidebar.collapsedWidth)
      } else {
        reverse
          ? (sidebarWidth = settings.value.sidebar.collapsedWidth)
          : (sidebarWidth = settings.value.sidebar.expandedWidth)
      }
      stylesVar.set({
        '--sidebar-width': sidebarWidth
      })
    }

    return {
      settings,
      toggleMenu,
      updateSettings,
      toggleTheme,
      setMenuCollapse
    }
  }
)

export { useAppStore }
