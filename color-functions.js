
function randomColor(){
  var randomHex = '#' + (function co(lor){   return (lor +=
    [0,1,2,3,4,5,6,7,8,9,'a','b','c','d','e','f'][Math.floor(Math.random()*16)])
    && (lor.length == 6) ?  lor : co(lor); })('');
  return randomHex;
};

function randomGrayscale(){
  var value = Math.random() * 0xFF | 0;
  var grayscale = (value << 16) | (value << 8) | value;
  var color = '#' + grayscale.toString(16);
  return color;
}


