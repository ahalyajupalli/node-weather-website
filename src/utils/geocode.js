const axios= require('axios');

const geocode = (address, callback)=>{
    url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) +'.json?access_token=pk.eyJ1Ijoic2FpMzAzOTMiLCJhIjoiY2xvMjg0a2l2MDR2NDJ2bGVsdGl3NDNkbSJ9.OTyTDL0gOkftPWqgo3bFIQ&limit=1'
    axios.get(url)
    .then(({data})=>{
        if(data.features.length === 0){
            callback('Unable to find the location :(', undefined)
        }
        else{
        console.log(data.features[0])
        callback(undefined,{latitude:data.features[0].center[1],longitude:data.features[0].center[0],location:data.features[0].place_name})
        }
    })
    .catch(error=>{
        callback('Unable to connect to mapbox! '+ error.message, undefined)
    }) 
}

module.exports = geocode