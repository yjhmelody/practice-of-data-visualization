$('.form>button').click(formSearch);

// 等待后端数据
/**
 * 
 * 
 * @param {any} e 
 */
function formSearch(e) {
    var url = '/users';
    var query = {};
    $('.form>').each(function (index, elem) {
        query[elem.name] = elem.value;
    });

    $.get(url, query, function (data) {
        console.log(url, query, data);
    });
}