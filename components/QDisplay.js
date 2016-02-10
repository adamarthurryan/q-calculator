
var React = require('react');
var QUtil = require('./q-util');

class QDisplay extends React.Component {
  render () {
    if (this.props.format == 'binary')
      return <code>{QUtil.toBinaryString(this.props.q)}</code>
    else if (this.props.format == 'hex')
      return <code>{QUtil.toHexString(this.props.q)}</code>
    else
      return null      
  }
}

QDisplay.propTypes = { 
  q: React.PropTypes.array.isRequired,
  format: React.PropTypes.oneOf(['binary', 'hex'])  
}

module.exports = QDisplay;