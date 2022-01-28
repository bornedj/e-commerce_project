import { InputType, Field, Float, ObjectType } from "type-graphql";
import { User } from "./entities/users";
import { Request, Response, Express } from 'express';
import { Session} from 'express-session';

// process.env
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            DEV: boolean
        }
    }
}

// orm context
export type MyContext = {
    req: Request & { session: Session },
    res: Response 
}

// session context
declare module "express-session" {
    interface Session {
        userId: number
    }
}

// cart id input
@InputType()
export class CartIdInput {
    @Field()
    id: number;
}

// order id input
@InputType()
export class OrderIdInput {
    @Field(() => Float)
    id: number
}

// product id input
@InputType()
export class ProductIdInput {
    @Field()
    id: number;
}

// for login
@InputType()
export class UsernamePasswordInput {
    @Field(() => String)
    username!: string;

    @Field(() => String)
    password!: string;
}

// object type for passing errors and the location of the error
@ObjectType()
export class FieldResponse {
    @Field(() => String)
    field: string;

    @Field(() => String)
    message: string;
}

// object type for passing erros and user info
@ObjectType()
export class UserResponse {
    @Field(() => [FieldResponse], { nullable: true })
    errors?: FieldResponse[];

    @Field(() => User, { nullable: true })
    user?: User;
}
