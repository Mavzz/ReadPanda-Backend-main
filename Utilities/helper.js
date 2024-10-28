const bcrypt = require("bcrypt");

exports.cryptPassword = (password) => {
  let psswd = bcrypt.hashSync(password, 10);
  return psswd;
};

exports.decryptPassword = (password) => {
  let hash = this.cryptPassword(password);
  let compared = bcrypt.compareSync(password, hash);
  return compared;
};
