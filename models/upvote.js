const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const upvoteSchema = mongoose.Schema({
    blogID:{
        type:Schema.Types.ObjectId,
        ref:'Blog'
    },
    upVoteCount:{
        type:Number,
        default:0
    }
});

const Upvote = mongoose.model('Upvote',upvoteSchema);
module.exports = Upvote;