
var React = require('react');
var QUtil = require('./q-util');
var QDisplay = require('./QDisplay');
var QInputForm = require('./QInputForm');

class Main extends React.Component {
  
  constructor() {
    super()
    this.state = {input:{string:"0", mode:"float", fractBits:31, wholeBits:0}, current:{q: Array(32).fill(0), fractBits:31, wholeBits:0 }, previous:[]}

  }

  handleChange(key, value) {
    //out of curiousity, is there an easier way to do this?
    let newInput = Object.assign({}, this.state.input)
    newInput[key] = value

    this.setState({input: newInput})

    //update q value
    try {
      let q = this.calculateQ(newInput)
      let newCurrent = {q, fractBits: newInput.fractBits, wholeBits: newInput.wholeBits}
      this.setState({current: newCurrent});
    }
    catch (error) {
      let errorCurrent = {error}
      this.setState({current: errorCurrent})
    }
  }

  //calculate the q bit string from the input parameters
  //uses either the float or hex mode
  calculateQ(input) {
    if (input.mode == 'float') {
      let floatValue = parseFloat(input.input)
      if (floatValue==NaN)
        throw new Error(`invalid number: ${input.input}`)
      return QUtil.fromFloat(floatValue, input.fractBits, input.wholeBits)
    }
    else if (input.mode == 'hex') {
      if (input.input.length < 1)
        throw new Error(`no input`)
      return QUtil.fromHexString(input.input, input.fractBits, input.wholeBits)
    }
  }


  handleSave() {
    //save the current value
    //but only if it is not an error
    if (! this.state.current.error)
      this.setState({previous: [Object.assign({},this.state.current)].concat(this.state.previous)})
  }

  render () { 
    return <div className="container">
      <h1>Q Calculator</h1>
      <QInputForm {...this.state.input} onChange={this.handleChange.bind(this)}  onSave={this.handleSave.bind(this)}/>

      <table>
        <thead>
          <tr><th>format</th><th>as hex</th><th>as binary</th><th>rounded float</th></tr>
        </thead>
        <tbody>
          { this.state.current.error ? 
            this.renderErrorRow(this.state.current.error):
            this.renderQRow(this.state.current)
          }
          {this.state.previous.map(this.renderQRow)}
        </tbody>
      </table>

    </div> 
  } 

  renderQRow (obj) {
    let {q, fractBits, wholeBits} = obj 
    return <tr>
      <td>{`Q${wholeBits}.${fractBits}`}</td>
      <td><QDisplay q={q} format="hex"/></td>
      <td><QDisplay q={q} format="binary"/></td>
      <td>{QUtil.toFloat(q, fractBits, wholeBits)}</td>
    </tr>
  }

  renderErrorRow (error) {
    return <tr>
      <td span={4} style={{color:'red'}}>{error.toString()}</td>
    </tr>
  }
}

module.exports = Main;