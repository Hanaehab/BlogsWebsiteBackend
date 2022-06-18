"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.UserEntity = void 0;
var typeorm_1 = require("typeorm");
var post_entity_1 = require("../../post/models/post.entity");
var comment_entity_1 = require("../../comment/models/comment.entity");
var UserEntity = /** @class */ (function () {
    function UserEntity() {
    }
    UserEntity.prototype.emailToLowerCase = function () {
        this.email = this.email.toLowerCase();
    };
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], UserEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ "default": '' })
    ], UserEntity.prototype, "firstName");
    __decorate([
        (0, typeorm_1.Column)({ "default": '' })
    ], UserEntity.prototype, "lastName");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], UserEntity.prototype, "userName");
    __decorate([
        (0, typeorm_1.Column)({ unique: true })
    ], UserEntity.prototype, "email");
    __decorate([
        (0, typeorm_1.Column)()
    ], UserEntity.prototype, "password");
    __decorate([
        (0, typeorm_1.BeforeInsert)()
    ], UserEntity.prototype, "emailToLowerCase");
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return post_entity_1.PostEntity; }, function (post) { return post.user; }, { onDelete: "CASCADE" })
    ], UserEntity.prototype, "post");
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return comment_entity_1.CommentEntity; }, function (comment) { return comment.user; }, { onDelete: "CASCADE" })
    ], UserEntity.prototype, "comment");
    UserEntity = __decorate([
        (0, typeorm_1.Entity)('user')
    ], UserEntity);
    return UserEntity;
}());
exports.UserEntity = UserEntity;
