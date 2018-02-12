$(window).ready(function() {
    var header = $("#header");
    var fixedMenuClass = 'menu-fix';
    var mainMenu = $("#main-menu");
    var pullMenu = $("#pull");

    $(window).scroll(function() {
        if ($(window).scrollTop() > $(header).outerHeight()) {
            $(mainMenu).addClass(fixedMenuClass);
            $(pullMenu).addClass(fixedMenuClass);
        } else {
            if ($(mainMenu).hasClass(fixedMenuClass) || $(pullMenu).hasClass(fixedMenuClass)) {
                $(mainMenu).removeClass(fixedMenuClass);
                $(pullMenu).removeClass(fixedMenuClass);
            }
        }
    });
});

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

function showError(elem, errorMessage) {
    var errField = $(elem).parent().addClass("f-row error");
    var msgElem = $('<span></span>').addClass("error-message").text(errorMessage);
    $(errField).append(msgElem);
}

function resetError(elem) {
    var errField = $(elem).parent().removeClass("error");
    $(errField).children().filter('.error-message').remove();
}

function toValidate() {

    var er = null;
    var form = document.getElementById("contact-form");
    var elems = form.elements;

    resetError(elems.from);
    if (!validator.validate(elems.from.value, validator.rules.notEmpty)) {
        showError(elems.from, ' Укажите, от кого.');
        er = 1;
    } else {
        if (!validator.validate(elems.from.value, validator.rules.clientName)) {
            showError(elems.from, ' допустимы только буквы.');
            er = 1;
        }
    }
    if (!validator.validate(elems.from.value, validator.rules.charsCount, 80)) {
        showError(elems.from, ' максимум 80 символов.');
        er = 1;
    }

    resetError(elems.mail);
    if (!elems.mail.value) {
        showError(elems.mail, ' Укажите адрес.');
        er = 1;
    } else {
        if (!validator.validate(elems.mail.value, validator.rules.email)) {
            showError(elems.mail, ' некорректный адрес');
            er = 1;
        }
    }

    resetError(elems.phone);
    if (!validator.validate(elems.phone.value, validator.rules.notEmpty)) {
        showError(elems.phone, ' Укажите телефон.');
        er = 1;
    } else {
        if (!validator.validate(elems.phone.value, validator.rules.phone)) {
            showError(elems.phone, ' некорректный номер');
            er = 1;
        }
    }

    resetError(elems.how);
    if (!elems.how.value) {
        showError(elems.how, ' Укажите источник.');
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
    if (!er) sendMySuggestion();
}

function sendMySuggestion() {
    var formData = new FormData(document.forms.mySuggestion);
    var uploadAddress = document.forms.mySuggestion.action;

    sendPost(uploadAddress, formData, function() { document.forms.mySuggestion.reset(); }, function(errorMessage) { alert(errorMessage) }); //from apiCaller.js

}