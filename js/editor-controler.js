'use strict'

let gFontSize;

function initEditor() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas()
    loadImg()

}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function decreaseFont(){
    gFontSize 
}

function increaseFont(){

}

function onAddTxtUp(){
    let elTxt = document.querySelector('.top-txt').value;
    drawText(elTxt, 50, 100)
    // addTxt(elTxt)
}
function onAddTxtDown(){
    let elTxt = document.querySelector('.bottom-txt').value;
    drawText(elTxt, 50, 500)
    // addTxt(elTxt)
}

function loadImg(){
    var currImgId = loadImgIdFromStorage()
    let currImgUrl = findImgUrlById(currImgId);
    var img = new Image();
    img.src = currImgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
    }
    updateMeme(currImgId)
}


function drawText(txt, x, y) {
    gCtx.font = `80px Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`
    gCtx.fillStyle = '#fff'
    gCtx.strokeStyle = 'black'
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
    addTxt(txt)
}
