const express = require("express");
const {
  getUser,
  updateUser,
  deleteUser
} = require("../controllers/userController/adminController");
const routes = express.Router();

routes.get("/all-users", getUser);
routes.patch("/update-userData", updateUser);
routes.delete("/delete-userData", deleteUser);


module.exports = routes;
