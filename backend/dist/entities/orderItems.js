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
exports.OrderItems = void 0;
const type_graphql_1 = require("type-graphql");
const typeorm_1 = require("typeorm");
const orders_1 = require("./orders");
const products_1 = require("./products");
let OrderItems = class OrderItems extends typeorm_1.BaseEntity {
};
__decorate([
    (0, type_graphql_1.Field)(),
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], OrderItems.prototype, "id", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], OrderItems.prototype, "createdAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    (0, typeorm_1.UpdateDateColumn)(),
    __metadata("design:type", Date)
], OrderItems.prototype, "updatedAt", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => products_1.Product),
    (0, typeorm_1.ManyToOne)(() => products_1.Product),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", products_1.Product)
], OrderItems.prototype, "product", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => orders_1.Order),
    (0, typeorm_1.ManyToOne)(() => orders_1.Order),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", orders_1.Order)
], OrderItems.prototype, "order", void 0);
OrderItems = __decorate([
    (0, type_graphql_1.ObjectType)(),
    (0, typeorm_1.Entity)()
], OrderItems);
exports.OrderItems = OrderItems;
//# sourceMappingURL=orderItems.js.map