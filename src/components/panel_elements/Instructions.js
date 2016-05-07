import React from 'react';


const instructions = [
  'D: show/hide controls',
  'R: run auto generation',
  'E: end auto generation',
  'C: clear the canvas',
  'S: save the canvas',
]

export defeault React.createClass({

  getInitialState () {
    return {
      instructions: instructions
    }
  }

  render () {
    <ul ckassName='control-legend'>

    </ul>
  }
});