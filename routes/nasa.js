var express = require('express');
var router = express.Router();
const axios = require('axios');

let env = require('../env/env');
let appkey = env.appkey;

// import api_key from '../env/env.js'

// const createError = require('http-errors');


const url_base = "https://api.nasa.gov/planetary/apod?api_key=";
let  url_final = "";

//    url_final = url_base + appkey + "&date=" + argument1;

async function getNasaData (req,res,next) {
  try {
    const url_base = "https://api.nasa.gov/planetary/apod?api_key="
    let  url_final = "";
    url_final = url_base + appkey + "&date=" + req.body.date;

    const nasaData = await axios({
      method: 'GET',
      url: url_final,    
    })
    // console.log(nasaData.data.explanation)
    res.status(200).send(nasaData.data);
  } catch(error) {
    next(error)
  }
} 

router.route('/').post(getNasaData);


module.exports = router;
