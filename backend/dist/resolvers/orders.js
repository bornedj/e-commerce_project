"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderResolver = void 0;
const orders_1 = require("../entities/orders");
const users_1 = require("../entities/users");
const type_graphql_1 = require("type-graphql");
let OrderResolver = class OrderResolver {
    async orders() {
        return await orders_1.Order.find();
    }
    async order(id) {
        return await orders_1.Order.findOne(id);
    }
    async createOrder(quantity, price, status, user) {
        return await orders_1.Order.create({
            quantity,
            price,
            status,
            user
        }).save();
    }
    async updateOrder(id, quantity, price, status) {
        const order = await orders_1.Order.findOne(id);
        if (!order) {
            return undefined;
        }
        order.id = id;
        order.quantity = quantity;
        order.price = price;
        order.status = status;
        orders_1.Order.update({ id }, order);
        return order;
    }
    async deleteOrder(id) {
        await orders_1.Order.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [orders_1.Order]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "orders", null);
__decorate([
    (0, type_graphql_1.Query)(() => orders_1.Order),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "order", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => orders_1.Order),
    __param(0, (0, type_graphql_1.Arg)("quantity")),
    __param(1, (0, type_graphql_1.Arg)("price")),
    __param(2, (0, type_graphql_1.Arg)("status")),
    __param(3, (0, type_graphql_1.Arg)("user")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, users_1.UserInputType]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "createOrder", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => orders_1.Order),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("quantity")),
    __param(2, (0, type_graphql_1.Arg)("price")),
    __param(3, (0, type_graphql_1.Arg)("status")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number, String]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "updateOrder", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderResolver.prototype, "deleteOrder", null);
OrderResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], OrderResolver);
exports.OrderResolver = OrderResolver;
//# sourceMappingURL=orders.js.map