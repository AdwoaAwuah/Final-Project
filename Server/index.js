const express = require ("express")
const config = require('./helpers/config');
const cookieParser = require("cookie-parser")
const mongoose = require("mongoose")
const morgan = require('morgan')
const cors = require ('cors')

// User own imports
const {authenticateUser} = require('./middlewares/auth')
const authRouter = require('./routers/auth');
const apiRouter = require('./routers/symptomsChecker')
const User = require("./models/user");

// Mongoose Connection
mongoose.connect(config.MONGODB_URI, config.MONGOOSE_OPTIONS)
.then(()=> {
    console.log(`MONGODB Connection successful`)
}).catch(exception=>{
    console.log("MONGODB Connection failed/n", exception)

})

const app = express()
app.use(cookieParser())
app.use(express.json())
app.use(authRouter)
app.use(apiRouter)



// Usage of middlewares here
app.use(morgan("default"))
app.use(authenticateUser);
app.use(cors({credentials:true, origin:'http://localhost:3000'}));


// app.get("/", (request, response)=> {
//     response.send("<h1>Hey backend working</h1>")
// })

app.listen(config.PORT, ()=> {
    console.log(`Server started on PORT: ${config.PORT}`)
})
