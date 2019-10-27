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
        align : 'left',
        txtSize: { size: 80, font : `Impact, Haettenschweiler, Arial Narrow Bold, sans-serif`},
        color: '#ffffff',
        strokeColor: '#000000',
        x,
        y
        
    }
    gMeme.txts.push(txt)
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
        createImg("meme-imgs/005.jpg",['animals', 'dog', 'baby', 'cute', 'sleep']),
        createImg("meme-imgs/5.jpg",['baby','cute','strong']),
        createImg("meme-imgs/putin.jpg",['putin', 'president', 'russia', 'angry']),
        createImg("meme-imgs/006.jpg",['animals', 'cat', 'cute', 'sleep']),
        createImg("meme-imgs/8.jpg",['smile', 'alice', 'happy']),
        createImg("meme-imgs/12.jpg",['television','actor','hands']),
        createImg("meme-imgs/19.jpg",['actor','television','hands']),
        createImg("meme-imgs/img2.jpg",['baby','dance','dance']),
        createImg("meme-imgs/2.jpg",['dance','nature','woman']),
        createImg("meme-imgs/Ancient-Aliens.jpg",['television','actor','hands','smile']),
        createImg("meme-imgs/drevil.jpg",['austinpower','moovie','hands','actor']),
        createImg("meme-imgs/img4.jpg",['president','tramp','angry','hands']),
        createImg("meme-imgs/img5.jpg",['baby','cute','smile','funny']),
        createImg("meme-imgs/img6.jpg",['dog','cute','funny','animals']),
        createImg("meme-imgs/img11.jpg",['president','obama','smile']),
        createImg("meme-imgs/img12.jpg",['basketball','friends','cute']),
        createImg("meme-imgs/leo.jpg",['moovie','actor','coctail','smile']),
        createImg("meme-imgs/One-Does-Not-Simply.jpg",['moovie','actor','smile','hands']),
        createImg("meme-imgs/Oprah-You-Get-A.jpg",['television','opra','hands','smile','woman']),
        createImg("meme-imgs/patrick.jpg",['moovie','actor','funny','smile']),
        createImg("meme-imgs/X-Everywhere.jpg",['moovie','funny','animation']),

    ]

}



function createImg(src, keywords) {
    return  {
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


/***keywords***/


function getWordsCount() {
    gImgs.forEach(img => {
        img.keywords.forEach(word => {
            if (gWordsCounts.hasOwnProperty(word)) {
                gWordsCounts[word]++;
            } else {
                gWordsCounts[word] = 1;
            }
            
        })
    })

}


