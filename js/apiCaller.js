function sendPost(uploadAddress, formData, onSuccess, onFail) {

    var object = {};
    formData.forEach(function(value, key) {
        object[key] = value;
    });
    var jsd = JSON.stringify(object);

    var jqxhr = $.post(uploadAddress, jsd, "json");
    jqxhr.done(function() {
        onSuccess();
    });
    jqxhr.fail(function(data, textStatus, errorThrown) {
        var errorMessage = errorThrown + ': ' + textStatus;
        onFail(errorMessage);
    });
}

function sendGet(dataAddress, onSuccess, onFail) {

    var jqxhr = $.get(dataAddress);
    jqxhr.done(function(data) {
        onSuccess(data);
    });
    jqxhr.fail(function(data, textStatus) {
        onFail(textStatus);
    });

}