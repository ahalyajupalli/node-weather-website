const axios = require('axios')


const forecast=(latitude, longitude, callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=243c1a3dc5b3a7dbf0400d22496550ed&query='+ latitude+','+longitude+'&units=f'
    axios.get(url)
    .then(({data})=>{
        if(data.current === 0){
            callback('Unable to get the whether from the location :(', undefined)
        }
        else{
            callback(undefined, data.current.weather_descriptions[0]+". It is currently "+data.current.temperature+" degrees out. It feels like "+ data.current.feelslike+" degrees out. Humdity is "+data.current.humidity);
        }
    })
    .catch(error=>{
        callback('Unable to connect to weatherstack! '+ error.message, undefined)
    })
}

module.exports = forecast