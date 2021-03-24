const express = require ("express")
const path = require("path")
const hbs = require("hbs")
const geocode = require("./utils/geocode")
const forecast = require("./utils/forecast")


const app = express()

//define paths for Express config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsPath = path.join(__dirname, "../templates/views")
const partialsPath = path.join(__dirname, "../templates/partials")



// Setup handlebars engine and views location
app.set("view engine", "hbs")
app.set("views", viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directory to serve
app.use(express.static(publicDirectoryPath))




app.get("",(req, res) =>{
    res.render("index", {
        title:"Weather",
        name:"Rui"
    })
})

app.get("/about",(req,res) =>{
    res.render("about", {
        title:"About me",
        name: "Rui"

    })

})

app.get("/help",(req,res) =>{
    res.render("help", {
        message:"this is the help message",
        title: "Help",
        name:"Rui"
        

    })

})

app.get("/weather",(req,res)=>{

    if (!req.query.address){
        return res.send({
            error:"no address was provided, please provide an address"
        })
    }



    geocode(req.query.address, (error, {latitude, longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude, longitude, (error, forecastdata)=>{
            if (error){
                res.send({error})
            }
        
            res.send({
                address: req.query.address,
                location: location,
                forecast: forecastdata
              })
        })
    })    


})

app.get("/help/*",(req,res)=>{
    res.render("404", {
        title:"404",
        errorMessage:"Help article not found",
        name:"Rui"
    })


})

app.get("*",(req,res)=>{
    res.render("404",{
        title:"404",
        errorMessage:"page not found",
        name:"Rui"
    })
})


app.listen(3000, () =>{
    console.log("server is on port 3000")
})