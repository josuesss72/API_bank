// controladores o funciones que contienen la logica de cada type de peticion

const { User } = require("../models/user.model");
const AppError = require("../utils/appError");
const { catchAsync } = require("../utils/catchAsync");

exports.findHistory = catchAsync(async (req, res, next) => {
  const { transfers } = req;

  res.status(200).json({
    status: "success",
    message: "Transfers was found successfilly",
    transfers,
  });
});

exports.createUser = catchAsync(async (req, res, next) => {
  const { name, password, amount } = req.body;

  // Generador de numeros de 6 digitos
  const listNumber = [];
  for (let i = 0; i < 6; i++) {
    let num1 = Math.floor(Math.random() * 10);
    listNumber.push(num1);
  }

  const user = await User.findOne({
    where: {
      name,
      status: true,
    },
  });

  if (user) {
    return next(new AppError("User exixts on the database", 409));
  }

  //creamos Usuario
  const userCreated = await User.create({
    name: name.toLowerCase(),
    accountNumber: listNumber.join(""),
    password,
    amount,
  });

  res.status(201).json({
    message: "User Created successfilly",
    status: "success",
    userCreated,
  });
});

exports.userLogin = catchAsync(async (req, res, next) => {
  const { accountNumber, password } = req.body;

  const user = await User.findOne({
    where: {
      accountNumber,
      password,
    },
  });

  if (!user) {
    return next(new AppError("Account not exixts", 404));
  }

  res.status(200).json({
    status: "success",
    message: "User login successfilly",
  });
});
