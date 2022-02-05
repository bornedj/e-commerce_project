import { User } from "../entities/users";
import { Arg, Ctx, Mutation, Query, Resolver } from "type-graphql";
import { MyContext, UsernamePasswordInput, UserResponse } from "../types";
import argon2 from "argon2";

@Resolver()
export class UserResolver {
  //READ
  // get all users
  @Query(() => [User])
  async users(): Promise<User[]> {
    return User.find();
  }

  // search user by id
  @Query(() => User, { nullable: true })
  user(@Arg("id") id: number): Promise<User | undefined> {
    return User.findOne(id);
  }

  // REGISTER/create
  @Mutation(() => UserResponse)
  async register(
    @Arg("options") options: UsernamePasswordInput,
    @Arg("email") email: string,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    // adding length limits on the username
    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "Username must be greater than 2 characters in lenght",
          },
        ],
      };
    }
    //limits on the password length
    const lengthLimit: number = process.env.DEV ? 4 : 6;
    if (options.password.length <= lengthLimit) {
      return {
        errors: [
          {
            field: "password",
            message: "Password must be greater than 6 characters in length",
          },
        ],
      };
    }
    const hashedPassword = await argon2.hash(options.password);
    // try catch in case of duplicate usernames or emails
    try {
      const user = await User.create({
        password: hashedPassword,
        username: options.username,
        email: email,
      }).save();
      req.session.userId = user.id;
      return {
        user,
      };
    } catch (err) {
      console.log(err);
      //duplicate key handling
      if (err.code === "23505") {
        if (err.detail.includes("username")) {
          return {
            errors: [
              {
                field: "username",
                message: "Username already exists",
              },
            ],
          };
        } else if (err.detail.includes("email")) {
          return {
            errors: [
              {
                field: "email",
                message: "Email already exists",
              },
            ],
          };
        }
      }
      // all other errors
      return {
        errors: [
          {
            field: "login",
            message: err,
          },
        ],
      };
    }
  }

  // LOGIN resolver
  @Mutation(() => UserResponse)
  async login(
    @Arg("options") options: UsernamePasswordInput,
    @Ctx() { req }: MyContext
  ): Promise<UserResponse> {
    const user = await User.findOne({ username: options.username });
    // check if user exists
    if (!user) {
      return {
        errors: [
          {
            field: "username",
            message: "Username does not exist",
          },
        ],
      };
    }
    // check for valid password
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [
          {
            field: "password",
            message: "Password incorrect",
          },
        ],
      };
    }
    req.session.userId = user.id;
    // valid password returns user
    return {
      user: user,
    };
  }

  // me mutation, get's user based on cookie
  @Query(() => User)
  async me(@Ctx() { req }: MyContext): Promise<User | undefined> {
    //if they have a userId stored they have been logged in or registered
    if (!req.session.userId) {
      return undefined;
    }
    //if they are logged in retrieve their information
    const user = await User.findOne({ id: req.session.userId });
    return user;
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
      await User.update({ id }, { username, password });
    }
    return user;
  }

  //DELETE
  @Mutation(() => Boolean)
  async deleteUser(@Arg("id") id: number): Promise<Boolean> {
    await User.delete(id);
    return true;
  }

  // Logout mutation
  @Mutation(() => Boolean)
  logout(@Ctx() { req, res }: MyContext) {
    // Attempt to destroy the users sessions. If there is an error log it and return false
    return new Promise((resolve) =>
      req.session.destroy((err) => {
        res.clearCookie("QID");
        if (err) {
          console.log(err);
          resolve(false);
          return;
        }
        console.log(req.session);
        resolve(true);
      })
    );
  }
}
