var React = require('react');

var LineSpace = React.createClass({
  render: function(){
    return (
      <div>
        <h1> this is here </h1>
        <div id='canvas'></div>
        <button onClick={this.startAutoCanvas}> start </button>
      </div>
    )
  },

  startAutoCanvas: function(){
    this.coordinatesArray = [];
    this.test = 5;
    this.lineCanvas = document.getElementById('canvas');
    // var lineContext = lineCanvas.getContext('2d');
    // lineContext.imageSmoothingEnabled = true;
    // var canvasLineWidth = 1;
    // var dotsCount, linesCount = 0;
    // var sectionColor;
    // var timesRun = 0;



  },

  // generateRandomPoint: function(min,max){
  //   return min + Math.floor(Math.random() *(max - min + 1));
  // },

  // drawPoint: function(e){
  //   var newPoint = getClickPosition(e);
  //   this.coordinatesArray
  // }

  test: function(){

    this.test + 1;
    console.log(this.test);
  }




});

module.exports = LineSpace;