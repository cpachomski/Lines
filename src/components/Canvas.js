import React from 'react';


export default React.createClass({

	getInitialState () {
		return {
			backgroundColor: '#000000',
			lineColor: '#FFFFFF',
			lineWidth: 1,
			autoDraw: false,
			graphFunc: 'clickConnect'
		}
	},

	componentDidMount () {
		this.canvas = document.getElementById('canvas');
		this.context = canvas.getContext('2d');
		this.context.imageSmoothingEnabled = true;

		this.setCanvasSize();
		window.addEventListener('resize', this.setCanvasSize);
		this.applyStyles();
	},

	setCanvasSize () {
		this.canvas.width = innerWidth;
		this.canvas.height = window.innerHeight;
	},

	applyStyles () {
		this.canvas.style.background =  this.state.backgroundColor;
		this.canvas.lineWidth = this.state.lineWidth;
		this.canvas.strokeStyle = this.state.lineColor;
	},

	render () {
		return (
			<span></span>
		)
	}
})