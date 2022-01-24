import { User } from "../entities/users";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { UsernamePasswordInput, UserResponse } from "../types";
import argon2 from 'argon2';

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

    // REGISTER/create
    @Mutation(() => UserResponse)
    async register(
        @Arg("options") options: UsernamePasswordInput,
        @Arg("email") email: string
    ) {
        // adding length limits on the username
        if (options.username.length <=2 ) {
            return {
                errors: [{
                    field: 'username',
                    message: 'Username must be greater than 2 characters in lenght'
                }]
            }
        }
        //limits on the password length
        if (options.password.length <=6 ) {
            return {
                errors: [{
                    field: 'password',
                    message: 'Password must be greater than 6 characters in lenght'
                }]
            }
        }
        const hashedPassword = await argon2.hash(options.password)
        // try catch in case of duplicate usernames or emails
        try {
            const user = await User.create({password: hashedPassword, username: options.username, email: email}).save();
            return {
                user
            };
        } catch(err) {
            return {
                errors: [{
                    field: 'login',
                    message: 'Message' + err
                }]
            }
        }
    }

    // LOGIN resolver
    @Mutation(() => UserResponse)
    async login(@Arg('options') options: UsernamePasswordInput): Promise<UserResponse> {
        const user = await User.findOne({ username: options.username});
        // check if user exists
        if (!user) {
            return {
                errors: [{
                    field: 'username',
                    message: 'Username does not exist'
                }],
            }
        }
        // check for valid password
        const valid = await argon2.verify(user.password, options.password);
        if (!valid) {
            return {
                errors: [{
                    field: 'password',
                    message: 'Password incorrect'
                }]
            }
        }

        // valid password returns user
        return {
            user
        }

    }

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