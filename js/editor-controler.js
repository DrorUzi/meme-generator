'use strict'

let gStartX;
let gStartY;
let gTimerTimeout;
let gIsMouseDown = false;

function onImgInput(ev) {
    loadImageFromInput(ev, renderNewImg)
}



$(function () {
    $('[data-toggle="tooltip"]').tooltip()
})

function initEditor() {
    gCanvas = document.querySelector('#my-canvas');
    gCtx = gCanvas.getContext('2d');
    loadGimgs()
    reDrawCanvas();
    addTxt(50, 100);
    addTxt(50, 300);
}



function onNextTxt() {
    let meme = getMemes();
    let txtsCount = meme.txts.length;
    meme.txtIdx++;
    if (meme.txtIdx > txtsCount - 1) meme.txtIdx = 0;
    let elTxt = document.querySelector('.top-txt');
    elTxt.value = meme.txts[meme.txtIdx].line;
}


function onChangeLocation(id) {
    var meme = getMemes()
    var x = meme.txts[meme.txtIdx].x
    var y = meme.txts[meme.txtIdx].y
    switch (id) {
        case 'right':
            if (x > gCanvas.width - 200) return
            updateLine('x',x += 20)
            break;
        case 'left':
            if (x < 10) return
            updateLine('x',x-= 20)
            break;
        case 'down':
            if (y > gCanvas.height - 100) return
            updateLine('y',y+= 20)
            break;
        case 'up':
            if (y < 100) return
            updateLine('y',y-= 20)
            break;
        default:
    }

}

function renderNewImg(src){
    var img = createImg(src.src,['funny'])
    console.log(img)
    updateGimgs(img)
    saveImgIdToLocalStorage(img.id)
    reDrawCanvas()  
}


function reDrawCanvas() {
    var currImgId = loadImgIdFromStorage()
    let currImgUrl = findImgUrlById(currImgId);
    var img = new Image();
    img.onload = () => {
        let imgHeight = img.height;
        let imgWidth = img.width;
        let ratio = imgHeight / imgWidth;
        let finalHeight;
        let finalWidth;
        if (ratio < 1) {
            finalWidth = 500;
            finalHeight = finalWidth * ratio;
        } else {
            ratio = imgWidth / imgHeight;
            finalHeight = 500;
            finalWidth = finalHeight * ratio
        }

        gCanvas.width = finalWidth;
        gCanvas.height = finalHeight;

        gCtx.drawImage(img, 0, 0, imgWidth, imgHeight, 0, 0, finalWidth, finalHeight);
        drawTexts()
    }
    img.src = currImgUrl;
    updateMemeId(currImgId)
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
    updateLine('size',meme.txts[meme.txtIdx].size -= 10)
    reDrawCanvas()
}

function onIncreaseFont() {
    let meme = getMemes();
    updateLine('size',meme.txts[meme.txtIdx].size += 10)
    reDrawCanvas();
}

function drawTexts() {
    var memes = getMemes();
    memes.txts.forEach(txt => {
        gCtx.lineWidth = 3;
        gCtx.textAlign = txt.align;
        gCtx.font = `${txt.size}px ${txt.font}`
        gCtx.fillStyle = txt.color
        gCtx.strokeStyle = txt.strokeColor
        gCtx.fillText(txt.line, txt.x, txt.y, gCanvas.width - 100);
        gCtx.strokeText(txt.line, txt.x, txt.y, gCanvas.width - 100);
        txt.width = gCtx.measureText(txt.line).width;

    })
}


function onTextDirection(id) {
    var meme = getMemes();
    switch (id) {
        case 'left':
            meme.txts[meme.txtIdx].x = 10;
            gCtx.textAlign = "left";
            meme.txts[meme.txtIdx].align = 'left'
            reDrawCanvas();
            break;
        case 'right':
            meme.txts[meme.txtIdx].x = gCanvas.width - 100;
            gCtx.textAlign = "right";
            meme.txts[meme.txtIdx].align = 'right'

            reDrawCanvas();

            break;
        case 'center':
            meme.txts[meme.txtIdx].x = gCanvas.width / 2;
            gCtx.textAlign = "center";
            meme.txts[meme.txtIdx].align = 'center'

            reDrawCanvas();

            break;
        default:

    }
}


function changeProp(newVal, newKey){
    updateLine(newKey,newVal)
    reDrawCanvas();
}


function onDeleteText() {
    let meme = getMemes();
    meme.txts.splice(meme.txtIdx, 1)
    onNextTxt();
    reDrawCanvas();
}

function onSaveMeme() {
    var meme = getMemes()
    saveMemeToLocalStorage(meme)
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

    fetch('//ca-upload.com/here/upload.php', {
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


function drawRect(startX, startY, endX, endY) {
    gCtx.beginPath()
    gCtx.setLineDash([8]);
    gCtx.rect(startX, startY, endX, endY)
    gCtx.lineWidth = 2
    gCtx.strokeStyle = 'white'
    gCtx.stroke()
    gCtx.closePath()
}


function markTxt(txt) {
    let startX
    let startY
    let endX = (txt.width) + 15
    let endY = (txt.size) + 5
    if (txt.align === 'left') {
        startX = txt.x - 5;
        startY = txt.y - txt.size + 5;
    }
    else if (txt.align === 'center') {
        startX = txt.x - (txt.width / 2) - 5;
        startY = txt.y -txt.size + 5;
    }
    else {
        startX = txt.x - (txt.width) - 5;
        startY = txt.y - (txt.size) + 5;
    }
    drawRect(startX, startY, endX, endY)

}


function textHitTest(x, y, txtIdx) {
    var meme = getMemes()
    var txt = meme.txts[txtIdx]
    let startX;
    let startY = txt.y -txt.size
    let endX;
    let endY = txt.y
    if (txt.align === 'left') {
        startX = txt.x
        endX = txt.x + txt.width
    }
    else if (txt.align === 'center') {
        startX = txt.x - (txt.width / 2)
        endX = txt.x + (txt.width / 2)
    }
    else {
        startX = txt.x - txt.width
        endX = txt.x
    }
    return (x >= startX && x <= endX && y >= startY && y <= endY);
}

function handleMouseEv(ev) {
    ev.preventDefault();
    var meme = getMemes()
    var offsetX = gCanvas.offsetLeft;
    var offsetY = gCanvas.offsetTop + 66
    var elCanvas = document.getElementById('my-canvas')

    if (ev.type === 'mousedown' || ev.type === 'touchstart') {
        if (ev.type === 'mousedown') {
            gStartX = parseInt(ev.clientX - offsetX);
            gStartY = parseInt(ev.clientY - offsetY);
        }
        else if (ev.type === 'touchstart') {
            gStartX = parseInt(ev.changedTouches[0].pageX - offsetX)
            gStartY = parseInt(ev.changedTouches[0].pageY - offsetY)
        }

        for (var i = 0; i < meme.txts.length; i++) {
            if (textHitTest(gStartX, gStartY, i)) {
                meme.txtIdx = i;
                markTxt(meme.txts[meme.txtIdx])
                gIsMouseDown = true
                elCanvas.classList.add("grab")
                break;
            }
            else gIsMouseDown = false

        }
    }
    if (ev.type === 'mouseup' || ev.type === 'touchend' || ev.type === 'mouseleave') {
        elCanvas.classList.remove("grab")
        gIsMouseDown = false
    }

    if (ev.type === 'mousemove') {
        if (!gIsMouseDown) return
        var txt = meme.txts[meme.txtIdx];
        var mouseX = parseInt(ev.clientX - offsetX);
        var mouseY = parseInt(ev.clientY - offsetY);
        var dragX = mouseX - gStartX;
        var dragY = mouseY - gStartY;
        gStartX = mouseX;
        gStartY = mouseY;
        txt.x += dragX;
        txt.y += dragY;
        reDrawCanvas()
    }
}

function dragWithTouch(ev) {
    if (!gIsMouseDown) return
    var rect = ev.target.getBoundingClientRect();
    var bodyRect = document.body.getBoundingClientRect();
    var x = ev.changedTouches[0].pageX - (rect.left - bodyRect.left);
    var y = ev.changedTouches[0].pageY - (rect.top - bodyRect.top);
    var touchX = parseInt(x);
    var touchY = parseInt(y);
    var dragX = touchX - gStartX;
    var dragY = touchY - gStartY;
    var meme = getMemes()
    var txt = meme.txts[meme.txtIdx];
    gStartX = touchX;
    gStartY = touchY;
    txt.x += dragX;
    txt.y += dragY;
    reDrawCanvas()
}
