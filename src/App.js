import React, { Component } from 'react';
import Line from './components/Line'
import Input from './components/Input'
import './App.css';
import commands from './commands'
import messages from './messages'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = { lines: [], cmd: '', complete: false }

    this.launchDiv1 = React.createRef()
    this.launchDiv2 = React.createRef()
    this.handleChange = this.handleChange.bind(this)
    this.typing = this.typing.bind(this)
    this.welcome = this.welcome.bind(this)
  }

  async componentDidMount() {
    await this.welcome(messages.launch1, this.launchDiv1.current)
    await this.welcome(messages.launch2, this.launchDiv2.current)
    await this.timeout(500)
    this.launchDiv2.current.innerHTML += ' done.'
    await this.timeout(300)
    this.setState({ complete: true })
  }

  async welcome (text, div) {
    let textArray = text.split('')
    for (let i = 0; i < textArray.length; ++i) {
      await this.timeout(50)
      div.innerHTML += textArray[i]
    }
    for (let i = 0; i < 3; ++i) {
      await this.timeout(500)
      div.innerHTML += '.'
    }
  }

  timeout (ms) {
    return new Promise(resolve => setTimeout(resolve, ms))
  }

  handleChange (value) {
    this.setState({ cmd: value })
  }

  typing(e) {
    if (e.keyCode === 13) {
      this.setState({ lines: [...this.state.lines, { text: this.state.cmd, type: 'history' }] }, () => {
        if (this.state.cmd.trim() === '') {
          return
        }
        commands[this.state.cmd]
        ? this.setState({ lines: [...this.state.lines, { text: commands[this.state.cmd], type: 'command' }] })
        : this.setState({ lines: [...this.state.lines, { text: messages.error, type: 'error' }] })
        this.setState({ cmd: '' })
      })
    }
  }

  render() {
    return (
      <div className="App">
        <div className="launch" ref={this.launchDiv1}></div>
        <div className="launch" ref={this.launchDiv2}></div>
        { this.state.lines.map((item, index) => {
          let component = null
          switch (item.type) {
            case 'history':
              component = <Line key={index}>
                <Input typing={this.typing} handleChange={this.handleChange} cmd={item.text} readOnly={true} />
              </Line>
              break
            case 'command':
              component = <pre key={index}>{item.text}</pre>
              break
            case 'error':
              component = <pre key={index}>{item.text}</pre>
              break
            default:
          }
          return component
        })}
        { this.state.complete ?
          <Line>
            <Input typing={this.typing} handleChange={this.handleChange} cmd={this.state.cmd} />
          </Line> : null
        }
      </div>
    );
  }
}

export default App;
