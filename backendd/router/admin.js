const express = require("express");
const { getUserList, manageBlock, AdminLog } = require("../controller/adminHelper");
const { AdminverifyJWT } = require("../controller/adminjwtVerify");
const router = express.Router();

router.post('/login', (req, res,next) => {
  AdminLog(req.body).then((response) => {
    res.status(200).json(response)
  }).catch((err) => {
    console.log(err);
    next(err)
  })
})


router.get('/getUserList',AdminverifyJWT,(req, res,next) => {
  console.log('called');
  getUserList().then((response) => {
   res.status(200).json(response)
  }).catch((err) => {
   next(err)
 })
})

router.post('/block/:id',AdminverifyJWT,(req, res,next) => {
  manageBlock(req.params.id).then(() => {
    res.sendStatus(200)
  }).catch((err) => {
    next(err)
  })
})



module.exports = router;
