"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CourseModel_1 = require("../models/CourseModel");
const CourseServices_1 = require("../services/CourseServices");
const Logger_1 = require("../util/Logger");
class CourseCtrl {
    constructor() {
        this.courseService = new CourseServices_1.CourseService();
        this.logger = new Logger_1.Logger();
        this.addCourse = (req, res) => {
            try {
                const data = req.body.course;
                const course = new CourseModel_1.CourseModel().castToCourseModel(data);
                this.courseService.addCourse(course).then((course) => {
                    res.status(200).json({ "message": "Course Added" });
                }).catch((error) => {
                    this.logger.error(error);
                    res.status(400).json({ error: "Error" });
                });
            }
            catch (error) {
                this.logger.error(error);
                res.status(417).json({ error: "Error" });
            }
        };
        this.addUnitForCourse = (req, res) => {
            try {
                const id = req.params.courseId;
                const unit = req.body.unit;
                this.courseService.getUnitForCourse(id, unit).then((course) => {
                    res.status(200).json({ "message": "unit added to course id: " + id });
                }).catch((error) => {
                    this.logger.error(error);
                    res.status(400).json({ error: "Error" });
                });
            }
            catch (error) {
                this.logger.error(error);
                res.status(417).json({ error: "Error" });
            }
        };
        this.getCourses = (req, res) => {
            res.status(417).json({ message: "not implemented" });
        };
    }
}
exports.CourseCtrl = CourseCtrl;
