const { Router } = require("express");
const { sendTransfer } = require("../controllers/transfers.controller");
const {
  verifyAccount,
  transaction,
} = require("../middlewares/verifyAccount.middlewares");

const router = Router();

router.post("/", verifyAccount, transaction, sendTransfer);

module.exports = { transfersRouters: router };
