import { CartItem } from "../entities/cartItems";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { CartIdInput, ProductIdInput } from "../types";

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
        ): Promise<CartItem> {
            return await CartItem.create({
                product: productId,
                cart: cartId
            }).save();
        }
    
    // UPDATE
    @Mutation(() => CartItem)
    async updateCartItem(
        @Arg("id") id: number,
        @Arg("productId") productId: number,
        @Arg("cartId") cartId: number
    ): Promise<CartItem | null> {
        const cartItem = await CartItem.findOne(id);
        if (!cartItem) {
            return null;
        }
        cartItem.cart.id = cartId;
        cartItem.product.id = productId;
        cartItem.save();
        return cartItem;
    }

}