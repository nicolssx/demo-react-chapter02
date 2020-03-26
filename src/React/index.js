export default class React {
  // babel的jsx默认编译方法 react.createElement, 可自定义，参考babel文档
  static createElement(tag, attrs, ...children) {
    return {
      tag,
      attrs,
      children
    }
  }

  // 属性处理
  static setAttribute(node, attrName, val) {
    // 样式表名称转换
    if (attrName === 'className') attrName = 'class'

    if (/on\w+/.test(attrName)) { // 事件处理
      attrName = attrName.toLowerCase()
      node[attrName] = val || null
    } else if (attrName === 'style') { // 样式处理
      if (typeof val === 'string') {
        node.style.cssText = val || ''
      } else if (val && typeof val === 'object') {
        for (let sty in val) {
          node.style[sty] = val[sty]
        }
      }
    } else {
      if (attrName in node) {
        node[attrName] = val || null
      } else if (val) {
        node.setAttribute(attrName, val)
      } else {
        node.removeAttribute(attrName)
      }
    }
  }

  static setNode(vnode, container) {
    if (typeof vnode === 'string') { // 文本处理
      const textNode = document.createTextNode(vnode)
      return container.appendChild(textNode)
    }
    // dom标签处理
    const node = document.createElement(vnode.tag)
    if (vnode.attrs) {
      Object.keys(vnode.attrs).forEach(key => {
        React.setAttribute(node, key, vnode.attrs[key])
      })
    }
    vnode.children.forEach(child => React.setNode(child, node))
    return container.appendChild(node)
  }

  static render(vnode, container) {
    container.innerHTML = ''
    return React.setNode(vnode, container)
  }
}