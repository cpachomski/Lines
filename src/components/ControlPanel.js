import React from 'react';
import Canvas from './Canvas';
import {SwatchesPicker} from 'react-color';

import styles from '../styles/control-panel.scss';


export default React.createClass({

	getInitialState () {
		return {
			visible: false,
			backgroundColor: '#000000',
			lineColor: '#444',
			lineWidth: 1,
			lineWidthInt: true,
			autoDraw: false,
			showMouseCoords: false,
			graphFunc: 'clickConnect',
		}
	},

	componentDidMount () {
		window.addEventListener('keypress', (e) => {
			if (e.keyCode === 99) {
				this.toggleVisible();
			}
		})
	},

	autoGenerate () {
		let randX = this.getRandomPoint(0, this.canvas.width);
		let randY = this.getRandomPoint(0, this.canvas.height);

		this.coords.push([randX, randY]);

		if (this.coords.length > 1 ) {
			this.coords.forEach((coord) => {

			});
		}
	},

	getRandomPoint () {
		return min + Math.floor(Math.random() * (max - min + 1));
	},

	toggleVisible () {
		let showState;
		if (this.state.visible === false) {
			showState = true;
		} else {
			showState = false;
		}
		this.setState({
			visible: showState
		})
	},

	toggleMouseCoords () {
		let show;

		if (this.state.showMouseCoords === false) {
			show = true;
		} else {
			show = false;
		}
		this.setState({
			showMouseCoords: show
		})
	},

	toggleAutoDraw (e) {
		if (e.target.checked) {
			this.setState({
				autoDraw: false
			})
		} else {
			this.setState({
				autoDraw: true
			})
		}

		console.log(this.state)
	},

	updateLineColor (color) {
		this.setState({
			lineColor: '#' + color.hex
		})
	},

	updateLineWidth (e) {
		let lineWidth = e.target.value;
		if(parseInt(e.target.value) >= 0){
			this.setState({
				lineWidth: parseInt(lineWidth),
				lineWidthInt: true
			});
		}
	},

	updateBackgroundColor (color) {
		this.setState({
			backgroundColor:  '#' + color.hex
		})
	},

	clearCanvas () {
		this._canvas.context.clearRect(0, 0, canvas.width, canvas.height)
		this._canvas.coords = [];
	},

	render () {
		return (
			<div className={this.state.visible ? 'ctrlpanel' : 'ctrlpanel hidden'}>
				<div className='wrapper'>
					<Canvas 
						backgroundColor={this.state.backgroundColor}
						lineColor={this.state.lineColor}
						lineWidth={this.state.lineWidth}
						autoDraw={this.state.autoDraw}
						graphFunc={this.state.autoDraw}
						ref={(c) => this._canvas = c}
					/>
					<h1>Lines</h1>
					<div className='current-settings'>
						<ul> 
							<li>Background Color: {this.state.backgroundColor}</li>
							<li>Line Color: {this.state.lineColor}</li>
							<li>Line Width: {this.state.lineWidth}px</li>
							<li>Auto Draw: {this.state.autoDraw  ? 'OFF' : 'ON'}</li>
							<li>Graphing Function: {this.state.graphFunc}</li>
							<li onClick={this.toggleMouseCoords}>Show Mouse Coordinates <i className={this.state.showMouseCoords ? 'fa fa-check' : 'fa fa-times'}></i></li>
						</ul>
					</div>
					<div className='controls'>
						<div className='col-1'>
							<div className='line-width'>
								<label>Line Width (px) : </label>
								<input
									type='number'
									value={this.state.lineWidth}
									onChange={this.updateLineWidth}
								/>
							</div>
							<div className='auto-draw'>
								<label>Auto Draw</label>
								<input
									type='checkbox'
									onChange={this.toggleAutoDraw}
								/>	
							</div>
							<button onClick={this.clearCanvas}>Clear Canvas</button>
						</div>
						<div className='color-pickers'>
							<SwatchesPicker onChangeComplete={this.updateLineColor}/>
							 <SwatchesPicker onChangeComplete={this.updateBackgroundColor}/>
						</div>
					</div>
				</div>
			</div>
		)
	}
});