const { User } = require("../models/user.model");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

const verifyAccount = catchAsync(async (req, res, next) => {
  const { accountNumber, accountReceiver } = req.body;

  const receiver = await User.findOne({
    where: {
      accountNumber: accountReceiver,
      status: true,
    },
  });

  if (!receiver) {
    return next(
      new AppError(`the account number ${accountReceiver} sent does not exist`)
    );
  }

  const sender = await User.findOne({
    where: {
      accountNumber,
      status: true,
    },
  });

  if (!sender) {
    return next(
      new AppError(`the account number ${accountNumber} sent does not exist`)
    );
  }

  req.sender = sender;
  req.receiver = receiver;
  next();
});

const transaction = catchAsync(async (req, res, next) => {
  const { amount } = req.body;
  const amountSend = parseFloat(amount);
  const { sender, receiver } = req;

  if (parseFloat(sender.amount) < amountSend) {
    return next(
      new AppError(
        `You do not have enough quantity to send the required amount ${amountSend}`
      )
    );
  }

  const receiverUpdated = await receiver.update({
    amount: parseFloat(receiver.amount) + amountSend,
  });
  const senderUpdated = await sender.update({
    amount: parseFloat(sender.amount) - amountSend,
  });

  req.receiverUpdated = receiverUpdated;
  req.senderUpdated = senderUpdated;
  next();
});

module.exports = {
  verifyAccount,
  transaction,
};
