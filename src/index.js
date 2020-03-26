import React from './React'
const a={
  color: 'red'
}
const App = (
    <div style={a}>
      <p>Hello, <span>world</span></p>
      <p>Date: {new Date().toLocaleTimeString()}</p>
    </div>
)
React.render(App, document.getElementById('root'))