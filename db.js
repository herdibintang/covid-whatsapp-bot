const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true });

const Global = mongoose.model('Global', {
  active: Number,
  deaths: Number,
});

const Country = mongoose.model('Country', {
  countryCode: String,
  active: Number,
  deaths: Number,
});

module.exports = { Global, Country }