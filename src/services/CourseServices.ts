import { CourseDao } from "../db/dao/CourseDao";
import { CourseModel } from "../models/CourseModel";
import { Logger } from "../util/Logger";
 
/**
   * @author 99x Technology
   * @description course services
   */

// hint : try to use a interface 
export class CourseService {
    private logger = new Logger();
    private courseDao = new CourseDao();

    public addCourse(course: CourseModel): Promise<CourseModel> {
        return new Promise<CourseModel>((resolve, reject) => {
            return this.courseDao.add(course);
        });   
    }

    public getCourse(course: CourseModel): Promise<CourseModel[]> {
        return this.courseDao.getCourse(course);
    }
    public getUnitForCourse(course: CourseModel,data: any): Promise<CourseModel[]> {
        return this.courseDao.updateCourse(course, { $push: { units: data }});
    }

    public updateCourse(id : string ,unit: any): Promise<CourseModel> {
        return this.courseDao.addUnit({"id": id}, unit);
    }

    public deleteCourse(courseData: CourseModel): Promise<boolean> {
        return this.courseDao.deleteCourse({"id": courseData.courseId});
    }
}
