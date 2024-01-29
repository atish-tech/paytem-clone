const mongoose = require('mongoose');

const balanceSchema = mongoose.Schema({
    userName : {
        type : mongoose.Schema.Types.ObjectId ,
        ref : "Users" ,
        unique : true
    } ,
    balance : {
        type : Number ,
        require : true,
        default : 10000 * Math.random() + 10000
    } ,
} , {dateStamp : true});

const Balance = mongoose.model("Balance" , balanceSchema);

module.exports = Balance;