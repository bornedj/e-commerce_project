import {Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany} from 'typeorm'
import { ObjectType, Field, InputType, Float } from 'type-graphql';
import { Order } from './orders';

//creating the user entity
@ObjectType()
@Entity()
export class User extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date; 

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field()
    @Column({unique: true})
    username!: string;

    @Field()
    @Column({unique: true})
    email!: string;

    //passwords will be hashed
    @Column()
    password!: string;

    @OneToMany(() => Order, order => order.user)
    order: Promise<Order[]>;

}

@InputType()
export class UserInputType {
    @Field(() => Float)
    id: number
}