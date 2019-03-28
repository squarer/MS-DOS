import React, { Component } from 'react'

class Line extends Component {
  constructor (props) {
    super(props)
    this.state = { path: this.props.path || 'C:\\' }
    this.line = React.createRef()
  }

  render() {
    return (
      <div className="line" ref={this.line}>
        <span>{ this.state.path }></span>
        { this.props.children }
      </div>
    );
  }
}

export default Line
