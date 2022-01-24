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
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartIdInput = exports.Cart = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const cartItems_1 = require("./cartItems");
let Cart = class Cart extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], Cart.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], Cart.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], Cart.prototype, "updatedAt", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => cartItems_1.CartItem, cartItem => cartItem.cart),
    __metadata("design:type", Promise)
], Cart.prototype, "cartItem", void 0);
Cart = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], Cart);
exports.Cart = Cart;
let CartIdInput = class CartIdInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], CartIdInput.prototype, "id", void 0);
CartIdInput = __decorate([
    (0, type_graphql_1.InputType)()
], CartIdInput);
exports.CartIdInput = CartIdInput;
//# sourceMappingURL=cart.js.map