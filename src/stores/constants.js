/**
 * 常量以及一些全局使用的映射关系和字符串
 * 以及一些需要写死的key的值和名称的映射关系
 */

/**
 * 唯一性保证，一般增加在字符串前面，保证其变量名称的唯一性
 * 可能还是用不着
 */
export const Profix = '_bjs_'

export const AppName = 'BJS'

/**
 * 主题
 * @property {string} dark 暗色
 * @property {string} light 亮色
 */
export const Theme = {
  darkMode: 'dark',
  lightMode: 'light'
}

/**
 * 布局
 * @property {string} LeftRight 左右布局
 * @property {string} TopBottom 上下布局
 */
export const Layout = {
  leftToRight: 'left-right',
  topToBottom: 'top-bottom'
}

/**
 * 布局
 * @property {string} CN 简中
 * @property {string} En 美英
 */
export const Lang = {
  CN: 'zh-cn',
  En: 'en-us'
}
