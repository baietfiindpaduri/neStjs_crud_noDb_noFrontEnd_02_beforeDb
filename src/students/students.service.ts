import { Injectable } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { Student, StudentStatus } from './student.model';
import { v4 as uuidv4 } from 'uuid';
import { GetStudentsFilterDto } from './dto/get-students-filter.dto';

@Injectable()
export class StudentsService {

    private students: Student[] = [];

    getAllStudents(): Student[] {
        return this.students;
    }

    getStudentsWithFilters(getStudentFilterDto: GetStudentsFilterDto): Student[] {
        const {averageGrades, status} = getStudentFilterDto; // extract some properties from the object and use them

        let students = this.getAllStudents();

        if(status){
            students = students.filter(student => student.status === status);
        }

        if(averageGrades) {
            console.log("only show students with averageGrades > 8");
            students = students.filter(s => s.averageGrades > 8)
        }
        return students;
    }


    createStudent(createStudentDto : CreateStudentDto):Student {
        //din obiectul respectiv extrag ce ma intereseaza
        const {fullName, age, averageGrades} = createStudentDto;

        const student: Student = {
            id: uuidv4(),
            fullName,
            age,
            averageGrades,
            status: StudentStatus.GRADUATED
        }
        this.students.push(student);
        return student; //returning this will help on the frontEnd
    }

    getStudentById(id: string): Student {
        return this.students.find(student => student.id === id);
    }

}
