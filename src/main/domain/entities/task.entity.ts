import { Entity, EntityProps } from './base.entity';
import { v4 as uuidv4 } from 'uuid';

export type TaskProps = EntityProps & {
	title: string;
	text: string;
	createdAt?: Date;
	deadline?: Date;
	note?: boolean;
	user?: string;
};

export class Task extends Entity {
	public readonly id: string;

	private constructor(props: TaskProps, id?: string) {
		super(props, id);
	}

	static create(props: TaskProps, id?: string) {
		return new Task(props, id);
	}
	
	getProps(): TaskProps {
		return this.props as TaskProps;
	}

	get title() { return this.getProps().title; }
	set title(value: string) { this.getProps().title = value; }

	get text() { return this.getProps().text; }
	set text(value: string) { this.getProps().text = value; }

	get createdAt() { return this.getProps().createdAt; }
	set createdAt(value: Date) { this.getProps().createdAt = value; }

	get deadline() { return this.getProps().deadline; }
	set deadline(value: Date) { this.getProps().deadline = value; }

	get note() { return this.getProps().note; }
	set note(value: boolean) { this.getProps().note = value; }

	get user() { return this.getProps().user; }
	set user(value: string) { this.getProps().user = value; }
}