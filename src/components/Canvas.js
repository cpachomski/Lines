import React from 'react';

export default React.createClass({

	getInitialState () {
		return {
			backgroundColor: '#FFFFFF',
			lineColor: 'red',
			lineWidth: 1,
			autoDraw: false,
			graphFunc: 'clickConnect'
		}
	},

	componentDidMount () {
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		this.context.imageSmoothingEnabled = true;
		this.coords = [];

		this.setCanvasSize();
		this.applyStyles();
		
		window.addEventListener('resize', this.setCanvasSize);
		window.addEventListener('mousedown', this.addPoint);
	},

	setCanvasSize () {
		this.canvas.width = innerWidth;
		this.canvas.height = window.innerHeight;
	},

	applyStyles () {
		this.canvas.style.background =  this.state.backgroundColor;
		this.context.lineWidth = this.state.lineWidth;
		this.context.strokeStyle = this.state.lineColor;
	},

	getClickPosition (e) {
		return [e.x, e.y]; 
	},

	addPoint (e) {
		let newPoint = this.getClickPosition(e);
		this.coords.push(newPoint);

		if ( this.coords.length > 1 ) {
			console.log('line drawn')
			this.coords.forEach((coord) => {
				this.drawLine(coord, newPoint);
			})
		}
	},


	drawLine (o, d) {
		this.context.beginPath();
		this.context.moveTo(o[0], o[1]);
		this.context.lineTo(d[0], d[1]);
		this.applyStyles();
		this.context.stroke();
	},

	render () {
		return (
			<span></span>
		)
	}
});	