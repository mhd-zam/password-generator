const express = require("express");
const {
  signup,
  Login,
  insertdocument,
  updatedocument,
  getList,
  getPassword,
  deleteFile,
  getEditFile,
  setEditfile,
  shareFile,
  getSharedFiles,
} = require("../controller/clientHelper");
const { verifyJWT } = require("../controller/jwtVerify");
const router = express.Router();

router.get("/", (req, res) => {
  res.sendStatus(200);
});

router.post("/signup", async (req, res, next) => {
  try {
    let result = await signup(req.body);
    if (result) res.status(201).json({ message: "success" });
  } catch (err) {
    next(err);
  }
});

router.post("/login", async (req, res, next) => {
  try {
    let response = await Login(req.body);
    if (response) res.status(200).json(response);
  } catch (err) {
    next(err);
  }
});

router.post("/addToList", verifyJWT, (req, res, next) => {
  req.body._id = req.decoded.result._id;
  insertdocument(req.body)
    .then((response) => {
      res.status(201).json(response);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/updateList", verifyJWT, (req, res, next) => {
  req.body.userid = req.decoded.result._id;
  updatedocument(req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/getMyList", verifyJWT, (req, res, next) => {
  getList(req.decoded.result._id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/viewPassword/:id", verifyJWT, (req, res, next) => {
  getPassword(req.params.id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
});

router.delete("/deleteFile/:id", verifyJWT, (req, res, next) => {
  deleteFile(req.params.id, req.decoded.result._id)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

router.get("/getEditFile/:id", verifyJWT, (req, res, next) => {
  getEditFile(req.params.id, req.decoded.result._id)
    .then((response) => {
      res.status(200).json(response);
    })
    .catch((err) => {
      next(err);
    });
});

router.put("/updateFile", verifyJWT, (req, res, next) => {
  setEditfile(req.decoded.result._id, req.body)
    .then(() => {
      res.sendStatus(200);
    })
    .catch((err) => {
      next(err);
    });
});

router.post("/shareFile",verifyJWT,(req, res, next) => {
  shareFile(req.decoded.result._id,req.body)
    .then(() => {
      res.sendStatus(201);
    })
    .catch((err) => {
      next(err);
    });
});

router.get('/sharedFiles',verifyJWT, (req, res,next) => {
  getSharedFiles(req.decoded.result._id).then((result) => {
    res.status(200).json(result)
  }).catch((err) => {
    next(err)
  })
})

module.exports = router;
