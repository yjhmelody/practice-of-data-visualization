$('.form>button').click(function (e) {
    var url = '/users';
    var query = {};
    
    $('.form>').each(function (index, elem) {
        query[elem.name] = elem.value;
    });

    $.get(url, query, function (data) {
        console.log(url, query, data);
    });
});
