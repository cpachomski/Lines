import React from 'react';
import SetIntervalMixin from './SetIntervalMixin';

export default React.createClass({

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

	autoRunner (runFunc) {
		let iterations = 0;

		if (runFunc == 'pointConnect') {

			let runningFunc = setInterval(() => {
				this.autoPointConnect();
				iterations += 1;

				if (iterations >= this.props.iterations){
					clearInterval(runningFunc);
				}

			}, this.props.iterationInterval);

		} else if(runFunc == "glitchConnect") {
			let runningFunc = setInterval(() => {
				this.autoGlitchConnect();
				iterations +=1;

				if (iterations >= this.props.iterations){
					clearInterval(runningFunc);
				}

			}, this.props.iterationInterval);
		} else {
			return;
		}
	},

	autoPointConnect () {
		let randX = this.getRandomPoint(0, this.canvas.width);
		let randY = this.getRandomPoint(0, this.canvas.height);

		this.coords.push([randX, randY]);

		if (this.coords.length > 1) {
			this.coords.forEach((coord) => {
				this.drawLine(coord, [randX, randY])
			});
		}

		
	},

	autoGlitchConnect () {
		//start at center of canvas
		if (this.coords.length < 1) {
			let firstPoint = [this.canvas.width/2, this.canvas.height/2];
			this.coords.push(firstPoint);
		} else {
			let newX = this.coords[this.coords.length - 1][0] + this.getRandomPoint(this.props.glitchPointDist, (-1 * this.props.glitchPointDist));
			let newY = this.coords[this.coords.length - 1][1] + this.getRandomPoint(this.props.glitchPointDist, (-1 * this.props.glitchPointDist));

			if (newX % this.props.glitchModulus === 0 || newY & this.props.glitchModulus === 0 ) {
				newX = this.getRandomPoint(0, this.canvas.width);
        		newY = this.getRandomPoint(0, this.canvas.height);
			}
			let newCoord = [newX, newY];
			console.log(newCoord);
			this.coords.push(newCoord);

			this.coords.forEach((coord) => {
				this.drawLine(coord, newCoord);
			});

		}
	},

	getRandomPoint (min, max) {
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