const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geoCode')
const forecast = require('./utils/forecaste')

const app = express()

// Define path for express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewPath = path.join(__dirname, '../templates/views')
const partialPath = path.join(__dirname, '../templates/partial')

hbs.registerPartials(partialPath)
if(app.use(express.static(publicDirectoryPath))){
}else{
    console.log('not done')
}

// set up handlebar and view engine
app.set('views', viewPath)
app.set('view engine', 'hbs')

//set up static directory to serve
app.get('', (req , res)=> {
    res.render('index', {
        title : 'Weather App',
        author : 'Muhammad Bilal'
    })
})

app.get('/weather', (req , res) => {
    if(!req.query.address){
      return  res.send({
             error : 'yout must provide an address'
        })
    }

    geocode(req.query.address, (error , geocodeData) => {
          if(error){
            return  res.send({
                  error
              })
          }
          console.log(geocodeData.latitude)
          console.log(geocodeData.langitude)
    forecast(geocodeData.latitude,geocodeData.langitude , (error , forecastData) => {
        if(error){
            return res.send(error)
        }
        res.send({
            forecast : forecastData,
            location : geocodeData.location, 
            address : req.query.address, 
        })
    })
        
    })

})


app.get('/about', (req,res) => {
   res.render('about', {
       title : 'About',
       author : 'muhammad bilal'
   })
})
app.get('/help' , (req, res) => {
    res.render('help', {
        title : 'Help',
        author : 'muhammad bilal'
    })
})

app.get('*' , (req, res) => {
     res.render('404', {
       title : '404',
       message : 'Page not found'  
     })
})

app.get('/aaaa', (req , res) => {
     if(!req.query.address){
       return  res.send({
              error : 'yout must provide an address'
         })
     }

     res.send({
         location : 'pakistan',
         forecast : 'its raining'
     })
})

app.listen(3000,()=>{
    console.log('you are on 3000 port')
})