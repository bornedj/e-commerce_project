import { CartItem } from "../entities/cartItems";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { Product } from "src/entities/products";
import { Cart } from "src/entities/cart";

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
        @Arg("product") product: Product,
        @Arg("cart") cart: Cart
    ): Promise<CartItem> {
        return CartItem.create({
            product,
            cart
        })
    }
}