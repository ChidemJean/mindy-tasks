import { Entity, EntityProps } from './base.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';
import { Team } from './team.entity';
import { Task } from './task.entity';
import { Group } from './group.entity';

export type ProjectProps = EntityProps & {
	name: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;
   users?: User[];
   teams?: Team[];
   tasks?: Task[];
   groups?: Group[];
};

export class Project extends Entity {
	public readonly id: string;

	private constructor(props: ProjectProps, id?: string) {
		super(props, id);
	}

   getProps(): ProjectProps {
      throw new Error('Method not implemented.');
   }
}