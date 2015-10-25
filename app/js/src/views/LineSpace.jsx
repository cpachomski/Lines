var React = require('react');

var LineSpace = React.createClass({
  render: function(){
    return (
      <div>
        <h1> this is here </h1>
        <button onClick={this.alertMeSomeGoodies}> click for the goodies </button>
      </div>
    )
  },

  alertMeSomeGoodies: function(){
    alert('GOODIES');
  }

});

module.exports = LineSpace;