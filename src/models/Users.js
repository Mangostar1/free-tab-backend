const express = require("express");
const router = express.Router();

const Pool = require('../config/Connection.js');

class Users {
  constructor() {}

  async createUser(name, email, password, dateCreated, callback) {
    try {
      const [rows, fields] = await Pool.execute('INSERT INTO user (name, email, password, created_at, role, img_profile) VALUES (?, ?, ?, ?, 2, "default.png")', [name, email, password, dateCreated]);
      callback(null, rows);
    } catch (err) {
      console.error("Error en createUser:", err);
      callback(err, null);
    }
  }

  async getUserById(id) {
    try {
      const [rows, fields] = await Pool.execute('SELECT user.id, user.name AS user_name, user.email, user.password, user.img_profile, roles.role_name AS role, user.created_at, user.sm_facebook, user.sm_twitter, user.sm_instagram, user.user_description FROM user LEFT JOIN roles ON(user.role = roles.id) WHERE user.id = ?', [id]);
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

  async updateUserFacebook(id, userFacebook, callback) {
    try {
      const [rows, fields] = await Pool.execute('UPDATE user SET sm_facebook = ? WHERE id = ?', [userFacebook, id]);
      callback(null, rows);
    } catch (err) {
      console.error("Error en updateUserName:", err);
      callback(err, null);
    }
  }

  async updateUserTwitter(id, userTwitter, callback) {
    try {
      const [rows, fields] = await Pool.execute('UPDATE user SET sm_twitter = ? WHERE id = ?', [userTwitter, id]);
      callback(null, rows);
    } catch (err) {
      console.error("Error en updateUserName:", err);
      callback(err, null);
    }
  }

  async updateUserInstagram(id, userInstagram, callback) {
    try {
      const [rows, fields] = await Pool.execute('UPDATE user SET sm_instagram = ? WHERE id = ?', [userInstagram, id]);
      callback(null, rows);
    } catch (err) {
      console.error("Error en updateUserName:", err);
      callback(err, null);
    }
  }

  async updateUserDescription(id, userDescription, callback) {
    try {
      const [rows, fields] = await Pool.execute('UPDATE user SET user_description = ? WHERE id = ?', [userDescription, id]);
      callback(null, rows);
    } catch (err) {
      console.error("Error en updateUserName:", err);
      callback(err, null);
    }
  }

  async updateUserImgProfile(id, userImg, callback) {
    try {
      const [rows, fields] = await Pool.execute('UPDATE user SET img_profile = ? WHERE id = ?', [userImg, id]);
      callback(null, rows);
    } catch (err) {
      console.error("Error en updateUserName:", err);
      callback(err, null);
    }
  }
}

module.exports = new Users();