var React = require('react');
var LineSpace = React.createFactory(require('./views/LineSpace.jsx'));


//render the goodies
if(typeof window !== 'undefined'){
  window.onload = function() {
    React.render(LineSpace(), document.getElementById('line-space'));
  }
}

