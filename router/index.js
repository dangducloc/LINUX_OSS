// router/index.js
const express = require("express");
const main = require("./main");
const cart = require("./cart");
const comment = require("./comments");

const Router = express.Router();

Router.use(main);
Router.use(cart);
Router.use(comment);

module.exports = Router;
