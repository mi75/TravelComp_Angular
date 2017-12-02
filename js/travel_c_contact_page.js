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

function countChairs(inpVal) {
  var content = inpVal;
  var contentwithoutspaces = content.replace(/\s+/g, '');
  var ilength = contentwithoutspaces.length;
  return(ilength);
}


function toValidate(form) {
      var elems = form.elements;

      resetError(elems.from);
      var name = elems.from.value.replace(/\s+/g, '');
      if (!name) {
        showError(elems.from, ' Укажите, от кого.');
      }
      if (elems.from.value.match(/[0-9!?,.;:@\\#$\/)(%^&*]/g)) {
        showError(elems.from, ' допустимы только буквы.');
      }
      if (elems.from.value.length > 80) {
        showError(elems.from, ' максимум 80 символов.');
      }

      resetError(elems.mail);
      if (!elems.mail.value) {
        showError(elems.mail, ' Укажите адрес.');
      }
      else {
          var adr = elems.mail.value.match(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
          if (!adr) {
            showError(elems.mail, ' некорректный адрес');
          }
      }
      resetError(elems.phone);
      if (!elems.phone.value) {
        showError(elems.phone, ' Укажите телефон.');
      }
      else {
        if (!validator.validate(elems.phone.value, validator.rules.phone)){
          showError(elems.phone, ' некорректный номер');
        }
        // var simb = elems.phone.value.replace(/[0-9)( +-]/g, '');
        // var d = elems.phone.value.match(/[0-9]/g);
        // if (simb || (d.length!==12 && d.length!==10) || (d[0]!=='0' && String(d.slice(0,3)) !== '3,8,0')) {
        //   showError(elems.phone, ' некорректный номер');
        // }
      }

      resetError(elems.how);
      if (!elems.how.value) {
        showError(elems.how, ' Укажите, откуда.');
      }

      resetError(elems.message);
      var content = elems.message.value.replace(/\s+/g, '');
      if (!content) {
        showError(elems.message, ' Отсутствует текст.');
      }
      else {
        var il = countChairs(elems.message.value);
        if (il > 1000) {
          showError(elems.message, ' максимум 1000 знаков.');
        }
      }
}
