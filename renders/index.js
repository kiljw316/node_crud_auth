const express = require("express");
const loginRouter = require("./login");
const registerRouter = require("./register");
const mainRouter = require('./main');
const postsRouter = require('./posts');

const router = express.Router();

router.use("/", mainRouter);
router.use("/login", loginRouter);
router.use("/register", registerRouter);
router.use("/posts", postsRouter);

module.exports = router;