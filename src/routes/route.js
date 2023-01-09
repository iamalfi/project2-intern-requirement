const { Router } = require("express");
const express = require("express");
const router = express.Router();
const collegecontroller = require("../controller/collegecontroller");
const interncontrollers = require("../controller/internController");

//------------------------Colleges------------------------//
router.post("/functionup/colleges", collegecontroller.createCollege);
router.get("/functionup/collegeDetails", collegecontroller.getDetails);

//------------------------Interns--------------------------//
router.post("/functionup/interns", interncontrollers.createInterns);

module.exports = router;
