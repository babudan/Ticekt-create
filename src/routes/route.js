const express = require('express')

const router = express.Router()

const {createuser,userLogin } = require("../controller/usercontroller")

const { authentication , authorisation} = require("../auth/authentication")

const {ticketcreate ,getallticekts} = require("../controller/ticketcontroller");

// const {validateTicket} = require("../validator/validator");
router.post("/register" ,createuser);

router.post("/login" ,userLogin);

router.post("/ticketcreate" , authentication , authorisation ,ticketcreate);

router.get("/listoftickets" ,authentication , authorisation  ,getallticekts)

module.exports = router;