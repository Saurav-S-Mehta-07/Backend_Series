const mongoose = require('mongoose')

const Schema = mongoose.Schema

const chatSchema = Schema({
    from:{
        type : String,
        required:true,
    },
    to:{
       type : String,
        required:true,
    },
    msg:{
       type: String,
       required:true,
       maxLength:100,
    },
    created_at:{
        type : Date
    },
})

const Chat = mongoose.model("Chat",chatSchema);
module.exports = Chat