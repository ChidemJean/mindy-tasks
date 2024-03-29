import { inject, injectable } from 'tsyringe';
import { UserRepositoryInterface } from '../domain/repositories/user.repository';

@injectable()
export class ListAllUsersUseCase {
  constructor(@inject('UserRepositoryInterface') private userRepo: UserRepositoryInterface) {}

  async execute(): Promise<ListUserOutput> {
    const users = await this.userRepo.findAll();
    return users.map((u) => u.toJSON()) as ListUserOutput;
  }
}

type ListUserOutput = {
  id: string;
  name: string;
  email: string;
}[];