import { User } from "../entities/users";
import { Arg, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
    // get all users
    @Query(() => [User])
    async users(): Promise<User[]> {
        return User.find();
    }

    // search user by id
    @Query(() => User, { nullable: true})
    user(@Arg("id") id: number): Promise<User | undefined> {
        return User.findOne(id);
    }

}