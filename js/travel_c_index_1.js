function init() {
    window.addEventListener('scroll', function(e) {
        var mmenu;
        var pmenu;
        var distanceY = window.pageYOffset || document.documentElement.scrollTop,
            headHeight = document.getElementById('header').offsetHeight,
            mmenu = document.getElementById("main-menu");
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
    var menu = $('.main-menu ul');
    var menuHeight = menu.height();

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

function showError(elem, errorMessage) {
    elem.parentNode.className = 'f-row error';
    var msgElem = document.createElement('span');
    msgElem.className = "error-message";
    msgElem.innerHTML = errorMessage;
    elem.parentNode.appendChild(msgElem);
}

function resetError(elem) {
    elem.parentNode.className = 'f-row';
    if (elem.parentNode.lastChild.className == "error-message") {
        elem.parentNode.removeChild(elem.parentNode.lastChild);
    }
}

function toValidate() {

    var er = null;
    var form = document.getElementById("feedback-form");
    var elems = form.elements;

    resetError(elems.from);
    if (!validator.validate(elems.from.value, validator.rules.notEmpty)) {
        showError(elems.from, ' Укажите, от кого.');
        er = 1;
    } else {
        if (!validator.validate(elems.from.value, validator.rules.clientName)) {
            resetError(elems.from);
            showError(elems.from, ' допустимы только буквы.');
            er = 1;
        }
    }
    if (!validator.validate(elems.from.value, validator.rules.charsCount, 80)) {
        showError(elems.from, ' максимум 80 символов.');
        er = 1;
    }

    resetError(elems.message);
    if (!validator.validate(elems.message.value, validator.rules.notEmpty)) {
        showError(elems.message, ' Отсутствует текст.');
        er = 1;
    } else {
        if (!validator.validate(elems.message.value, validator.rules.charsCount, 1000)) {
            showError(elems.message, ' максимум 1000 символов.');
            er = 1;
        }
    }
    if (!er) sendFeedback();
}

function sendFeedback() {
    // var formData = new FormData(document.forms.feedback);
    var formData = new FormData($('#feedback-form')[0]);

    var uploadAddress = document.forms.feedback.action;

    sendPostWithFile(uploadAddress, formData, function() {
        $('#upload-file-info').text('');
        document.forms.feedback.reset();
        $('#myModal').modal('hide');
        alert('Data was sent');
        startRow = 0;
        getFeedbackBlocks();
    }, function(errorMessage) { alert(errorMessage) }); //from apiCaller.js
}

var dataAddress = 'api/feedback';
var usersPhotosFolder = 'upload/';
var startRow = 0;
var rowsCounter = 0;
var filesAddress;

function getFeedbackBlocks() {
    filesAddress = dataAddress + '?startRow=' + startRow;
    sendGet(filesAddress, function(userData) {
        insertToFeedbackBlock(userData);
    }, function(errorMessage) { alert(errorMessage) });
}

$(window).ready(getFeedbackBlocks());

$('#forward').on('click', function(e) {
    e.preventDefault();
    startRow += 3;
    if (startRow > rowsCounter - 3) startRow = rowsCounter - 3;
    getFeedbackBlocks();
});

$('#reverse').on('click', function(e) {
    e.preventDefault();
    startRow -= 3;
    if (startRow < 0) startRow = 0;
    getFeedbackBlocks();
});

function insertToFeedbackBlock(dataContent) {
    var complexArray = JSON.parse(dataContent);
    var names = $('.card-title');
    var photos = $('.card-customer');
    var messages = $('.messages');
    var dates = $('.text-muted');
    var noPhotoImage = 'img/default_customer.jpg';

    var options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timezone: 'UTC'
    };

    var rowsArray = complexArray.rows; // масив записей базы
    rowsCounter = complexArray.count; // значение запроса числа записей в базе

    $(rowsArray).each(function(i, item) {
        var d = new Date(item['date']);
        $(names[i]).text(item['name']);
        if (item['photo']) {
            $(photos[i]).prop('src', usersPhotosFolder + item['photo']);
        } else {
            $(photos[i]).prop('src', noPhotoImage);
        };
        $(messages[i]).text(item['message']);
        $(dates[i]).text('добавлено: ' + d.toLocaleString("ru", options));
    });

}