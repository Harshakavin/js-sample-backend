"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const CourseModel_1 = require("../../models/CourseModel");
const Logger_1 = require("../../util/Logger");
const courseSchema_1 = require("../schemas/courseSchema");
/**
  * @author 99x Technology
  * @description course DAO handle the add,update,delete,get functions
  */
class CourseDao {
    constructor() {
        this.logger = new Logger_1.Logger();
    }
    static getInstance() {
        if (CourseDao.instance === null) {
            CourseDao.instance = new CourseDao();
        }
        return CourseDao.instance;
    }
    add(course) {
        return new Promise((resolve, reject) => {
            courseSchema_1.Course.create(course).then((courseData) => {
                resolve(courseData);
            }).catch((err) => {
                if (err.code === 11000) {
                    reject("DUPLICATE: Course already exist");
                }
                else {
                    reject(err.message.toString());
                }
            });
        });
    }
    getCourse(obj) {
        return new Promise((resolve, reject) => {
            courseSchema_1.Course.find(obj).then((response) => {
                const courses = response.map((course) => new CourseModel_1.CourseModel().castToCourseModel(course));
                resolve(courses);
            }).catch((err) => {
                reject(err.message.toString());
            });
        });
    }
    updateCourse(condition, data) {
        return new Promise((resolve, reject) => {
            courseSchema_1.Course.update(condition, { $set: data }, { multi: true })
                .then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err.message.toString());
            });
        });
    }
    addUnit(condition, unit) {
        return new Promise((resolve, reject) => {
            courseSchema_1.Course.update(condition, { $push: { units: unit } }, { multi: true })
                .then((response) => {
                resolve(response);
            }).catch((err) => {
                reject(err.message.toString());
            });
        });
    }
    deleteCourse(condition) {
        return new Promise((resolve, reject) => {
            courseSchema_1.Course.findOneAndRemove(condition)
                .then((respose) => {
                resolve(respose);
            }).catch((err) => {
                reject(err.message.toString());
            });
        });
    }
}
exports.CourseDao = CourseDao;
CourseDao.instance = null;
