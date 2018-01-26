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
// window.onload = sendGet(dataAddress, function(adminData) {
//     var tt = document.getElementById('dbtab');
//     tt.innerHTML = adminData;
// }, function(errorMessage) { alert(errorMessage) });
var dataContent;
window.onload = sendGet(dataAddress, function(adminData) {
    dataContent = adminData;
    insTab();
}, function(errorMessage) { alert(errorMessage) });

function insTab() {
    var adminTable = document.getElementById('dbtab');
    var tableContents = '';
    var dc = JSON.parse(dataContent);
    dc.forEach(function(item) {
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
        template = template.replace('{0}', contact.id);
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