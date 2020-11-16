import {EntityRepository, EntityManager} from "typeorm";
import {User} from "../entities/User";
import argon2 from 'argon2';

@EntityRepository()
export class UserRepository {

    constructor(private manager: EntityManager) {
    }

    createAndSaveUser(email: string, username: string, hashedPassword: string): Promise<User>{
        const user = new User();
        user.email = email;
        user.username = username;
        user.password = hashedPassword;
        return this.manager.save(user);
    }

    async changeAndUpdatePassword(userIdNum: number, newPassword: string){
        this.manager.update(User,
            { id: userIdNum },
            {
              password: await argon2.hash(newPassword),
            }
          );
    }

    userExists(usernameOrEmail: string): boolean{
        const user = this.manager.findOne(User,
            usernameOrEmail.includes('@')
              ? { where: { email: usernameOrEmail } }
              : { where: { username: usernameOrEmail } }
          );
          return !!user 
    }

}