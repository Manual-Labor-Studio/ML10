var wianScrollImages = document.querySelectorAll(".wian .image_stack_container_image");
var wianScrollCaptions = document.querySelectorAll(".wian .image_stack_container_caption");
var wianVisibleImages = [0]
var wianPrevCaption = -1;
var wianCurrentCaption = 0
var gwScrollImages = document.querySelectorAll(".greatwork .image_stack_container_image");
var gwScrollCaptions = document.querySelectorAll(".greatwork .image_stack_container_caption");
var gwVisibleImages = [0]
var gwPrevCaption = -1;
var gwCurrentCaption = 0
var wianVariables = [wianScrollImages, wianScrollCaptions, wianVisibleImages, wianCurrentCaption, wianPrevCaption];
var gwVariables = [gwScrollImages, gwScrollCaptions, gwVisibleImages, gwCurrentCaption, gwPrevCaption];
var underlines = document.querySelectorAll(".underline_path");
var expandingImages = document.querySelectorAll(".exp_img");
var alreadyEnlarged = []
var increase = 80;

window.addEventListener("scroll", function(){
    animateUnderline();
    animateExpandingImages();
    animateStackImages(wianVariables);
    animateStackImages(gwVariables);
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

/*function animateGWScrollCaptions() {
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
}*/

function animateStackImages(sectionVariables) {
    for(let x=0; x< sectionVariables[0].length; x++) {
        var image = sectionVariables[0][x].getBoundingClientRect();
        if(image.bottom < window.innerHeight+50 && !sectionVariables[2].includes(x)) {
            sectionVariables[2].push(x);
            sectionVariables[2] = sectionVariables[2].sort(function (a, b) {  return a - b;  });
        }
        else if(image.bottom >= window.innerHeight+50 && sectionVariables[2].includes(x)) {
            sectionVariables[2].pop();
        }
    }
    if(sectionVariables[3] != sectionVariables[2][sectionVariables[2].length-1] && sectionVariables[2].length!=0) {
        sectionVariables[4] = sectionVariables[3];
        sectionVariables[3] = sectionVariables[2][sectionVariables[2].length-1];
        changeImageCaption(sectionVariables[3], sectionVariables[4], sectionVariables[1]);
    }
}

function changeImageCaption(idx,prev,change){
    change[idx].classList.remove("hide");
    change[prev].classList.add("hide");
}   

function changeDecadeText() {
    var decadeText = ["10년", "Décennie", "Década", "十年", "Decade"];
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
        }, 1800);
    },2000);
} 

var preloader = document.getElementById("preloader");
var firstLoad = true;

window.onload = function() {
    preloader.style.zIndex = "100000";
    if(!firstLoad) {
        preloader.style.backgroundImage = "url('assets/ML10Preloader.gif?v=" + new Date().valueOf() + "')";
    }
    else {
        firstLoad = false;
    }
    setTimeout(function(){
        preloader.style.zIndex = "-1";
        changeDecadeText();
    }, 6500);
};
