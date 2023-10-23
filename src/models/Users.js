const express = require("express");
const router = express.Router();

const Connection = require('../config/Connection.js');

class Users {
  constructor() {}

  createUser(name, email, password, callback) {
    Connection.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, password], callback);
  }

  getUserById(id) {
    return new Promise((resolve, reject) => {
      Connection.query('SELECT * FROM user WHERE id = ?', [id], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            resolve(results[0]);
          }
        }
      });
    });
  }

  findUserByEmail(email) {
    return new Promise((resolve, reject) => {
      Connection.query('SELECT * FROM user WHERE email = ?', [email], (err, results) => {
        if (err) {
          reject(err);
        } else {
          if (results.length === 0) {
            resolve(null); // Usuario no encontrado
          } else {
            resolve(results[0]); // Devuelve el primer usuario encontrado
          }
        }
      });
    });
  }

  updateUserName(id, name, callback) {
    Connection.query('UPDATE user SET name = ? WHERE id = ?', [name, id], callback);
  }

  updateUserEmail(id, name, callback) {
    Connection.query('UPDATE user SET email = ? WHERE id = ?', [name, id], callback);
  }

  deleteUser(userId, callback) {
    Connection.query('DELETE FROM user WHERE id = ?', [userId], callback);
  }
}

module.exports = new Users();