import { Field, Float, InputType, Int, ObjectType } from 'type-graphql';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm'
import { CartItem } from './cartItems';

@ObjectType()
@Entity()
export class Product extends BaseEntity {

    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(() => String)
    @CreateDateColumn()
    createdAt: Date; 

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => String)
    @Column()
    name!: string;

    @Field(() => String)
    @Column()
    description!: string;

    @Field(() => Float)
    @Column({default: 0, type: 'real'})
    price!: number;

    @Field(() => Int)
    @Column()
    quantity!: number;

    // for many to many relationship
    @OneToMany(() => CartItem, cartItem => cartItem.product)
    cartItem: Promise<CartItem[]>;
}