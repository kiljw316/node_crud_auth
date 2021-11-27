const mongoose = require("mongoose");
const { Schema } = mongoose;

const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const postsSchema = new Schema({
    postId: {
        type: Number,
        required: true,
        unique: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    content: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
postsSchema.plugin(autoIncrement.plugin, {
    model: 'Posts',
    field: 'postId',
    startAt: 1,
    increment: 1
})
module.exports = mongoose.model(`Posts`, postsSchema);
