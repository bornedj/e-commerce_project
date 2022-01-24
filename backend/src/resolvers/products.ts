import { Product } from "../entities/products";
import { Arg, Mutation, Query, Resolver } from "type-graphql";

@Resolver()
export class ProductResolver {
    //READ
    // get all users
    @Query(() => [Product])
    async products(): Promise<Product[]> {
        return Product.find();
    }

    // search user by id
    @Query(() => Product, { nullable: true})
    product(@Arg("id") id: number): Promise<Product | undefined> {
        return Product.findOne(id);
    }

    //CREATE 
    @Mutation(() => Product)
    async createProduct(
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Arg("price") price: number,
        @Arg("quantity") quantity: number
    ): Promise<Product | undefined> {
        return await Product.create({ name: name, description: description, price: price, quantity: quantity }).save();
    };

    //UPDATE
    @Mutation(() => Product, { nullable: true })
    async updateProduct(
        @Arg("id") id: number,
        @Arg("name") name: string,
        @Arg("description") description: string,
        @Arg("price") price: number,
        @Arg("quantity") quantity: number
    ): Promise<Product | undefined> {
        const user = await Product.findOne(id);
        if (!user) {
            return undefined;
        }
        if (typeof name !== "undefined" && typeof description !== "undefined" && typeof price !== "undefined" && typeof quantity !== "undefined") {
            await Product.update({id}, {name, description, price, quantity})
        }
        return user;
    }

    //DELETE
    @Mutation(() => Boolean)
    async deleteProduct(@Arg('id') id: number): Promise<Boolean> {
        await Product.delete(id);
        return true;
    }

}