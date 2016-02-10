
var React = require('react');
var QUtil = require('./q-util');

class QBinary extends React.Component {
  render () {
    return <code>{QUtil.toBinaryString(this.props.q)}</code>
  }
}

QBinary.propTypes = { 
  q: React.PropTypes.array.isRequired,
  
}

module.exports = QBinary;