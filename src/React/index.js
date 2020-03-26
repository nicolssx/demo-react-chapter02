import Render from './Render'

export {default as Component} from './Component'

export default class React {
  // babel的jsx默认编译方法 react.createElement, 可自定义，参考babel文档
  static createElement(tag, attrs, ...children) {
    return {
      tag,
      attrs,
      children
    }
  }

  // 模板渲染
  static render(vnode, container) {
    container.innerHTML = ''
    return Render.render(vnode, container)
  }
}