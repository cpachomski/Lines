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
			showMouseCoords: false,
			iterations: 750,
			iterationInterval: 10,
			autoFunction: '',
			glitchModulus: 13,
			glitchPointDist: 5,
			colorFunction: null,
		}
	},

	componentDidMount () {
		window.addEventListener('keypress', (e) => {
			if (e.keyCode === 112) {
				this.toggleVisible();
			} else if (e.keyCode === 115) {
				this.printCanvas();
			} else if (e.keyCode === 114) {
				this.runAutoDraw();
			} else if (e.keyCode === 99) {
				this.clearCanvas();
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

	runAutoDraw () {
		this._canvas.autoRunner(this.state.autoFunction);
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
			});
		}
	},

	updateAutoFunction (e) {
		console.log('hit')
		if($(e.target).hasClass('active')){
			this.setState({
				autoFunction: null
			});
			$(e.target).removeClass('active');
		} else {
			if (e.target.value == 'pointConnect') {
				console.log('this one');
				this.setState({
					autoFunction: 'pointConnect'
				});
			} else if (e.target.value == 'glitchConnect') {
				console.log('glitch');
				this.setState({
					autoFunction: 'glitchConnect'
				});
			}
			$('.auto-function.active').removeClass('active');
			$(e.target).addClass('active');
		}

		
	},

	updateIterations (e) {
		if(parseInt(e.target.value) >= 0){
			this.setState({
				iterations: parseInt(e.target.value)
			});
		}
	},

	updateIterationInterval (e) {
		if(parseInt(e.target.value) >= 0){
			this.setState({
				iterationInterval: parseInt(e.target.value)
			});
		}
	},

	updateGlitchModulus (e) {
		if(parseInt(e.target.value) >= 0){
			this.setState({
				glitchModulus: parseInt(e.target.value)
			});
		}
	},

	updateBackgroundColor (color) {
		this.setState({
			backgroundColor:  '#' + color.hex
		})
	},

	printCanvas () {
		let canvasDataURL = this._canvas.canvas.toDataURL('image/png');
		let w = window.open('about:blank', 'image from canvas');
		w.document.write("<img src='" + d + "' alt='from canvas'/>");
		window.open(canvasDataURL);
	},

	handleColorFunctionUpdate (e) {

		if($(e.target).hasClass('active')){
			this.setState({
				colorFunction: null
			});
			$(e.target).removeClass('active');

		} else {
			if (e.target.value == 'randomColor') {
				this.setState({
					colorFunction: 'randomColor'
				});
			} else if (e.target.value == 'randomGrayscale') {
				this.setState({
					colorFunction: 'randomGrayscale'
				});
			}
			$('.color-function.active').removeClass('active');
			$(e.target).addClass('active');
		}
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
							<li>Iterations: {this.state.iterations}</li>
							<li>Interval: {this.state.iterationInterval}</li>
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
							<div className='iterations'>
								<label>Iterations: </label>
								<input
									type='number'
									value={this.state.iterations}
									onChange={this.updateIterations}
								/>
							</div>
							<div className='interval'>
								<label>Interval: </label>
								<input
									type='number'
									value={this.state.iterationInterval}
									onChange={this.updateIterationInterval}
								/>
							</div>
							<div className='glitch-modulus'>
								<label>Glitch Modulus: </label>
								<input
									type='number'
									value={this.state.glitchModulus}
									onChange={this.updateGlitchModulus}
								/>
							</div>
							<div className='buttons'>
								<button value='pointConnect' className='auto-function' onClick={this.updateAutoFunction}> Auto Click </button>
								<button value='glitchConnect' className='auto-function' onClick={this.updateAutoFunction}> Auto Glitch </button>
								<button className='random-color-toggle color-function' value='randomColor' onClick={this.handleColorFunctionUpdate}>Random Colors</button>
								<button className='random-grayscale-toggle color-function' value='randomGrayscale' onClick={this.handleColorFunctionUpdate}>Random Grayscale</button>
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