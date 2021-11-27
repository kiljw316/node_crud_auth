const mongoose = require('mongoose');


const connect = () => {
    mongoose.connect(`mongodb://항해아이디비번@13.209.4.79:27017/admin`, (error) => {
        if (error) console.log('Mongo DB Connect Error');
        else console.log('Mongo Db Connect Success');
    });
};

mongoose.connection.on('error', (err) => {
    console.error('Mongo DB Connect Error', err);
});

// 연결 종료 시 재연결을 시도한다.
mongoose.connection.on('disconnected', () => {
    console.error('Mongo Db DisConnect. reconnect.');
    connect();
});

module.exports = connect;
