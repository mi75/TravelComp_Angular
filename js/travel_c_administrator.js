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

var dataAddress = 'api/admin';

window.onload = sendGet(dataAddress, function(adminData) {
    insertToContactsTable(adminData);
}, function(errorMessage) { alert(errorMessage) });

function insertToContactsTable(dataContent) {
    var datArray = JSON.parse(dataContent);
    $(datArray).each(function(i, item) {
        $('#dbtab').append('<tr><td>' + (i + 1) + '</td><td>' + item['name'] + '</td><td>' + item['email'] + '</td><td>' + item['telephone'] + '</td><td>' + item['howHeard'] + '</td><td>' + item['keepMe'] + '</td><td>' + item['message'] + '</td></tr>');
    });
}