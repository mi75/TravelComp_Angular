function sendPost(upload, formData, onSuccess, onFail) {

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
            var showBug = xhr.status + ': ' + xhr.statusText;
            onFail(showBug);
        } else {
            onSuccess();
        }
    });
}