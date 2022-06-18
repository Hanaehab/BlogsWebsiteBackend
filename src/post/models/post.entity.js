"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
exports.__esModule = true;
exports.PostEntity = void 0;
var typeorm_1 = require("typeorm");
var user_entity_1 = require("../../user/models/user.entity");
var comment_entity_1 = require("../../comment/models/comment.entity");
var PostEntity = /** @class */ (function () {
    function PostEntity() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)()
    ], PostEntity.prototype, "id");
    __decorate([
        (0, typeorm_1.Column)({ "default": '' })
    ], PostEntity.prototype, "title");
    __decorate([
        (0, typeorm_1.Column)({ "default": '' })
    ], PostEntity.prototype, "body");
    __decorate([
        (0, typeorm_1.Column)({ type: 'timestamp', "default": function () { return 'CURRENT_TIMESTAMP'; } })
    ], PostEntity.prototype, "createdAt");
    __decorate([
        (0, typeorm_1.ManyToOne)(function (type) { return user_entity_1.UserEntity; }, function (user) { return user.post; }, {
            onDelete: "CASCADE"
        })
    ], PostEntity.prototype, "user");
    __decorate([
        (0, typeorm_1.OneToMany)(function (type) { return comment_entity_1.CommentEntity; }, function (comment) { return comment.post; })
    ], PostEntity.prototype, "comment");
    PostEntity = __decorate([
        (0, typeorm_1.Entity)('post')
    ], PostEntity);
    return PostEntity;
}());
exports.PostEntity = PostEntity;
