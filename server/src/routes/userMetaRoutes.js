const express = require("express");
const {createUserMeta,getUserMeta,updateUserMeta,deleteUserMeta} = require("../controllers/userMetaController/userMetaController");

const router = express.Router();

router.post("/create", createUserMeta );
router.get("/", getUserMeta );
router.patch("/update", updateUserMeta);
router.delete("/delete", deleteUserMeta );



module.exports = router;