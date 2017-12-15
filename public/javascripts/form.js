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
    console.log(query)
    $.get(url, query, function (data) {
        chart.update(JSON.parse(data))
    }).then(null, function(err){
        if(err){
            console.log(err)
        }
    })

    $.ajax(`${config.port}/api/stationLine`, {data:query})
        .promise()
        .then(function(data){
            console.log(data)
            if(!data.isRight){
                throw Error("数据异常")
            }
            relationPoints = data.line
            addCurvelines(relationPoints, globalPoints)    

        }).then(null, function(err){
            if(err) {
                console.log(err)
            }
        })
}