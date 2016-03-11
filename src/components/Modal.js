import React from 'react';
import styles from '../styles/modal.scss';


export default React.createClass({

	getInitialState () {
		return {
			visible: true
		}
	},

	componentDidMount () {
		let modalToggle = document.getElementById('modal-toggle');
		modalToggle.addEventListener('click', this.toggleVisible)
		window.addEventListener('keypress', (e) => {
			if (e.keyCode === 100) {
				this.setState({
					visible: false
				})
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
		});
	},


	render () {
		return (
			<div className={this.state.visible ? 'modal' : 'modal hidden'}>
				<h3>Lines</h3>
				<i className="fa fa-times-circle" id='modal-toggle'></i>
				<div className='content text'>
					<span>Click the background to make Lines</span>
					<p> </p>
					<span>Press D to toggle the control panel</span>
			
				</div>
			</div>
		)
	}
})