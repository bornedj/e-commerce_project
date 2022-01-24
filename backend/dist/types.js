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
exports.UserResponse = exports.FieldResponse = exports.UsernamePasswordInput = exports.ProductIdInput = exports.OrderIdInput = exports.CartIdInput = void 0;
const type_graphql_1 = require("type-graphql");
const users_1 = require("./entities/users");
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
let OrderIdInput = class OrderIdInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => type_graphql_1.Float),
    __metadata("design:type", Number)
], OrderIdInput.prototype, "id", void 0);
OrderIdInput = __decorate([
    (0, type_graphql_1.InputType)()
], OrderIdInput);
exports.OrderIdInput = OrderIdInput;
let ProductIdInput = class ProductIdInput {
};
__decorate([
    (0, type_graphql_1.Field)(),
    __metadata("design:type", Number)
], ProductIdInput.prototype, "id", void 0);
ProductIdInput = __decorate([
    (0, type_graphql_1.InputType)()
], ProductIdInput);
exports.ProductIdInput = ProductIdInput;
let UsernamePasswordInput = class UsernamePasswordInput {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "username", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], UsernamePasswordInput.prototype, "password", void 0);
UsernamePasswordInput = __decorate([
    (0, type_graphql_1.InputType)()
], UsernamePasswordInput);
exports.UsernamePasswordInput = UsernamePasswordInput;
let FieldResponse = class FieldResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], FieldResponse.prototype, "field", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => String),
    __metadata("design:type", String)
], FieldResponse.prototype, "message", void 0);
FieldResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], FieldResponse);
exports.FieldResponse = FieldResponse;
let UserResponse = class UserResponse {
};
__decorate([
    (0, type_graphql_1.Field)(() => [FieldResponse], { nullable: true }),
    __metadata("design:type", Array)
], UserResponse.prototype, "errors", void 0);
__decorate([
    (0, type_graphql_1.Field)(() => users_1.User, { nullable: true }),
    __metadata("design:type", users_1.User)
], UserResponse.prototype, "user", void 0);
UserResponse = __decorate([
    (0, type_graphql_1.ObjectType)()
], UserResponse);
exports.UserResponse = UserResponse;
//# sourceMappingURL=types.js.map