var React = require('react');

class InputForm extends React.Component {

  handleChange(key, event) {
    let strValue = event.target.value
    let value = 0
    if (event.target.step == "any") 
      value = parseFloat(strValue)
    else
      value = parseInt(strValue)

    this.props.onChange(key, value)
  }

  handleSave(event) {
    this.props.onSave()
    event.preventDefault()
    event.stopPropagation()
  }

  render() {
    return <form >
      <div className="row">
        <div className='two columns'>
          <label>Number </label>
          <input type="number" step="any" defaultValue={this.props.defaultFloat} onChange={this.handleChange.bind(this, "float")}/>
        </div>
        <div className='two columns'>
          <label>Fract Bits </label>
          <input type="number" min="1" defaultValue={this.props.defaultFractBits} onChange={this.handleChange.bind(this, "fractBits")}/>
        </div>
        <div className='two columns'>
          <label>Whole Bits </label>
          <input type="number" min="0" defaultValue={this.props.defaultWholeBits} onChange={this.handleChange.bind(this, "wholeBits")}/>
        </div>
        <div className="one column">
          <label>=></label>
          <button onClick={this.handleSave.bind(this)}>Save</button>
        </div>
      </div>
    </form>
  }
}

InputForm.propTypes = { 
  defaultFloat: React.PropTypes.number,
  onChange: React.PropTypes.func,
  onSave: React.PropTypes.func,
  defaultFractBits: React.PropTypes.number,
  defaultWholeBits: React.PropTypes.number
}

InputForm.defaultProps = { 
  defaultFloat: 0,
  defaultFractBits: 31,
  defaultWholeBits: 0,
  onChange: () => null,
  onSave: () => null
}

module.exports = InputForm;