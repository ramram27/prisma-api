const express = require("express");
const router = express.Router();
const userdataRoute = require("../controllers/userdata");

router.get("/", userdataRoute.getAllUser);

router.get("/:id", userdataRoute.getUserById);

router.post("/", userdataRoute.createUser);

router.put("/:id", userdataRoute.updateUser);

router.delete("/:id", userdataRoute.deleteUser);

module.exports = router;
