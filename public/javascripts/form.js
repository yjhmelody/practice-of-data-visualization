$('.form>button').click(formSearch)

/**
 * 
 * @param {any} e 
 */
function formSearch(e) {
    let url = config.port + '/api/stationRent_Return'
    let query = {}
    query.stationID = $('#stationName').attr('stationID')
    query.startTime = $('#startTime').val()
    query.endTime = $('#endTime').val()
    $.get(url, query, function (data) {
        chart.update(JSON.parse(data))
    })

    $.ajax(`${config.port}/api/stationLine`, query)
        .promise()
        .then(function(data){
            console.log(data)
            if(!data.isRight){
                throw Error("数据异常")
            }
            addCurvelines(data.line, points)                
            
        }).then(null, function(err){
            if(err) {

            }
        })
}