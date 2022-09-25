const User = require("../models/user");

module.exports.renderRegister = (req, res) => {
    res.render("user/register");
};

module.exports.register = async (req, res) => {
    try {
        const { email, username, password } = req.body;
        const user = new User({ email, username });
        const registeredUser = await User.register(user, password); // This will hash the password, add the salt and add it to our new user automatically
        req.login(registeredUser, err => { // Once we are registered we wanna log in automatically
            if(err) return next(err);
            req.flash("success", "Welcome");
            res.redirect("/");
        });
    } catch(e) {
        req.flash("error", e.message);
        res.redirect("/register");
    };
};

module.exports.renderLogin = (req, res) => {
    res.render("user/login");
};

module.exports.login = async (req, res) => {
    req.flash("success", "Welcome back");
    res.redirect("/");
};

module.exports.logout = (req, res, next) => {
    req.logout(function(err) {
      if (err) return next(err);
      req.flash('success', "You've succesfully logged out");
      res.redirect('/login');
    });
};
