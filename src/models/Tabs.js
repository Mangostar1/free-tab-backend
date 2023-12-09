const express = require("express");

const Connection = require("../config/Connection.js");

class Tabs {
  constructor() {}

  async getAllUserTabs(userId) {
    try {
      const results = await new Promise((resolve, reject) => {
        Connection.query(
          "SELECT band_name, song_name, bass_tab, guitar_tab_1, guitar_tab_2, last_modified FROM tabs WHERE user_id = ?",
          [userId],
          (err, results) => {
            if (err) {
              reject(err);
            } else {
              resolve(results);
            }
          }
        );
      });
      return results.length === 0 ? null : results;
    } catch (error) {
      throw error;
    }
  }

  getUserTabById(userId, tabId) {
    return new Promise((resolve, reject) => {
      Connection.query(
        "SELECT band_name, song_name, bass_tab, guitar_tab_1, guitar_tab_2, last_modified FROM tabs WHERE user_id = ? AND id = ?",
        [userId, tabId],
        (err, results) => {
          if (err) {
            reject(err);
          } else {
            if (results.length === 0) {
              resolve(null);
            } else {
              resolve(results[0]);
            }
          }
        }
      );
    });
  }

  setTab(
    bandName,
    songName,
    userId,
    bassTab,
    guitarTabOne,
    guitarTabTwo,
    lastModified,
    callback
  ) {
    Connection.query(
      "INSERT INTO tabs (band_name, song_name, user_id, bass_tab, guitar_tab_1, guitar_tab_2, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        bandName,
        songName,
        userId,
        bassTab,
        guitarTabOne,
        guitarTabTwo,
        lastModified,
      ],
      callback
    );
  }

  /* updateBassTab(userId) {
    Connection.query('', [], callback)
  } */

  /* updateGuitarTab(userId) {
    Connection.query('', [], callback)
  } */

  /* deleteTab(userId) {
    Connection.query('', [], callback)
  } */
}

module.exports = new Tabs();
