const router = require("express").Router();
const sypmtomCheckerController= require("../controllers/symptomsController");

router.get("/symptoms", (req, res) => {
    console.log("symptom checker is getting called")
     return sypmtomCheckerController.questions({body:[]}, res)
});


router.post("/diagnosis", (req, res) =>{
    return sypmtomCheckerController.questionsPost(req, res)
  });

  router.post("/triage", (req,res) => {
    return sypmtomCheckerController.callTriage(req, res)
  })

module.exports = router;