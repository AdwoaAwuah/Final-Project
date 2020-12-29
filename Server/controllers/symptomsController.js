const axios = require("axios");
const config = require('../helpers/config');




module.exports = {
    questions: function (req, res) {
      console.log(req.params)
      axios 
        .get("https://api.infermedica.com/v2/symptoms", {
          headers: {
            "App-Id": config.APP_ID,
            "App-Key": config.APP_KEY,
            'Content-Type': 'application/json',
            
          },
        })
        .then((response) => {
          //  console.log("response", response)
        //  console.log("response data", response.data)
        return response.data
        })
        .catch(exception=> {
          console.log(exception.errors)
        });
    },
    questionsPost: function (req, res) {
      // console.log(req, "controller req")
      console.log(req.body, "controller req body");
      axios({
        url: "https://api.infermedica.com/v2/diagnosis",
        method: "POST",
        headers: {
          "App-Id": config.APPid,
          "App-Key": config.APPkey,
           'Content-Type': 'application/json'
        },
        data: {
          sex: "male",
          age: {"value": 20,
          "unit": "month"},
         evidence:  [
            {
              "id": "s_1193",
              "choice_id": "present",
              "source": "initial"
            },
            {
              "id": "s_488",
              "choice_id": "present"
            },
            {
              "id": "s_418",
              "choice_id": "present"
           }
        ]
         },
      })
        .then((response) => {
         
          return res.json(response.data);
        })
        .catch(function (error) {
          console.log(error);
          //   console.log('Show error notification!');
        });
    },
    callTriage: function (req, res) {
      console.log(req.body, "controller req body");
      axios({
        url: "https://api.infermedica.com/v2/triage",
        method: "POST",
        headers: {
          "App-Id": config.APPid,
          "App-Key": config.APPkey,
          'Content-Type': 'application/json'
        },
        data: {
          sex: "male",
          age: {"value": 20,
          "unit": "month"},
          evidence: req.body,
        },
    
      })
        .then((response) => {
          // console.log("call triage response", response);
          return res.json(response.data);
        })
        .catch(function (error) {
          console.log(error);
        });
    },
  };
  