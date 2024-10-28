const checkCookie = require("./checkCookie");
const path = require('path');
const fs = require('fs');
const { log } = require("console");

exports.imgs = async (req, res) => {
    const filename = req.query.filename;
    const filePath = path.join(__dirname, '../', filename); // No validation

    if (fs.existsSync(filePath)) {
        res.sendFile(filePath);
    } else {
        res.status(404).send('File not found');
    }

};

exports.index = async (req, res) => {
    const api = "http://192.168.30.138:3000/api/getCakes";
    const response = await fetch(api);
    const foods = await response.json();
    const check = checkCookie(req, req);
    if (check.success) {
        if (check.user.role === "admin") {
            return res.redirect("/admin");
        }
        if (check.user.role === "member") {
            const User_name = check.user.User_name;
            return res.render("index", { foods, User_name });
        }
    }
    else {
        return res.redirect("/login");
    }
};

exports.detail = async (req, res) => {
    const id = req.params.id;
    const check = checkCookie(req, req);
    if (check.success == true) {

        const api1 = `http://192.168.30.138:3000/api/cake/${id}`;
        const raw_food = await fetch(api1);
        const food = await raw_food.json();

        const raw_comments = await fetch(`http://192.168.30.138:3000/api/comments/${id}`, {
            method: 'GET', // You can use 'GET' explicitly or leave it out since it's the default
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `user=${req.cookies['user']}` // Replace 'your_cookie_value' with the actual cookie value
            },
            credentials: 'include' // This ensures cookies are sent with the request
        });

        const comments = await raw_comments.json();
        const User_name = check.user.User_name
        return res.render("detail", { food: food[0], User_name, comments });
    } else {
        return res.redirect("/login");
    }
};

exports.carts = async (req, res) => {
    const check = checkCookie(req, req);
    if (check.success == true) {
        const raw_carts = await fetch(`http://192.168.30.138:3000/api/cart`, {
            method: 'GET', // You can use 'GET' explicitly or leave it out since it's the default
            headers: {
                'Content-Type': 'application/json',
                'Cookie': `user=${req.cookies['user']}` // Replace 'your_cookie_value' with the actual cookie value
            },
            credentials: 'include' // This ensures cookies are sent with the request
        });

        const carts = await raw_carts.json();
        const User_name = check.user.User_name
        return res.render("cart", { User_name, carts });
    } else {
        return res.redirect("/login");
    }
};

exports.login = async (req, res) => {
    return res.render("login");
};

exports.logout = async (req, res) => {
    res.clearCookie('user');
    return res.redirect("/login");
};

exports.signup = async (req, res) => {
    return res.render("signup");
};


exports.dashboard = async (req, res) => {
    const check = checkCookie(req, req);
    if (check.success) {
        if (check.user.role === "admin") {
            const api = "http://192.168.30.138:3000/api/getCakes";
            const response = await fetch(api);
            const foods = await response.json();
            return res.render("dashboard", { foods });
        }
        else {
            return res.redirect("/home");
        }
    }
};
