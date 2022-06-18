"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.AuthService = void 0;
var common_1 = require("@nestjs/common");
var rxjs_1 = require("rxjs");
var bcrypt = require('bcrypt');
var AuthService = /** @class */ (function () {
    function AuthService(jwtService) {
        this.jwtService = jwtService;
    }
    AuthService.prototype.generateJWT = function (user) {
        return (0, rxjs_1.from)(this.jwtService.signAsync({ user: user }));
    };
    AuthService.prototype.hashPassword = function (password) {
        return (0, rxjs_1.from)(bcrypt.hash(password, 12));
    };
    AuthService.prototype.comparePasswords = function (newPassword, passwortHash) {
        return (0, rxjs_1.from)(bcrypt.compare(newPassword, passwortHash));
    };
    AuthService = __decorate([
        (0, common_1.Injectable)()
    ], AuthService);
    return AuthService;
}());
exports.AuthService = AuthService;
