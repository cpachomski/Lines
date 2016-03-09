
let coords = [];
let canvas = document.getElementById('canvas');
let context = canvas.getContext('2d');
context.imageSmoothignEnabled = true;
context.shadowBlur = 10;
context.shadowColor='rgb(0,0,0)';
let lineWidth = 1;
let pointsCount = 0;
let linesCount = 0;
let sectionColor = '#FFFFFF';
let timesRun = 0;



let setCanvasSize = function() {
    var pageHeight = window.innerHeight;
    var pageWidth = window.innerWidth;
    canvas.width = pageWidth;
    canvas.height = pageHeight;
}

export function init() {
	setCanvasSize();
	canvas.addEventListener('mousedown', addPoint, false);
}

let getClickPosition = function(e) {
	let x = e.x;
	let y = e.y;
	return [ x, y ];

}

let drawLine = function(origin, dest) {
	context.beginPath();
	context.moveTo(origin[0], origin[1]);
	context.lineTo(dest[0], dest[1]);
	context.lineWidth = lineWidth;
	context.strokeStyle = sectionColor;
	context.stroke();
}


let addPoint = function(e) {
	let newPoint = getClickPosition(e);
	coords.push(newPoint);

	if (coords.length > 1) {
		let newCoord = coords[coords.length - 1];

		coords.forEach((coord) => {
			drawLine(coord, newPoint);
		});
	}
}



init();

export default {
	run () {
	}
}