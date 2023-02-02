const { Router } = require("express");
const {
  createUser,
  userLogin,
  findHistory,
} = require("../controllers/users.controller");
const { verifyUserTransfers } = require("../middlewares/users.middlewares");

const router = Router();

router.get("/:id/history", verifyUserTransfers, findHistory);
router.post("/signup", createUser);
router.post("/login", userLogin);

module.exports = {
  userRouters: router,
};
