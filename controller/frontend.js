const checkCookie = require("./checkCookie");
const path = require('path');
const fs = require('fs');

exports.imgs = async (req,res) => {
    const filename = req.query.filename;
    const filePath = path.join(__dirname, '../assets', filename); // No validation

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found');
    }
    
}

exports.index = async (req, res) => {
    res.sendFile(path.join(__dirname, '../template', 'index.html'));
};
