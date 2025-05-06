const express = require("express");
const Pool = require("../config/Connection.js");

class Tabs {
  constructor() {}

  async getAllUserTabs(userId) {
    try {
      const results = await Pool.execute(
        "SELECT tabs.id AS tabID, tabs.band_name, tabs.song_name, bass_tab.bass_tab_data, guitar_tab.guitar_tab_data, tabs.last_modified FROM tabs LEFT JOIN bass_tab ON(tabs.bass_tab_id = bass_tab.bass_tab_id) LEFT JOIN guitar_tab ON(tabs.guitar_tab_id_1 = guitar_tab.guitar_tab_id) WHERE tabs.user_id = ?",
        [userId]
      );
      return results[0].length === 0 ? null : results[0];
    } catch (error) {
      throw error;
    }
  }

  async getUserTabById(userId, tabId) {
    try {
      const results = await Pool.execute(
        "SELECT tabs.id AS tabID, tabs.user_id AS userID, tabs.band_name, tabs.song_name, bass_tab.bass_tab_data, guitar_tab.guitar_tab_data, tabs.last_modified FROM tabs LEFT JOIN bass_tab ON(tabs.bass_tab_id = bass_tab.bass_tab_id) LEFT JOIN guitar_tab ON(tabs.guitar_tab_id_1 = guitar_tab.guitar_tab_id) WHERE tabs.user_id = ? AND tabs.id_tabs = ?",
        [userId, tabId]
      );
      return results[0].length === 0 ? null : results[0][0];
    } catch (error) {
      throw error;
    }
  }

  async setTab(bandName, songName, userId, bassTabId, guitarTabOneId, guitarTabTwoId, lastModified) {
    try {
      await Pool.execute(
        "INSERT INTO tabs (band_name, song_name, user_id, bass_tab_id, guitar_tab_id_1, guitar_tab_id_2, last_modified) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [bandName, songName, userId, bassTabId, guitarTabOneId, guitarTabTwoId, lastModified]
      );
      return { success: true };
    } catch (error) {
      throw error;
    }
  }

  async insertBassTab(bassArticle, userId) {
    try {
      await Pool.execute("INSERT INTO bass_tab (bass_tab_data, user_id) VALUES (?, ?)", [bassArticle, userId]);
    } catch (error) {
      throw error;
    }
  }

  async getLastBassTabByUserId(userId) {
    try {
      const results = await Pool.execute(
        "SELECT bass_tab_id, user_id FROM `bass_tab` WHERE user_id = ? ORDER BY `bass_tab`.`bass_tab_id` DESC LIMIT 1",
        [userId]
      );
      return results[0].length === 0 ? null : results[0][0];
    } catch (error) {
      throw error;
    }
  }

  async insertGuitarTab(guitarArticle, userId) {
    try {
      await Pool.execute("INSERT INTO guitar_tab (guitar_tab_data, user_id) VALUES (?, ?)", [guitarArticle, userId]);
    } catch (error) {
      throw error;
    }
  }

  async getLastGuitarTabByUserId(userId) {
    try {
      const results = await Pool.execute(
        "SELECT guitar_tab_id, user_id FROM `guitar_tab` WHERE user_id = ? ORDER BY `guitar_tab`.`guitar_tab_id` DESC LIMIT 1",
        [userId]
      );
      return results[0].length === 0 ? null : results[0][0];
    } catch (error) {
      throw error;
    }
  }

  async deleteTabById(tabId, userId) {
    try {
      
      // Delete from bass_tab
      await Pool.execute("DELETE FROM bass_tab WHERE bass_tab_id IN (SELECT bass_tab_id FROM tabs WHERE id = ?)", [tabId]);
      
      // Delete from guitar_tab
      await Pool.execute("DELETE FROM guitar_tab WHERE guitar_tab_id IN (SELECT guitar_tab_id_1 FROM tabs WHERE id = ?)", [tabId]);
      
      // Delete from tabs
      await Pool.execute("DELETE FROM tabs WHERE id = ? AND user_id = ?", [tabId, userId]);
      
    } catch (error) {
      throw error;
    }
  }

  async countTabsByUser(userId) {
    const [rows] = await Pool.execute(
      "SELECT COUNT(*) AS count FROM tabs WHERE user_id = ?",
      [userId]
    );
    return rows[0].count;
  }
}

module.exports = new Tabs();