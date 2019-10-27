import { IRequest } from "../middleware/Auth";
import { CourseModel } from "../models/CourseModel";
import { CourseService } from "../services/CourseServices";
import { Logger } from "../util/Logger";

export class CourseController {

    public courseService = new CourseService();
    public logger = new Logger();

    public addCourse = (req: any, res: any) => {
        try {
            const data = req.body.course;
            const course  = new CourseModel().castToCourseModel(data);
            this.courseService.addCourse(course).then((course: any) => {
                res.status(200).json({"message":"Course Added"});
            }).catch((error) => {
                this.logger.error(error);
                res.status(400).json({ error: "Error" });
            });
        } catch (error) {
            this.logger.error(error);
            res.status(417).json({ error: "Error" });
        }
    }
    public addUnitForCourse = (req: any, res: any) => {
        try {
            const id = req.params.courseId;
            const unit = req.body.unit;
            this.courseService.getUnitForCourse(id,unit).then((course: any) => {
                res.status(200).json({"message":"unit added to course id: "+id });
            }).catch((error) => {
                this.logger.error(error);
                res.status(400).json({ error: "Error" });
            });
        } catch (error) {
            this.logger.error(error);
            res.status(417).json({ error: "Error" });
        }
    }
    public getCourses = (req: IRequest, res: any) => {
        res.status(417).json({ message: "not implemented" });
    }

}
