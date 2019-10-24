'use strict'

const MEMES = 'memes'
const IMG_ID = 'imgId'
let gNextId = 101;
let gImgs = createImgs();
let gMeme = {
    selectedImgId: 5,
    txtIdx: 0,
    txts: []
}
let gWordsCounts = {};



function addTxt(x, y) {
    var txt = {
        line: '',
        txtSize: { size: 80, font : `Impact, Haettenschweiler, Arial Narrow Bold, sans-serif`},
        color: '#ffffff',
        strokeColor: '#000000',
        x,
        y
        
    }
    gMeme.txts.push(txt)
}

function changeTxt(elTxt,size,font, color, strokeColor, x, y,boxSize) {
    var txt = {
        line: elTxt,
        txtSize:{size,font},
        color,
        strokeColor,
        x,
        y,
        boxSize
    }
   
    gMeme.txts[gMeme.txtIdx] = txt;
}

function changeLine(line) {
    let txt = gMeme.txts[gMeme.txtIdx];
    changeTxt(line,txt.txtSize.size,txt.txtSize.font, txt.color, txt.strokeColor, txt.x, txt.y,txt.boxSize);
}

function changeColor(color) {
    let txt = gMeme.txts[gMeme.txtIdx];
    changeTxt(txt.line, txt.txtSize.size,txt.txtSize.font, color, txt.strokeColor, txt.x, txt.y,txt.boxSize);
}
function changeStroke(stroke) {
    let txt = gMeme.txts[gMeme.txtIdx];
    changeTxt(txt.line,txt.txtSize.size,txt.txtSize.font, txt.color, stroke, txt.x, txt.y,txt.boxSize);
}

function changeSize(size) {
    let txt = gMeme.txts[gMeme.txtIdx];
    changeTxt(txt.line, size,txt.txtSize.font, txt.color, txt.strokeColor, txt.x, txt.y,txt.boxSize);
}

function changeFont(font){
    let txt = gMeme.txts[gMeme.txtIdx];
    changeTxt(txt.line, txt.txtSize.size,font, txt.color, txt.strokeColor, txt.x, txt.y,txt.boxSize);
}

function updateMeme(imgId) {
    gMeme.selectedImgId = imgId
}

function getImgs() {
    return gImgs
}


function createImgs() {
    return [
        createImg("meme-imgs/003.jpg", ['usa', 'president', 'tramp', 'angry']),
        createImg("meme-imgs/004.jpg",['puppys', 'dog', 'cute', 'happy', 'animals']),
        createImg("meme-imgs/005.jpg",['animals', 'god', 'baby', 'cute', 'sleep']),
        createImg("meme-imgs/5.jpg",['baby', 'cute', 'strong']),
        createImg("meme-imgs/putin.jpg",['putin', 'president', 'russia', 'angry']),
        createImg("meme-imgs/006.jpg",['animals', 'cat', 'cute', 'sleep']),
        createImg("meme-imgs/8.jpg",['smile', 'alice', 'happy']),
        createImg("meme-imgs/12.jpg"),
        createImg("meme-imgs/19.jpg"),
        createImg("meme-imgs/img2.jpg"),
        createImg("meme-imgs/2.jpg"),
        createImg("meme-imgs/Ancient-Aliens.jpg"),
        createImg("meme-imgs/drevil.jpg"),
        createImg("meme-imgs/img4.jpg"),
        createImg("meme-imgs/img5.jpg"),
        createImg("meme-imgs/img6.jpg"),
        createImg("meme-imgs/img11.jpg"),
        createImg("meme-imgs/img12.jpg"),
        createImg("meme-imgs/leo.jpg"),
        createImg("meme-imgs/One-Does-Not-Simply.jpg"),
        createImg("meme-imgs/Oprah-You-Get-A.jpg"),
        createImg("meme-imgs/patrick.jpg"),
        createImg("meme-imgs/X-Everywhere.jpg")

    ]

}

function getWordsCount() {
    gImgs.forEach(img => {
        img.keywords.forEach(word => {
    console.log(gWordsCounts)

            
            if (gWordsCounts.hasOwnProperty(word)) {
                gWordsCounts[word]++;
            } else {
                gWordsCounts[word] = 1;
            }

        })
    })

}


function createImg(src, keywords) {
    return {
        id: gNextId++,
        src,
        keywords
    }
}


function findImgUrlById(id) {
    var currImg = gImgs.find((img) => {
        return img.id === id

    })
    return currImg.src
}

function saveImgIdToLocalStorage(imgId) {
    saveToStorage(IMG_ID, imgId)
}

function loadImgIdFromStorage() {
    return loadFromStorage(IMG_ID)
}

function getMemes() {
    return gMeme
}

function saveMemeToLocalStorage(data) {
    saveToStorage(MEMES, data)
}

function loadMemesFromStorage() {
    return loadFromStorage(MEMES)
}