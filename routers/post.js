const express = require("express");
const Posts = require("../schemas/posts");
const Comments = require('../schemas/comments');
const authMiddleWares = require('../auth-middlewares/auth-middlewares');
const router = express.Router();

// 모든 게시글 데이터를 반환하는 함수
router.get("/", async (req, res) => {
    try {
        let posts = await Posts.find().sort({postId: -1});
        res.send({ posts });
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});

//개시글 생성
router.post("/", async (req, res) => {
    try {
        const {title, userId, content, nickname} = req.body;
        await Posts.create({userId, title, content, nickname});
        res.send({result: 'success'});
    } catch (error) {
        res.status(400).send({});
    }
});

//게시글 수정
router.put("/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const { title, content } = req.body;
        await Posts.updateOne({postId: postId}, {title: title, content: content});
        res.send({result: 'success'});
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});

//게시글 상세 페이지
router.get("/:postId", async (req, res) => {
    try {
        const { postId } = req.params;
        const posts = await Posts.findOne({ postId });
        res.send({ posts });
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});

//댓글 생성
router.post("/:postId/comments", async (req, res) => {
    try {
        const { postId } = req.params;
        const { comment, userId, nickname } = req.body;
        await Comments.create({ comment, userId, nickname, postId });
        res.send({result: 'success'});
    } catch (error) {
        res.status(400).send({});
    }
});

//댓글 불러오기
router.get("/:postId/comments", async (req, res) => {
    try {
        const { postId } = req.params;
        let comments = await Comments.find({ postId }).sort({createdAt: -1});
        res.send({ comments });
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});

//댓글 삭제
router.delete('/:postId/comments/:commentId', async (req, res) => {
    const { postId, commentId } = req.params;
    
    await Comments.deleteOne({postId, commentId});
    res.send({result: 'success'});
});

//댓글 수정
router.patch('/:postId/comments/:commentId', async (req, res) => {
    try {
        const { postId, commentId } = req.params;
        const { comment } = req.body;
        await Comments.updateOne({postId: postId, commentId: commentId}, { comment });
        res.send({result: 'success'});
    } catch (error) {
        console.log(`${req.method} ${req.originalUrl} : ${error.message}`);
        res.status(400).send();
    }
});
module.exports = router;
