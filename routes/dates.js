const express = require("express");
const router = express.Router();
const catchAsync = require("../utilities/catchAsync");
const { validateEntry, isLoggedIn } = require("../middlewares");
const dates = require("../controllers/dates");

router.route("/")
    .get(isLoggedIn, catchAsync(dates.renderHome))
    .post(isLoggedIn, validateEntry, catchAsync(dates.createEntry));

router.route("/:id")
    .put(isLoggedIn, validateEntry, catchAsync(dates.updateEntry))
    .delete(isLoggedIn, catchAsync(dates.deleteEntry));

module.exports = router;
