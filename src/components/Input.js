import React, { Component } from 'react'

class Line extends Component {
  constructor (props) {
    super(props)
    this.state = { cmd: this.props.cmd }
    this.cmdInput = React.createRef()

    this.handleChange = this.handleChange.bind(this)
    this.handleKeyUp = this.handleKeyUp.bind(this)
  }

   componentDidMount() {
    if (this.cmdInput && this.cmdInput.current) {
      this.cmdInput.current.focus()
    }
  }

  handleChange (event) {
    this.setState({ cmd: event.target.value })
    this.props.handleChange(event.target.value)
  }

  handleKeyUp (e) {
    if (e.keyCode === 13) {
      this.setState({ cmd: '' })
    }
    this.props.typing(e)
  }

  render() {
    return (
      <input
        readOnly={this.props.readOnly}
        className="cmd"
        value={this.state.cmd}
        ref={this.props.readOnly || this.cmdInput}
        onChange={this.handleChange}
        onKeyUp={this.handleKeyUp}
        maxLength="64"
      />
    );
  }
}

export default Line
