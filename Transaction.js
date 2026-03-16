const mongoose = require("mongoose");

const transactionSchema = new mongoose.Schema({

  userId:{
    type: mongoose.Schema.Types.ObjectId,
    ref:"User",
    required:true
  },

  cardNumber:{
    type:String,
    required:true
  },

  type:{
    type:String,
    enum:["Deposit","Withdraw","BalanceCheck","Login"],
    required:true
  },

  amount:{
    type:Number,
    default:0
  },

  date:{
    type:Date,
    default:Date.now
  }

});

module.exports = mongoose.model("Transaction", transactionSchema);