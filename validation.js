module.exports = {
    isNickname: (nickname) => {
        if (nickname.length < 3 || !/^[a-zA-Z0-9]+$/gi.test(nickname)) {
            return false;
        } else if (['nick', 'admin', 'master'].includes(nickname)) {
            return false;
        } 
        return true;
    },
    isPassword: (nickname, password, password2) => {
        if (password.length < 4 || password.includes(nickname)) {
            return false;
        } else if (password !== password2) {
            return false;
        }
        return true;
    }
};
