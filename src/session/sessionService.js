const express = require("express");

let userID = null;

function setUserID(newUserID) {
  userID = newUserID;
}

function getUserID() {
  return userID;
}

module.exports = {
  setUserID,
  getUserID,
};