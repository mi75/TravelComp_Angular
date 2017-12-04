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
      if (mmenu.classList.contains("menu-fix") || pmenu.classList.contains("menu-fix")){
        mmenu.classList.remove("menu-fix");
        pmenu.classList.remove("menu-fix");
      }
    }
  });
}
window.onload = init();

$(function() {
      var pull    = $('#pull');
      var menu    = $('.main-menu ul');
      var menuHeight  = menu.height();

      $(pull).on('click', function(e) {
        e.preventDefault();
        menu.slideToggle();
      });

      $(window).resize(function(){
            var w = $(window).width();
            if(w > 500 && menu.is(':hidden')) {
              menu.removeAttr('style');
            }
        });
})


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

      var form = document.getElementById("contact-form");
      var elems = form.elements;

      resetError(elems.from);
      if (!validator.validate(elems.from.value, validator.rules.notEmpty)) {
          showError(elems.from, ' Укажите, от кого.');
      }
      else {
        if (!validator.validate(elems.from.value, validator.rules.clientName)) {
        resetError(elems.from);
        showError(elems.from, ' допустимы только буквы.');
        }
      }
      if (!validator.validate(elems.from.value, validator.rules.charsCount, 80)) {
          showError(elems.from, ' максимум 80 символов.');
      }


      resetError(elems.mail);
      if (!elems.mail.value) {
        showError(elems.mail, ' Укажите адрес.');
      }
      else {
        if (!validator.validate(elems.mail.value, validator.rules.email)){
          showError(elems.mail, ' некорректный адрес');
        }
      }

      resetError(elems.phone);
      if (!validator.validate(elems.phone.value, validator.rules.notEmpty)){
          showError(elems.phone, ' Укажите телефон.');
        }
      else {
        if (!validator.validate(elems.phone.value, validator.rules.phone)){
          showError(elems.phone, ' некорректный номер');
        }
      }

      resetError(elems.how);
      if (!elems.how.value) {
        showError(elems.how, ' Укажите источник.');
      }

      resetError(elems.message);
      if (!validator.validate(elems.message.value, validator.rules.notEmpty)) {
          showError(elems.message, ' Отсутствует текст.');
      }
      else {
        if (!validator.validate(elems.message.value, validator.rules.charsCount, 1000)) {
          showError(elems.message, ' максимум 1000 символов.');
        }
      }

      return false;
}
