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
					<span>Press C to toggle the Control Panel.</span>
					<span>Press P to save your art.</span>
				</div>
			</div>
		)
	}
})