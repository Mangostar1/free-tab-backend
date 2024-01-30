import express from "express";
const router = express.Router();

import { Pool } from "../config/Connection.js";

class Users {
  constructor() {}

  async createUser(name, email, password, dateCreated, callback) {
    try {
      const [rows, fields] = await Pool.execute('INSERT INTO user (name, email, password, created_at, role) VALUES (?, ?, ?, ?, 2)', [name, email, password, dateCreated]);
      callback(null, rows);
    } catch (err) {
      console.error("Error en createUser:", err);
      callback(err, null);
    }
  }

  async getUserById(id) {
    try {
      const [rows, fields] = await Pool.execute('SELECT * FROM user WHERE id = ?', [id]);
      if (rows.length === 0) {
        return null;
      } else {
        return rows[0];
      }
    } catch (err) {
      throw err;
    }
  }

  async findUserByEmail(email) {
    try {
      const [rows, fields] = await Pool.execute('SELECT * FROM user WHERE email = ?', [email]);
      if (rows.length === 0) {
        return null;
      } else {
        return rows[0];
      }
    } catch (err) {
      throw err;
    }
  }

  async updateUserName(id, name, callback) {
    try {
      const [rows, fields] = await Pool.execute('UPDATE user SET name = ? WHERE id = ?', [name, id]);
      callback(null, rows);
    } catch (err) {
      console.error("Error en updateUserName:", err);
      callback(err, null);
    }
  }

  async updateUserEmail(id, name, callback) {
    try {
      const [rows, fields] = await Pool.execute('UPDATE user SET email = ? WHERE id = ?', [name, id]);
      callback(null, rows);
    } catch (err) {
      console.error("Error en updateUserEmail:", err);
      callback(err, null);
    }
  }

  async deleteUser(userId, callback) {
    try {
      const [rows, fields] = await Pool.execute('DELETE FROM user WHERE id = ?', [userId]);
      callback(null, rows);
    } catch (err) {
      console.error("Error en deleteUser:", err);
      callback(err, null);
    }
  }
}

/* export { Users }; */

export default new Users();