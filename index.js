require('dotenv').config()

const express = require('express')
const app = express()
const port = 3000
const { Global, Country } = require('./db.js')

app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

app.post('/', async (req, res) => {
  try {
    const currentTask = req.body.CurrentTask

    let say = ''

    if(
      currentTask == 'country_active'
      || currentTask == 'country_deaths'
    ){
      const countryCode = req.body.Field_countryCode_Value

      const country = await Country.findOne({countryCode: countryCode})
  
      if(currentTask == 'country_active'){
        say = `${countryCode} Active Cases ${country.active}`
      }
      else if(currentTask == 'country_deaths'){
        say = `${countryCode} Deaths ${country.deaths}`
      }
    }
    else {
      const global = await Global.findOne({})
  
      if(currentTask == 'global_active'){
        say = `Total Active Cases ${global.active}`
      }
      else if(currentTask == 'global_deaths'){
        say = `Total Deaths ${global.deaths}`
      }
    }
    
    const responseObject = {
      "actions": [
        {
          "say": say
        },
        {
          "listen": true
        }
      ]
    };
    
    res.json(responseObject)
  }
  catch (e) {
    console.log(e)
  }
})

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
