const express = require("express");
const router = express.Router();

const Connection = require('../config/Connection.js');

class Users {
  constructor() {}

  createUser(name, last_name, email, password, callback) {
    Connection.query('INSERT INTO user (name, last_name, email, password) VALUES (?, ?, ?, ?)', [name, last_name, email, password], callback);
  }

  getUserById(id, callback) {
    Connection.query('SELECT name, last_name, email FROM user WHERE id = ?', [id], callback);
  }

  loginUser(email, password, callback) {
    Connection.query('SELECT * FROM user WHERE email = ? AND password = ?', [email, password], callback);
  }

  /* updateUser(id, nuevoUsuario, callback) {
    Connection.query('UPDATE user SET ? WHERE id = ?', [nuevoUsuario, id], callback);
  } */

  /* deleteUser() {
    Connection.query();
  } */
}

module.exports = new Users();