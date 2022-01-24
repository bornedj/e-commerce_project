import { User } from "../entities/users";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class UserResolver {
    //READ
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

    //CREATE 
    @Mutation(() => User)
    async createUser(
        @Arg("email") email: string,
        @Arg("username") username: string,
        @Arg("password") password: string
    ): Promise<User | undefined> {
        return User.create({ 
            username: username,
            email: email,
            password: password
         }).save();
    };

    //UPDATE
    @Mutation(() => User, { nullable: true })
    async updateUser(
        @Arg("id") id: number,
        @Arg("username") username: string,
        @Arg("password") password: string
    ): Promise<User | undefined> {
        const user = await User.findOne(id);
        if (!user) {
            return undefined;
        }
        if (typeof username !== "undefined" && typeof password !== "undefined") {
            await User.update({id}, {username, password})
        }
        return user;
    }

    //DELETE
    @Mutation(() => Boolean)
    async deleteUser(@Arg('id') id: number): Promise<Boolean> {
        await User.delete(id);
        return true;
    }

}