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
        menu    = $('.main-menu ul');
        menuHeight  = menu.height();

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


function showError(container, errorMessage) {
      container.className = 'f-row error';
      var msgElem = document.createElement('span');
      msgElem.className = "error-message";
      msgElem.innerHTML = errorMessage;
      container.appendChild(msgElem);
}

function resetError(container) {
  container.className = 'f-row';
  if (container.lastChild.className == "error-message") {
    container.removeChild(container.lastChild);
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

      resetError(elems.from.parentNode);
      // var no_letters = elems.from.value.replace(/\s+[a-z]/gi, '');
      // alert(no_letters.length);
      if (elems.from.value.length > 80) {
        showError(elems.from.parentNode, ' максимум 80 символов.');
      }
      if (!elems.from.value) {
        showError(elems.from.parentNode, ' Укажите, от кого.');
      }

      resetError(elems.mail.parentNode);
      if (!elems.mail.value) {
        showError(elems.mail.parentNode, ' Укажите адрес.');
      }

      resetError(elems.phone.parentNode);
      if (!elems.phone.value) {
        showError(elems.phone.parentNode, ' Укажите телефон.');
      }

      resetError(elems.how.parentNode);
      if (!elems.how.value) {
        showError(elems.how.parentNode, ' Укажите, откуда.');
      }

      resetError(elems.message.parentNode);
      var il = countChairs(elems.message.value);
      if (il > 1000) {
        showError(elems.message.parentNode, ' максимум 1000 знаков.');
      }
      if (!elems.message.value) {
        showError(elems.message.parentNode, ' Отсутствует текст.');
      }
}
