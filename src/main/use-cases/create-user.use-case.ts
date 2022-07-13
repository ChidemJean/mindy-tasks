import { inject, injectable } from "tsyringe";
import { User } from "../domain/entities/user.entity";
import { UserRepositoryInterface } from "../domain/repositories/user.repository";

@injectable()
export class CreateUserUseCase {
  constructor(@inject('UserRepositoryInterface') private userRepo: UserRepositoryInterface) {}

  async execute(input: Input): Promise<Output> {
    const user = User.create(input);
    await this.userRepo.insert(user);
    return user.toJSON() as Output;
  }
}

type Input = {
  name: string;
  email: string;
};

type Output = {
  id: string;
  name: string;
  email: string;
};