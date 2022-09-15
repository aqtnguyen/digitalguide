const { Tourist } = require("../models");
const { sign } = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");
const { sendResetMobilePasswordEmail } = require("../mail/mail");

// 1. Create Tourist

const createTourist = async (req, res) => {
  const { username, password, email } = req.body;
  const userEmail = await Tourist.findOne({ where: { email: email } });
  const userName = await Tourist.findOne({ where: { username: username } });

  if (userEmail) {
    res.json({ error: "Email is already used" });
  } else if (userName) {
    res.json({ error: "This user name has already been taken" });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      const newUser = Tourist.create({
        username: username,
        password: hash,
        email: email,
      });
      res.json(newUser);
    });
  }
};

const loginTourist = async (req, res) => {
  const { username, password } = req.body;

  const user = await Tourist.findOne({
    where: {
      [Op.or]: [{ username: username }, { email: username }],
    },
  });

  if (!user) {
    res.json({ error: "User Doesn't Exist" });
  } else {
    bcrypt.compare(password, user.password).then(async (match) => {
      if (!match) {
        res.json({ error: "Wrong Username And Password Combination" });
      } else {
        const accessToken = sign(
          { username: user.username, id: user.id },
          "importantsecret"
        );
        res.json({ token: accessToken, username: user.username, id: user.id });
      }
    });
  }
};

const resetPassword = async (req, res) => {
  const { email } = req.body;
  const user = await Tourist.findOne({ where: { email: email } });

  if (!user) {
    res.json({ error: "This Email doesn't exist!" });
  } else {
    await sendResetMobilePasswordEmail(user);
    res.json("SUCCESS");
  }
};

// 2.Get Tourist

const getTouristStatus = async (req, res) => {
  res.json(req.user);
};

const getTouristInfo = async (req, res) => {
  const touristId = req.params.touristId;
  const user = await Tourist.findAll({ where: { id: touristId } });
  res.json(user);
};

// 3. Update Tourist

const updatePassword = async (req, res) => {
  const id = req.params.id;
  const { oldPassword, newPassword } = req.body;
  const user = await Tourist.findOne({
    where: { id: id },
  });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) {
      res.json({ error: "Wrong Password Entered!" });
    } else {
      bcrypt.hash(newPassword, 10).then((hash) => {
        Tourist.update({ password: hash }, { where: { id: id } });
        res.json("SUCCESS");
      });
    }
  });
};

const updateEmail = async (req, res) => {
  const id = req.params.id;
  const { oldEmail, newEmail } = req.body;
  const user = await Tourist.findOne({ where: { email: oldEmail } });

  if (!user) {
    res.json({ error: "Wrong Email Entered!" });
  } else {
    Tourist.update({ email: newEmail }, { where: { id: id } });
    res.json("SUCCESS");
  }
};

const newPassword = async (req, res) => {
  const id = req.params.id;
  const newPassword = req.body.password;
  bcrypt.hash(newPassword, 10).then((hash) => {
    Tourist.update({ password: hash }, { where: { id: id } });
    res.json("SUCCESS");
  });
};

const addDescription = async (req, res) => {
  const id = req.params.id;
  const description = req.body.description;

  await Tourist.update({ description: description }, { where: { id: id } });
  res.json("SUCCESS");
};

module.exports = {
  createTourist,
  loginTourist,
  resetPassword,
  getTouristStatus,
  getTouristInfo,
  updatePassword,
  updateEmail,
  newPassword,
  addDescription,
};
