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

	applyStyles () {
		this.canvas.style.background =  this.state.backgroundColor;
		this.canvas.lineWidth = this.state.lineWidth;
		this.canvas.strokeStyle = this.state.lineColor;
	},

	setCanvasSize () {
		console.log('resize')
		this.canvas.width = innerWidth;
		this.canvas.height = window.innerHeight;
	},

	render () {
		return (
			<span></span>
		)
	}
})