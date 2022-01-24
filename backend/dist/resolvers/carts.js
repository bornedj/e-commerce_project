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
exports.CartResolver = void 0;
const cart_1 = require("../entities/cart");
const type_graphql_1 = require("type-graphql");
let CartResolver = class CartResolver {
    async carts() {
        return await cart_1.Cart.find();
    }
    async cartById(id) {
        return await cart_1.Cart.findOne(id);
    }
    async createCart() {
        return await cart_1.Cart.create().save();
    }
    async updateCart(id) {
        const cart = await cart_1.Cart.findOne(id);
        if (!cart) {
            return undefined;
        }
        await cart_1.Cart.update({ id }, { updatedAt: new Date() });
        return cart;
    }
    async deleteCart(id) {
        await cart_1.Cart.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [cart_1.Cart]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "carts", null);
__decorate([
    (0, type_graphql_1.Query)(() => cart_1.Cart),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "cartById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => cart_1.Cart),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "createCart", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => cart_1.Cart, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "updateCart", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => cart_1.Cart, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartResolver.prototype, "deleteCart", null);
CartResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CartResolver);
exports.CartResolver = CartResolver;
//# sourceMappingURL=carts.js.map