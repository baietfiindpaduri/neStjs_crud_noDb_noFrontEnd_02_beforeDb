export interface Student {
    id: string;
    fullName: string;
    age: number;
    averageGrades: number;
    status: StudentStatus;
}

export enum StudentStatus {
    FLUNKED="FLUNKED",
    MGL="MCL",
    GRADUATED="GRADUATED"
}