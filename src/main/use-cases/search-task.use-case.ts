import { inject, injectable } from 'tsyringe';
import { TaskRepositoryInterface } from '../domain/repositories/task.repository';
import { UserRepositoryInterface } from '../domain/repositories/user.repository';

@injectable()
export class SearchTasksUseCase {
  constructor(@inject('TaskRepositoryInterface') private taskRepo: TaskRepositoryInterface) {}

  async execute(input: Input): Promise<Output> {
    const tasks = await this.taskRepo.findByTermAndUser(input.user, input.term);
    return tasks.map((t) => t.toJSON()) as Output;
  }
}

type Input = {
  user: string;
  term: string;
};

type Output = {
   title?: string;
   text?: string;
   done?: boolean;
   deadline?: Date;
   note?: boolean
}[];