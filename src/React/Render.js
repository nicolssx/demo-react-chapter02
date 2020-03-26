import Component from './Component'
export default class Render{
  // 设置属性
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

  // 创建组件实例
  static createComponent(component, props){
    let inst
    if(component.prototype && component.prototype.render){ // 类组件
      inst = new component(props)
    } else { // 如果是函数组件，将其扩展为类组件
      inst = new Component()
      inst.constructor = component
      inst.render = function () {
       return this.constructor(props)
      }
    }
    return inst
  }

  // 更新props并挂载钩子
  static setComponent(component, props){
    if(!component.base){
      if(component.componentWillMount) {
        component.componentWillMount(props)
      }
    } else if(component.componentWillReceiveProps) {
      component.componentWillReceiveProps(props)
    }
    // component.props = props
    Render.renderComponent(component)
  }

  // 渲染组件
  static renderComponent(component){
    const vnode = component.render()
    let base
    if(component.base&&component.componentWillUpdate) {
      component.componentWillUpdate()
    }
    base = Render._render(vnode)
    if(component.base){
      if(component.componentDidUpdate) {
        component.componentDidUpdate()
      }
    } else if(component.componentDidMount){
      component.componentDidMount()
    }
    if(component.base && component.base.parentNode) {
      component.base.parentNode.replaceChild( base, component.base );
    }
    component.base = base
    // base._component = component
  }

  // 渲染虚拟dom
  static _render(vnode) {
    if(vnode === null || vnode === undefined || typeof vnode === 'boolean') vnode = ''
    if(typeof vnode === 'number') vnode = String(vnode)
    if (typeof vnode === 'string') { // 文本处理
      return document.createTextNode(vnode)
    }
    // 如果模板是组件，tag会是个方法
    if(typeof vnode.tag === 'function'){
      const component = Render.createComponent(vnode.tag, vnode.attrs)
      Render.setComponent(component, vnode.attrs)
      return component.base
    }
    // dom标签处理
    const dom = document.createElement(vnode.tag)
    if (vnode.attrs) {
      Object.keys(vnode.attrs).forEach(key => {
        Render.setAttribute(dom, key, vnode.attrs[key])
      })
    }
    vnode.children.forEach(child => Render.render(child, dom))
    return dom
  }

  static render(vnode, container) {
    container.appendChild(Render._render(vnode))
  }
}