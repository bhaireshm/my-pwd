const CryptoJS = require("crypto-js");
const secretKey = "secret key 123";

exports.encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, secretKey).toString();
};

exports.decrypt = (data) => {
  const bytes = CryptoJS.AES.decrypt(data, secretKey);
  return bytes.toString(CryptoJS.enc.Utf8);
};
