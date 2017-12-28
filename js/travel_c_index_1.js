function init() {
    window.addEventListener('scroll', function(e) {
        var mmenu;
        var pmenu;
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            headHeight = document.getElementById('hh').offsetHeight,
            mmenu = document.getElementById("mm");
        pmenu = document.getElementById("pull");
        if (distanceY > headHeight) {
            mmenu.classList.add("menu-fix");
            pmenu.classList.add("menu-fix");
        } else {
            if (mmenu.classList.contains("menu-fix") || pmenu.classList.contains("menu-fix")) {
                mmenu.classList.remove("menu-fix");
                pmenu.classList.remove("menu-fix");
            }
        }
    });
}
window.onload = init();

$(function() {
    var pull = $('#pull');
    menu = $('.main-menu ul');
    menuHeight = menu.height();

    $(pull).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
    });

    $(window).resize(function() {
        var w = $(window).width();
        if (w > 500 && menu.is(':hidden')) {
            menu.removeAttr('style');
        }
    });
})

var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var knobs = initSlideNav();
var slideInterval = setInterval(nextSlide, 4000);

function nextSlide() {
    goToSlide(currentSlide + 1);
}

function previousSlide() {
    goToSlide(currentSlide - 1);
}

function goToSlide(n) {
    slides[currentSlide].className = 'slide';
    knobs[currentSlide].className = 'sl-b';
    currentSlide = (n + slides.length) % slides.length;
    knobs[currentSlide].className = 'sl-b clicked';
    slides[currentSlide].className = 'slide showing';
}

function initSlideNav() {
    var parentB = document.getElementById('sl-k');
    for (i = 0; i < slides.length; i++) {
        var b = document.createElement('button');
        b.innerHTML = '&nbsp';
        if (i === 0) {
            b.className = 'sl-b clicked';
        } else {
            b.className = 'sl-b';
        }
        parentB.appendChild(b);
    }
    var knobs = document.getElementsByClassName('sl-b');
    for (i = 0; i < knobs.length; i++) {
        knobs[i].onclick = function() {
            for (k = 0; k < knobs.length; k++) {
                if (knobs[k] == this) {
                    clearInterval(slideInterval);
                    slideInterval = setInterval(nextSlide, 4000);
                    goToSlide(k);
                }
            }
        }
    }
    return knobs; // возвращаем коллекцию кнопок для прокрутки setInterval-ом
}