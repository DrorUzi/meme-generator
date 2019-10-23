'use strict'


const IMG_ID = 'imgId'
let gNextId = 101;
let gImgs = createImgs();
let gMeme =  {
    selectedImgId: 5,
    txts: []
}


function addTxt(elTxt,color,size) {
    var txt = {
        line: elTxt,
        size:size,
        color:color
    }
    gMeme.txts.push(txt)
}

function updateMeme(imgId){
    gMeme.selectedImgId = imgId
}

function getImgs() {
    return gImgs
}


function createImgs() {
    return [
        createImg("/meme-imgs/003.jpg"),
        createImg("/meme-imgs/004.jpg"),
        createImg("/meme-imgs/005.jpg"),
        createImg("/meme-imgs/5.jpg"),
        createImg("/meme-imgs/putin.jpg"),
        createImg("/meme-imgs/006.jpg"),
        createImg("/meme-imgs/8.jpg"),
        createImg("/meme-imgs/12.jpg"),
        createImg("/meme-imgs/19.jpg"),
        createImg("/meme-imgs/img2.jpg"),
        createImg("/meme-imgs/2.jpg"),
        createImg("/meme-imgs/Ancient-Aliens.jpg"),
        createImg("/meme-imgs/drevil.jpg"),
        createImg("/meme-imgs/img4.jpg"),
        createImg("/meme-imgs/img5.jpg"),
        createImg("/meme-imgs/img6.jpg"),
        createImg("/meme-imgs/img11.jpg"),
        createImg("/meme-imgs/img12.jpg"),
        createImg("/meme-imgs/leo.jpg"),
        createImg("/meme-imgs/One-Does-Not-Simply.jpg"),
        createImg("/meme-imgs/Oprah-You-Get-A.jpg"),
        createImg("/meme-imgs/patrick.jpg"),
        createImg("/meme-imgs/X-Everywhere.jpg")

    ]

}


function createImg(src) {
    return {
        id: gNextId++,
        src,
    }
}


function findImgUrlById(id) {
    var currImg = gImgs.find((img) => {
        return img.id === id
       
    })
    return currImg.src
}

function saveImgIdToLocalStorage(imgId){
    saveToStorage(IMG_ID,imgId)
}

function loadImgIdFromStorage(){
    return loadFromStorage(IMG_ID)
}

