"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
exports.__esModule = true;
exports.UserController = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var jwt_auth_guard_1 = require("../../auth/guards/jwt.auth.guard");
var sameUser_guard_1 = require("../../auth/guards/sameUser.guard");
var UserController = /** @class */ (function () {
    function UserController(userService) {
        this.userService = userService;
    }
    UserController.prototype.findAllUsers = function () {
        return this.userService.findAllUsers();
    };
    UserController.prototype.create = function (user) {
        return this.userService.createUser(user).pipe((0, rxjs_1.map)(function (user) { return user; }), (0, rxjs_1.catchError)(function (err) { return (0, rxjs_1.of)({ error: err.message }); }));
    };
    UserController.prototype.login = function (user) {
        return this.userService.login(user).pipe((0, rxjs_1.map)(function (jwt) {
            return { access_token: jwt };
        }));
    };
    UserController.prototype.findUser = function (id) {
        return this.userService.findUser(id);
    };
    UserController.prototype.update = function (id, user) {
        return this.userService.updateUser(id, user);
    };
    UserController.prototype["delete"] = function (id) {
        return this.userService.deleteUser(id);
    };
    UserController.prototype.updateRoleOfUser = function (id, user) {
        return this.userService.updateRoleOfUser(Number(id), user);
    };
    __decorate([
        (0, common_1.Get)()
    ], UserController.prototype, "findAllUsers");
    __decorate([
        (0, common_1.Post)(),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "create");
    __decorate([
        (0, common_1.Post)('login'),
        __param(0, (0, common_1.Body)())
    ], UserController.prototype, "login");
    __decorate([
        (0, common_1.Get)(':id'),
        __param(0, (0, common_1.Param)(('id')))
    ], UserController.prototype, "findUser");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, sameUser_guard_1.SameUserGuard),
        (0, common_1.Put)(':id'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "update");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Delete)(':id'),
        __param(0, (0, common_1.Param)('id'))
    ], UserController.prototype, "delete");
    __decorate([
        (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
        (0, common_1.Put)(':id/role'),
        __param(0, (0, common_1.Param)('id')),
        __param(1, (0, common_1.Body)())
    ], UserController.prototype, "updateRoleOfUser");
    UserController = __decorate([
        (0, common_1.Controller)('user')
    ], UserController);
    return UserController;
}());
exports.UserController = UserController;
