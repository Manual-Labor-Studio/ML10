var wianScrollImages = document.querySelectorAll(".wian .image_stack_container_image");
var wianScrollCaptions = document.querySelectorAll(".wian .image_stack_container_caption");
var gwScrollImages = document.querySelectorAll(".greatwork .image_stack_container_image");
var gwScrollCaptions = document.querySelectorAll(".greatwork .image_stack_container_caption_content");
var underlines = document.querySelectorAll(".underline_path");
var expandingImages = document.querySelectorAll(".exp_img");
var gwVisibleImages = [0]
var wianVisibleImages = [0]
var wianPrevCaption = -1;
var wianCurrentCaption = 0
var gwPrevCaption = -1;
var gwCurrentCaption = 0
var alreadyEnlarged = []
var increase = 80;

window.addEventListener("scroll", function(){
    animateUnderline();
    animateExpandingImages();
    animateWianScrollImages();
    animateGWScrollCaptions();
});

function animateUnderline() {
    for(let x=0; x<underlines.length; x++) {
        if(!underlines[x].classList.contains("underline_path__active")){
            var underline = underlines[x].getBoundingClientRect();
            if(underline.top < window.innerHeight/2 && underline.bottom > 0) {
                underlines[x].classList.add("underline_path__active");
            }
        }
    }
}

function animateExpandingImages() {
    for(let x=0; x<expandingImages.length; x++) { 
        var expandingImg = expandingImages[x].getBoundingClientRect();
        if(expandingImg.top < window.innerHeight && expandingImg.bottom > 0 && increase<=100 && !alreadyEnlarged.includes(x)) {
                expandingImages[x].style["width"] = increase.toString() + "%";
                increase += 0.5;
        }
        if(increase > 100) {
            alreadyEnlarged.push(x);
            increase = 80;
        }
    }
}

function animateGWScrollCaptions() {
    for(let x=0; x< gwScrollCaptions.length; x++) {
        var caption = gwScrollCaptions[x].getBoundingClientRect();
        if(caption.bottom < window.innerHeight && !gwVisibleImages.includes(x)) {
            gwVisibleImages.push(x);
        }
        else if(caption.bottom >= window.innerHeight && gwVisibleImages.includes(x)) {
            gwVisibleImages.pop();
        }
    }
    if(gwCurrentCaption != gwVisibleImages[gwVisibleImages.length-1] && gwVisibleImages.length!=0) {
        gwPrevCaption = gwCurrentCaption;
        gwCurrentCaption = gwVisibleImages[gwVisibleImages.length-1];
        changeImageCaption(gwCurrentCaption, gwPrevCaption, gwScrollImages);
    }
}

function animateWianScrollImages() {
    for(let x=0; x<wianScrollImages.length; x++) {
        var image = wianScrollImages[x].getBoundingClientRect();
        if(image.bottom < window.innerHeight+50 && !wianVisibleImages.includes(x)) {
            wianVisibleImages.push(x);
            wianVisibleImages = wianVisibleImages.sort(function (a, b) {  return a - b;  });
        }
        else if(image.bottom >= window.innerHeight+50 && wianVisibleImages.includes(x)) {
            wianVisibleImages.pop();
        }
    }
    if(wianCurrentCaption != wianVisibleImages[wianVisibleImages.length-1] && wianVisibleImages.length!=0) {
        wianPrevCaption = wianCurrentCaption;
        wianCurrentCaption = wianVisibleImages[wianVisibleImages.length-1];
        changeImageCaption(wianCurrentCaption, wianPrevCaption, wianScrollCaptions);
    }
}

function changeImageCaption(idx,prev,change){
    change[idx].classList.remove("hide");
    change[prev].classList.add("hide");
}   

function changeDecadeText() {
    var decadeText = ["로사리오 염주", "Décennie", "Década", "十年", "Decade"];
    var replaceText = document.getElementById("decade");
    var textIdx = 0;
    replaceText.classList.add("decade_fadeIn");
    setInterval(function(){
        replaceText.classList.add("decade_fadeIn");
        replaceText.innerHTML = decadeText[textIdx];
        textIdx++;
        if(textIdx == decadeText.length) {
            textIdx = 0;
        }
        setTimeout(function(){
            replaceText.classList.remove("decade_fadeIn")
        }, 1600);
    },2000);
} 

window.onload = function() {
    changeDecadeText();
};
