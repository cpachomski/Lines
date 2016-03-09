import React from 'react';
import $ from 'jquery';	
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
			showMouseCoords: false,
			iterations: 100,
			iterationInterval: 1000,
			glitchModulus: 13,
			glitchPointDist: 5,
			colorFunction: null,
		}
	},

	componentDidMount () {
		window.addEventListener('keypress', (e) => {
			if (e.keyCode === 99) {
				this.toggleVisible();
			}
		})
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

	runAutoDraw (e) {
		this._canvas.autoRunner(e.target.value);
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


	handleColorFunctionUpdate (e) {

		if($(e.target).hasClass('active')){
			this.setState({
				colorFunction: null
			}, ()=>{console.log(this.state)});
		} else {
			if (e.target.value == 'randomColor') {
				this.setState({
					colorFunction: 'randomColor'
				}, ()=>{console.log(this.state)});
			} else if (e.target.value == 'randomGrayscale') {
				this.setState({
					colorFunction: 'randomGrayscale'
				}, ()=>{console.log(this.state)})
			}
		}
		$('button.active').removeClass('active');

		$(e.target).toggleClass('active');
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
						ref={(c) => this._canvas = c}
						backgroundColor={this.state.backgroundColor}
						lineColor={this.state.lineColor}
						lineWidth={this.state.lineWidth}
						autoFunc={this.state.autoFunc}
						iterations={this.state.iterations}
						iterationInterval={this.state.iterationInterval}
						glitchModulus={this.state.glitchModulus}
						glitchPointDist={this.state.glitchPointDist}
						colorFunction={this.state.colorFunction}
					/>
					<h1>Lines</h1>
					<div className='current-settings'>
						<ul> 
							<li>Background Color: {this.state.backgroundColor}</li>
							<li>Line Color: {this.state.lineColor}</li>
							<li>Line Width: {this.state.lineWidth}px</li>
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
							<div className='buttons'>
								<label>Auto Draw</label>
								<button value='pointConnect' onClick={this.runAutoDraw}> Auto Click </button>
								<button value='glitchConnect' onClick={this.runAutoDraw}> Auto Glitch </button>
								<button className='random-color-toggle' value='randomColor' onClick={this.handleColorFunctionUpdate}>Random Colors</button>
								<button className='random-grayscale-toggle ' value='randomGrayscale' onClick={this.handleColorFunctionUpdate}>Random Grayscale</button>
								<button onClick={this.clearCanvas}>Clear Canvas</button>

							</div>
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