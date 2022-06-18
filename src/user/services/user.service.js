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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
exports.__esModule = true;
exports.UserService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var rxjs_1 = require("rxjs");
var user_entity_1 = require("../models/user.entity");
var UserService = /** @class */ (function () {
    function UserService(userRepositry, authService) {
        this.userRepositry = userRepositry;
        this.authService = authService;
    }
    UserService.prototype.createUser = function (user) {
        var _this = this;
        return this.authService.hashPassword(user.password).pipe((0, rxjs_1.switchMap)(function (passwordHash) {
            var newUser = new user_entity_1.UserEntity();
            newUser.firstName = user.firstName;
            newUser.lastName = user.lastName;
            newUser.userName = user.userName;
            newUser.email = user.email;
            newUser.password = passwordHash;
            return (0, rxjs_1.from)(_this.userRepositry.save(newUser)).pipe((0, rxjs_1.map)(function (user) {
                var password = user.password, result = __rest(user, ["password"]);
                return result;
            }), (0, rxjs_1.catchError)(function (err) { return (0, rxjs_1.throwError)(err); }));
        }));
    };
    UserService.prototype.findAllUsers = function () {
        // return from(this.userRepositry.find())
        return (0, rxjs_1.from)(this.userRepositry.find()).pipe((0, rxjs_1.map)(function (users) {
            users.forEach(function (v) { delete v.password; });
            return users;
        }));
    };
    UserService.prototype.findUser = function (id) {
        return (0, rxjs_1.from)(this.userRepositry.findOneBy({ id: id })).pipe((0, rxjs_1.map)(function (user) {
            var password = user.password, result = __rest(user, ["password"]);
            return result;
        }), (0, rxjs_1.catchError)(function (err) { return (0, rxjs_1.throwError)(err); }));
        // return from(this.userRepositry.findOneBy({
        //     id: id,
        // }))
    };
    UserService.prototype.updateUser = function (id, user) {
        delete user.email;
        delete user.password;
        return (0, rxjs_1.from)(this.userRepositry.update(id, user));
    };
    UserService.prototype.deleteUser = function (id) {
        return (0, rxjs_1.from)(this.userRepositry["delete"](id));
    };
    UserService.prototype.login = function (user) {
        var _this = this;
        return this.validateUser(user.email, user.password).pipe((0, rxjs_1.switchMap)(function (user) {
            if (user) {
                return _this.authService.generateJWT(user).pipe((0, rxjs_1.map)(function (jwt) { return jwt; }));
            }
            else {
                return 'Wrong Credentials';
            }
        }));
    };
    UserService.prototype.validateUser = function (email, password) {
        var _this = this;
        return (0, rxjs_1.from)(this.userRepositry.findOneBy({ email: email })).pipe((0, rxjs_1.switchMap)(function (user) { return _this.authService.comparePasswords(password, user.password)
            .pipe((0, rxjs_1.map)(function (match) {
            if (match) {
                var password_1 = user.password, result = __rest(user, ["password"]);
                return result;
            }
            else {
                throw new common_1.BadRequestException("invalid credentials");
            }
        })); }));
    };
    UserService.prototype.updateRoleOfUser = function (id, user) {
        return (0, rxjs_1.from)(this.userRepositry.update(id, user));
    };
    UserService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(user_entity_1.UserEntity))
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
