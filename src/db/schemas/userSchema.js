"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const user = new mongoose.Schema({
    userId: String,
    firstName: String,
    lastName: String,
    email: { type: String, unique: true },
    username: { type: String, unique: true },
    password: { type: String, unique: true },
    mobileNo: { type: String, unique: true },
    status: { type: String, default: 'Enable' },
    address: String,
});
const User = mongoose.model("User", user);
exports.User = User;
