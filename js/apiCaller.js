function sendPost(uploadAddress, formData, onSuccess, onFail) {

    var object = {};
    formData.forEach(function(value, key) {
        object[key] = value;
    });
    var jsd = JSON.stringify(object);

    var xhr = new XMLHttpRequest();
    xhr.open('POST', uploadAddress);
    xhr.send(jsd);

    xhr.addEventListener("loadend", function() {
        if (xhr.status != 200) {
            var errorMessage = xhr.status + ': ' + xhr.statusText;
            console.error(xhr.responseText);
            onFail(errorMessage);
        } else {
            onSuccess();
        }
    });
}