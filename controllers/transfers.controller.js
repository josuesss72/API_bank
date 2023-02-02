const { Transfers } = require("../models/transfers.model");
const { catchAsync } = require("../utils/catchAsync");

exports.sendTransfer = catchAsync(async (req, res, next) => {
  const { sender, receiver } = req;
  const { amount } = req.body;

  const transfer = await Transfers.create({
    amount,
    senderUserId: sender.id,
    receiverUserId: receiver.id,
  });

  res.status(200).json({
    status: "success",
    message: "Transfers send successfilly",
    receiver: {
      name: receiver.name,
      accountNumber: receiver.accountNumber,
    },
    sender: {
      name: sender.name,
      accountNumber: sender.accountNumber,
      amount: sender.amount,
      amountSend: amount,
    },
    transfer,
  });
});
