const express = require("express");
const router = express.Router();

const {
  AddComment,
  Allcomments,
  DeleteSingleComment,
  GetSingleComment,
  UpdateComment
} = require("../controllers/commentController/commentController");

router.post("/add", AddComment);
router.get("/", Allcomments);
router.get("/myComment", GetSingleComment);
router.patch("/updateComment", UpdateComment);
router.delete("/delete", DeleteSingleComment);

module.exports = router;
