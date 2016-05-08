import React from 'react';

let tooltips = {
  "lines": "This is the name for the app",
  "controls": "These are the controls you can use so you don't have to keep using the control panel",
  "line-width": "Controls the width of each line drawn",
  "iterations": "Number of times the auto generator function will draw a new node and the lines that connect to it",
  "interval": "How often a the auto generator places a new node on the canvas in milliseconds",
  "glitch-modulus": "Affects how often the Auto Glitch auto generator randomly jumps to a new area. The more likely a positive integer larger than this value is evenly divisible by it, the more often it will jump",
  'auto-generator': 'new nodes will be placed on the canvas automatically according to the values above',
  'glitch-generator': 'new nodes will be placed on the canvas automatically according to the values above, but this time with zazz',
   "random-colors": "every group of lines connected to the newest node will be a new color",
   "random-grayscale": "every group of lines connected to the newest node will be a new shade of gray"
}

export default React.createClass({

  getInitialState () {
    return {
      hovered: false
    }
  },

  handleMouseOut () {
    this.setState({hovered: false});
  },

  handleMouseOver () {
    this.setState({hovered: true});
  },

  render () {
    // console.log(this.props.tooltip);
    // console.log(this.state.open);
    const isVisible = this.state.hovered ? 'tooltip-content visible' : 'tooltip-content';
    console.log(isVisible);

    return (
      <div className='tooltip' key={this.props.tooltip}>
        <span className='indicator'
              onMouseOut={this.handleMouseOut}
              onMouseOver={this.handleMouseOver}>?</span>
        <div className={isVisible}>
          <div className='tooltip-text'>{tooltips[this.props.tooltip]}</div>
        </div>
      </div>
    )
  }
});