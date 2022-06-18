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
exports.CommentService = void 0;
var common_1 = require("@nestjs/common");
var typeorm_1 = require("@nestjs/typeorm");
var rxjs_1 = require("rxjs");
var comment_entity_1 = require("../models/comment.entity");
var CommentService = /** @class */ (function () {
    function CommentService(commentRepositry) {
        this.commentRepositry = commentRepositry;
    }
    CommentService.prototype.createComment = function (user, post, comment) {
        comment.user = user;
        comment.post = post;
        return (0, rxjs_1.from)(this.commentRepositry.save(comment));
    };
    CommentService.prototype.findById = function (id) {
        return (0, rxjs_1.from)(this.commentRepositry.findOne({
            where: { id: id },
            relations: ['user', 'post']
        }));
    };
    CommentService.prototype.findByPost = function (id) {
        return (0, rxjs_1.from)(this.commentRepositry.find({
            where: {
                post: { id: id }
            },
            relations: ['user', 'post']
        }));
    };
    CommentService.prototype.findAllComments = function () {
        return (0, rxjs_1.from)(this.commentRepositry.find({ relations: ['user', 'post'] }));
    };
    CommentService.prototype.updateComment = function (id, comment) {
        var _this = this;
        return (0, rxjs_1.from)(this.commentRepositry.update(id, comment)).pipe((0, rxjs_1.switchMap)(function () { return _this.findById(id); }));
    };
    CommentService.prototype.deleteComment = function (id) {
        return (0, rxjs_1.from)(this.commentRepositry["delete"](id));
    };
    CommentService = __decorate([
        (0, common_1.Injectable)(),
        __param(0, (0, typeorm_1.InjectRepository)(comment_entity_1.CommentEntity))
    ], CommentService);
    return CommentService;
}());
exports.CommentService = CommentService;
