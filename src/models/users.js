var users = [];

module.exports = class User {
  constructor(user) {
    this.user = user;
  }

  addUser() {
    users.push(this); // this keyword has user data
    console.log(users);
  }

  fetchUsers() {
    return users;
  }
};
