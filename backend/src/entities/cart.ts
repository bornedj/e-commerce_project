import { Field, Float, InputType, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, OneToMany, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { CartItem } from "./cartItems";

@ObjectType()
@Entity()
export class Cart extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(()=> String)
    @CreateDateColumn()
    createdAt!: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    // setting up many to many with products
    @OneToMany(() => CartItem, cartItem => cartItem.cart)
    cartItem: Promise<CartItem[]>;
}