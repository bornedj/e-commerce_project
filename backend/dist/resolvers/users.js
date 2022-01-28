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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const users_1 = require("../entities/users");
const type_graphql_1 = require("type-graphql");
const types_1 = require("../types");
const argon2_1 = __importDefault(require("argon2"));
let UserResolver = class UserResolver {
    async users() {
        return users_1.User.find();
    }
    user(id) {
        return users_1.User.findOne(id);
    }
    async register(options, email, { req }) {
        if (options.username.length <= 2) {
            return {
                errors: [{
                        field: 'username',
                        message: 'Username must be greater than 2 characters in lenght'
                    }]
            };
        }
        const lengthLimit = process.env.DEV ? 0 : 7;
        if (options.password.length <= lengthLimit) {
            return {
                errors: [{
                        field: 'password',
                        message: 'Password must be greater than 6 characters in length'
                    }]
            };
        }
        const hashedPassword = await argon2_1.default.hash(options.password);
        try {
            const user = await users_1.User.create({ password: hashedPassword, username: options.username, email: email }).save();
            return {
                user
            };
        }
        catch (err) {
            console.log(err);
            return {
                errors: [{
                        field: 'login',
                        message: 'Message' + err
                    }]
            };
        }
    }
    async login(options, { req }) {
        const user = await users_1.User.findOne({ username: options.username });
        if (!user) {
            return {
                errors: [{
                        field: 'username',
                        message: 'Username does not exist'
                    }],
            };
        }
        const valid = await argon2_1.default.verify(user.password, options.password);
        if (!valid) {
            return {
                errors: [{
                        field: 'password',
                        message: 'Password incorrect'
                    }]
            };
        }
        req.session.userId = user.id;
        return {
            user
        };
    }
    async updateUser(id, username, password) {
        const user = await users_1.User.findOne(id);
        if (!user) {
            return undefined;
        }
        if (typeof username !== "undefined" && typeof password !== "undefined") {
            await users_1.User.update({ id }, { username, password });
        }
        return user;
    }
    async deleteUser(id) {
        await users_1.User.delete(id);
        return true;
    }
};
__decorate([
    (0, type_graphql_1.Query)(() => [users_1.User]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "users", null);
__decorate([
    (0, type_graphql_1.Query)(() => users_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "user", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => types_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)("options")),
    __param(1, (0, type_graphql_1.Arg)("email")),
    __param(2, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UsernamePasswordInput, String, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "register", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => types_1.UserResponse),
    __param(0, (0, type_graphql_1.Arg)('options')),
    __param(1, (0, type_graphql_1.Ctx)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [types_1.UsernamePasswordInput, Object]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "login", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => users_1.User, { nullable: true }),
    __param(0, (0, type_graphql_1.Arg)("id")),
    __param(1, (0, type_graphql_1.Arg)("username")),
    __param(2, (0, type_graphql_1.Arg)("password")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "updateUser", null);
__decorate([
    (0, type_graphql_1.Mutation)(() => Boolean),
    __param(0, (0, type_graphql_1.Arg)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", Promise)
], UserResolver.prototype, "deleteUser", null);
UserResolver = __decorate([
    (0, type_graphql_1.Resolver)()
], UserResolver);
exports.UserResolver = UserResolver;
//# sourceMappingURL=users.js.map