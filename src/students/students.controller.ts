import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { CreateStudentDto } from './dto/create-student.dto';
import { GetStudentsFilterDto } from './dto/get-students-filter.dto';
import { Student } from './student.model';
import { StudentsService } from './students.service';

@Controller('students')
export class StudentsController {
    constructor(private studentsService: StudentsService){}

    @Get()
    getAllStudents(@Query() filterDto: GetStudentsFilterDto) {
       return this.studentsService.getAllStudents();
    }

    @Post()
    createStudent(@Body() createStudentDto: CreateStudentDto): Student {
        return this.studentsService.createStudent(createStudentDto);
    }

    @Get("/:id")
    getStudentById(@Param("id") id: string ): Student {
        return this.studentsService.getStudentById(id);
    }

}
