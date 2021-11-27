const mongoose = require("mongoose");
const { Schema } = mongoose;

const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const usersSchema = new Schema({
    userId: {
        type: Number,
        required: true,
        unique: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
});
usersSchema.plugin(autoIncrement.plugin, {
    model: 'Users',
    field: 'userId',
    startAt: 1,
    increment: 1
})
module.exports = mongoose.model(`Users`, usersSchema);
