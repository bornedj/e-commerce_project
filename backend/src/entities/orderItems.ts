import { Field, ObjectType } from "type-graphql";
import { BaseEntity, Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Order } from "./orders";
import { Product } from "./products";

@ObjectType()
@Entity()
export class OrderItems extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(()=> String)
    @CreateDateColumn()
    createdAt!: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => Number)
    @Column({default: 1})
    quantity: number;

    @Field(() => Number)
    @Column()
    price: number;

    @Field(() => Product)
    @ManyToOne(() => Product)
    @JoinColumn()
    product: Product;

    @Field(() => Order)
    @ManyToOne(() => Order)
    @JoinColumn()
    order: Order;
}