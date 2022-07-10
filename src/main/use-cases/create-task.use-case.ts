import { Task } from "../domain/entities/task.entity";
import { TaskRepositoryInterface } from "../domain/repositories/task.repository";

export class CreateTaskUseCase {
  constructor(private TaskRepo: TaskRepositoryInterface) {}

  async execute(input: Input): Promise<Output> {
    const task = Task.create(input);
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