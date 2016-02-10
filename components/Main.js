
var React = require('react');
var QUtil = require('./q-util');
var QHex = require('./QHex');
var QBinary = require('./QBinary');
var InputForm = require('./InputForm');

class Main extends React.Component {
  
  constructor() {
    super()
    this.state = {current:{float:0.0, fractBits:31, wholeBits:0}, previous:[]}

  }

  handleChange(key, value) {
    //out of curiousity, is there an easier way to do this?
    this.setState({current: Object.assign(this.state.current, {[key]: value})})
  }

  handleSave() {
    this.setState({previous: [Object.assign({},this.state.current)].concat(this.state.previous)})
  }

  render () { 
    //add error handling
    let all = [this.state.current].concat(this.state.previous)    
    let allQ = all.map(({float, fractBits, wholeBits}) => ({float, fractBits, wholeBits, q:QUtil.fromFloat(float, fractBits, wholeBits)}))

    return <div className="container">
      <h1>Q Calculator</h1>
      <InputForm defaultFloat={this.state.float} defaultFractBits={this.state.fractBits} defaultWholeBits={this.state.wholeBits} onChange={this.handleChange.bind(this)}  onSave={this.handleSave.bind(this)}/>

      <table>
        <thead>
          <tr><th>float</th><th>format</th><th>as hex</th><th>as binary</th><th>rounded float</th></tr>
        </thead>
        <tbody>
          {allQ.map(({float, fractBits, wholeBits, q}) => <tr>
              <td>{float}</td>      
              <td>{`Q${wholeBits}.${fractBits}`}</td>
              <td><QHex q={q}/> </td>
              <td><QBinary q={q}/> </td>
              <td>{QUtil.toFloat(q, fractBits, wholeBits)}</td>
            </tr>
          )}
        </tbody>
      </table>

    </div>
  } 
}

module.exports = Main;