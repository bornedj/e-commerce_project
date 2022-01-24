import { OrderItems } from "../entities/orderItems";
import { Arg, Mutation, Query, Resolver } from "type-graphql";
import { OrderIdInput, ProductIdInput } from "../types";

@Resolver()
export class OrderItemResolver {
    // READ
    // get all order items
    @Query(() => [OrderItems])
    async orderItems(): Promise<OrderItems[]> {
        return await OrderItems.find();
    }

    // get specific order item by ID
    @Query(() => OrderItems) 
    async orderItem(@Arg("id") id: number): Promise<OrderItems | undefined> {
        return await OrderItems.findOne(id);
    }

    // Create an order item
    @Mutation(() => OrderItems)
    async createOrderItem(
        @Arg('orderId') orderId: OrderIdInput,
        @Arg('productId') productId: ProductIdInput
    ): Promise<OrderItems | undefined> {
        return await OrderItems.create({
            order: orderId,
            product: productId
        }).save();
    }

    //update 
    @Mutation(() => OrderItems)
    async updateOrderItem(
        @Arg('id') id: number,
        @Arg('product') product: number,
        @Arg('order') order: number
    ): Promise<OrderItems | undefined> {
        const orderItem = await OrderItems.findOne(id);
        if (!orderItem) {
            return undefined;
        }
        orderItem.product.id = product;
        orderItem.order.id = order;
        await OrderItems.update({id}, orderItem)
        return orderItem;
    }

    // DELETE
    @Mutation(() => Boolean)
    async deleteOrderItem(@Arg('id') id: number): Promise<Boolean> {
        await OrderItems.delete(id);
        return true;
    }
}