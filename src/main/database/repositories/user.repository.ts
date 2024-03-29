import { inject, injectable } from "tsyringe";
import { DataSource, Repository } from "typeorm";
import { UpdateResult } from "typeorm/query-builder/result/UpdateResult";
import { User } from "../../domain/entities/user.entity";
import { UserRepositoryInterface } from "../../domain/repositories/user.repository";

@injectable()
export class UserTypeOrmRepository implements UserRepositoryInterface {
   private ormRepo: Repository<User>

   constructor(@inject('appDataSource') private dataSource: DataSource) {
      this.ormRepo = dataSource.getRepository(User);
   }

   async update(id: string, user: User): Promise<boolean> {

      let result: UpdateResult = null;
      try {
         result = await this.ormRepo.createQueryBuilder()
            .update(User)
            .set(user.props)
            .where("id = :id", { id })
            .execute();
      } catch (e) {
         console.log(e);
         return false;
      }

      return result.affected > 0;
   }

   async insert(user: User): Promise<void> {
      await this.ormRepo.save(user);
   }

   findAll(): Promise<User[]> {
      return this.ormRepo.find();
   }

   findOneByEmail(email: string): Promise<User> {
      return this.ormRepo.findOneBy({ email });
   }
}