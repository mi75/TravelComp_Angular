// function init() {
//     window.addEventListener('scroll', function(e) {
//         var mmenu;
//         var pmenu;
//         var distanceY = window.pageYOffset || document.documentElement.scrollTop,
//             headHeight = document.getElementById('header').offsetHeight,
//             mmenu = document.getElementById("main-menu");
//         pmenu = document.getElementById("pull");
//         if (distanceY > headHeight) {
//             mmenu.classList.add("menu-fix");
//             pmenu.classList.add("menu-fix");
//         } else {
//             if (mmenu.classList.contains("menu-fix") || pmenu.classList.contains("menu-fix")) {
//                 mmenu.classList.remove("menu-fix");
//                 pmenu.classList.remove("menu-fix");
//             }
//         }
//     });
// }
// window.onload = init();

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