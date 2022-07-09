import { User } from '../entities/user.entity';

export interface UserRepositoryInterface {
   insert(user: User): Promise<void>;
   update(id: string, user: User): Promise<boolean>;
   findOneByEmail(email: string): Promise<User>;
   findAll(): Promise<User[]>;
}