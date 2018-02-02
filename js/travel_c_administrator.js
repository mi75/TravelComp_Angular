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

var dataAddress = 'api/admin';
window.onload = sendGet(dataAddress, function(adminData) {
    insertToContactsTable(adminData);
}, function(errorMessage) { alert(errorMessage) });

function insertToContactsTable(dataContent) {
    var adminTable = document.getElementById('dbtab');
    var tableContents = '';
    var datArray = JSON.parse(dataContent);
    datArray.forEach(function(item, i) {
        var template = '<tr><td>{0}</td><td>{1}</td><td>{2}</td><td>{3}</td><td>{4}</td><td>{5}</td><td>{6}</td></tr>';
        var contact = {
            id: item.idform_1,
            message: item.message,
            name: item.name,
            email: item.email,
            telephone: item.telephone,
            howHeard: item.howHeard,
            keepMe: item.keepMe
        };
        template = template.replace('{0}', i + 1);
        template = template.replace('{1}', contact.name);
        template = template.replace('{2}', contact.email);
        template = template.replace('{3}', contact.telephone);
        template = template.replace('{4}', contact.howHeard);
        template = template.replace('{5}', contact.keepMe);
        template = template.replace('{6}', contact.message);
        tableContents = tableContents + template;
    });
    adminTable.innerHTML = tableContents;
}