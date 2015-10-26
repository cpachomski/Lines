var React = require('react');
var LineSpace = React.createFactory(require('./views/LineSpace.jsx'));
var LearningReact = React.createFactory(require('./views/LearningReact.jsx'));

//render the goodies
if(typeof window !== 'undefined'){
  window.onload = function() {
    React.render(LearningReact(), document.getElementById('line-space'));
  }
}

