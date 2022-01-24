import { Cart } from "../entities/cart";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class CartResolver {
    // READ
    // get all carts
    @Query(() => [Cart])
    async carts(): Promise<Cart[]> {
        return await Cart.find();
    }

    //get cart by id
    @Query(() => Cart)
    async cartById(@Arg("id") id: number): Promise<Cart | undefined> {
        return await Cart.findOne(id)
    }

    //create
    @Mutation(() => Cart)
    async createCart(): Promise<Cart> {
        return await Cart.create().save();
    }

    //update Cart
    @Mutation(() => Cart, {nullable: true})
    async updateCart(@Arg("id") id: number): Promise<Cart | undefined> {
        const cart = await Cart.findOne(id)
        if (!cart) {
            return undefined;
        }
        await Cart.update({id}, {updatedAt: new Date()});
        return cart;
    }

    //delete cart
    @Mutation(() => Cart, {nullable: true})
    async deleteCart(@Arg("id") id: number): Promise<boolean> {
        await Cart.delete(id);
        return true;
    }
}