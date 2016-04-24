import React from 'react'
import {connect} from 'react-redux'

import QUtil from '../q-util'
import * as Actions from '../actions'
import * as Selectors from '../selectors'

//map the input props to this component's props
//also mix in the currently calculated q-value
const mapStateToProps = state => 
  Object.assign(
    {current: Selectors.getCurrentQ(state)},
    state.input
  )

const mapDispatchToProps = dispatch => ({
  onUpdateInput: input => dispatch(Actions.updateInput(input)),
  onAddHistoryItem: item => dispatch(Actions.addHistoryItem(item))
})

class QInputForm extends React.Component {


  handleBitsChange(key, event) {
    let strValue = event.target.value
    let value = parseInt(strValue)

    this.props.onUpdateInput({[key]: value});

  }

  handleInputChange(event) {
    this.props.onUpdateInput({input: event.target.value})
  }


  //save should be moved out of this component
  handleSave(event) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onAddHistoryItem(this.props.current)
  }

  //mode should be moved out of this component?
  handleModeChange(event) {
    event.preventDefault()
    event.stopPropagation()

    if (this.props.mode == 'float')
      this.props.onUpdateInput({mode: 'hex'})
    if (this.props.mode == 'hex')
      this.props.onUpdateInput({mode: 'float'})
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
          <label className="u-invisible">.</label>
          <button type="submit" onClick={this.handleSave.bind(this)}>Save</button>
        </div>
      </div>
    </form>
  }
}

QInputForm.propTypes = {
  mode: React.PropTypes.oneOf(['hex', 'float']), 
  input: React.PropTypes.string,
  fractBits: React.PropTypes.number,
  wholeBits: React.PropTypes.number
}

QInputForm.defaultProps = { 
  mode: 'hex',
  fractBits: 31,
  wholeBits: 0,
  input: '0',
}

export default connect(mapStateToProps, mapDispatchToProps)(QInputForm)