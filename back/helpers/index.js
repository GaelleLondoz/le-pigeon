// create crypting for password:
// install bcrypt

const bcrypt = require("bcrypt");
const getHash = (string) => {
  return bcrypt.hashSync(string, 10)
}
module.exports = {
    getHash
}