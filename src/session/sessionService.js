import express from "express";

let userID = null;

export function setUserID(newUserID) {
  userID = newUserID;
}

export function getUserID() {
  return userID;
}