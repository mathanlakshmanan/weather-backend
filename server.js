const express = require('express');
const axios = require('axios');
const dotenv = require('dotenv');
var cors = require('cors')
dotenv.config();
const app = express();

app.use(express.urlencoded({extended:true}));
app.use(express.json());
app.use(cors())

app.get('/', (req, res)=>{
    res.status(200).json({weather:null, error:null});
})

app.post('/weather',async(req, res)=>{
        
    const {city} = req.body; 
    let weather;
    let error = null;
    try{
        const weatherResponse = await axios.get(`https://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${process.env.Weather_API_KEY}`);
        weather = weatherResponse.data;
    } catch(err){
        weather = null;
        error = "Error, Pleasr try again";
    }

    res.status(200).json({weather, error});

})


app.listen(process.env.PORT,()=>{
    console.log(`server runing on port : ${process.env.PORT}`);  
})