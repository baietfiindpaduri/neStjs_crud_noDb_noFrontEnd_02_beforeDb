//repositories manage entities in an encapsulated manner 
// (pt a nu supraaglomera serviciile si cu operatiunile necesare db..)
// the repository will be called from the service

import { EntityRepository, Repository } from "typeorm";
import { Task } from "./task.entity";

// <Task> is imported from the entity, not the model
@EntityRepository(Task)
export class TaskRepository extends Repository<Task> {

}