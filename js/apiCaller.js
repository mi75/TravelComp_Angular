// function sendGet() {
//     var xhr = new XMLHttpRequest();
//     xhr.open('GET', '/', true);
//     xhr.send();
//     if (xhr.status != 200) {
//         alert(xhr.status + ': ' + xhr.statusText);
//     }
// }

function sendPost(upload, formData) {

    var object = {};
    formData.forEach(function(value, key) {
        object[key] = value;
    });
    var jsd = JSON.stringify(object);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', upload);
    xhr.send(jsd);

    xhr.addEventListener("loadend", function() {
        if (xhr.status != 200) {
            alert(xhr.status + ': ' + xhr.statusText);
        }
    });
}