const express = require("express");

const Connection = require("../config/Connection.js");

class Tabs {
  constructor() {}

  async getAllUserTabs(userId) {
    try {
      const results = await new Promise((resolve, reject) => {
        Connection.query(
          "SELECT tabs.band_name, tabs.song_name, bass_tab.bass_tab_data, guitar_tab.guitar_tab_data, tabs.last_modified FROM tabs INNER JOIN  bass_tab ON(tabs.bass_tab_id = bass_tab.bass_tab_id) INNER JOIN  guitar_tab ON(tabs.guitar_tab_id_1 = guitar_tab.guitar_tab_id) WHERE tabs.user_id = ?",
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
        "SELECT tabs.band_name, tabs.song_name, bass_tab.bass_tab_data, guitar_tab.guitar_tab_data, tabs.last_modifiedFROM tabs LEFT JOIN  bass_tab ON(tabs.bass_tab_id = bass_tab.bass_tab_id) LEFT JOIN  guitar_tab ON(tabs.guitar_tab_id_1 = guitar_tab.guitar_tab_id) WHERE tabs.user_id = ? AND tabs.id_tabs = ?",
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

  setTab(bandName, songName, userId, bassTabId, guitarTabOneId, guitarTabTwoId, lastModified, callback) {
    Connection.query(
      "INSERT INTO tabs (band_name, song_name, user_id, bass_tab_id, guitar_tab_id_1, guitar_tab_id_2, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [bandName, songName, userId, bassTabId, guitarTabOneId, guitarTabTwoId, lastModified],
      callback
    );
  }

  incertBassTab(bassArticle, userId) {
    return new Promise((resolve, reject) => {
      Connection.query("INSERT INTO bass_tab (bass_tab_data, user_id) VALUES (?, ?)", [bassArticle, userId], (error, results) => {
        if (error) {
          reject(error);
        }
      });
    });
  }

  getLastBassTabByUserId(userId) {
    return new Promise((resolve, reject) => {
      Connection.query("SELECT bass_tab_id, user_id FROM `bass_tab` WHERE user_id = ? ORDER BY `bass_tab`.`bass_tab_id` DESC", [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            resolve(results[0]);
          }
        }
      })
    })
  }

  incertGuitarTab(guitarArticle, userId) {
    return new Promise((resolve, reject) => {
      Connection.query("INSERT INTO guitar_tab (guitar_tab_data, user_id) VALUES (?, ?)", [guitarArticle, userId], (error, results) => {
        if (error) {
          reject(error);
        }
      });
    });
  }

  getLastGuitarTabByUserId(userId) {
    return new Promise((resolve, reject) => {
      Connection.query("SELECT guitar_tab_id, user_id FROM `guitar_tab` WHERE user_id = ? ORDER BY `guitar_tab`.`guitar_tab_id` DESC", [userId], (error, results) => {
        if (error) {
          reject(error);
        } else {
          if (results.length === 0) {
            resolve(null);
          } else {
            resolve(results[0]);
          }
        }
      })
    })
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
