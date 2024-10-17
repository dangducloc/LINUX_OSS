const express = require('express');
const frontend = require('../controller/frontend');
const path = require('path');
const router = express.Router();

router.use("/assets",express.static(path.join(__dirname, '../assets')));
router.get("/home",frontend.index);
router.get("/detail/:id",frontend.detail);
router.get("/assets/imgs",frontend.imgs);
router.get("/login",frontend.login);
router.get("/logout",frontend.logout);
router.get("/signup",frontend.signup);
router.get("/demo",(req,res)=>{
    res.sendFile(path.join(__dirname, '../views/components.html'));
});

module.exports = router;