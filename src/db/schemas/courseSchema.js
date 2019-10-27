"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require("mongoose");
const courseSchema = new mongoose.Schema({
    courseId: { type: String, unique: true },
    name: String,
    description: String,
    units: [],
});
const Course = mongoose.model("Course", courseSchema);
exports.Course = Course;
