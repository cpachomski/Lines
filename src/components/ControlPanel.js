import React from 'react';
import $ from 'jquery';
import Canvas from './Canvas';
import ControlLegend from './panel_elements/ControlLegend';
import Tooltip from './panel_elements/Tooltip';
import Printer from './helpers/Printer';
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
			iterations: 10,
			iterationInterval: 100,
			autoFunction: '',
			glitchModulus: 13,
			glitchPointDist: 5,
			colorFunction: null,
		}
	},

	componentDidMount () {
		window.addEventListener('keypress', (e) => {
			if (e.keyCode === 100) {
				this.toggleVisible();
			} else if (e.keyCode === 115) {
				Printer.printCanvas(this._canvas, this.state);
			} else if (e.keyCode === 114) {
				this.runAutoDraw();
			} else if (e.keyCode === 99) {
				this.clearCanvas();
			} else if (e.keyCode === 101) {
				this.clearIntervals();
			}
		});

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
		if (window.runningFunc){
			return;
		}

		this._canvas.autoRunner(this.state.autoFunction);
	},

	clearIntervals () {
		clearInterval(window.runningFunc);
		window.runningFunc = false;
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
		if($(e.target).hasClass('active')){
			this.setState({
				autoFunction: null
			});
			$(e.target).removeClass('active');
		} else {
			if (e.target.value == 'pointConnect') {
				this.setState({
					autoFunction: 'pointConnect'
				});
			} else if (e.target.value == 'glitchConnect') {
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
					<div className='info'>
						<h1>Lines</h1>

						<ControlLegend />
					</div>

					<div className='controls'>
						<div className='col-1'>
							<h3>Line Controls</h3>
							<div className='line-width'>
								<label>Line Width(px):</label>
								<input
									type='number'
									value={this.state.lineWidth}
									onChange={this.updateLineWidth}
								/>
								<Tooltip tooltip='line-width' />
							</div>
							<div className='iterations'>
								<label>Iterations:</label>
								<input
									type='number'
									value={this.state.iterations}
									onChange={this.updateIterations}
								/>
								<Tooltip tooltip='iterations' />
							</div>
							<div className='interval'>
								<label>Interval:</label>
								<input
									type='number'
									value={this.state.iterationInterval}
									onChange={this.updateIterationInterval}
								/>
								<Tooltip tooltip='interval' />
							</div>
							<div className='glitch-modulus'>
								<label>Glitch Modulus:</label>
								<input
									type='number'
									value={this.state.glitchModulus}
									onChange={this.updateGlitchModulus}
								></input>
								<Tooltip tooltip='glitch-modulus' />
							</div>
							<div className='buttons'>
								<h3>Auto Generators</h3>
								<button value='pointConnect' className='auto-function' onClick={this.updateAutoFunction}> Auto Click </button>
								<button value='glitchConnect' className='auto-function' onClick={this.updateAutoFunction}> Auto Glitch </button>
							</div>
						</div>
						<div className='color-controls'>
							<h3>Color Controls </h3>
							<div className='color-pickers'>
								<div className='picker-label'>
									<label>Line</label>
									<i className="fa fa-arrows-v"></i>
								</div>
								<SwatchesPicker onChangeComplete={this.updateLineColor}/>
								<div className='picker-label'>
									<label>Bkg</label>
									<i className="fa fa-arrows-v"></i>
								</div>
								<SwatchesPicker onChangeComplete={this.updateBackgroundColor}/>
							</div>
							<button className='random-color-toggle color-function' value='randomColor' onClick={this.handleColorFunctionUpdate}>Random Colors</button>
							<button className='random-grayscale-toggle color-function' value='randomGrayscale' onClick={this.handleColorFunctionUpdate}>Random Grayscale</button>
						</div>
					</div>
			</div>
		)
	}
});