import React from 'react';
import styles from '../styles/modal.scss';


export default React.createClass({
	render () {
		return (
			<div className='modal'>
				<h3>Lines</h3>
				<div className='content text'>
					<span>Press C to toggle the Control Panel.</span>
					<span>Press P to save your art.</span>
				</div>
			</div>
		)
	}
})