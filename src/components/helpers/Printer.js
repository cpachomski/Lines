module.exports = {
  printCanvas (canvasToPrint, state) {
    let w = canvasToPrint.canvas.width;
    let h = canvasToPrint.canvas.height;
    let data = canvasToPrint.context.getImageData(0,0,w,h);
    let compositeOperation = canvasToPrint.context.globalCompositeOperation;

    canvasToPrint.context.globalCompositeOperation = "destination-over";
    canvasToPrint.context.fillStyle = state.backgroundColor;
    canvasToPrint.context.fillRect(0,0,w,h);

    let canvasDataURL = canvasToPrint.canvas.toDataURL('image/png');

    canvasToPrint.context.clearRect(0,0,w,h);
    canvasToPrint.context.putImageData(data, 0,0);
    canvasToPrint.context.globalCompositeOperation = compositeOperation;

    let win=window.open();
    win.document.write("<br><img src='"+canvasDataURL+"'/>");
  },


}