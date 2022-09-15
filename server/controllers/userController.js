const bcrypt = require("bcrypt");
const { Admin } = require("../models");
const { sendResetPasswordEmail } = require("../mail/mail");
const { sign } = require("jsonwebtoken");
const { Op } = require("sequelize");

// 1. Create Admin

const createAdmin = async (req, res) => {
  const { username, password, email } = req.body;
  const userEmail = await Admin.findOne({ where: { email: email } });
  const userName = await Admin.findOne({ where: { username: username } });

  if (userEmail) {
    res.json({ error: "Email is already used" });
  } else if (userName) {
    res.json({ error: "This username has already been taken" });
  } else {
    bcrypt.hash(password, 10).then((hash) => {
      const newUser = Admin.create({
        username: username,
        password: hash,
        email: email,
      });
      res.json(newUser);
    });
  }
};

const loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  const user = await Admin.findOne({
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
  const user = await Admin.findOne({ where: { email: email } });

  if (!user) {
    res.json({ error: "This Email doesn't exist!" });
  } else {
    await sendResetPasswordEmail(user);
    res.json("SUCCESS");
  }
};

// 2. Get Admin

const getAdminStatus = async (req, res) => {
  res.json(req.user);
};

const getAdminInfo = async (req, res) => {
  const adminId = req.params.adminId;
  const user = await Admin.findAll({ where: { id: adminId } });
  res.json(user);
};

// 3. Update Admin

const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  const user = await Admin.findOne({ where: { username: req.user.username } });

  bcrypt.compare(oldPassword, user.password).then(async (match) => {
    if (!match) {
      res.json({ error: "Wrong Password Entered!" });
    } else {
      bcrypt.hash(newPassword, 10).then((hash) => {
        Admin.update(
          { password: hash },
          { where: { username: req.user.username } }
        );
        res.json("SUCCESS");
      });
    }
  });
};

const updateEmail = async (req, res) => {
  const { oldEmail, newEmail } = req.body;
  const user = await Admin.findOne({ where: { email: oldEmail } });

  if (!user) {
    res.json({ error: "Wrong Email Entered!" });
  } else {
    Admin.update(
      { email: newEmail },
      { where: { username: req.user.username } }
    );
    res.json("SUCCESS");
  }
};

const newPassword = async (req, res) => {
  const id = req.params.id;
  const newPassword = req.body.password;
  bcrypt.hash(newPassword, 10).then((hash) => {
    Admin.update({ password: hash }, { where: { id: id } });
    res.json("SUCCESS");
  });
};

module.exports = {
  createAdmin,
  loginAdmin,
  resetPassword,
  getAdminStatus,
  getAdminInfo,
  updatePassword,
  updateEmail,
  newPassword,
};
