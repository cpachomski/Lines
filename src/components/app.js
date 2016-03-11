import React from 'react';
import Modal from './Modal';
import ControlPanel from './ControlPanel';


export default React.createClass({
	render () {
		return (
			<div id='app' className='app'>
				<ControlPanel />
				<Modal />
			</div>
		)
	}
})