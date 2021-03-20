const dotenv = require('dotenv');
dotenv.config();
var path = require('path')
const express = require('express')
const mockAPIResponse = require('./mockAPI.js')

console.log(`Your API key is ${process.env.API_KEY}`);
const app = express()
app.use(express.static('dist'))

console.log(JSON.stringify(mockAPIResponse))

// parser
const bodyParser = require("body-parser");
// Allow parsing of nested objects
app.use(
  bodyParser.urlencoded({
    extended: false,
  })
);
app.use(bodyParser.json());

console.log(__dirname);



// cors
const cors = require("cors");
app.use(cors());
const axios = require("axios");


app.get('/', function (req, res) {
    res.sendFile('dist/index.html')
    //res.sendFile(path.resolve('src/client/views/index.html'))
})

app.get('/test', function (req, res) {
    res.send(mockAPIResponse)
});


app.get("/scan/*", async (req, res) => {
    try{
        const url = req.params[0];
        apiURL = "https://api.meaningcloud.com/sentiment-2.1";
        apiKey = process.env.API_KEY;
        const apiResponse = await axios.get(
            `${apiURL}?key=${apiKey}&url=${url}&lang=en`
        );
        const { agreement, subjectivity, confidence, irony } = apiResponse.data;
        
        res.send({
          agreement,
          subjectivity,
          confidence,
          irony,
        });

    }catch (err){
        console.log(err);
        res.status(500).send("an error happended while sending request to the backend..." + err);    
    }
});

app.listen(8081, function () {
    console.log('Example app listening on port 8081!')
});




