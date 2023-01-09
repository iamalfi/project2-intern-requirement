const { Router } = require("express");
const express = require("express");
const router = express.Router();
const collegecontroller=require("../controller/collegecontroller");
const interncontrollers=require("../controller/internController")


router.post("/functionup/colleges",collegecontroller.createCollege);

router.post("/functionup/interns",interncontrollers.createInterns);
router.get("/functionup/collegeDetails",collegecontroller.getDetails)



module.exports=router;