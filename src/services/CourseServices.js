"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CourseDao_1 = require("../db/dao/CourseDao");
const Logger_1 = require("../util/Logger");
/**
   * @author 99x Technology
   * @description course services
   */
// hint : try to use a interface 
class CourseService {
    constructor() {
        this.logger = new Logger_1.Logger();
        this.courseDao = new CourseDao_1.CourseDao();
    }
    addCourse(course) {
        return new Promise((resolve, reject) => {
            return this.courseDao.add(course);
        });
    }
    getCourse(course) {
        return this.courseDao.getCourse(course);
    }
    getUnitForCourse(course, data) {
        return this.courseDao.updateCourse(course, { $push: { units: data } });
    }
    updateCourse(id, unit) {
        return this.courseDao.addUnit({ "id": id }, unit);
    }
    deleteCourse(courseData) {
        return this.courseDao.deleteCourse({ "id": courseData.courseId });
    }
}
exports.CourseService = CourseService;
