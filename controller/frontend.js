const checkCookie = require("./checkCookie");
const path = require('path');
const fs = require('fs');
const { name } = require("ejs");
const { log } = require("console");

exports.imgs = async (req, res) => {
    const filename = req.query.filename;
    const filePath = path.join(__dirname, '../', filename); // No validation

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found');
    }

}

exports.index = async (req, res) => {
    const api = "http://192.168.30.138:3000/api/getCakes";
    const response = await fetch(api);
    const foods = await response.json();
    const check = checkCookie(req, req);
    if (check.success == true) {
        return res.render("index", { foods: foods });
    } else {
        return res.redirect("/login");
    }
};

exports.login = async (req, res) => {
    return res.render("login");
}
exports.signup = async (req, res) => {
    return res.render("signup");
}