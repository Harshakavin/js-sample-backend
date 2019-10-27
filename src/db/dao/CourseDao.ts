import { CourseModel } from "../../models/CourseModel";
import { Logger } from "../../util/Logger";
import { Course} from "../schemas/courseSchema";

 /**
   * @author 99x Technology
   * @description course DAO handle the add,update,delete,get functions
   */

export class CourseDao {
    public logger = new Logger();
    public static instance: CourseDao = null;

    public static getInstance(): CourseDao {
    if (CourseDao.instance === null) {
        CourseDao.instance = new CourseDao();
    }
    return CourseDao.instance;
    }

    public add(course: CourseModel): Promise<any> {
        return new Promise(( resolve , reject) => {
            Course.create(course).then((courseData: any) => {               
                resolve(courseData);
            }).catch((err: any) => {
                if (err.code === 11000) {
                    reject("DUPLICATE: Course already exist");
                } else {
                    reject(err.message.toString());
                }
            });
        });
    }

    public getCourse(obj: object): Promise<CourseModel[]> {
        return new Promise((resolve, reject) => {
            Course.find(obj).then((response: any[]) => {
                const courses: CourseModel[] = response.map( (course) => new CourseModel().castToCourseModel(course));
                resolve(courses);
            }).catch((err: Error) => {
                reject(err.message.toString());
            });
        });
    }


    public updateCourse( condition: any, data: object): Promise<any> {
        return new Promise((resolve, reject) => {
            Course.update(condition, {$set: data}, {multi: true})
                .then((response: any) => {
                    resolve(response);
                }).catch((err: Error) => {
                    reject(err.message.toString());
                });
        });
    }
    
    public addUnit( condition: any, unit: any): Promise<any> {
        return new Promise((resolve, reject) => {
            Course.update(condition, {$push: {units: unit }}, {multi: true})
                .then((response: any) => {
                    resolve(response);
                }).catch((err: Error) => {
                    reject(err.message.toString());
                });
        });
    }

    public deleteCourse(condition: any): Promise<any> {
        return new Promise((resolve, reject) => {
            Course.findOneAndRemove(condition)
                .then((respose:any) => {
                    resolve(respose);
                }).catch((err: Error) => {
                    reject(err.message.toString());
                });
        });
    }
}
