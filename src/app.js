const path = require('path')
const express= require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')


//Making web server
const app = express()

//Define path for Express config
const publicDirecotryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebars engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//setup static directory to serve
app.use(express.static(publicDirecotryPath))

app.get('',(req, res)=>{
    res.render('index',{
        title:'Weather App',
        name:'Sai'
    })
})

app.get('/about',(req, res)=>{
    res.render('about',{
        title:'About me',
        name:'Sai'
    })
})

app.get('/help',(req, res)=>{
    res.render('help',{
        helpText:'Need assistance? Here you can find information on how to navigate the weather app and interpret the data presented. Learn how to enter your location to receive current weather forecasts, understand the summary of today’s weather, and get details on wind speed, atmospheric pressure, and humidity. If you encounter any issues or have questions, please contact us.',
        title:'Help',
        name:'Sai'
    })
})

app.get('/weather',(req, res)=>{
    if(!req.query.address){
        return res.send({
            error:"You must provide a address"
        })
    }
    const address = req.query.address
    geocode(address,(error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({
                error: error
            })
        }
        forecast(latitude, longitude, (error, forecastdata) => {
            if(error){
                return res.send({
                    error: error
                })
            } 
            res.send({
                forecast: forecastdata,
                location,
                address:address
            })
          })
    })
})

app.get('/help/*',(req, res)=>{
    res.render('404',{
        title:'404',
        errorMsg:'Help article not found',
        name:'Sai'
    })
})

app.get('/*',(req,res)=>{
    res.render('404',{
        title:'404',
        errorMsg:'Page not found',
        name: 'Sai'
    })
})
app.listen(3000,()=>{
    console.log('Server is up on port 3000.')
})