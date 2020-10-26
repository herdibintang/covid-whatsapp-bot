const cron = require('node-cron');
const express = require('express');
const got = require('got');
const { Global, Country } = require('./db.js')

app = express()

cron.schedule('0 * * * *', async function () {
  try {
    const response = await got('https://api.covid19api.com/summary', { responseType: 'json' })


    await Global.deleteMany({})

    const global = response.body.Global

    await Global.create({
      active: global.TotalConfirmed - (global.TotalRecovered + global.TotalDeaths),
      deaths: global.TotalDeaths,
    })


    await Country.deleteMany({})

    const data = response.body.Countries.map(country => ({
      countryCode: country.CountryCode,
      active: country.TotalConfirmed - (country.TotalRecovered + country.TotalDeaths),
      deaths: country.TotalDeaths
    }))

    await Country.insertMany(data)

    console.log('Getting data done')
  }
  catch (e) {
    console.log(e)
  }
});

app.listen(3001);