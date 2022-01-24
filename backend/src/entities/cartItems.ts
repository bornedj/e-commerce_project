import { Field, Float, InputType, ObjectType } from "type-graphql";
import { BaseEntity, CreateDateColumn, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Cart } from "./cart";
import { Product } from "./products";

@ObjectType()
@Entity()
export class CartItem extends BaseEntity {
    @Field()
    @PrimaryGeneratedColumn()
    id!: number;

    @Field(()=> String)
    @CreateDateColumn()
    createdAt!: Date;

    @Field(() => String)
    @UpdateDateColumn()
    updatedAt: Date;

    //product id
    @Field(() => Product)
    @ManyToOne(() => Product, product => product.id)
    @JoinColumn()
    product: Product;

    // cart id
    @Field(() => Cart)
    @ManyToOne(() => Cart, cart => cart.id)
    @JoinColumn()
    cart: Cart;
}
