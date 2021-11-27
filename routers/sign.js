const express = require('express');
const Users = require('../schemas/users');
const jwt = require('jsonwebtoken');
const authMiddleWares = require('../auth-middlewares/auth-middlewares');
const router = express.Router();

router.post('/up', async (req, res) => {
    const { nickname, password, password2 } = req.body;

    if (nickname == '' || password == '' || password2 == '') {
        res.status(400).send({
            errorMessage: '빈칸이 있습니다.',
        });
        return;
    } else if (password !== password2) {
        res.status(400).send({
            errorMessage: '패스워드가 패스워드 확인란과 동일하지 않습니다.',
        });
        return;
    } else if (password.includes(nickname)) {
        res.status(400).send({
            errorMessage: '패스워드에 닉네임이 포함되어 있습니다.',
        });
        return;
    } else if (nickname.length < 3 || (!/^[a-zA-Z0-9]+$/g.test(nickname))) {
        res.status(400).send({
            errorMessage: '닉네임 형식에 맞지 않습니다.',
        });
        return;
    } else if (password.length < 4) {
        res.status(400).send({
            errorMessage: '패스워드 형식에 맞지 않습니다.',
        });
        return;
    }

    const existUsers = await Users.find({ nickname: nickname });

    if (existUsers.length) {
        res.status(400).send({
            errorMessage: '중복된 닉네임입니다.',
        });
        return;
    }

    await Users.create({ nickname, password });

    res.status(201).send({ result: '회원가입에 성공' });
});

router.post('/in', async (req, res) => {
    const { nickname, password } = req.body;
    const user = await Users.findOne({ nickname, password });
    if (!user) {
        res.status(400).send({
            errorMessage: '닉네임 또는 패스워드가 잘못됐습니다.',
        });
        return;
    }
    const token = jwt.sign({ userId: user['userId'] }, 'my-secret-key');
    res.send({
        token,
    });
});

router.get('/me', authMiddleWares, async (req, res) => {
    const { user } = res.locals;
    res.send({
        user
    });
});

module.exports = router;
