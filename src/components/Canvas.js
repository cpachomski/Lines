import React from 'react';
import SetIntervalMixin from './SetIntervalMixin';

export default React.createClass({
	mixins: [SetIntervalMixin],

	componentDidMount () {
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');
		this.context.imageSmoothingEnabled = true;
		this.coords = [];

		this.setCanvasSize();
		this.applyStyles();
		
		window.addEventListener('resize', this.setCanvasSize);
		this.canvas.addEventListener('mousedown', this.addPoint);
	},

	autoRunner (drawingFunction) {
		let iterations = 0;
		if (drawingFunction == 'pointConnect') {
			let useFunction = this.autoPointConnect;
		} else if(drawingFunction =="glitch")
		this.setInterval()
	},

	autoPointConnect () {
		let randX = this.getRandomPoint(0, this.canvas.width);
		let randY = this.getRandomPoint(0, this.canvas.height);

		this.coords.push([randX, randY]);

		if (this.coords.length > 1 ) {
			this.coords.forEach((coord) => {

			});
		}
	},

	autoGlitch () {

	},

	getRandomPoint () {
		return min + Math.floor(Math.random() * (max - min + 1));
	},

	setCanvasSize () {
		this.canvas.width = window.innerWidth;
		this.canvas.height = window.innerHeight;
	},

	applyStyles () {
		this.canvas.style.background =  this.props.backgroundColor;
		this.context.lineWidth = this.props.lineWidth;
		this.context.strokeStyle = this.props.lineColor;
	},

	getClickPosition (e) {
		return [e.x, e.y]; 
	},

	addPoint (e) {
		let newPoint = this.getClickPosition(e);
		this.coords.push(newPoint);


		this.applyStyles();

		if ( this.coords.length > 1 ) {
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

	componentDidUpdate () {
		this.canvas = document.getElementById('canvas');
		this.context = this.canvas.getContext('2d');

		this.context.strokeStyle = this.props.lineColor;
		this.context.lineWidth = this.props.lineWidth;
		this.canvas.style.backgroundColor = this.props.backgroundColor;
	},

	render () {
		return (
			<span></span>
		)
	}
});	