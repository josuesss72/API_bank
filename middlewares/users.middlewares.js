const { catchAsync } = require("../utils/catchAsync");
const { Transfers } = require("../models/transfers.model");
const AppError = require("../utils/appError");

exports.verifyUserTransfers = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const transfers = await Transfers.findAll({
    where: {
      senderUserId: id,
    },
  });

  if (!transfers) {
    return next(new AppError("Not was found the transfers", 404));
  }

  req.transfers = transfers;
  next();
});
