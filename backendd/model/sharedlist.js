const mongoose = require("mongoose");

const sharedList = mongoose.Schema({
  userid: mongoose.Types.ObjectId,
  sharedList: [{ listID: mongoose.Types.ObjectId, validity: String }],
});

module.exports=mongoose.model('sharedList',sharedList)