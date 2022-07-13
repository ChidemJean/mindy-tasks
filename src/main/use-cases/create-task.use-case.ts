import { inject, injectable } from "tsyringe";
import { Task } from "../domain/entities/task.entity";
import { User } from "../domain/entities/user.entity";
import { TaskRepositoryInterface } from "../domain/repositories/task.repository";

@injectable()
export class CreateTaskUseCase {
  constructor(@inject("TaskRepositoryInterface") private TaskRepo: TaskRepositoryInterface) {}

  async execute(input: Input): Promise<Output> {
    const { user, ..._input } = input;
    const task = Task.create({ 
      user: User.create({}, user), 
      ..._input
    });
    await this.TaskRepo.insert(task);
    return task.toJSON() as Output;
  }
}

type Input = {
  user: string,
  title: string;
  text: string;
};

type Output = {
};