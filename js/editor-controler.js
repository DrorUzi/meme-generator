'use strict'

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function initEditor() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas();
    loadImg();

    addTxt('', 50, 100);
    addTxt('', 50, 500);
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}

function decreaseFont() {
}

function increaseFont() {

}
function onNextTxt() {
    let meme = getMemes();
    let txtsCount = meme.txts.length;
    meme.txtIdx++;
    if (meme.txtIdx > txtsCount - 1) meme.txtIdx = 0;

    let elTxt = document.querySelector('.top-txt');
    elTxt.value = meme.txts[meme.txtIdx].line;
}

function onChangeTxt() {
    let elTxt = document.querySelector('.top-txt').value;
    // document.querySelector('.top-txt').value = ''
    let meme = getMemes();
    let currTxt = meme.txts[meme.txtIdx];
    changeTxt(elTxt, currTxt.x, currTxt.y)
    reDrawCanvas()
}
// function onChangeTxtDown() {
//     let elTxt = document.querySelector('.bottom-txt').value;
//     // document.querySelector('.bottom-txt').value = ''
//     changeTxt(elTxt, 50, 500)
//     reDrawCanvas()
// }

function loadImg() {
    var currImgId = loadImgIdFromStorage()
    let currImgUrl = findImgUrlById(currImgId);
    var img = new Image();
    img.src = currImgUrl;
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, gCanvas.width, gCanvas.height)
        drawTexts()
    }
    updateMeme(currImgId)
}



function drawTexts() {
    var memes = getMemes();
    memes.txts.forEach(txt => {
        gCtx.font = `80px Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`
        gCtx.fillStyle = '#fff'
        gCtx.strokeStyle = 'black'
        gCtx.fillText(txt.line, txt.x, txt.y);
        gCtx.strokeText(txt.line, txt.x, txt.y);
    })
}

function reDrawCanvas() {
    loadImg()
}

