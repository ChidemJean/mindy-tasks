import { EntitySchema, EntitySchemaRelationOptions } from 'typeorm';
import { Task } from '../../domain/entities/task.entity';
import { User } from '../../domain/entities/user.entity';

export const UserSchema = new EntitySchema<User>({
   name: 'user',
   target: User,
   columns: {
      id: {
         type: 'uuid',
         primary: true,
      },
      name: {
         type: String,
         length: 255,
      },
      email: {
         type: String,
         length: 320,
      },
      birthDate: {
         type: Date,
         nullable: true
      },
      city: {
         type: String,
         length: 255,
         nullable: true
      },
      gender: {
         type: String,
         length: 255,
         nullable: true
      },
      state: {
         type: String,
         length: 255,
         nullable: true
      },
   },
   relations: {
      tasks: {
         type: 'one-to-many',
         target: 'Task',
         cascade: true,
         inverseSide: 'user'
      } as EntitySchemaRelationOptions
   } as any
});