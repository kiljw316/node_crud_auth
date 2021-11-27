const mongoose = require("mongoose");
const { Schema } = mongoose;

const autoIncrement = require('mongoose-auto-increment');
autoIncrement.initialize(mongoose.connection);

const commentsSchema = new Schema({
    commentId: {
        type: Number,
        required: true,
        unique: true,
    },
    userId: {
        type: Number,
        required: true,
    },
    postId: {
        type: Number,
        required: true,
    },
    nickname: {
        type: String,
        required: true,
    },
    comment: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
});
commentsSchema.plugin(autoIncrement.plugin, {
    model: 'Comments',
    field: 'commentId',
    startAt: 1,
    increment: 1
})
module.exports = mongoose.model(`Comments`, commentsSchema);
