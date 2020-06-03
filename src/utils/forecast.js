const request = require('request')

const forecast = (latitude,longitude,callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=bfb8bb1fc3bc9398e81671f53ab8673b&query='+latitude+','+longitude
    request({url, json : true} , (error,{body}) => {
        if(error){
            callback('Unable to connect to weather services',undefined)
        } else if(body.error){
            callback('Unable to find location. Try again!', undefined)
        }else{
            callback(undefined , `Weather is ${body.current.weather_descriptions[0]}.
                It is ${body.current.temperature} degrees outside, but it feels like ${body.current.feelslike} degrees with the humidity of ${body.current.humidity}%.`)
        }
    })
}

module.exports = forecast