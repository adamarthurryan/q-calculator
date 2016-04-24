
import React from 'react'
import {connect} from 'react-redux'

import * as Actions from '../actions'

import QDisplay from './QDisplay'
import QInputForm from './QInputForm'

import * as Selectors from '../selectors'
import * as QUtil from '../q-util'

const mapStateToProps = (state) => ({
  input: state.input, 
  history: state.history, 
  current: Selectors.getCurrentQ(state)
})

const mapDispatchToProps = dispatch => ({
  onRemoveHistoryItem: index => dispatch(Actions.removeHistoryItem(index))
})

class Main extends React.Component {
  
  constructor() {
    super()

  }

//this gets moved into the child component?
  handleChange(key, value) {
    let inputChange={key,value}
    updateInput(inputChange)
  }


  handleRemove(index) {
    event.preventDefault()
    event.stopPropagation()
    this.props.onRemoveHistoryItem(index)
  }

//this should be in a child component?

  render () { 
    return <div className="container">
      <h1>Q Calculator</h1>
      <QInputForm />

      <table>
        <thead>
          <tr><th>format</th><th>as hex</th><th>as binary</th><th>rounded float</th></tr>
        </thead>
        <tbody>
          { this.props.current.error ? 
            this.renderErrorRow(this.props.current.error):
            this.renderQRow(this.props.current)
          }
          {this.props.history.map(this.renderQRow.bind(this))}
        </tbody>
      </table>

    </div> 
  } 

  renderQRow (obj, i=-1) {
    let {q, fractBits, wholeBits} = obj 
    return <tr key={i}>
      <td>{`Q${wholeBits}.${fractBits}`}</td>
      <td><QDisplay q={q} format="hex"/></td>
      <td><QDisplay q={q} format="binary"/></td>
      <td>{QUtil.toFloat(q, fractBits, wholeBits)}</td>
      <td>{(i>=0) ? (<button type="submit" onClick={this.handleRemove.bind(this, i)}>Delete</button>) : null }</td>

    </tr>
  }

  renderErrorRow (error) {
    return <tr>
      <td span={4} style={{color:'red'}}>{error.toString()}</td>
    </tr>
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)