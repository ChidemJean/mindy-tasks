import { EntitySchema, EntitySchemaRelationOptions } from "typeorm";
import { Task } from "../../domain/entities/task.entity";
import { User } from "../../domain/entities/user.entity";

export const TaskSchema = new EntitySchema<Task>({
   name: 'task',
   target: Task,
   columns: {
      id: {
         type: 'uuid',
         primary: true,
      },
      title: {
         type: String,
      },
      text: {
         type: String
      },
      createdAt: {
         type: Date,
         createDate: true
      },
      deadline: {
         type: Date,
         nullable: true
      },
      note: {
         type: Boolean,
         default: false
      }
   },
   relations: {
      user: {
         type: 'many-to-one',
         target: 'User',
         joinColumn: {
            name: 'user_id'
         },
         inverseSide: 'tasks'
      } as EntitySchemaRelationOptions
   } as any
});