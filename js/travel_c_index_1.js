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

window.requestAnimationFrame = (function () { // для поддержки requestAnimationFrame всеми браузерами
        return window.requestAnimationFrame ||
               function (callback) {
                   return window.setTimeout(callback, 1000 / 60);
               };
})();
// функция слайдера
function slider(f, img, button, V, Vo) {
  var iii = 0,
      start = null,
      clear = 0;
  function step(time) {
    if (start === null) start = time;
    var progress = time - start;
    if (progress > V) {
      start = null;
      for (var i=0; i<img.length; i++) {
        img[i].style.zIndex = "0";
        button[i].style.opacity = "1";
      }
      img[iii].style.zIndex = "1";
      iii = ((iii != (img.length - 1)) ? (iii + 1) : 0);
      img[iii].style.zIndex = "2";
      img[iii].style.opacity = "0";
      button[iii].style.opacity = ".4";
    } else if(img[iii].style.opacity != "") {
      img[iii].style.opacity = ((progress/Vo < 1) ? (progress/Vo) : 1);
    }
    if(clear != "0" && progress > Vo) {} else {requestAnimationFrame(step);}
  }
  requestAnimationFrame(step);
  // f.onmouseenter = function() { if(clear == "0") clear = "1"; }  // при наведении на слайдер
  // f.onmouseleave = function() { if(clear == "1") {clear = "0"; requestAnimationFrame(step);} }  // курсор убран со слайдера
  for (var j=0; j<button.length; j++) {  // при нажатии кнопок
    button[j].onclick = function() {
      clear = "2";
      for (var i=0; i<img.length; i++) {
        img[i].style.zIndex = "0";
      }
      img[this.value].style.zIndex = "2";
      img[this.value].style.opacity = "1";
      for (var k=0; k<button.length; k++) {
        button[k].style.opacity = ((button[k] == this) ? '.4' : '1');
      }
    }
  }
}
// вызов функции слайдера
var f = document.getElementById('m-sl'),
    img = f.getElementsByClassName('slide'),
    button = f.getElementsByTagName('div')[0].getElementsByTagName('button');
slider(f, img, button, '4000', '200');  // '4000' — скорость смены картинок, '1000' — скорость прозрачности
