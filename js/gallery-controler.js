'use strict'

let gCtx, gCanvas;


function init(){
    loadGimgs()
    renderImgs()
    getWordsCount();
}



function onAddImg(imgId) {
    saveImgIdToLocalStorage(imgId)
    location.href = "editor.html";
}


function renderImgs() {
    let imgs = getImgs()
    let elContainer = document.querySelector('.imgs-container');
    var strHtml=''
    imgs.forEach(img => {
        strHtml += `<img class="img" src="${img.src}" alt="" onclick="onAddImg(${img.id})">`
    });
    elContainer.innerHTML = strHtml
}


function toggleMenu() {
    var mainMenu = document.getElementById('mainMenu');
    mainMenu.classList.toggle('open');
}

function initMemes(){
    var memes = loadMemesFromStorage()
    var elContainer = document.querySelector('.images')
    var strHtml = `<img src="${memes}">`;
    elContainer.innerHTML += strHtml 
}

