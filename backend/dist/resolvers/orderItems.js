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
exports.OrderItemResolver = void 0;
const orderItems_1 = require("../entities/orderItems");
const type_graphql_1 = require("type-graphql");
const types_1 = require("../types");
let OrderItemResolver = class OrderItemResolver {
    async orderItems() {
        return await orderItems_1.OrderItems.find();
    }
    async orderItem(id) {
        return await orderItems_1.OrderItems.findOne(id);
    }
    async createOrderItem(orderId, productId) {
        return await orderItems_1.OrderItems.create({
            order: orderId,
            product: productId
        }).save();
    }
    async updateOrderItem(id, product, order) {
        const orderItem = await orderItems_1.OrderItems.findOne(id);
        if (!orderItem) {
            return undefined;
        }
        orderItem.product.id = product;
        orderItem.order.id = order;
        await orderItems_1.OrderItems.update({ id }, orderItem);
        return orderItem;
    }
    async deleteOrderItem(id) {
        await orderItems_1.OrderItems.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [orderItems_1.OrderItems]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], OrderItemResolver.prototype, "orderItems", null);
__decorate([
    (0, type_graphql_1.Query)(() => orderItems_1.OrderItems),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderItemResolver.prototype, "orderItem", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => orderItems_1.OrderItems),
    __param(0, (0, type_graphql_1.Arg)('orderId')),
    __param(1, (0, type_graphql_1.Arg)('productId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.OrderIdInput,
        types_1.ProductIdInput]),
    __metadata("design:returntype", Promise)
], OrderItemResolver.prototype, "createOrderItem", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => orderItems_1.OrderItems),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __param(1, (0, type_graphql_1.Arg)('product')),
    __param(2, (0, type_graphql_1.Arg)('order')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, Number]),
    __metadata("design:returntype", Promise)
], OrderItemResolver.prototype, "updateOrderItem", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], OrderItemResolver.prototype, "deleteOrderItem", null);
OrderItemResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], OrderItemResolver);
exports.OrderItemResolver = OrderItemResolver;
//# sourceMappingURL=orderItems.js.map