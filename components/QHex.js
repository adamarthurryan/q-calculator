
var React = require('react');
var QUtil = require('./q-util');

class QHex extends React.Component {
  render () {
    return <code>{QUtil.toHexString(this.props.q)}</code>
  }
}

QHex.propTypes = { 
  q: React.PropTypes.array.isRequired,
  
}

module.exports = QHex;