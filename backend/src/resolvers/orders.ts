import { Order } from "../entities/orders";
import { User, UserInputType } from "../entities/users";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class OrderResolver {
    // READ
    @Query(() => [Order])
    async orders(): Promise<Order[]> {
        return await Order.find();
    }

    // get order by id
    @Query(() => Order)
    async order(@Arg("id") id: number): Promise<Order | undefined> {
        return await Order.findOne(id);
    }

    // CREATE
    @Mutation(() => Order)
    async createOrder(
        @Arg("quantity") quantity: number,
        @Arg("price") price: number,
        @Arg("status") status: string,
        @Arg("user") user: UserInputType
    ): Promise<Order | null> {
        return await Order.create({
            quantity,
            price,
            status,
            user
        }).save();
    }


    // update
    @Mutation(() => Order)
    async updateOrder(
        @Arg("id") id: number,
        @Arg("quantity") quantity: number,
        @Arg("price") price: number,
        @Arg("status") status: string
    ): Promise<Order | undefined> {
        const order = await Order.findOne(id);
        if (!order) {
            return undefined;
        }
        order.id = id;
        order.quantity = quantity;
        order.price = price;
        order.status = status;
        Order.update({id}, order)
        return order;
    }

    //DELETE
    @Mutation(() => Boolean)
    async deleteOrder(@Arg("id") id: number): Promise<Boolean> {
        await Order.delete(id);
        return true;
    }
}