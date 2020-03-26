import Render from './Render'

export default class Component{
  constructor(props = {}) {
    this.state = {}
    this.props = props
  }

  setState(newState){
    Object.assign(this.state, newState)
    Render.renderComponent(this)
  }

  // componentWillMount
}