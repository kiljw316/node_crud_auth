const express = require('express');
const router = express.Router();

// 메인페이지
router.get("/", (req, res) => {
    res.render("posts");
});

router.get("/:postId", (req, res) => {
    const { postId } = req.params;
    res.render("detail", { postId });
});

// 에러페이지
router.get("/err", (req, res) => {
    res.render("err");
});

module.exports = router;