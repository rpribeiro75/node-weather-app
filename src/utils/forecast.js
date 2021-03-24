const request = require("request")



const forecast = (latitude, longitude, callback) => {
    const url = "http://api.weatherstack.com/current?access_key=e3d4feb26cd1a3fb2aa68bf051d4aec0&query="+ longitude +","+ latitude +""
    request ({url, json:true}, (error, {body})=>{

        if (error) {
            callback("unable to connect", undefined)
        }else if (body.error){
            callback("unable to find location", undefined)
        }else{
            callback(undefined, body.current.weather_descriptions[0] + ". Estão "+ body.current.temperature+" graus e parecem estar " + body.current.feelslike + " graus")
        }
    })

}

module.exports = forecast
