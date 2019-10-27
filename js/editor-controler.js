'use strict'

let gImgWidth,gImgHeight;

$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function initEditor() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    // resizeCanvas();
    loadImg();
    addTxt(50,100);
    addTxt(50,300);
}


function resizeCanvas() {
    let elContainer = document.querySelector('.canvas-container');
    gCanvas.width = elContainer.offsetWidth
    gCanvas.height = elContainer.offsetHeight
}


function onNextTxt() {
    let meme = getMemes();
    let txtsCount = meme.txts.length;
    meme.txtIdx++;
    if (meme.txtIdx > txtsCount - 1) meme.txtIdx = 0;
    let elTxt = document.querySelector('.top-txt');
    elTxt.value = meme.txts[meme.txtIdx].line;
}

function onChangeLine() {
    let elTxt = document.querySelector('.top-txt').value;
    changeLine(elTxt);
    reDrawCanvas()
}
function onChangeLocation(id) {
    var meme = getMemes()
    switch (id) {
        case 'right':
            meme.txts[meme.txtIdx].x += 20;
            if (meme.txts[meme.txtIdx].x > gCanvas.width - 200) return
            reDrawCanvas();
            break;
        case 'left':
            if (meme.txts[meme.txtIdx].x < 10) return
            meme.txts[meme.txtIdx].x -= 20;
            reDrawCanvas();
            break;
        case 'down':

            if (meme.txts[meme.txtIdx].y > gCanvas.height - 100) return
            meme.txts[meme.txtIdx].y += 20;
            reDrawCanvas();
            break;
        case 'up':
            if (meme.txts[meme.txtIdx].y <  100) return
            meme.txts[meme.txtIdx].y -= 20;
            reDrawCanvas();

            break;
        default:
    }

}

function loadImg() {
    var currImgId = loadImgIdFromStorage()
    let currImgUrl = findImgUrlById(currImgId);
    var img = new Image();
    img.src = currImgUrl;
    img.onload = () => {
        let imgHeight = img.height;
        let imgWidth = img.width;
        let ratio = imgHeight / imgWidth;
        let finalHeight;
        let finalWidth;
        if(ratio < 1){
            finalWidth = 500;
            finalHeight = finalWidth * ratio;
        } else {
            ratio = imgWidth / imgHeight;
            finalHeight = 500;
            finalWidth = finalHeight * ratio
        }
        
        gCanvas.width = finalWidth;
        gCanvas.height = finalHeight;
    
        gImgWidth = finalWidth;
        gImgHeight = finalHeight;
        gCtx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, finalWidth, finalHeight);
        drawTexts()
    }
    updateMeme(currImgId)
}

function onAddText() {
    let elTxt = document.querySelector('.top-txt');
    let meme = getMemes();
    let txtY = meme.txts[meme.txtIdx].y + 100
    if (txtY > gCanvas.height) {
        txtY = meme.txts[meme.txtIdx].y - 100
    }
    addTxt(50, txtY);
    meme.txtIdx = meme.txts.length - 1
    elTxt.value = ''
}

function onDecreaseFont() {
    let meme = getMemes();
    changeSize(meme.txts[meme.txtIdx].txtSize.size - 10)
    reDrawCanvas();
}

function onIncreaseFont() {
    let meme = getMemes();
    changeSize(meme.txts[meme.txtIdx].txtSize.size + 10)
    reDrawCanvas();
}

function drawTexts() {
    var memes = getMemes();
    memes.txts.forEach(txt => {
        gCtx.lineWidth = 3;
        gCtx.font = `${txt.txtSize.size}px ${txt.txtSize.font}`
        gCtx.fillStyle = txt.color
        gCtx.strokeStyle = txt.strokeColor
        gCtx.fillText(txt.line, txt.x, txt.y, gCanvas.width - 100);
        gCtx.strokeText(txt.line, txt.x, txt.y, gCanvas.width - 100);
    })
}
function markLine(){
    let currTxtSize = getCurrTxt();
    if (currTxtSize) {
        let currHeight = currTxtSize.height;
        let currSize = currTxtSize.size;
        gCtx.strokeStyle = 'rgba(255, 255, 255, 0.3)';
        gCtx.strokeRect(0, currHeight - currSize / 2 + 10, gImgWidth, currSize + 10);
    }
}

function onTextDirection(id) {
    var meme = getMemes();
    switch (id) {
        case 'left':
            meme.txts[meme.txtIdx].x = 10;

            gCtx.textAlign = "left";
            reDrawCanvas();
            break;
        case 'right':
            meme.txts[meme.txtIdx].x = gImgWidth -100;
            gCtx.textAlign = "right";
            reDrawCanvas();

            break;
        case 'center':
            meme.txts[meme.txtIdx].x = gImgWidth /2;
            gCtx.textAlign = "center";
            reDrawCanvas();

            break;
        default:

    }
}


function reDrawCanvas() {
    loadImg()
}

function onChangeColor() {
    let elColor = document.querySelector('.color').value
    changeColor(elColor)
    reDrawCanvas();
}

function onChangeStroke() {
    let elColor = document.querySelector('.stroke').value
    changeStroke(elColor)
    reDrawCanvas();
}

function onDeleteText() {
    let meme = getMemes();
    meme.txts.splice(meme.txtIdx, 1)
    onNextTxt();
    reDrawCanvas();

}
function onChangeFont() {
    let elFont = document.querySelector('.form-control').value
    changeFont(elFont)
    reDrawCanvas();
}



function onSaveMeme() {
    var data = gCanvas.toDataURL()
    saveMemeToLocalStorage(data)
}

function onDownloadMeme(elLink) {
   var data = gCanvas.toDataURL()
    elLink.href = data
    elLink.download = 'my-canvas.jpg'
}




function onShareMeme(elForm, ev) {
    ev.preventDefault();
    document.getElementById('imgData').value = gCanvas.toDataURL("image/jpeg");


    function onSuccess(uploadedImgUrl) {
        uploadedImgUrl = encodeURIComponent(uploadedImgUrl)
        document.querySelector('.share-container').innerHTML = `
        <a class="btn" href="https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}" title="Share on Facebook" target="_blank" onclick="window.open('https://www.facebook.com/sharer/sharer.php?u=${uploadedImgUrl}&t=${uploadedImgUrl}'); return false;">
          Click again to share 
        </a>`
    }

    doUploadMeme(elForm, onSuccess);
}

function doUploadMeme(elForm, onSuccess) {
    var formData = new FormData(elForm);

    fetch('http://ca-upload.com/here/upload.php', {
        method: 'POST',
        body: formData
    })
        .then(function (response) {
            return response.text()
        })

        .then(onSuccess)
        .catch(function (error) {
            console.error(error)
        })
}





(function (d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) return;
    js = d.createElement(s); js.id = id;
    js.src = 'https://connect.facebook.net/he_IL/sdk.js#xfbml=1&version=v3.0&appId=807866106076694&autoLogAppEvents=1';
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
