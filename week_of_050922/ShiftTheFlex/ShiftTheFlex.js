
var shiftButton = document.querySelector('#shiftButton');
var mainSection = document.querySelector('#mainSection');

function toggleFlex() {
    var siteDivs = document.getElementsByClassName("siteDiv");
    console.log(siteDivs);
    mainSection.classList.toggle('flex-wrap');
    mainSection.classList.toggle('d-flex');
    for(var i = 0; i < siteDivs.length; i++) {
        
        siteDivs[i].classList.toggle('col-12');
        siteDivs[i].classList.toggle('col-lg-3');
    }
};

shiftButton.addEventListener('click', toggleFlex);