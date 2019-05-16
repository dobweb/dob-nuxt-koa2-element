import Vue from 'vue'
import Element from 'element-ui'
import locale from 'element-ui/lib/locale/lang/zh-CN'
global.HTMLElement = typeof window === 'undefined' ? Object : window.HTMLElement
export default () => {
  Vue.use(Element, { locale })
}
