require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const router = require('./router/main');
const cart = require('./router/cart')
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
// Adding cookie-parser middleware
app.use(cookieParser());

app.get("/", (req, res) => {
    res.json({
        "demo": {
            "success": true,
            "msg": "Wellcome to My project!!!"
        }
    });
});
app.use("/api",router);
app.use("/api",cart)

app.listen(port, () => {
    console.log(`running on: http://localhost:${port}`);
});
