const { encrypt, decrypt } = require("../services/encryption-service");

var localStorage;
if (typeof localStorage === "undefined" || localStorage === null) {
  const LocalStorage = require("node-localstorage").LocalStorage;
  localStorage = new LocalStorage("./localstorage");
  localStorage.clear();
  
}

exports.isEmpty = (d) => {
  if (typeof d == "number" || typeof d == "boolean") return false;
  if (typeof d == "undefined" || d === null) return true;
  if (typeof d.length != "undefined") return d.length == 0;
  let count = 0;
  for (let i in d) if (d.hasOwnProperty(i)) count++;
  return count == 0;
};

exports.setLocalStorage = (data, name) => {
  if (this.isEmpty(data)) return "Data cannot be empty";
  if (this.isEmpty(name)) return "Name cannot be empty";
  localStorage.setItem(name, encrypt(JSON.stringify(data)));
};

exports.getLocalStorage = (name) => {
  if (this.isEmpty(name)) return "Name cannot be empty";
  let d = localStorage.getItem(name);
  if (this.isEmpty(d)) return null;
  return JSON.parse(decrypt(d));
};
