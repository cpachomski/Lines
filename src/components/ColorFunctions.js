export default {

	randomColor () {
		let randomHex = '#' + (function co(lor){   return (lor +=
	    [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
	    && (lor.length == 6) ?  lor : co(lor); })('');

		return randomHex;
	}, 

	randomGrayscale () {
		let value = Math.random() * 0xFF | 0;
	    let grayscale = (value << 16) | (value << 8) | value;
	    let color = '#' + grayscale.toString(16);

	    return color;
	}

}