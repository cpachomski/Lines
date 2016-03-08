import React from 'react';


export default React.createClass({
	getInitialState () {
		return {
			backgroundColor: '#000000',
			lineColor: '#FFFFFF',
			autoDraw: false,
			graphFunc: 'clickConnect'
		}
	},

	render () {
		return (
			<span></span>
		)
	}
})