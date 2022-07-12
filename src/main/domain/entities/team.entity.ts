import { Entity, EntityProps } from './base.entity';
import { v4 as uuidv4 } from 'uuid';
import { User } from './user.entity';

export type TeamProps = EntityProps & {
	name: string;
	description: string;
	createdAt?: Date;
	updatedAt?: Date;
   users?: User[];
};

export class Team extends Entity {
	public readonly id: string;

	private constructor(props: TeamProps, id?: string) {
		super(props, id);
	}

   getProps(): TeamProps {
      throw new Error('Method not implemented.');
   }
}