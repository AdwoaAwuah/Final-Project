require('dotenv').config()




let MONGODB_URI;
const MONGOOSE_OPTIONS = {
    useUnifiedTopology: true,
    useNewUrlParser: true,
    useCreateIndex: true
}


switch (process.env.NODE_ENV) {
    case "development":
        MONGODB_URI = process.env.MONGODB_DEV_URI;
        break;

    case "production":
        MONGODB_URI = process.env.MONGODB_PROD_URI;
        break;
    
    default:
        throw ("No environment specified")
}

const PORT = process.env.PORT;
const JWT_SECRET = process.env.JWT_SECRET; 
const NODE_ENV = process.env.NODE_ENV
const APPid = process.env.REACT_APP_SYMPTOM_ID;
const APPkey = process.env.REACT_APP_SYMPTOM_KEY;   // So in your .env file do you have exactly. mmmm okay

// Please paste your APPID and APPKEY below. Let me try something here
const APP_ID = "848bdfae"
 const APP_KEY = "f10f8b1385b8e51fce47a8accd499c9b"

module.exports = {
    MONGODB_URI, 
    MONGOOSE_OPTIONS,
    PORT,
    JWT_SECRET,
    NODE_ENV,
    APP_ID,
    APP_KEY,
    APPid,
    APPkey
}
