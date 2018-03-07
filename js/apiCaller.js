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

function sendPostWithFile(uploadAddress, formData, onSuccess, onFail) {

    $.ajax({
        url: uploadAddress,
        type: 'POST',
        data: formData,
        cache: false,
        processData: false, // Не обрабатываем файлы (Don't process the files)
        contentType: false, // Так jQuery скажет серверу что это строковой запрос
        success: function(respond, textStatus, jqXHR) {

            onSuccess();
        },
        error: function(data, textStatus, errorThrown) {
            var errorMessage = errorThrown + ': ' + textStatus;
            onFail(errorMessage);
        }
    });
}

function sendGet(dataAddress, onSuccess, onFail) {

    var jqxhr = $.get(dataAddress);
    jqxhr.done(function(data) {
        onSuccess(data);
    });
    jqxhr.fail(function(data, textStatus) {
        console.log(data);
        onFail(textStatus);
    });

}