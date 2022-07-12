import { Entity, EntityProps } from './base.entity';
import { v4 as uuidv4 } from 'uuid';
import { Team } from './team.entity';

export type UserProps = EntityProps & {
	name?: string;
	email?: string;
	birthDate?: Date;
	gender?: string;
	state?: string;
	city?: string;
	team?: Team;
};

export class User extends Entity {
	public readonly id: string;

	private constructor(props: UserProps, id?: string) {
		super(props, id);
	}

	static create(props: UserProps, id?: string) {
		return new User(props, id);
	}
	
	getProps(): UserProps {
		return this.props as UserProps;
	}

	updateName(name: string) {
		this.name = name;
	}

	updateEmail(email: string) {
		this.email = email;
	}

	get name() { return this.getProps().name; }
	set name(value: string) { this.getProps().name = value; }

	get email() { return this.getProps().email; }
	set email(value: string) { this.getProps().email = value; }

	get birthDate() { return this.getProps().birthDate; }
	set birthDate(value: Date) { this.getProps().birthDate = value; }

	get gender() { return this.getProps().gender; }
	set gender(value: string) { this.getProps().gender = value; }

	get city() { return this.getProps().city; }
	set city(value: string) { this.getProps().city = value; }

	get state() { return this.getProps().state; }
	set state(value: string) { this.getProps().state = value; }
}