/**
 * @description: 验证插件
 */
import { variate } from '@/utils/tools/index'

/**
 * 强制验证每一个router都应该具有name属性
 * @param {*} router
 */

export const validataRouterName = (router) => {
  return router.every((item) => {
    return checkNameProperty(item, 'name')
  })
}

function checkNameProperty(node, name) {
  if (!variate.hasProperty(node, name)) {
    return false
  }
  if (variate.hasProperty(node, 'children')) {
    for (let child of node.children) {
      if (!checkNameProperty(child)) {
        return false
      }
    }
  }
  return true
}
