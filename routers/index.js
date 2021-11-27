const express = require("express");
const Post = require("./post");
const Sign = require('./sign');
const router = express.Router();

router.use('/posts/', Post);
router.use('/sign/', Sign);

module.exports = router;
