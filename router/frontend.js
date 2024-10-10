const express = require('express');
const frontend = require('../controller/frontend');
const path = require('path');
const router = express.Router();

router.get("/home",frontend.index);
router.get("/assets/imgs",frontend.imgs);
router.use("/assets",express.static(path.join(__dirname, '../assets')));

module.exports = router;