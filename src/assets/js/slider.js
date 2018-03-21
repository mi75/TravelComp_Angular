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