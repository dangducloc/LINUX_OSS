require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());

app.get("/", (req, res) => {
    res.json({
        "demo": {
            "success": true,
            "msg": "Wellcome to My project!!!"
        }
    });
});

app.listen(port, () => {
    console.log(`running on: http://localhost:${port}`);
});