import { v4 as uuidv4 } from 'uuid';

export type EntityProps = {};

export abstract class Entity {
	public readonly id: string;
	public props: EntityProps;

	protected constructor(props: EntityProps, id?: string) {
		this.id = id || uuidv4();

		if (!props) {
			this.props = {};
			return;
		}

		this.props = {
			...props
		};
	}

	toJSON() {
		return {
			id: this.id,
			...this.props,
		};
	}

	abstract getProps(): EntityProps;
}