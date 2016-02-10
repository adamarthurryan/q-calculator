var React = require('react');
var QUtil = require('./q-util')

class QInputForm extends React.Component {


  handleBitsChange(key, event) {
    let strValue = event.target.value
    let value = parseInt(strValue)

    this.props.onChange(key, value);

  }

  handleInputChange(event) {
    this.props.onChange('input', event.target.value)
  }


  //save should be moved out of this component
  handleSave(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onSave()
  }

  //mode should be moved out of this component
  handleModeChange(event) {
    event.preventDefault()
    event.stopPropagation()

    if (this.props.mode == 'float')
      this.props.onChange('mode', 'hex')
    if (this.props.mode == 'hex')
      this.props.onChange('mode', 'float')
  }

  render() {
    return <form >
      <div className="row">
        <div className='two columns'>
          <label>Mode</label>
          <button type="button" onClick={this.handleModeChange.bind(this)}>{this.props.mode}</button>
        </div>
        <div className='two columns'>
          <label>Number as {this.props.mode}</label>
          <input type="text" value={this.props.input} onChange={this.handleInputChange.bind(this)}/>
        </div>
        <div className='two columns'>
          <label>Fract Bits</label>
          <input type="number" min="1" value={this.props.fractBits} onChange={this.handleBitsChange.bind(this, "fractBits")}/>
        </div>
        <div className='two columns'>
          <label>Whole Bits</label>
          <input type="number" min="0" value={this.props.wholeBits} onChange={this.handleBitsChange.bind(this, "wholeBits")}/>
        </div>
        <div className="one column">
          <label>.</label>
          <button type="submit" onClick={this.handleSave.bind(this)}>Save</button>
        </div>
      </div>
    </form>
  }
}

QInputForm.propTypes = {
  mode: React.PropTypes.oneOf(['hex', 'float']), 
  input: React.PropTypes.string,
  onChange: React.PropTypes.func,
  onSave: React.PropTypes.func,
  onError: React.PropTypes.func,
  fractBits: React.PropTypes.number,
  wholeBits: React.PropTypes.number
}

QInputForm.defaultProps = { 
  mode: 'hex',
  fractBits: 31,
  wholeBits: 0,
  input: '0',
  onChange: () => null,
  onSave: () => null,
}

module.exports = QInputForm;