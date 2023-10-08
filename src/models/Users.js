const express = require("express");
const router = express.Router();

const Connection = require('../config/Connection.js');

class Users {
  constructor() {}

  createUser(name, email, password, callback) {
    Connection.query('INSERT INTO user (name, email, password) VALUES (?, ?, ?)', [name, email, password], callback);
  }

  getUserById(id, callback) {
    Connection.query('SELECT name, last_name, email FROM user WHERE id = ?', [id], callback);
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

  /* updateUser(id, nuevoUsuario, callback) {
    Connection.query('UPDATE user SET ? WHERE id = ?', [nuevoUsuario, id], callback);
  } */

  /* deleteUser() {
    Connection.query();
  } */
}

module.exports = new Users();