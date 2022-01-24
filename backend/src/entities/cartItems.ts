import { Field, ObjectType } from "type-graphql";
import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart";
import { Product } from "./products";

@ObjectType()
@Entity()
export class CartItems extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(()=> String)
    @CreateDateColumn()
    createdAt!: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    @Field(() => Product)
    @ManyToOne(() => Product)
    @JoinColumn()
    product: Product;

    @Field(() => Cart)
    @ManyToOne(() => Cart)
    @JoinColumn()
    cart: Cart;
}