import React, {Component} from "../../React";

export default class Home extends Component {
  constructor(props){
    super(props)
    this.state={
      name: ''
    }
  }
  componentWillMount(){
    console.log('componentWillMount', this.state.name)
  }
  componentWillUpdate(){
    console.log('componentWillUpdate')
  }
  handleChangeName({target: {value}}){
    this.setState({
      name: value
    })
  }
  render(){
    const {name} = this.state
    return (
        <div>
          <h4>Hello! {name}</h4>
          <input value={name} type="text" name='name' placeholder='input your name' onChange={this.handleChangeName.bind(this)}/> <br/>
        </div>
    )
  }
}