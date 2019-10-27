// hint : try to use interface
export class CourseModel {
    public courseId : string;
    public name : string;
    public description : string;
    public units : [];
    constructor(){

    }

    public castToCourseModel(user: any): CourseModel {
        const courseModel = new CourseModel();
        courseModel.courseId = user.id;
        courseModel.name = user.name;
        courseModel.description = user.description;
        courseModel.units = user.units;
        return courseModel;
    }
}
