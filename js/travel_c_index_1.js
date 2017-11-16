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

var slides = document.querySelectorAll('#slides .slide');
var currentSlide = 0;
var slideInterval = setInterval(nextSlide,4000);

function nextSlide() {
  goToSlide(currentSlide+1);
}
 
function previousSlide() {
  goToSlide(currentSlide-1);
}
 
function goToSlide(n) {
  slides[currentSlide].className = 'slide';
  currentSlide = (n+slides.length)%slides.length;
  slides[currentSlide].className = 'slide showing';
}

function slideNav() {
  var parentB = document.getElementById('sl-k');
  for (i = 0; i < slides.length; i++) {
    var b = document.createElement('button');
    b.className = "sl-b";
    b.style.width = '20px';
    b.style.borderRadius = '50%';
    b.style.backgroundColor = 'red';
    parentB.appendChild(b);
    b.innerHTML = i;
    b.onclick = function() {
      alert(i);
    }
  }
}
window.onload = slideNav();

// var next = document.getElementById('next');
// var previous = document.getElementById('previous');
 
// next.onclick = function() {
//   pauseSlideshow();
//   nextSlide();
// }
// previous.onclick = function() {
//   pauseSlideshow();
//   previousSlide();
// }