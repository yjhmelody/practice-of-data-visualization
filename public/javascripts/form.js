$('.form>button').click(formSearch)

/**
 * 
 * 临时使用的搜索函数
 * @param {any} e 
 */
function formSearch(e) {
    let url = '/users'
    let query = {}
    $('.form>').each(function (index, elem) {
        if (elem.name) {
            query[elem.name] = elem.value
        }
    })

    $.get(url, query, function (data) {
        console.log(url, query, data)
    })

}