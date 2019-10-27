"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// hint : try to use interface
class CourseModel {
    constructor() {
    }
    castToCourseModel(user) {
        const courseModel = new CourseModel();
        courseModel.courseId = user.id;
        courseModel.name = user.name;
        courseModel.description = user.description;
        courseModel.units = user.units;
        return courseModel;
    }
}
exports.CourseModel = CourseModel;
