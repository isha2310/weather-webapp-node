const path = require('path')
const express = require('express')
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()
// app.com
// app.com/help
// app.com/about

//Define paths for Express configuration
const publicDirectoryPath =path.join(__dirname , '../public')
const viewPath = path.join(__dirname , '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setting handlebars engine and views location

app.set('view engine' , 'hbs')
app.set('views' , viewPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res) => {
    res.render('index', {
        title: 'Weather App' ,
        name: 'Isha Agarwal'
    })
})

app.get('/about', (req,res) => {
    res.render('about', {
        title: 'About Me' , 
        name: 'Isha Agarwal'
    })
})

app.get('/help' , (req,res) => {
    res.render('help' , {
        title: 'Help',
        name: 'Isha Agarwal',
        message: 'How can I help you?'
    })
})

app.get('/weather' , (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'No address provided'
        })
    }
    geocode(req.query.address,(error,{latitude,longitude,location}={}) => {
        if(error){
            return res.send({ error })
        }
        forecast(latitude,longitude,(error,forecastData={}) => {
            if(error){
                return res.send({ error })
            }
            res.send({
                address: req.query.address,
                location,
                forecast: forecastData
            })
        })
    })
})

app.get('/help/*', (req,res) => {
    res.render('404', {
        title: '404' ,
        message: 'Help article not found' , 
        name: 'Isha Agarwal'
    })
})

app.get('*', (req,res) => {
    res.render('404', {
        title: '404',
        message: 'Page not found!' ,
        name: 'Isha Agarwal'
    })
})

app.listen(3000, () => {
    console.log('Server is up on port 3000')
})