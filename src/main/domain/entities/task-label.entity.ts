import { Entity, EntityProps } from './base.entity';
import { v4 as uuidv4 } from 'uuid';

export type TaskLabelProps = EntityProps & {
	name: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;
   color?: string;
};

export class TaskLabel extends Entity {
	public readonly id: string;

	private constructor(props: TaskLabelProps, id?: string) {
		super(props, id);
	}

   getProps(): TaskLabelProps {
      throw new Error('Method not implemented.');
   }
}