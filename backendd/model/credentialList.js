const mongoose = require("mongoose");

const credentialslist = mongoose.Schema({
  userid: mongoose.Schema.Types.ObjectId,
  userCredentials: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
      },
      platform: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      password: {
        type: String,
        required: true,
      },
    },
  ],
});

module.exports=mongoose.model('credentialList',credentialslist)