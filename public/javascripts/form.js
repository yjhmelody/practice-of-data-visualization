$('.form>button').click(formSearch);

/**
 * 
 * 
 * @param {any} e 
 */
function formSearch(e) {
    let url = '/users';
    let query = {};
    $('.form>').each(function (index, elem) {
        if(elem.name){
            query[elem.name] = elem.value;
        }
    });

    $.get(url, query, function (data) {
        console.log(url, query, data);
    });

}