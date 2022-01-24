import { CartItem } from "../entities/cartItems";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Product, ProductIdInput } from "../entities/products";
import { Cart, CartIdInput } from "../entities/cart";
import { getConnection } from "typeorm";

@Resolver()
export class CartItemResolver {
    // READ
    //get all cart items
    @Query(() => [CartItem])
    async cartItems(): Promise<CartItem[]> {
        return await CartItem.find()
    }

    // find cart item by ID
    @Query(() => CartItem)
    async cartItemById(@Arg("id") id: number): Promise<CartItem | undefined> {
        return await CartItem.findOne(id);
    }

    //CREATE
    @Mutation(() => CartItem)
    async createCartItem(
        @Arg("productId") productId: ProductIdInput,
        @Arg("cartId") cartId: CartIdInput
        ): Promise<CartItem > {
            return await CartItem.create({
                product: productId,
                cart: cartId
            }).save();
        }

}