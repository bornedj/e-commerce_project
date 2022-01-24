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
exports.CartItemResolver = void 0;
const cartItems_1 = require("../entities/cartItems");
const type_graphql_1 = require("type-graphql");
const products_1 = require("../entities/products");
const cart_1 = require("../entities/cart");
let CartItemResolver = class CartItemResolver {
    async cartItems() {
        return await cartItems_1.CartItem.find();
    }
    async cartItemById(id) {
        return await cartItems_1.CartItem.findOne(id);
    }
    async createCartItem(productId, cartId) {
        return await cartItems_1.CartItem.create({
            product: productId,
            cart: cartId
        }).save();
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [cartItems_1.CartItem]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], CartItemResolver.prototype, "cartItems", null);
__decorate([
    (0, type_graphql_1.Query)(() => cartItems_1.CartItem),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], CartItemResolver.prototype, "cartItemById", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => cartItems_1.CartItem),
    __param(0, (0, type_graphql_1.Arg)("productId")),
    __param(1, (0, type_graphql_1.Arg)("cartId")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [products_1.ProductIdInput,
        cart_1.CartIdInput]),
    __metadata("design:returntype", Promise)
], CartItemResolver.prototype, "createCartItem", null);
CartItemResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], CartItemResolver);
exports.CartItemResolver = CartItemResolver;
//# sourceMappingURL=cartItems.js.map