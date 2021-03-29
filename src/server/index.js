const dotenv = require("dotenv"); 
dotenv.config(); 

var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

const app = express()

app.use(express.static('dist'))

console.log(__dirname)

const axios = require ("axios"); 

app.get('/', function (req, res) {
     res.sendFile('dist/index.html')
})

// designates what port the app will listen to for incoming requests
app.listen(8081, function () {
    console.log('Example app listening on port 8082!')
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
})

app.get("/apiurl/*", async (req, res) => {
    try {

        const url = req.params[0];
        apiurl = "https://api.meaningcloud.com/sentiment-2.1";
        apikey = process.env.API_KEY;
        const response = await axios.get(
          `${apiurl}?key=${apikey}&url=${url}&lang=en`
        );
    
        const { agreement, subjectivity, confidence, irony } = response.data;
        res.send({
          agreement,
          subjectivity,
          confidence,
          irony,
        });
    
    }catch (err){
        res.status(500).send ("error !!! " +err);
    }
});