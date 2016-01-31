
var React = require('react');
var QUtil = require('./q-util');
var QHex = require('./QHex');

var floats = [0.9999,0.99999999, 0.5, 0.125, 0.123123123, 0.1, -0.9999, -0.99999999, -0.5, -0.125]

class Main extends React.Component {
  render () {
    return <div>
      <h1>Q Calculator</h1>
      {floats.map(float => <div>
          <span>{float} : </span>      
          <QHex q={QUtil.fromFloat(float, 32, 0)}/> 
        </div>
      )}
    </div>
  } 
}

module.exports = Main;