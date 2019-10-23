'use strict'

let gCtx, gCanvas;

function initEditor() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    resizeCanvas()
    loadImg()

}

function init(){
    // createMeme('sss', '20', 'red')
    createImgs()
    renderImgs()
}


function resizeCanvas() {
    var elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}


function drawText(txt, x, y) {
    gCtx.font = `80px Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif`
    gCtx.fillStyle = '#fff'
    gCtx.strokeStyle = 'black'
    gCtx.fillText(txt, x, y);
    gCtx.strokeText(txt, x, y);
}

function onAddTxt() {
    let elTxt = document.querySelector('.txt').value;
    drawText(elTxt, 100, 200)
    addTxt(elTxt)
}


function onAddImg(imgId) {
    saveImgIdToLocalStorage(imgId)
    location.href = "editor.html";

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



function renderImgs() {
    let imgs = getImgs()
    let elContainer = document.querySelector('.imgs-container');
    var strHtml=''
    imgs.forEach(img => {
        strHtml += `<img class="img trigger" src="${img.src}" alt="" onclick="onAddImg(${img.id})">`
    });
    elContainer.innerHTML = strHtml
}





// function toggleModal() {
//     var modal = document.querySelector(".modal");
//     var closeButton = document.querySelector(".close-button");
//     modal.classList.toggle("show-modal");
//     closeButton.addEventListener("click", toggleModal);
// }

function toggleMenu() {
    var mainMenu = document.getElementById('mainMenu');
    console.log(mainMenu);
    mainMenu.classList.toggle('open');
}