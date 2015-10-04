


	// Global Vars

	var coordinatesArray = [];
	var lineCanvas = document.getElementById("line-canvas");
	var dotCanvas = document.getElementById("dot-canvas");
	var lineContext = lineCanvas.getContext('2d');
	var dotContext = dotCanvas.getContext('2d');
	dotContext.imageSmoothingEnabled = true;
	lineContext.imageSmoothingEnabled = true;
	lineContext.shadowBlur = 10;
	lineContext.shadowColor='rgb(0,0,0)';
	var circleRadius = 10;
	var canvasLineWidth = 1;
	var dotsCount, linesCount = 0;
	var sectionColor;


	init();

	var timesRun = 0;


	var autoRunner = setInterval(function(){
		autoGenerator();
		timesRun+=1;

		if (timesRun == 1000){
			clearInterval(autoRunner);
		}

	}, 10);
init();

    function init(){
        lineCanvas.addEventListener("mousedown", addPoint, false);
     }



    function getRandomPoint(min, max) {
	    return min + Math.floor(Math.random() * (max - min + 1));
	}





  function getClickPosition(event){
		var x = event.x;
		var y = event.y;
		x -= lineCanvas.offsetLeft;
		y -= lineCanvas.offsetTop;
		return [ x , y ]
	}



	function drawLine(origin, dest){
		lineContext.beginPath();
		lineContext.moveTo(origin[0], origin[1]);
		lineContext.lineTo(dest[0], dest[1]);
		lineContext.lineWidth = canvasLineWidth;
		lineContext.strokeStyle = sectionColor;
		lineContext.stroke();
	}

	function followDraw(origin){
		lineContext.beginPath();
		lineContext.moveTo(origin[0], origin[1]);
		lineContext.lineTo(origin[0] + getRandomPoint(-4,4), origin[1] + getRandomPoint(-5,5));
		lineContext.lineWidth = canvasLineWidth;
		lineContext.strokeStyle = sectionColor;
		lineContext.stroke();
	}

	function setCanvasSize() {
		var pageHeight = window.innerHeight;
		var pageWidth = window.innerWidth;
		lineCanvas.width = pageWidth;
		lineCanvas.height = pageHeight;
		dotCanvas.width = pageWidth;
		dotCanvas.height = pageHeight;
	}






/* Runner */

setInterval(setCanvasSize(), 50);



/* Auto Generator Code */

var timesRun = 0;


function addPoint(event){
		var newPoint = getClickPosition(event);
		coordinatesArray.push(newPoint);
		dotContext.beginPath();
		dotContext.arc(newPoint[0],  newPoint[1], circleRadius, 0, 2*Math.PI,false)
		dotContext.fillStyle =  'white';
		dotContext.fill();

		if (coordinatesArray.length > 1) {
			var newCoordinate = coordinatesArray[coordinatesArray.length-1];
			sectionColor = '#555555';
			for (var i = 0; i < coordinatesArray.length ; i++) {
				var currentCoordinate = coordinatesArray[i];

				drawLine(currentCoordinate, newCoordinate);

			}
		}
	}




 function autoGenerator(){
   		var randomX = getRandomPoint(0, lineCanvas.width);
   		var randomY = getRandomPoint(0, lineCanvas.height);
     	var newPoint = [randomX, randomY];
     	console.log(newPoint)
		coordinatesArray.push(newPoint);
		console.log(coordinatesArray)
		dotContext.beginPath();
		dotContext.arc(newPoint[0],  newPoint[1], circleRadius, 0, 2*Math.PI,false)
		dotContext.fillStyle =  'white';
		dotContext.fill();


		if (coordinatesArray.length > 1) {
			var newCoordinate = coordinatesArray[coordinatesArray.length-1];
				sectionColor = 'white';
			for (var i = 0; i < coordinatesArray.length ; i++) {
				var currentCoordinate = coordinatesArray[i];
				/* varie hue */

				drawLine(currentCoordinate, newCoordinate);
			}
		}
  }


  function snakeGenerator(){


		if (coordinatesArray.length < 1){
			var randomX = lineCanvas.width/2;
			var randomY = lineCanvas.height/2;
     		var firstPoint = [randomX, randomY];
     		coordinatesArray.push(firstPoint);
     		dotContext.beginPath();

     		dotContext.arc(firstPoint[0],  firstPoint[1], circleRadius, 0, 2*Math.PI,false)
			dotContext.fillStyle =  'white';
			dotContext.fill();
		}


		else  {
			var newX = coordinatesArray[coordinatesArray.length-1][0] + getRandomPoint(-5,5);
			var newY = coordinatesArray[coordinatesArray.length-1][1] + getRandomPoint(-5,5);
			if(newX % 205 === 0 || newY % 205 === 0){
				newX = getRandomPoint(0, lineCanvas.width);
				newY = getRandomPoint(0, lineCanvas.height);
			}
			var newCoordinate = [newX, newY] ;
			console.log(newCoordinate);
			coordinatesArray.push(newCoordinate);

			sectionColor = randomColor();
			for (var i = 0; i < coordinatesArray.length ; i++) {
				var currentCoordinate = coordinatesArray[i];

				drawLine(currentCoordinate, newCoordinate);

			}
		}

 }
