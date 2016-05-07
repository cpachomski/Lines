import React from 'react';


let instructions = [
  'Controls',
  'D: show/hide controls',
  'R: run auto generation',
  'E: end auto generation',
  'C: clear the canvas',
  'S: save the canvas',
]

export default React.createClass({

  getInitialState () {
    return {
      instructions: instructions
    }
  },

  render () {
    return (
      <ul className='control-legend'>
        { this.state.instructions.map( (instruction) => {
          return (
            <li key={instruction}>{instruction}</li>
          )
        })
      }
      </ul>
    )
  }
});