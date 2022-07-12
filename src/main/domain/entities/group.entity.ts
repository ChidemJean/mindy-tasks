import { Entity, EntityProps } from './base.entity';
import { v4 as uuidv4 } from 'uuid';
import { Task } from './task.entity';

export type GroupProps = EntityProps & {
	name: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;
   tasks?: Task[];
};

export class Group extends Entity {
	public readonly id: string;

	private constructor(props: GroupProps, id?: string) {
		super(props, id);
	}

   getProps(): GroupProps {
      throw new Error('Method not implemented.');
   }
}