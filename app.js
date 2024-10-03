require("dotenv").config();
const express = require("express");
const cookieParser = require("cookie-parser");
const swaggerJsdoc = require("swagger-jsdoc");
const swaggerUi = require("swagger-ui-express");
const router = require('./router/index');
const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cookieParser()); // Cookie-parser middleware

// Swagger configuration
const swaggerOptions = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "My Project API",
            version: "1.0.0",
            description: "API documentation for My Project",
        },
        servers: [
            {
                url: `http://192.168.30.138:${port}`,
            },
        ],
    },
    apis: ["./router/*.js"], // Path to the API docs (adjust the path based on your project)
};

const swaggerDocs = swaggerJsdoc(swaggerOptions);

// Swagger UI setup
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

// Sample route
app.get("/", (req, res) => {
    res.json({
        "demo": {
            "success": true,
            "msg": "Welcome to My Project!!!"
        }
    });
});

// API routes
app.use("/api", router);

// Start server
app.listen(port, () => {
    console.log(`Running on: http://localhost:${port}`);
});
