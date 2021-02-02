import {StudentStatus} from "../student.model";

//only the fields you want to sort by
export class GetStudentsFilterDto {
    averageGrades: number;
    status: StudentStatus;
}

